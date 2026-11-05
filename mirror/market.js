const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8");
let i = 0, n = 0;
while ((i = html.indexOf("supported assets", i)) !== -1 && n < 6) {
  console.log("\n@" + i + "\n" + html.slice(i - 220, i + 260).replace(/\s+/g, " "));
  i += 10;
  n++;
}
console.log("\nAPY files");
for (const f of ["index.html", "wallet.html", "sl8.html", "paid-content.html", "trust-center.html"]) {
  const h = fs.readFileSync(f, "utf8");
  let j = 0, c = 0;
  while ((j = h.toLowerCase().indexOf("apy", j)) !== -1 && c < 2) {
    console.log(f, h.slice(j - 60, j + 80).replace(/\s+/g, " "));
    j += 3;
    c++;
  }
}
