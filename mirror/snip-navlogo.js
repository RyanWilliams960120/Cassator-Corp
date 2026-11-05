const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf('class="nav_logo');
console.log(html.slice(i - 80, i + 900));
console.log("\n\n---- pages with css ----");
const path = require("path");
function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (name === "node_modules" || name === "mirror") continue;
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
}
const files = [];
walk(".", files);
let css = 0, body = 0;
files.forEach((f) => {
  const h = fs.readFileSync(f, "utf8");
  if (h.includes("cassator-corp.webflow")) css++;
  if (h.includes("</body>")) body++;
});
console.log("html", files.length, "with webflow css", css, "with body", body);
