const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf('class="footer_socials"');
console.log(html.slice(i - 40, i + 900).replace(/\s+/g, " "));
console.log("\nsl8 product links", (html.match(/href="\/sl8"/g) || []).length);
console.log("linkedin", (html.match(/linkedin.com\/company\/erax-digital/g) || []).length);
console.log("contact buttons", (html.match(/mailto:contact@erax.digital/g) || []).length);
