const fs = require("fs");
const html = fs.readFileSync("newsroom/can-crypto-finally-solve-the-paying-for-the-internet-problem.html", "utf8");
const i = html.indexOf("Thestreet");
console.log(html.slice(i - 200, i + 80).replace(/\s+/g, " "));
console.log("placeholder", html.includes("image-placeholder"), "ownership", html.includes("company-ownership"));
