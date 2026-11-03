const fs = require("fs");
for (const file of ["newsroom.html", "trust-center.html", "index.html"]) {
  const html = fs.readFileSync(file, "utf8");
  let i = 0;
  let n = 0;
  while ((i = html.indexOf("mailto:contact@erax.digital", i)) !== -1) {
    n++;
    console.log("\n" + file + " #" + n);
    console.log(html.slice(i - 80, i + 160).replace(/\s+/g, " "));
    i += 10;
  }
}
