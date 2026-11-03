const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
let idx = 0;
let n = 0;
while ((idx = html.toLowerCase().indexOf("logo", idx)) !== -1 && n < 15) {
  console.log("\n---", n, idx);
  console.log(html.slice(Math.max(0, idx - 120), idx + 180).replace(/\s+/g, " "));
  idx += 4;
  n++;
}
