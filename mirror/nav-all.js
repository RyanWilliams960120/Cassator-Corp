const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const re = /<a href="(\/[^"]*)" class="nav_link">([^<]+)<\/a>/g;
const all = [...html.matchAll(re)];
console.log("nav_link count", all.length);
const seen = new Set();
for (const m of all) {
  const key = m[2] + m[1];
  if (seen.has(key)) continue;
  seen.add(key);
  console.log(m[2], m[1], "at", m.index);
}
console.log("\nAROUND FOOTER RESOURCES");
const i = html.lastIndexOf(">Technology<");
console.log(html.slice(i - 180, i + 40));
