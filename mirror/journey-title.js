const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf("Our journey");
console.log(html.slice(i - 100, i + 450).replace(/></g, ">\n<"));
