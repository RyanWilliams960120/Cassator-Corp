const fs = require("fs");
const home = fs.readFileSync("index.html", "utf8");
const i = home.indexOf('class="year-text"');
console.log(home.slice(i - 500, i + 900));
