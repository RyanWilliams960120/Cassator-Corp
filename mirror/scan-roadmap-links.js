const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const found = new Map();
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "mirror" || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html") || entry.name.endsWith(".js")) {
      const html = fs.readFileSync(full, "utf8");
      const re = /<a\b[^>]*>Roadmap<\/a>/g;
      let m;
      while ((m = re.exec(html))) {
        const key = m[0];
        found.set(key, (found.get(key) || 0) + 1);
      }
    }
  }
}
walk(root);
for (const [k, n] of found) console.log(n, k);
