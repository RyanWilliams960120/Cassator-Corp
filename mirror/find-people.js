const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
let i = 0;
let n = 0;
while ((i = html.indexOf("but people", i)) !== -1 && n < 6) {
  console.log("\n---", n, i, "---\n" + html.slice(Math.max(0, i - 180), i + 220));
  i += 10;
  n++;
}
console.log("count", n);
