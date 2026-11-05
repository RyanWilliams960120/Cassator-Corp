const fs = require("fs");
const html = fs.readFileSync("paid-content.html", "utf8");
const i = html.indexOf('class="button_main_text"></div>');
console.log(html.slice(i + 600, i + 1400).replace(/\s+/g, " "));
