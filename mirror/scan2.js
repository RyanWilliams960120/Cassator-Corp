const fs = require("fs");
const path = require("path");
const ROOT = ".";
const word = /\b(Cassator|CASSATOR|SL8|Sl8|SSLX|Stellar|Horizon|Wefunder|Delaware|APY|Ivanov|Forbes|MiCA|USDC|XLM|KYC|VASP|validator|seed phrases?|erax\.digital|cassator)\b/;

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (["mirror", "node_modules", ".git"].includes(name)) continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (/\.(html|js)$/.test(name)) acc.push(p);
  }
  return acc;
}
function texts(html) {
  let out = [];
  let i = 0;
  while (i < html.length) {
    if (html.startsWith("<script", i) || html.startsWith("<style", i)) {
      const tag = html.startsWith("<script", i) ? "script" : "style";
      const end = html.indexOf(`</${tag}>`, i);
      i = end < 0 ? html.length : end + tag.length + 3;
      continue;
    }
    if (html[i] === "<") {
      const end = html.indexOf(">", i);
      i = end < 0 ? html.length : end + 1;
      continue;
    }
    const next = html.indexOf("<", i);
    const end = next < 0 ? html.length : next;
    const t = html.slice(i, end).replace(/\s+/g, " ").trim();
    if (t) out.push(t);
    i = end;
  }
  return out;
}
for (const file of walk(ROOT)) {
  const html = fs.readFileSync(file, "utf8");
  const hits = texts(html).filter(t => word.test(t) && (t.length < 80 || /[a-z]/.test(t) && /\s/.test(t)));
  const attrs = [];
  const are = /(?:href|src|content|alt|aria-label)="[^"]*(?:cassator|sl8\.online|wefunder|stellar\.org|erax\.digital|seed)[^"]*"/gi;
  let m;
  while ((m = are.exec(html))) attrs.push(m[0].slice(0, 160));
  if (hits.length || attrs.length) {
    console.log("\n==", file);
    hits.slice(0, 15).forEach(h => console.log(" T", h.slice(0, 200)));
    attrs.slice(0, 8).forEach(a => console.log(" A", a));
  }
}
