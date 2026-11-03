const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
function text(s) {
  return s.replace(/<[^>]+>/g, "\n").replace(/&amp;/g, "&").split("\n").map((x) => x.replace(/\s+/g, " ").trim()).filter(Boolean);
}
const j = html.indexOf('id="roadmap"');
const v = html.indexOf('class="vision u-section"');
const p = html.indexOf('class="principles');
const plat = html.indexOf('class="platform');
console.log("JOURNEY\n" + text(html.slice(j, v)).filter((t) => t.length < 280 && !/^[A-Z0-9]{20,}$/.test(t)).join("\n"));
console.log("\nPRINCIPLES\n" + text(html.slice(p, plat)).filter((t) => /principle|Access|User|Transpar|Innovat|Making|Giving|Communicat|Continuously/.test(t)).join("\n"));
console.log("\nTAG", html.includes("Connect. Create.") && html.includes(">Own.<"));
console.log("STATUS", ["Completed", "Upcoming", "Planned", "Future Development"].map((s) => s + ":" + (html.split(s).length - 1)));
console.log("old roadmap dup", /Development Transparency|Phase 5/.test(html));
