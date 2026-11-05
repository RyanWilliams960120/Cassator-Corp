const fs = require("fs");
const path = require("path");
function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name.endsWith(".tmpwrite")) continue;
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
const failed = [];
files.forEach((file) => {
  let html;
  try { html = fs.readFileSync(file, "utf8"); } catch (e) { failed.push(file + " read"); return; }
  if (!html.includes("erax-identity.css?v=3") && !html.includes("erax-atmosphere.js?v=3")) return;
  const next = html
    .replace(/erax-identity\.css\?v=3/g, "erax-identity.css?v=4")
    .replace(/erax-atmosphere\.js\?v=3/g, "erax-atmosphere.js?v=4");
  try {
    fs.writeFileSync(file, next);
    n++;
  } catch (e) {
    failed.push(file + " " + e.code);
  }
});
try { fs.unlinkSync("built-on-stellar.html.tmpwrite"); } catch (e) {}
console.log("updated", n, "failed", failed.join(" | "));
