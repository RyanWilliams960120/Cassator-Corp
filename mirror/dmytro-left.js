const fs = require("fs");
const html = fs.readFileSync("investors.html", "utf8");
let i = 0;
let n = 0;
while ((i = html.indexOf("Dmytro", i)) !== -1) {
  n++;
  console.log("\n---", n, i);
  console.log(html.slice(i - 180, i + 220).replace(/\s+/g, " "));
  i += 6;
}
