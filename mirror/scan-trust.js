const fs = require("fs");
const html = fs.readFileSync("trust-center.html", "utf8");
const re = /<h[1-4][^>]*>([^<]+)</g;
let m, n = 0;
while ((m = re.exec(html)) && n < 40) {
  console.log(m[1]);
  n++;
}
console.log("--- paragraphs sample ---");
const p = /<p class="u-paragraph-main[^"]*">([^<]{0,180})/g;
n = 0;
while ((m = p.exec(html)) && n < 20) { console.log("-", m[1]); n++; }
