const fs = require("fs");
const path = require("path");
let index = fs.readFileSync("index.html", "utf8");
if (!index.includes('src="/assets/erax-eagle.png"')) throw new Error("eagle src missing");
index = index.replace('src="/assets/erax-eagle.png"', 'src="/assets/erax-logo.svg"');
index = index.replace(/erax-identity\.css\?v=\d+/g, "erax-identity.css?v=9");
fs.writeFileSync("index.html", index);
console.log("index logo", index.includes('id="CTA" class="cta u-section"><img src="/assets/erax-logo.svg"'));

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror") continue;
    const full = path.join(dir, name);
    let st;
    try { st = fs.statSync(full); } catch (e) { continue; }
    if (st.isDirectory()) walk(full, out);
    else if (name.endsWith(".html") && full !== "index.html") out.push(full);
  }
}
const files = [];
walk(".", files);
let n = 0;
files.forEach((file) => {
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes("erax-identity.css?v=")) return;
  const next = html.replace(/erax-identity\.css\?v=\d+/g, "erax-identity.css?v=9");
  if (next !== html) {
    fs.writeFileSync(file, next);
    n++;
  }
});
console.log("css", n);
