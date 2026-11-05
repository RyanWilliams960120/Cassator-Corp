const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf(">Positioning<");
console.log(html.slice(i - 80, i + 1600).replace(/<img[^>]*>/g, ""));
