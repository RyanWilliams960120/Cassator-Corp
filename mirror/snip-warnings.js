const fs = require("fs");
const html = fs.readFileSync("documentation/tokenomics.html", "utf8");
const i = html.indexOf("<h1>Tokenomics</h1>");
console.log(html.slice(i, i + 1800));
console.log("\n\n---- UNIQUE BANNERS ----");
const files = ["wallet.html", "paid-content.html", "rwa.html", "sl8.html", "built-on-stellar.html", "investors.html", "index.html"];
const set = new Set();
files.forEach(function (file) {
  const text = fs.readFileSync(file, "utf8");
  const re = /[^<]{0,80}(not an offer|Not a deployment|not a live product|Not offered|not for sale)[^<]{0,80}/gi;
  let m;
  while ((m = re.exec(text))) set.add(file + " :: " + m[0].replace(/\s+/g, " "));
});
[...set].slice(0, 40).forEach((line) => console.log(line));
