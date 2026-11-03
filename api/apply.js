const path = require("path");
const busboy = require("busboy");
const nodemailer = require("nodemailer");

const MAX_BYTES = 4 * 1024 * 1024;
const TYPES = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};
const LOOSE_MIME = new Set(["", "application/octet-stream", ...Object.values(TYPES)]);

function extension(name) {
  const match = String(name || "").toLowerCase().match(/\.([a-z0-9]+)$/);
  return match ? match[1] : "";
}

function matchesType(buffer, ext) {
  if (!buffer || buffer.length < 4) return false;
  if (ext === "pdf") return buffer.slice(0, 5).toString("latin1") === "%PDF-";
  if (ext === "doc") return buffer[0] === 0xd0 && buffer[1] === 0xcf && buffer[2] === 0x11 && buffer[3] === 0xe0;
  if (ext === "docx") return buffer[0] === 0x50 && buffer[1] === 0x4b && buffer.includes(Buffer.from("word/"));
  return false;
}

function safeFilename(original, ext) {
  const base = path.basename(String(original || "resume")).replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 80);
  const stem = base.replace(/\.[^.]+$/, "") || "resume";
  return stem + "." + ext;
}

function clean(value, max) {
  return String(value || "").replace(/\u0000/g, "").trim().slice(0, max);
}

function validateApplication(fields, file) {
  const first = clean(fields["First-name"], 80);
  const last = clean(fields["Last-name"], 80);
  const email = clean(fields.Email, 200);
  const position = clean(fields.Role, 160);
  const message = clean(fields.Message || fields.About, 5000);
  const portfolio = clean(fields.Portfolio, 300);
  if (!first || !last) return { ok: false, error: "Enter your full name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Enter a valid email address." };
  if (!position) return { ok: false, error: "Enter the position you are applying for." };
  if (!message) return { ok: false, error: "Write a message explaining why you are a good fit for this role." };
  if (!file || !file.buffer || !file.buffer.length) return { ok: false, error: "Add your CV or resume. PDF, DOC, and DOCX files are accepted." };
  if (file.truncated || file.buffer.length > MAX_BYTES) return { ok: false, error: "That file is too large. The maximum size is 4 MB." };
  const ext = extension(file.filename);
  if (!TYPES[ext]) return { ok: false, error: "That file type is not accepted. Upload a PDF, DOC, or DOCX file." };
  const mime = String(file.mime || "").toLowerCase();
  if (!LOOSE_MIME.has(mime)) return { ok: false, error: "That file type is not accepted. Upload a PDF, DOC, or DOCX file." };
  if (!matchesType(file.buffer, ext)) return { ok: false, error: "The file contents do not match a PDF, DOC, or DOCX document." };
  return {
    ok: true,
    value: {
      name: first + " " + last,
      email,
      position,
      message,
      portfolio,
      filename: safeFilename(file.filename, ext),
      contentType: TYPES[ext],
      buffer: file.buffer,
    },
  };
}

function buildMessage(application) {
  const lines = [
    "New EraX Digital job application",
    "",
    "Full name: " + application.name,
    "Email: " + application.email,
    "Position: " + application.position,
    "Portfolio: " + (application.portfolio || "Not provided"),
    "",
    "Message:",
    application.message,
    "",
    "The CV/resume is attached to this email.",
  ];
  return {
    subject: "Application: " + application.position + " — " + application.name,
    text: lines.join("\n"),
    attachment: {
      filename: application.filename,
      content: application.buffer,
      contentType: application.contentType,
      contentDisposition: "attachment",
    },
  };
}

function createTransport() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const port = Number(process.env.SMTP_PORT || 587);
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE === "true" || port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      connectionTimeout: 20000,
      greetingTimeout: 20000,
      socketTimeout: 20000,
    });
  }
  return nodemailer.createTransport({
    host: "mx1.hostinger.com",
    port: 25,
    secure: false,
    requireTLS: true,
    name: "erax.digital",
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
    tls: { servername: "mx1.hostinger.com" },
  });
}

async function deliver(application) {
  const message = buildMessage(application);
  await createTransport().sendMail({
    from: process.env.SMTP_FROM || "EraX Digital <jobs@erax.digital>",
    to: "jobs@erax.digital",
    replyTo: application.email,
    subject: message.subject,
    text: message.text,
    attachments: [message.attachment],
  });
}

function readForm(req) {
  return new Promise((resolve, reject) => {
    const fields = {};
    const file = { buffer: Buffer.alloc(0), filename: "", mime: "", truncated: false, present: false };
    let parser;
    try {
      parser = busboy({
        headers: req.headers,
        limits: { files: 1, fileSize: MAX_BYTES, fields: 20, fieldSize: 20000 },
      });
    } catch (error) {
      reject(error);
      return;
    }
    parser.on("field", (name, value) => {
      fields[name] = value;
    });
    parser.on("file", (name, stream, info) => {
      if (name !== "Resume" || file.present) {
        stream.resume();
        return;
      }
      file.present = true;
      file.filename = info.filename;
      file.mime = info.mimeType;
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("limit", () => {
        file.truncated = true;
      });
      stream.on("end", () => {
        file.buffer = Buffer.concat(chunks);
      });
    });
    parser.on("error", reject);
    parser.on("finish", () => resolve({ fields, file: file.present ? file : null }));
    req.pipe(parser);
  });
}

async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ ok: false, error: "Use the application form to submit." }));
    return;
  }
  try {
    const uploaded = await readForm(req);
    const result = validateApplication(uploaded.fields, uploaded.file);
    if (!result.ok) {
      res.statusCode = 400;
      res.end(JSON.stringify({ ok: false, error: result.error }));
      return;
    }
    await deliver(result.value);
    res.statusCode = 200;
    res.end(JSON.stringify({ ok: true }));
  } catch (error) {
    const status = error.status || 502;
    const message = status === 503
      ? error.message
      : "The application could not be sent. Please try again in a moment.";
    res.statusCode = status;
    res.end(JSON.stringify({ ok: false, error: message }));
  }
}

module.exports = handler;
module.exports.config = { api: { bodyParser: false } };
module.exports.validateApplication = validateApplication;
module.exports.buildMessage = buildMessage;
module.exports.MAX_BYTES = MAX_BYTES;
