const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
const i = html.indexOf("Dmytro Ivanov");
console.log(html.slice(i - 250, i + 500).replace(/></g, ">\n<").slice(0, 1500));
