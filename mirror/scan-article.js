const fs = require("fs");
const html = fs.readFileSync("documentation/responsible-disclosure.html", "utf8");
const i = html.indexOf("docs-article");
console.log("article", i);
const j = html.indexOf("How to report");
console.log("how", j);
console.log(html.slice(j, j + 500).replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
