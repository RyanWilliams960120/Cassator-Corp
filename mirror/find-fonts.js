const fs = require("fs");
const h = fs.readFileSync("index.html", "utf8");
const re = /https:\/\/fonts\.googleapis\.com[^"']+/g;
let m;
while ((m = re.exec(h))) console.log(m[0]);
console.log("--- css vars in page ---");
const css = fs.readFileSync("css/erax-identity.css", "utf8");
console.log("identity mentions", (css.match(/font-family/g) || []).length);
