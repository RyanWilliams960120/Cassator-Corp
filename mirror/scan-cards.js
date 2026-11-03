const fs = require("fs");
const html = fs.readFileSync("trust-center.html", "utf8");
const re = /u-text-style-h3[^>]*>([^<]+)<\/h3><p class="u-paragraph-main[^"]*">([^<]*)<\/p>/g;
let m;
while ((m = re.exec(html))) console.log("CARD", m[1], "=>", m[2]);
const re2 = /documents_card[^>]*>[\s\S]{0,400}?u-text-style-h3[^>]*>([^<]+)<\/h3>[\s\S]{0,200}?<p[^>]*>([^<]*)/g;
while ((m = re2.exec(html))) console.log("DOC", m[1], "=>", m[2].replace(/\s+/g, " "));
const re3 = /<a href="([^"]+)" class="documents_card/g;
while ((m = re3.exec(html))) console.log("HREF", m[1]);
