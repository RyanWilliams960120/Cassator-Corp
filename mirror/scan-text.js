const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf(">Open roles</h2>");
console.log(html.slice(i - 500, i + 900).replace(/\s+/g, " ").slice(0, 1400));
