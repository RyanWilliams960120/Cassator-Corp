const fs = require("fs");
const html = fs.readFileSync("trust-center.html", "utf8");
const start = html.indexOf("principles_inner");
console.log(html.slice(start, start + 3500));
