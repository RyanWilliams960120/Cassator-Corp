const fs = require("fs");
const files = [
  "paid-content.html",
  "docs/library.js",
  "docs/whitepaper-print.html",
  "documentation/smart-contracts.html",
  "documentation/supported-networks.html",
  "whitepaper.html",
  "assets/planned-screen.html",
];
files.forEach(function (file) {
  const html = fs.readFileSync(file, "utf8");
  const re = /not an offer|Not a deployment|not a live product/gi;
  let m;
  let n = 0;
  console.log("\n====", file);
  while ((m = re.exec(html)) && n < 4) {
    console.log(html.slice(Math.max(0, m.index - 90), m.index + 110).replace(/\s+/g, " "));
    n++;
  }
  const b = html.indexOf('class="button_main_text"></div>');
  if (b >= 0) console.log("BUTTON", html.slice(b - 180, b + 40).replace(/\s+/g, " "));
});
