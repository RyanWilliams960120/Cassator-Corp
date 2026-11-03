const fs = require("fs");
const html = fs.readFileSync("trust-center.html", "utf8");
const i = html.indexOf("Report an Issue");
const j = html.indexOf("clickable", i);
console.log(html.slice(j - 80, j + 200));
