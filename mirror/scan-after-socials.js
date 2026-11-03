const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf('class="footer_socials"');
const after = html.slice(i, i + 2500);
const end = after.lastIndexOf("</a>");
console.log(html.slice(i + end, i + end + 800).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 500));
console.log("--- mailto count", (html.match(/mailto:/g) || []).length);
console.log(html.match(/mailto:[^"']+/g));
