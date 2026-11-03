const fs = require("fs");
const path = require("path");
function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name === ".git") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (/\.(html|js|css|svg)$/.test(name)) out.push(full);
  }
}
const files = [];
walk(".", files);
const patterns = [/Cassator/gi, /CASSATOR/g, /\bSL8\b/g, /\bSl8\b/g, /sl8\.online/gi, /hello@/gi, /press@/gi, /jobs@/gi, /contact@/gi, /mailto:/gi, /Cassator_Logotype/g];
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const hits = [];
  for (const re of patterns) {
    const m = text.match(re);
    if (m) hits.push(re.source + ":" + m.length);
  }
  if (hits.length) console.log(file.replace(/\\/g, "/"), hits.join(" "));
}
