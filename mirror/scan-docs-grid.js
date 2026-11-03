const fs = require("fs");
const html = fs.readFileSync("trust-center.html", "utf8");
const i = html.indexOf('class="documents_grid"');
const slice = html.slice(i, i + 6000);
const plain = slice.replace(/<[^>]+>/g, "\n").replace(/&amp;/g, "&").split("\n").map(s => s.trim()).filter(Boolean);
console.log(plain.join("\n"));
console.log("\n--- hero ---");
const h = html.indexOf("Trust Center");
console.log(html.slice(html.indexOf("u-text-style-h1"), html.indexOf("u-text-style-h1") + 900).replace(/<[^>]+>/g, " | "));
