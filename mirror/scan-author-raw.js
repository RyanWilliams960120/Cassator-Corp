const fs = require("fs");
const html = fs.readFileSync("newsroom.html", "utf8");
const i = html.indexOf("author-short");
console.log(html.slice(i - 80, i + 450));
