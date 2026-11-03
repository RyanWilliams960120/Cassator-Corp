const fs = require("fs");
const html = fs.readFileSync("trust-center.html", "utf8");
const i = html.indexOf("Report an Issue");
console.log(html.slice(i, i + 1200));
