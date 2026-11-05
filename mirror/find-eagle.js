const fs = require("fs");
const html = fs.readFileSync("trust-center.html", "utf8");
let i = 0;
let n = 0;
while ((i = html.indexOf("principles", i)) !== -1 && n < 12) {
  console.log("\n---", n, i, "---\n" + html.slice(Math.max(0, i - 120), i + 220).replace(/\s+/g, " "));
  i += 10;
  n++;
}
