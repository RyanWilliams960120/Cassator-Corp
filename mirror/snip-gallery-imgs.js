const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const start = html.indexOf('class="swiper-wrapper gallery_slider');
const end = html.indexOf("</section>", start);
const chunk = html.slice(start, end);
const imgs = [...chunk.matchAll(/<img[^>]*>/g)].map((m) => m[0]);
console.log("imgs", imgs.length);
imgs.forEach((img, i) => {
  const src = (img.match(/src="([^"]+)"/) || [])[1];
  const alt = (img.match(/alt="([^"]*)"/) || [])[1];
  console.log(i, alt, src);
});
console.log("\n--- sentence context ---");
const j = html.indexOf("Bringing social experiences, digital ownership and creator opportunities together.</p>");
console.log(html.slice(j - 250, j + 200));
