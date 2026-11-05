const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
function around(needle, n) {
  const i = html.indexOf(needle);
  console.log("\n", needle, i);
  if (i >= 0) console.log(html.slice(i - 120, i + n).replace(/\s+/g, " "));
}
around("journey_year-text", 500);
around("but people at the center", 180);
around("Bringing social", 160);
around(">EraX</div><div class=\"text-10\">", 120);
around("swiper-wrapper gallery_slider", 280);
const imgs = [...html.matchAll(/assets\/gallery\/\d+\.jpg/g)];
console.log("gallery refs", imgs.length);
const end = html.indexOf("u-text-style-h2 is--gallery is--2");
console.log(html.slice(end - 180, end + 80).replace(/\s+/g, " "));
