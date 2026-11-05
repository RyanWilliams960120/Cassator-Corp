const fs = require("fs");
const h = fs.readFileSync("index.html", "utf8");
for (const name of ["Golos", "Playfair", "font", "typekit", "stylesheet"]) {
  let i = 0;
  let n = 0;
  const lower = h.toLowerCase();
  const key = name.toLowerCase();
  while ((i = lower.indexOf(key, i)) !== -1 && n < 6) {
    console.log("\n" + name, n, h.slice(Math.max(0, i - 40), i + 180).replace(/\s+/g, " "));
    i += key.length;
    n++;
  }
}
