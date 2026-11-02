const fs = require("fs");
const path = require("path");
const files = [
  "sl8.html","rwa.html","wallet.html","paid-content.html","investors.html","team.html",
  "built-on-stellar.html","newsroom.html","trust-center.html"
];
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/i, " ")
    .replace(/<footer[\s\S]*?<\/footer>/i, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&amp;/g, "&").replace(/&#x27;/g, "'");
  const lines = text.split("\n").map(s => s.trim()).filter(s => s && s.length < 220 && !/^[A-Z0-9\s]{16,}$/.test(s));
  console.log("\n====", file);
  console.log(lines.slice(0, 22).join("\n"));
}
