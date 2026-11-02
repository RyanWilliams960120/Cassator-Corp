const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const start = html.indexOf("journey_text is--1");
const end = html.indexOf("vision_card", start);
const chunk = html.slice(start, end);
const parts = chunk.split(/<div class="journey_text/);
parts.forEach((p, i) => {
  const text = p.replace(/<[^>]+>/g, " | ").replace(/\s+/g, " ").trim().slice(0, 500);
  console.log("\nITEM", i, text);
});
console.log("\n\n==== INTRO ====");
const intro = html.indexOf("A proposed plan");
console.log(html.slice(intro - 200, intro + 500).replace(/></g, ">\n<"));
