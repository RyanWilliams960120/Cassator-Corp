const fs = require("fs");
const html = fs.readFileSync(
  "newsroom/the-rwa-tokenization-of-human-potential-a-new-concept-in-the-digital-economy.html",
  "utf8"
);
const i = html.indexOf("built on Ethereum");
console.log(html.slice(i - 250, i + 350));
console.log("\n\nINVESTORS HERO");
const inv = fs.readFileSync("investors.html", "utf8");
const j = inv.indexOf("Proposed roadmap");
console.log(inv.slice(j - 80, j + 700));
