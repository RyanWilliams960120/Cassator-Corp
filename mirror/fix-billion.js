const fs = require("fs");
let html = fs.readFileSync("rwa.html", "utf8");
const re = /.{20}Billion.{20}/g;
let m;
while ((m = re.exec(html))) console.log(JSON.stringify(m[0]));
html = html.replace(/1(?:\s|\u2009|\u00a0)*Billion/g, "None");
fs.writeFileSync("rwa.html", html);
console.log("left", /Billion/.test(html));
