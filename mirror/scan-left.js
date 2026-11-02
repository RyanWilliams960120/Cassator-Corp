const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(".");
const re = /Cassator|CASSATOR|cassator\.com|SL8|Sl8|sl8\.online|SSLX|Stellar|Horizon|Wefunder|Delaware|@erax\.digital|@cassator|APY|Ivanov|Forbes|MiCA|seed phrase|VISA|Mastercard|KYC|VASP|validator|USDC|XLM|SEC Filing|hello@|press@|privacy@/i;

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "mirror" || name === "node_modules" || name === ".git") continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (/\.(html|js|json)$/.test(name)) acc.push(p);
  }
  return acc;
}

function visible(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, "\n");
}

for (const file of walk(ROOT)) {
  const html = fs.readFileSync(file, "utf8");
  const text = visible(html);
  const lines = text.split("\n").map(s => s.replace(/\s+/g, " ").trim()).filter(s => s && re.test(s) && /[a-z]/i.test(s));
  if (lines.length) {
    console.log("\n==", path.relative(ROOT, file), lines.length);
    console.log(lines.slice(0, 12).map(s => s.slice(0, 180)).join("\n"));
  }
}
