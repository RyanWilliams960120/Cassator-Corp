const fs = require("fs");
const html = fs.readFileSync("newsroom.html", "utf8");
const re = /author-short[\s\S]{0,500}?<\/div><\/div>/g;
let m, n = 0;
while ((m = re.exec(html)) && n < 8) {
  console.log("\n", m[0].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 180));
  n++;
}
