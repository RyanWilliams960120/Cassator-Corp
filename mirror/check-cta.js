const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf("/assets/erax-eagle.png");
console.log(html.slice(i - 80, i + 220));
console.log("exists", fs.existsSync("assets/erax-eagle.png"), fs.statSync("assets/erax-eagle.png").size);
console.log("favicon", fs.existsSync("assets/erax-favicon.png"), fs.statSync("assets/erax-favicon.png").size);
