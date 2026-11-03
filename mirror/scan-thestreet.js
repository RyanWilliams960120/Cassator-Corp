const fs = require("fs");
const html = fs.readFileSync("newsroom/who-owns-your-future-income-the-rise-of-rwa-human-capital-markets.html", "utf8");
const i = html.indexOf("Thestreet");
console.log(JSON.stringify(html.slice(i - 180, i + 40)));
