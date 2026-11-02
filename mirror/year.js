const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf("Founders");
console.log(html.slice(i - 500, i + 200).replace(/></g, ">\n<"));
