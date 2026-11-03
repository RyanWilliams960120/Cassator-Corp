const fs = require("fs");
const html = fs.readFileSync("newsroom.html", "utf8");
const i = html.indexOf("For journalists");
console.log(html.slice(i, i + 900).replace(/\s+/g, " "));
