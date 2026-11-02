const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
function around(s, before, after) {
  const i = html.indexOf(s);
  console.log("\n####", s, i);
  if (i < 0) return;
  const text = html.slice(i - before, i + after)
    .replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&amp;/g, "&").replace(/&#x27;/g, "'");
  const lines = text.split("\n").map(x => x.replace(/\s+/g, " ").trim()).filter(x => x && !/^[A-Z]{8,}$/.test(x) && x.length < 240);
  console.log(lines.join("\n"));
}
around("About EraX Digital", 0, 2500);
around("Over 6 Years", 200, 1800);
around("Unified Ecosystem", 0, 2200);
around("One Ecosystem", 0, 100);
around("Learn about Sl8", 0, 200);
