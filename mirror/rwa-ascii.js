const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8");
let i = 0, n = 0;
while ((i = html.indexOf("ascii_image", i)) !== -1 && n < 4) {
  console.log("\n" + html.slice(i - 220, i + 40).replace(/\s+/g, " "));
  i += 10;
  n++;
}
