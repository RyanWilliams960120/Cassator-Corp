const fs = require("fs");
for (const f of ["investors.html", "team.html", "index.html"]) {
  const html = fs.readFileSync(f, "utf8");
  let i = 0, n = 0;
  console.log("\n==", f, (html.match(/Dmytro/g) || []).length);
  while ((i = html.indexOf("Dmytro", i)) >= 0 && n < 3) {
    console.log(html.slice(i - 60, i + 40).replace(/\s+/g, " "));
    i += 6; n++;
  }
}
