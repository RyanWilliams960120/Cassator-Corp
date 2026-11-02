const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
let i = 0, n = 0;
while ((i = html.indexOf("RWA", i)) >= 0 && n < 6) {
  console.log(html.slice(i - 90, i + 80).replace(/\s+/g, " "));
  console.log("---");
  i += 3; n++;
}
