const fs = require("fs");
const html = fs.readFileSync("investors.html", "utf8");
const i = html.indexOf("550");
console.log("idx", i);
console.log(html.slice(i - 80, i + 120).replace(/\s+/g, " "));
const CLAIM = /already live|550,000/;
console.log("test", CLAIM.test(html));
