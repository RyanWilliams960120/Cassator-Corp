const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf('class="footer_socials"');
console.log("footer_socials", i);
console.log(html.slice(i, i + 4500));
console.log("\n\n==== CONTACT HEADER ====\n");
const j = html.indexOf('class="nav_contuct"');
console.log(html.slice(j, j + 800));
