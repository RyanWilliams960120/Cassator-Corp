const fs = require("fs");
const html = fs.readFileSync("documentation/responsible-disclosure.html", "utf8");
const i = html.indexOf("bug-bounty");
console.log(html.slice(i - 80, i + 400));
console.log("old logo", html.includes("Cassator_Logotype"));
console.log("new logo", html.includes("erax-logotype"));
console.log("linkedin", html.includes("linkedin.com/company/erax-digital"));
console.log("sl8 icon", html.includes("M153.001 170.001"));
