const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
[107700, 109600].forEach((i) => {
  console.log("\n----");
  console.log(html.slice(i, i + 500).replace(/\s+/g, " ").slice(0, 400));
});
