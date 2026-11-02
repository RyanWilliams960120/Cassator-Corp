const fs = require("fs");
const html = fs.readFileSync("trust-center/privacy-policy.html", "utf8");
const i = html.indexOf("Our Principle");
console.log(html.slice(i - 400, i + 80));
const j = html.lastIndexOf("privacy@erax");
console.log("\nEND AREA", html.slice(j - 200, j + 80));
