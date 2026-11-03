const fs = require("fs");
const path = require("path");
const buttons = fs.readFileSync("mirror/footer-contacts.html", "utf8");
function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name === ".git") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
}
const files = [];
walk(".", files);
let n = 0;
files.forEach((file) => {
  let html = fs.readFileSync(file, "utf8");
  const big = (html.match(/icon-42 big/g) || []).length;
  if (big !== 1 || !html.includes('aria-label="LinkedIn"')) return;
  const at = html.indexOf('aria-label="LinkedIn"');
  const aEnd = html.indexOf("</a>", at) + 4;
  const divEnd = html.indexOf("</div>", aEnd) + 6;
  html = html.slice(0, divEnd) + buttons + html.slice(divEnd);
  const tmp = file + ".tmpwrite";
  fs.writeFileSync(tmp, html);
  fs.renameSync(tmp, file);
  n++;
});
console.log("inserted", n);
const index = fs.readFileSync("index.html", "utf8");
console.log("big", (index.match(/icon-42 big/g) || []).length);
console.log("mailto", (index.match(/mailto:contact@erax.digital/g) || []).length);
