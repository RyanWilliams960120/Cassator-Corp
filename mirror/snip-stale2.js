const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf("Planned products.");
console.log(html.slice(i, i + 700));
const j = html.indexOf("Foundation is complete.");
console.log("\n\n", html.slice(j - 200, j + 400));
