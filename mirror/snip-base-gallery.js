const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
["Layer 2", "everyday", ">Base<", "Base", "Bringing social", "gallery_slide", "swiper-slide"].forEach(function (needle) {
  let i = 0;
  let n = 0;
  console.log("\n##", needle, "count", html.split(needle).length - 1);
  while ((i = html.indexOf(needle, i)) >= 0 && n < 3) {
    console.log(html.slice(Math.max(0, i - 80), i + 160).replace(/\s+/g, " "));
    i += needle.length;
    n++;
  }
});
