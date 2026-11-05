const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
const i = html.indexOf("Accountability");
console.log(html.slice(i - 120, i + 220).replace(/\s+/g, " "));
