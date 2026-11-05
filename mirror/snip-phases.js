const fs = require("fs");
const home = fs.readFileSync("index.html", "utf8");
const re = /<h3 class="u-text-style-h4 hero">([^<]+)<\/h3><p class="u-paragraph-main-hero">([\s\S]*?)<\/p>/g;
let m;
let n = 0;
while ((m = re.exec(home))) {
  n++;
  console.log("\n#" + n, m[1]);
  console.log(m[2].replace(/<[^>]+>/g, "").slice(0, 280));
}
console.log("count", n);
const inv = fs.readFileSync("investors.html", "utf8");
const re2 = /<h3 class="u-text-style-h4 hero">([^<]+)<\/h3>/g;
let c = 0;
while ((m = re2.exec(inv))) {
  c++;
  console.log("investors", m[1]);
}
console.log("investors count", c);
