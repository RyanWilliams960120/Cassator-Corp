const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
const i = html.indexOf("Yaroslav%20Boichuk.jpg");
console.log(html.slice(i - 80, i + 900));
