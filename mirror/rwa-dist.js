const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8");
const i = html.indexOf("in development");
console.log(JSON.stringify(html.slice(i - 180, i + 40)));
