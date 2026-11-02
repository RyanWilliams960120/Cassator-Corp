const fs = require("fs");
const html = fs.readFileSync("sl8.html", "utf8");
for (const s of ["24M", "0% ads", "0 %", "Create Sl8", "Investor info", "4×", "4&times;", "yours, always", "By the numbers"]) {
  const i = html.indexOf(s);
  console.log("\n", s, i);
  if (i >= 0) console.log(html.slice(i - 40, i + 60).replace(/\s+/g, " "));
}
