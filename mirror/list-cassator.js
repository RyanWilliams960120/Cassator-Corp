const fs = require("fs");
const path = require("path");

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "mirror" || name === "node_modules" || name === ".git") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(html|css|js|svg)$/i.test(name)) out.push(p);
  }
  return out;
}

const files = walk(".");
const hits = new Map();
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const re = /[^"'<>\s]{0,40}[Cc]assator[^"'<>\s]{0,40}/g;
  let m;
  while ((m = re.exec(text))) {
    const s = m[0].replace(/\s+/g, " ");
    const key = s;
    if (!hits.has(key)) hits.set(key, new Set());
    hits.get(key).add(file.replace(/\\/g, "/"));
  }
}
const rows = [...hits.entries()].sort((a, b) => a[0].localeCompare(b[0]));
for (const [s, fileset] of rows) {
  console.log(s);
  console.log("  " + [...fileset].slice(0, 4).join(", ") + (fileset.size > 4 ? ` +${fileset.size - 4}` : ""));
}
console.log("--- unique", rows.length);
