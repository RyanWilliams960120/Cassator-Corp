const fs = require("fs");
const lib = fs.readFileSync("docs/library.js", "utf8");
const i = lib.indexOf("responsible-disclosure");
console.log(lib.slice(i, i + 700));
const html = fs.readFileSync("documentation/responsible-disclosure.html", "utf8");
const j = html.indexOf("vulnerability");
console.log("\nHTML", j);
console.log(html.slice(j, j + 300));
