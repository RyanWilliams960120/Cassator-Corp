const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
const i = html.indexOf('class="nav_link">Roadmap');
console.log(html.slice(i - 500, i + 180));
console.log("\n\n==== TRUST ====\n");
const j = html.indexOf('href="/trust-center" class="nav_link"');
console.log(html.slice(j - 400, j + 250));
console.log("\n\n==== FILES ====");
function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name === ".git") continue;
    const p = dir + "/" + name;
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
}
const files = [];
walk(".", files);
const needle = 'href="/trust-center" class="nav_link">Trust Center</a></div><div class="nav_link-wrp is--cont">';
const foot = 'class="footer_link u-paragraph-small">Roadmap</a>';
for (const f of files) {
  const t = fs.readFileSync(f, "utf8");
  console.log(f, "nav", t.includes(needle), "foot", (t.split(foot).length - 1));
}
