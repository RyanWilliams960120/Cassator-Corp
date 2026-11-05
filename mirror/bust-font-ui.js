const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}
let n = 0;
for (const file of walk(root, [])) {
  const html = fs.readFileSync(file, "utf8");
  const next = html.replaceAll("/css/erax-identity.css?v=14", "/css/erax-identity.css?v=15");
  if (next !== html) {
    fs.writeFileSync(file, next);
    n += 1;
  }
}
console.log("updated", n);
