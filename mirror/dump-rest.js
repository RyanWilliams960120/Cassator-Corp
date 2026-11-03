const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
function textOf(chunk) {
  return chunk
    .replace(/<[^>]+>/g, "\n")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .split("\n")
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter((s) => s && s.length < 420 && !/^[A-Z0-9]{25,}$/.test(s));
}
const plat = html.indexOf('class="platform');
const j = html.indexOf('class="journey');
const team = html.indexOf('class="team ');
const cta = html.indexOf('class="cta ');
const foot = html.indexOf("<footer");
console.log("=== PLATFORM ===");
console.log(textOf(html.slice(plat, j)).join("\n"));
console.log("\n=== TEAM TO CTA ===");
console.log(textOf(html.slice(team, cta)).join("\n"));
console.log("\n=== CTA TO FOOTER ===");
console.log(textOf(html.slice(cta, foot)).join("\n"));
console.log("\n=== FOOTER TEXT ===");
console.log(textOf(html.slice(foot, foot + 20000)).slice(0, 60).join("\n"));
