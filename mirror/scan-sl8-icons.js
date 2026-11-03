const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const re = /<a href="\/sl8" target="_blank" class="footer_social[\s\S]*?<\/a>/g;
let m, n = 0;
while ((m = re.exec(html))) {
  n++;
  const paths = m[0].match(/<path d="[^"]{0,80}/g) || [];
  console.log("\n#", n, "len", m[0].length);
  paths.forEach((p) => console.log(p));
}
console.log("count", n);
