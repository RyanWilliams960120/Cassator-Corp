const fs = require("fs");
const path = require("path");
function walk(dir, out = []) {
  for (const n of fs.readdirSync(dir)) {
    if (n === "mirror" || n === "node_modules") continue;
    const p = path.join(dir, n);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (n.endsWith(".html")) out.push(p);
  }
  return out;
}
let roadmap = 0;
let investorsLeft = 0;
for (const f of walk(".")) {
  const html = fs.readFileSync(f, "utf8");
  const tags = html.match(/<a\b[^>]*href="\/investors"[^>]*>[\s\S]*?<\/a>/g) || [];
  for (const tag of tags) {
    const text = tag.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    investorsLeft++;
    if (text === "Roadmap") roadmap++;
    else console.log("investors link", f, text.slice(0, 80));
  }
}
console.log("remaining /investors anchors", investorsLeft, "still labeled Roadmap", roadmap);
const home = fs.readFileSync("index.html", "utf8");
const i = home.indexOf('id="roadmap"');
console.log("roadmap id", i > 0);
console.log("notice before vision", home.indexOf("has not announced a token launch") < home.indexOf('class="vision u-section"'));
console.log("phases", [...home.matchAll(/<h3 class="u-text-style-h4 hero">([^<]+)/g)].map((m) => m[1]));
const article = fs.readFileSync("newsroom/the-rwa-tokenization-of-human-potential-a-new-concept-in-the-digital-economy.html", "utf8");
const idx = article.indexOf("built on Ethereum");
console.log("\nRWA CLAIM", idx, article.slice(Math.max(0, idx - 180), idx + 220).replace(/<[^>]+>/g, ""));
