const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8");
const i = html.indexOf("EraX Social Platform");
console.log(html.slice(i - 200, i + 900));
console.log("\n\n==== BILLION ====");
const j = html.indexOf("1 Billion");
console.log(html.slice(j - 250, j + 400));
