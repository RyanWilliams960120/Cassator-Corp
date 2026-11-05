const fs = require("fs");
const path = require("path");
const labels = new Map();
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "mirror" || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) {
      const html = fs.readFileSync(full, "utf8");
      const re = /<aside class="docs-callout"><strong>([^<]*)<\/strong>/g;
      let m;
      while ((m = re.exec(html))) labels.set(m[1], (labels.get(m[1]) || 0) + 1);
    }
  }
}
walk(path.join(__dirname, ".."));
for (const [k, n] of labels) console.log(n, k);
