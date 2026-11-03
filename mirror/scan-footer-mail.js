const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const s = html.indexOf('class="footer_socials"');
const chunk = html.slice(s, s + 12000);
const end = chunk.indexOf("footer_bottom");
console.log(chunk.slice(0, end > 0 ? end + 200 : 2000));
console.log("\n\nlen to footer_bottom", end);
