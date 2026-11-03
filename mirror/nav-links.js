const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const nav = html.slice(html.indexOf("<nav"), html.indexOf("</nav>") + 6);
const links = [...nav.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => {
  const text = m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  return text + " => " + m[1];
});
console.log(links.filter((l) => /Roadmap|Company|Careers|Trust|Technology|About/.test(l)).join("\n"));
const i = html.indexOf(">Roadmap<");
console.log("\nSAMPLE\n" + html.slice(i - 220, i + 80));
const f = html.indexOf("<footer");
const chunk = html.slice(f, f + 12000);
const fl = [...chunk.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() + " => " + m[1]);
console.log("\nFOOT LINKS\n" + fl.filter(Boolean).join("\n"));
