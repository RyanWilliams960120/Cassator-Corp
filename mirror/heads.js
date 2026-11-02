const fs = require("fs");
function headings(file) {
  const html = fs.readFileSync(file, "utf8");
  const main = html.slice(html.indexOf("<main"));
  const re = /<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/g;
  let m, n = 0;
  console.log("\n==", file);
  while ((m = re.exec(main)) && n < 25) {
    const t = m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (t) { console.log(n, t.slice(0, 160)); n++; }
  }
}
["team.html","rwa.html","investors.html","trust-center.html","sl8.html","wallet.html","paid-content.html","built-on-stellar.html"].forEach(headings);
