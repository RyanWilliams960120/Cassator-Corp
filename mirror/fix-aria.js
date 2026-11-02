const fs = require("fs");
const path = require("path");
function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (["mirror", "node_modules", ".git"].includes(name)) continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}
const pairs = [
  ['aria-label="Go to Sl8"', 'aria-label="Ecosystem"'],
  ['aria-label="Learn about the Sl8 platform"', 'aria-label="Explore the ecosystem"'],
  ['aria-label="Meet the team"', 'aria-label="Careers"'],
  ['aria-label="App Store"', 'aria-label="EraX Social"'],
  ['aria-label="Google Play"', 'aria-label="EraX Wallet"'],
  ['aria-label="Web Version"', 'aria-label="EraX Creator"'],
  ['aria-label="Open Sl8"', 'aria-label="Ecosystem"'],
  ["https://t.me/Sl8_Community", "/newsroom"],
  ["<strong>CBDCs</strong> of <br/>countries that have moved from pilot to production are launched", ""],
  [">RWA<", ">Assets<"],
];
for (const file of walk(".")) {
  let html = fs.readFileSync(file, "utf8");
  const orig = html;
  for (const [a, b] of pairs) html = html.split(a).join(b);
  if (html !== orig) {
    fs.writeFileSync(file, html);
    console.log(path.basename(file));
  }
}
