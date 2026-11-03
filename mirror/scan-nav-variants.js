const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
function around(label) {
  const i = html.indexOf(label);
  console.log("\n====", label, i, "====");
  console.log(html.slice(Math.max(0, i - 220), i + label.length + 80).replace(/\n/g, ""));
}
around('<a href="/team" class="nav_link">Careers</a>');
around('<a aria-label="Careers" href="/team"');
around('<a href="/team" class="footer_link u-paragraph-small">Careers</a>');
const files = fs.readdirSync(".").filter((n) => n.endsWith(".html"));
const docs = fs.existsSync("documentation") ? fs.readdirSync("documentation").filter((n) => n.endsWith(".html")).length : 0;
let pages = 0;
let variants = {};
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = dir + "/" + name;
    if (fs.statSync(p).isDirectory()) {
      if (name === "node_modules" || name === "mirror") continue;
      walk(p);
    } else if (name.endsWith(".html")) {
      pages++;
      const text = fs.readFileSync(p, "utf8");
      const found = text.match(/<a[^>]*href="\/team"[^>]*>[^<]*<\/a>/g) || [];
      found.forEach((a) => { variants[a] = (variants[a] || 0) + 1; });
    }
  }
}
walk(".");
console.log("\nhtml pages", pages, "doc html", docs);
console.log(variants);
