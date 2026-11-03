const fs = require("fs");
for (const file of ["index.html", "newsroom.html", "sl8.html", "wallet.html", "paid-content.html", "rwa.html", "built-on-stellar.html", "team.html"]) {
  const html = fs.readFileSync(file, "utf8");
  const srcs = new Set();
  const re = /<(?:img|iframe)\b[^>]*(?:src|srcset)="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) {
    const s = m[1];
    if (/screen|Cassator|sl8|stellar|Stellar|jpg|avif|webp|png/i.test(s)) srcs.add(s.slice(0, 180));
  }
  console.log("\n##", file);
  [...srcs].slice(0, 25).forEach((s) => console.log(s));
}
