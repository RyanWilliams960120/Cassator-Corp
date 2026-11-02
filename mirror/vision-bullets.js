const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const start = html.indexOf('<div class="vision_card">');
const end = html.indexOf("Careers", start);
const chunk = html.slice(start, end);
const cards = chunk.split('<div class="vision_card');
cards.forEach((c, i) => {
  if (!c.includes("vision_card-li") && i === 0) return;
  const title = (c.match(/<h3[^>]*>([^<]+)/) || [])[1];
  const bullets = [...c.matchAll(/<p class="u-paragraph-small m-12">([^<]*)/g)].map(m => m[1]);
  console.log("\nCARD", i, title, "bullets", bullets.length);
  bullets.forEach((b, n) => console.log(n, b));
});
