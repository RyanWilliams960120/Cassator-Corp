const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf("title-row");
console.log(html.slice(i, i + 500));
