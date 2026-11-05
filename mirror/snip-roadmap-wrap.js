const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf('<a href="/#roadmap" class="nav_link">Roadmap</a>');
console.log(html.slice(i - 280, i + 80));
console.log("\n--- current page variant ---");
const html2 = fs.readFileSync("documentation.html", "utf8");
const j = html2.indexOf("Roadmap</a>");
console.log(html2.slice(j - 320, j + 40));
