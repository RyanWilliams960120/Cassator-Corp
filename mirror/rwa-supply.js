const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8");
let i = 0, n = 0;
while ((i = html.indexOf("supply", i)) !== -1 && n < 8) {
  console.log("\n" + html.slice(i - 40, i + 80).replace(/\s+/g, " "));
  i += 6;
  n++;
}
console.log("\nGOLD LEFT", (html.match(/Gold Eagle|GoldEagle|Michael Jackson/g) || []).length);
