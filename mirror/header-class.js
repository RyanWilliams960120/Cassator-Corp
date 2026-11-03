const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
const i = html.indexOf("<header");
console.log(html.slice(i, i + 180));
