const fs = require("fs");
const html = fs.readFileSync("newsroom.html", "utf8");
const i = html.indexOf("Press Contact");
const j = html.indexOf("href=", i);
console.log(html.slice(j, j + 120));
