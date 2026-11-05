const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const needle = "w--current\">Roadmap</a>";
let i = 0;
let n = 0;
while ((i = html.indexOf(needle, i)) >= 0 && n < 4) {
  console.log("\n---", n);
  console.log(html.slice(i - 360, i + needle.length));
  i += needle.length;
  n++;
}
