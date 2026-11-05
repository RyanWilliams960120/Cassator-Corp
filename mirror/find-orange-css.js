const fs = require("fs");
const css = fs.readFileSync("mirror/site.css", "utf8");
const re = /([^{}]+)\{[^}]*fa4c14[^}]*\}/gi;
let m;
let n = 0;
while ((m = re.exec(css))) {
  const sel = m[1].slice(-140);
  console.log("\n" + sel.replace(/\s+/g, " "));
  n++;
}
console.log("\nTOTAL", n);
