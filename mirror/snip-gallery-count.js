const fs = require("fs");
for (const f of ["mirror/index.html", "mirror/live-index.html", "index.html"]) {
  const html = fs.readFileSync(f, "utf8");
  const start = html.indexOf("gallery_slider w-dyn-items");
  const end = start < 0 ? -1 : html.indexOf("u-text-style-h2 is--gallery is--2", start);
  const chunk = start < 0 ? "" : html.slice(start, end);
  const imgs = [...chunk.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
  console.log(f, "start", start, "imgs", imgs.length);
  imgs.forEach((s) => console.log(" ", s.split("/").pop()));
}
