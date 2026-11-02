const fs = require("fs");
const html = fs.readFileSync("trust-center/privacy-policy.html", "utf8");
const i = html.indexOf("w-richtext");
console.log(html.slice(i - 200, i + 250));
console.log("\ncount", (html.match(/w-richtext/g) || []).length);
