const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
const main = html.slice(html.indexOf("<main"));
const pos = [...main.matchAll(/team-item is--jet">([^<]+)/g)].map(m => m[1]);
console.log(pos);
const form = html.indexOf("JOIN");
console.log("\nFORM", html.slice(form - 80, form + 200));
