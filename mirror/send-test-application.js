const http = require("http");
const fs = require("fs");

const pdf = Buffer.concat([
  Buffer.from("%PDF-1.4\n"),
  fs.readFileSync("docs/erax-whitepaper.pdf").subarray(0, 64),
]);
const boundary = "----eraxform";
const fields = {
  "First-name": "Delivery",
  "Last-name": "Check",
  Email: "delivery-check@erax.digital",
  Role: "Product Manager (Social Network)",
  Portfolio: "https://www.erax.digital",
  Message: "Form delivery check.",
};
const parts = [];
for (const [name, value] of Object.entries(fields)) {
  parts.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`));
}
parts.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="Resume"; filename="delivery-check.pdf"\r\nContent-Type: application/pdf\r\n\r\n`));
parts.push(pdf.subarray(0, 5).toString() === "%PDF-" ? Buffer.concat([Buffer.from("%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n")]) : pdf);
parts.push(Buffer.from(`\r\n--${boundary}--\r\n`));
const body = Buffer.concat(parts);

const req = http.request({
  host: "127.0.0.1",
  port: 8080,
  path: "/api/apply",
  method: "POST",
  headers: {
    "Content-Type": "multipart/form-data; boundary=" + boundary,
    "Content-Length": body.length,
  },
}, (res) => {
  const chunks = [];
  res.on("data", (chunk) => chunks.push(chunk));
  res.on("end", () => {
    console.log(res.statusCode, Buffer.concat(chunks).toString("utf8"));
  });
});
req.on("error", (error) => {
  console.error(error.message);
  process.exit(1);
});
req.end(body);
