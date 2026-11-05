const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf('class="vision_card"');
console.log(html.slice(i, i + 3500).replace(/<img[^>]*>/g, ""));
