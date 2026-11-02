const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf("year-text");
console.log(html.slice(i - 200, i + 900).replace(/></g, ">\n<"));
