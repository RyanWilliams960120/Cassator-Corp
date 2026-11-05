const fs = require("fs");
const html = fs.readFileSync("documentation/tokenomics.html", "utf8");
let i = 0;
let n = 0;
while ((i = html.indexOf("docs-lead", i)) !== -1 && n < 3) {
  console.log("\n---", i, "---\n", html.slice(i, i + 500));
  i += 8;
  n++;
}
const art = html.indexOf("docs-article");
console.log("\nARTICLE", art);
console.log(html.slice(art, art + 1800));
