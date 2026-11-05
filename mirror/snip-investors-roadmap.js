const fs = require("fs");
const html = fs.readFileSync("investors.html", "utf8");
let i = 0;
let n = 0;
while ((i = html.indexOf("Roadmap", i)) >= 0 && n < 8) {
  console.log("\n", n, html.slice(i - 120, i + 40).replace(/\s+/g, " "));
  i += 7;
  n++;
}
