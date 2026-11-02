const fs = require("fs");
const html = fs.readFileSync("newsroom/who-owns-your-future-income-the-rise-of-rwa-human-capital-markets.html", "utf8");
let i = 0, n = 0;
while ((i = html.toLowerCase().indexOf("cassator.com", i)) !== -1 && n < 8) {
  console.log(html.slice(i - 80, i + 60).replace(/\s+/g, " "));
  console.log("---");
  i += 12;
  n++;
}
