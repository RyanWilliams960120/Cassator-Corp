const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
let i = 0, n = 0;
while ((i = html.indexOf("but people", i)) >= 0 && n < 5) {
  console.log("\n", i, html.slice(i - 60, i + 80).replace(/\s+/g, " "));
  i += 10; n++;
}
