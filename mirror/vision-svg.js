const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf("vision_visual-pc");
console.log(html.slice(i, i + 700).replace(/\s+/g, " "));
console.log("\nicon count", (html.match(/6a0841ede71127a317dcdc45_Rectangle%2014\.svg/g) || []).length);
