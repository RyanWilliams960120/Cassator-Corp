const fs = require("fs");
const html = fs.readFileSync("wallet.html", "utf8");
for (const n of ["real time", "Apple Pay", "Revolut", "SWIFT", "$5", "Near-zero", "without leaving", "Path Payment", "Add Asset", "During events"]) {
  const i = html.indexOf(n);
  console.log("\n## " + n + " @" + i);
  if (i >= 0) console.log(html.slice(i - 30, i + 80).replace(/\s+/g, " "));
}
