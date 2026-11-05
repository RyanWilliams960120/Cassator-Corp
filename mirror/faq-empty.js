const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8");
const i = html.indexOf("Frequently asked");
console.log(html.slice(i, i + 1800).replace(/<svg[\s\S]*?<\/svg>/g, "").replace(/\s+/g, " "));
