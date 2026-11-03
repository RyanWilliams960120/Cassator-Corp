const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf("journey_sticky");
console.log("sticky", i);
console.log(html.slice(i - 200, i + 400));
console.log("\n--- heading journey ---");
const h = html.indexOf("Foundation is complete");
console.log(html.slice(h - 800, h + 500));
console.log("\n--- platform innovation ---");
const p = html.indexOf(">Innovation<");
console.log(html.slice(p - 500, p + 900));
console.log("\n--- company blurbs ---");
for (const s of [
  "is an independent Web3 company",
  "is building the next generation",
  "products on this site",
  "Connect. Create.",
  "Own.",
]) {
  const k = html.indexOf(s);
  console.log("\n@", k, s);
  if (k > 0) console.log(html.slice(k - 180, k + s.length + 220).replace(/\n/g, " "));
}
