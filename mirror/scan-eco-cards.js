const fs = require("fs");
const html = fs.readFileSync("built-on-stellar.html", "utf8");
const re = /class="ecosystem_tag">([^<]+)<\/div><h3 class="title-22">([^<]*)</g;
let m;
while ((m = re.exec(html))) console.log(m[1], "|", m[2].slice(0, 80));
