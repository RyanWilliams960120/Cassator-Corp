const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf("Not a completed milestone");
console.log(html.slice(i - 80, i + 1800));
console.log("\n\n==== VISION BULLETS RAW ====");
const v = html.indexOf(">Phase 1–2<");
console.log(html.slice(v - 120, v + 2200).replace(/<img[^>]*>/g, ""));
