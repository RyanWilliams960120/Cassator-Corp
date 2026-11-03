const fs = require("fs");
const path = require("path");
function walk(dir, out = []) {
  for (const n of fs.readdirSync(dir)) {
    if (n === "mirror" || n === "node_modules") continue;
    const p = path.join(dir, n);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (n.endsWith(".html")) out.push(p);
  }
  return out;
}
for (const f of walk(".")) {
  const html = fs.readFileSync(f, "utf8");
  const texts = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, "\n")
    .split("\n")
    .map((s) => s.replace(/\s+/g, " ").trim());
  const hits = texts.filter((s) =>
    /EraX Social|EraX Wallet|EraX Creator|EraX Assets|built by|is built|platform built/i.test(s) &&
    s.length > 80 &&
    s.length < 700
  );
  if (!hits.length) continue;
  if (!/newsroom|rwa|investors|paid|sl8|wallet|index/.test(f)) continue;
  console.log("\n## " + f);
  for (const h of [...new Set(hits)]) console.log("- " + h);
}
