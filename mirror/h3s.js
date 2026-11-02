const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const re = /<h3 class="u-text-style-h4">([\s\S]*?)<\/h3>/g;
let m, n = 0;
while ((m = re.exec(html)) && n < 40) {
  const t = m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  console.log(n, t.slice(0, 140));
  n++;
}
