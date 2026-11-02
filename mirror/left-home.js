const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const re = /Sl8|SL8|Stellar|App Store|Google Play|Web Version|Meet the team|Learn about|CBDC|Go to /g;
let m, n = 0;
while ((m = re.exec(html)) && n < 40) {
  const s = html.slice(Math.max(0, m.index - 70), m.index + 80).replace(/\s+/g, " ");
  if (/cassator-corp|cassator-preloader|cassator-loaded|Logotype|data-wf-domain/.test(s)) { n++; continue; }
  console.log(n, s);
  n++;
}
