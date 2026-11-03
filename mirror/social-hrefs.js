const fs = require("fs");
for (const f of ["mirror/index.html", "index.html"]) {
  const html = fs.readFileSync(f, "utf8");
  const i = html.indexOf("footer_socials");
  console.log("\n##", f, i);
  const chunk = html.slice(i, i + 500);
  const hrefs = [...chunk.matchAll(/href="[^"]+"/g)].map((m) => m[0]);
  console.log(hrefs.join("\n"));
}
