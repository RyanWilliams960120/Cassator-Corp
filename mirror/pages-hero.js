const fs = require("fs");
const files = [
  "sl8.html","rwa.html","wallet.html","paid-content.html","investors.html",
  "team.html","built-on-stellar.html","newsroom.html","trust-center.html",
  "newsroom/the-future-of-human-capital-as-an-asset-class.html"
];
for (const f of files) {
  const html = fs.readFileSync(f, "utf8");
  const main = html.indexOf("<main");
  const text = html.slice(main, main + 12000)
    .replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&nbsp;/g, " ");
  const lines = text.split("\n").map(s => s.replace(/\s+/g, " ").trim())
    .filter(s => s && s.length > 18 && s.length < 220 && !/^[A-Z0-9]{10,}$/.test(s));
  console.log("\n====", f);
  console.log(lines.slice(0, 28).join("\n"));
}
