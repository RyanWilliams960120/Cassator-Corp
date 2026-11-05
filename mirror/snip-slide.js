const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const start = html.indexOf('class="swiper-wrapper gallery_slider');
const end = html.indexOf("u-text-style-h2 is--gallery is--2", start);
console.log(html.slice(start, start + 900));
console.log("\n---END HEAD---\n");
console.log(html.slice(end - 400, end));
