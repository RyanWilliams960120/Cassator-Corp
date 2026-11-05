const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8");
function around(i, a, b) {
  console.log("\n---\n" + html.slice(i - a, i + b).replace(/\s+/g, " "));
}
around(31411, 80, 220);
around(102900, 160, 280);
around(103520, 80, 200);
around(75719, 250, 40);
around(32222, 40, 160);
