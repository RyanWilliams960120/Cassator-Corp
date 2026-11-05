const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
function show(label, needle, span) {
  const i = html.indexOf(needle);
  console.log("\n====", label, i);
  if (i < 0) return;
  console.log(html.slice(Math.max(0, i - 120), i + span).replace(/\s+/g, " ").slice(0, span + 80));
}
show("ICON", 'rel="shortcut icon"', 200);
show("ICON2", "rel=\"icon\"", 250);
show("APPLE", "apple-touch", 200);
show("TRIANGLE IMG", "icon-100", 500);
show("CTA", "class=\"cta", 400);
show("SPAN", "span-box", 200);
const cta = html.indexOf("Explore the EraX Digital ecosystem");
console.log("\n==== CTA TEXT", cta);
console.log(html.slice(cta - 800, cta + 200).replace(/\s+/g, " ").slice(0, 900));
