const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf("Not companies");
console.log(html.slice(i - 120, i + 900));
