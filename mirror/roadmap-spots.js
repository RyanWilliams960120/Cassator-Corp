const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
let i = 0;
let n = 0;
while ((i = html.indexOf(">Roadmap<", i)) !== -1 && n < 12) {
  n++;
  console.log("\n#" + n, i);
  console.log(html.slice(i - 160, i + 30).replace(/\s+/g, " "));
  i += 8;
}
console.log("\n\nFOOTER COLUMN");
const f = html.indexOf("footer_link u-paragraph-small");
console.log(html.slice(f - 400, f + 900).replace(/\s+/g, " "));
