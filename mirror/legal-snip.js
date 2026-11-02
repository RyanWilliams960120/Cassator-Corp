const fs = require("fs");
const html = fs.readFileSync("trust-center/privacy-policy.html", "utf8");
const i = html.indexOf("registered in the State");
console.log(html.slice(i - 120, i + 700).replace(/<[^>]+>/g, " "));
