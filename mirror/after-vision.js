const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf("Phase 5–6");
const j = html.indexOf("To create a connected digital world", i);
console.log(html.slice(i, j).replace(/<img[^>]*>/g, "[img]").replace(/<svg[\s\S]*?<\/svg>/g, "[svg]").slice(0, 2500));
