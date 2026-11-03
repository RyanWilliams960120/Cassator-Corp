const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
const i = html.indexOf('data-position="Product Manager');
const j = html.indexOf("clickable_btn", i);
console.log(html.slice(j - 200, j + 180).replace(/\s+/g, " "));
console.log("\n--- popup class ---");
const p = html.indexOf("position_popup");
console.log(html.slice(p, p + 200).replace(/\s+/g, " "));
