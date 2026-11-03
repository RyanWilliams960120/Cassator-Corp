const http = require("http");

function post(parts) {
  const boundary = "----eraxform";
  const body = Buffer.concat(parts.map((part) => Buffer.concat([
    Buffer.from("--" + boundary + "\r\nContent-Disposition: form-data; name=\"" + part.name + "\"" + (part.filename ? "; filename=\"" + part.filename + "\"" : "") + "\r\n" + (part.type ? "Content-Type: " + part.type + "\r\n" : "") + "\r\n"),
    Buffer.isBuffer(part.body) ? part.body : Buffer.from(String(part.body)),
    Buffer.from("\r\n"),
  ])).concat(Buffer.from("--" + boundary + "--\r\n")));
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: "127.0.0.1",
      port: 8080,
      path: "/api/apply",
      method: "POST",
      headers: { "Content-Type": "multipart/form-data; boundary=" + boundary, "Content-Length": body.length },
    }, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString() }));
    });
    req.on("error", reject);
    req.end(body);
  });
}

(async () => {
  const pdf = Buffer.from("%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF");
  const fields = [
    { name: "First-name", body: "Ada" },
    { name: "Last-name", body: "Lovelace" },
    { name: "Email", body: "ada@example.com" },
    { name: "Role", body: "Blockchain Engineer" },
    { name: "Portfolio", body: "https://example.com" },
    { name: "Message", body: "I have shipped wallet interfaces and want to help build EraX Wallet." },
  ];
  const missing = await post(fields);
  console.log("no file", missing.status, missing.body);
  const bad = await post(fields.concat({ name: "Resume", filename: "note.txt", type: "text/plain", body: "hello" }));
  console.log("bad type", bad.status, bad.body);
  const sent = await post(fields.concat({ name: "Resume", filename: "Ada_Lovelace.pdf", type: "application/pdf", body: pdf }));
  console.log("valid", sent.status, sent.body);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
