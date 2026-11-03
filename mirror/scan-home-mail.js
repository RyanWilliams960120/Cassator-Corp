const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const needle = "mailto:contact@erax.digital";
let i = 0;
let n = 0;
while ((i = html.indexOf(needle, i)) !== -1) {
  n++;
  const start = html.lastIndexOf("<a ", i);
  const end = html.indexOf("</a>", i) + 4;
  console.log("\n---", n, "before ---");
  console.log(html.slice(Math.max(0, start - 280), start));
  i += needle.length;
}
console.log("count", n);
