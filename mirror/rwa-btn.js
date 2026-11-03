const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8");
const i = html.indexOf("Become an Investor");
console.log(html.slice(i - 700, i + 500).replace(/\s+/g, " ").slice(0, 1500));
