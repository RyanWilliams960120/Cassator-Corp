const fs = require("fs");
const { validateApplication, buildMessage } = require("../api/apply");
const pdf = Buffer.concat([Buffer.from("%PDF-1.4\n"), Buffer.alloc(32)]);
const ok = validateApplication({
  "First-name": "Ada",
  "Last-name": "Lovelace",
  Email: "ada@example.com",
  Role: "Blockchain Engineer",
  Message: "I have shipped wallet interfaces and want to help build EraX Wallet.",
  Portfolio: "https://example.com",
}, { filename: "Ada_Lovelace.pdf", mime: "application/pdf", buffer: pdf, truncated: false });
if (!ok.ok) throw new Error(ok.error);
const message = buildMessage(ok.value);
if (!message.text.includes("I have shipped wallet interfaces")) throw new Error("message missing");
if (message.attachment.filename !== "Ada_Lovelace.pdf") throw new Error("filename");
if (!message.attachment.content.slice(0, 5).equals(Buffer.from("%PDF-"))) throw new Error("attachment");
const bad = validateApplication(ok.value && {
  "First-name": "Ada",
  "Last-name": "Lovelace",
  Email: "ada@example.com",
  Role: "Blockchain Engineer",
  Message: "I have shipped wallet interfaces and want to help build EraX Wallet.",
}, { filename: "resume.exe.pdf", mime: "application/pdf", buffer: Buffer.from("MZ not a pdf"), truncated: false });
if (bad.ok) throw new Error("exe accepted");
const big = validateApplication({
  "First-name": "Ada", "Last-name": "Lovelace", Email: "ada@example.com", Role: "Engineer",
  Message: "I have shipped wallet interfaces and want to help build EraX Wallet.",
}, { filename: "cv.pdf", mime: "application/pdf", buffer: pdf, truncated: true });
if (big.ok) throw new Error("oversize accepted");
console.log("validation ok", message.subject);
