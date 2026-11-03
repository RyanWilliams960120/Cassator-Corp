const fs = require("fs");
for (const file of ["mirror/index.html", "mirror/live-index.html", "index.html"]) {
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8");
  const i = html.indexOf('class="footer_socials"');
  console.log("\n====", file, i);
  if (i < 0) continue;
  const slice = html.slice(i, i + 2000);
  const hrefs = slice.match(/href="[^"]+"/g) || [];
  console.log(hrefs.join("\n"));
}
