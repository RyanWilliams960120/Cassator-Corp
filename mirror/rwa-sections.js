const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8");
const re = /<section[^>]*class="([^"]*)"/g;
let m, n = 0;
while ((m = re.exec(html))) {
  n++;
  console.log(n, m[1].slice(0, 120));
}
console.log("sections", n);
const names = ["Michael Jackson", "LaunchYour", "Gold Eagle", "GoldEagle", "ascii_wrap", "class=\"ascii"];
for (const name of names) {
  console.log(name, html.split(name).length - 1);
}
