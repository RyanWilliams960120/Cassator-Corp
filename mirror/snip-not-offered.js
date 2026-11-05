const fs = require("fs");
const html = fs.readFileSync("wallet.html", "utf8");
const needle = ">Not offered<";
let i = 0;
let n = 0;
while ((i = html.indexOf(needle, i)) >= 0 && n < 8) {
  console.log("\n#" + n, html.slice(Math.max(0, i - 220), i + 30).replace(/\s+/g, " "));
  i += needle.length;
  n++;
}
