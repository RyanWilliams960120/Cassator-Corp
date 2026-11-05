const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf('class="nav_link">Whitepaper</a>');
console.log(html.slice(i - 700, i + 500));
console.log("\n\nCOUNT whitepaper href", (html.match(/href="\/whitepaper"/g) || []).length);
console.log("COUNT Documentation nav", (html.match(/Documentation<\/a>/g) || []).length);
