const fs = require("fs");
const html = fs.readFileSync("mirror/index.html", "utf8");
const i = html.indexOf('class="footer_socials"');
const end = html.indexOf("</div></div><div", i + 20);
const slice = html.slice(i, i + 12000);
const re = /<a href="([^"]+)"[^>]*class="footer_social/g;
let m;
while ((m = re.exec(slice))) console.log(m[1]);
