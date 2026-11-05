const fs = require("fs");
const css = fs.readFileSync("mirror/site.css", "utf8");
for (const name of ["Golos", "Playfair", "fonts.googleapis", "font-weight:400", "Recursive"]) {
  let i = 0;
  let n = 0;
  while ((i = css.indexOf(name, i)) !== -1 && n < 3) {
    console.log("\n" + name, n, css.slice(Math.max(0, i - 80), i + 140).replace(/\s+/g, " "));
    i += name.length;
    n++;
  }
}
