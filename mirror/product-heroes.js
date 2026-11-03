const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const files = ["sl8.html", "wallet.html", "paid-content.html", "rwa.html", "investors.html"];
for (const f of files) {
  const h = fs.readFileSync(f, "utf8");
  const m = h.match(/<h1[\s\S]{0,400}|class="[^"]*hero[^"]*"[\s\S]{0,200}/);
  const texts = h
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, "\n")
    .split("\n")
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter((s) => /EraX (Social|Wallet|Creator|Assets)|planned|future|operational|not a live|not available/i.test(s) && s.length < 320 && s.length > 30);
  console.log("\n## " + f);
  console.log([...new Set(texts)].slice(0, 8).join("\n"));
}
const v = html.indexOf('class="vision_card"');
console.log("\n\nVISION CARD START", html.slice(v, v + 1800));
