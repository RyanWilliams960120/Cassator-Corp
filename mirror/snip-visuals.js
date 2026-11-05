const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
function show(label, needle, span) {
  const i = html.indexOf(needle);
  console.log("\n====", label, i);
  if (i < 0) return;
  console.log(html.slice(i, i + span).replace(/\s+/g, " ").slice(0, span));
}
show("PH", "journey_year-text", 700);
show("BRING", "Bringing social experiences", 400);
show("GALLERY", "swiper-slide", 500);
let n = 0;
let i = 0;
while ((i = html.indexOf("gallery", i)) >= 0 && n < 8) {
  console.log("\n-- gallery", n, html.slice(i, i + 180).replace(/\s+/g, " "));
  i += 7;
  n++;
}
