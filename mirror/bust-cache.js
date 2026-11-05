const fs = require("fs");
const path = require("path");
function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror") continue;
    const full = path.join(dir, name);
    let st;
    try { st = fs.statSync(full); } catch (e) { continue; }
    if (st.isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
}
const files = [];
walk(".", files);
let n = 0;
files.forEach((file) => {
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes("erax-identity.css?v=9")) return;
  fs.writeFileSync(file, html.replace(/erax-identity\.css\?v=9/g, "erax-identity.css?v=10"));
  n++;
});
console.log("updated", n);
