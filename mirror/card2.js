const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const a = html.indexOf('vision_card-list is--2');
const b = html.indexOf("Phase 5–6", a);
console.log(html.slice(a, b).replace(/<img[^>]*>/g, "[img]"));
