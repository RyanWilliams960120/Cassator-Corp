const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
const i = html.indexOf("Co-Founder");
console.log(html.slice(i - 120, i + 220));
console.log("---count", html.split(">Co-Founder<").length - 1);
console.log("---CTO", html.split(">CTO<").length - 1);
