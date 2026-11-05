const fs = require("fs");
const path = require("path");
const https = require("https");

const root = path.resolve(__dirname, "..");
const dir = path.join(root, "assets", "gallery");
fs.mkdirSync(dir, { recursive: true });

const photos = [
  "photo-1534528741775-53994a69daeb",
  "photo-1506794778202-cad84cf45f1d",
  "photo-1524504388940-b1c1722653e1",
  "photo-1539571696357-5a69c17a67c6",
  "photo-1517841905240-472988babdf9",
  "photo-1500648767791-00dcc994a43e",
  "photo-1529626455594-4ff0802cfb7e",
  "photo-1463453091185-61582044d556",
  "photo-1470229722913-7c0e2dbbafd3",
  "photo-1464822759023-fed622ff2c3b",
  "photo-1568572933382-74d440642117",
  "photo-1511632765486-a01980e01a18",
];

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "EraX-site/1.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          get(res.headers.location).then(resolve, reject);
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const buf = Buffer.concat(chunks);
          if (res.statusCode !== 200 || buf.length < 8000) {
            reject(new Error(res.statusCode + " " + url + " bytes " + buf.length));
            return;
          }
          resolve(buf);
        });
      })
      .on("error", reject);
  });
}

(async () => {
  for (let i = 0; i < photos.length; i++) {
    const name = String(i + 1).padStart(2, "0") + ".jpg";
    const file = path.join(dir, name);
    const url =
      "https://images.unsplash.com/" +
      photos[i] +
      "?auto=format&fit=crop&w=680&h=980&q=80";
    const buf = await get(url);
    if (buf[0] !== 0xff || buf[1] !== 0xd8) {
      throw new Error(name + " is not a jpeg");
    }
    fs.writeFileSync(file, buf);
    console.log(name, buf.length);
  }

  const indexPath = path.join(root, "index.html");
  let html = fs.readFileSync(indexPath, "utf8");

  const yearFrom =
    'journey_year-text">Ph<span class="journey_year-span">01</span></div><div class="journey_year-clock"><div class="year-text">2026<br/></div><div class="year-text">2026</div><div class="year-text">2026</div><div class="year-text">2026</div><div class="year-text">2026</div><div class="year-text">2026</div>';
  const yearTo =
    'journey_year-text">20<span class="journey_year-span">26</span></div><div class="journey_year-clock"><div class="year-text">26</div><div class="year-text">26</div><div class="year-text">26</div><div class="year-text">26</div><div class="year-text">26</div><div class="year-text">26</div>';
  if (!html.includes(yearFrom)) throw new Error("year markup missing");
  html = html.replace(yearFrom, yearTo);

  const lineFrom =
    "Bringing social experiences, digital ownership and creator opportunities together.";
  const lineTo = "but people at the center of the new economy";
  const lineCount = html.split(lineFrom).length - 1;
  if (lineCount < 1) throw new Error("headline missing");
  html = html.split(lineFrom).join(lineTo);

  const cardFrom =
    '<div class="u-text-style-h4">Base</div><div class="text-10">First Layer 2<br/>for everyday use</div>';
  const cardTo =
    '<div class="u-text-style-h4">EraX</div><div class="text-10">for everyday use</div>';
  if (!html.includes(cardFrom)) throw new Error("base card missing");
  html = html.replace(cardFrom, cardTo);

  const start = html.indexOf('class="swiper-wrapper gallery_slider');
  const end = html.indexOf("u-text-style-h2 is--gallery is--2", start);
  if (start < 0 || end < 0) throw new Error("gallery missing");
  const before = html.slice(0, start);
  const after = html.slice(end);
  const slides = photos
    .map((id, i) => {
      const src = "/assets/gallery/" + String(i + 1).padStart(2, "0") + ".jpg";
      return (
        '<div role="listitem" class="swiper-slide gallery_slider w-dyn-item"><div class="ascii-host"><img src="' +
        src +
        '" loading="lazy" width="226" height="325" alt="" class="gallery-img"/></div></div>'
      );
    })
    .join("");
  const wrapper =
    'class="swiper-wrapper gallery_slider w-dyn-items">' +
    slides +
    "</div></div></div><div class=\"u-rel of-vis\"><div data-text-animation=\"letters-blur\" class=\"";
  html = before + wrapper + after;

  if (html.includes("6a1ed4a5dd3a035f48360d5b")) throw new Error("old gallery left");
  if (html.includes(">Ph<span")) throw new Error("Ph left");
  if ((html.match(/class="year-text">26</g) || []).length !== 6) throw new Error("year count");

  const tmp = indexPath + ".tmpwrite";
  fs.writeFileSync(tmp, html);
  fs.renameSync(tmp, indexPath);
  console.log("index updated", html.length);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
