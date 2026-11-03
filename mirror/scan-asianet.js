const fs = require("fs");
const html = fs.readFileSync("newsroom.html", "utf8");
const i = html.indexOf("asianetlogofooter");
console.log(html.slice(i - 250, i + 200).replace(/\s+/g, " "));
