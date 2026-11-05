const fs = require("fs");
const path = require("path");
const needles = [
  "text-span-34", "text-span-35", "text-span-36", "text-span-37", "text-span-38",
  "eyebrow-2", "original-article", "liqu-big", "liqu-small", "market_tabs",
  "how-it-works", "italic-text-2", "architecture_item is--accent", "is--accent eagle",
  "erax-eagle", "Cassator.avif", "FA4C14", "fa4c14", "phximg"
];
function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name === ".git") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
}
const files = [];
walk(".", files);
const counts = {};
for (const f of files) {
  const html = fs.readFileSync(f, "utf8");
  for (const n of needles) {
    if (html.includes(n)) {
      counts[n] = counts[n] || [];
      if (counts[n].length < 8) counts[n].push(f.replace(/\\/g, "/"));
      else if (counts[n].length === 8) counts[n].push("...");
    }
  }
}
console.log(JSON.stringify(counts, null, 2));
