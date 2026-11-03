const fs = require("fs");
for (const f of ["investors.html", "rwa.html", "sl8.html"]) {
  const html = fs.readFileSync(f, "utf8");
  const tags = html.match(/<a\b[^>]*href="\/investors"[^>]*>[\s\S]*?<\/a>/g) || [];
  console.log("\n##", f, tags.length);
  for (const tag of tags) console.log(tag.slice(0, 400).replace(/\s+/g, " "));
}
