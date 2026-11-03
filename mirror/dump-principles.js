const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
function textOf(chunk) {
  return chunk
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .split("\n")
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter((s) => s && s.length < 500 && !/^[A-Z0-9]{30,}$/.test(s));
}
const p = html.indexOf('class="principles');
const plat = html.indexOf('class="platform');
const hero = html.indexOf('class="hero');
const gal = html.indexOf('class="gallery');
console.log("=== HERO/GALLERY/TRIANGLE until principles ===");
console.log(textOf(html.slice(hero, p)).slice(0, 80).join("\n"));
console.log("\n=== PRINCIPLES ===");
console.log(textOf(html.slice(p, plat)).join("\n"));
