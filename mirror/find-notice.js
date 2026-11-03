const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf("infrastructure scalability.</p>");
console.log(html.slice(i, i + 180));
console.log("notice left", html.includes("completed foundational development milestones"));
