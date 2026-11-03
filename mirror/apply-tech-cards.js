const fs = require("fs");
let html = fs.readFileSync("built-on-stellar.html", "utf8");
const images = [
  "/assets/company-wallet.svg",
  "/assets/company-community.svg",
  "/assets/company-ownership.svg",
  "/assets/company-creator.svg",
  "/assets/company-wallet.svg",
  "/assets/company-community.svg",
  "/assets/company-ownership.svg",
];
let n = 0;
html = html.replace(/<img\b[^>]*class="ecosystem_img"[^>]*>/g, (tag) => {
  const src = images[n] || images[0];
  n += 1;
  return '<img src="' + src + '" loading="lazy" alt="" class="ecosystem_img"/>';
});
const titles = [
  ['<div class="ecosystem_tag">Stablecoin</div><h3 class="title-22">PayPal PYUSD</h3>', '<div class="ecosystem_tag">Network</div><h3 class="title-22">Ethereum</h3>'],
  ['<div class="ecosystem_tag">Humanitarian</div><h3 class="title-22">UNHCR / Aid Assist</h3>', '<div class="ecosystem_tag">Network</div><h3 class="title-22">Base</h3>'],
  ['<div class="ecosystem_tag">Tokenized Bond</div><h3 class="title-22">ABN AMRO APOCBOND</h3>', '<div class="ecosystem_tag">Product</div><h3 class="title-22">EraX Social</h3>'],
  ['<div class="ecosystem_tag">Tokenized gold</div><h3 class="title-22">WisdomTree GOLD</h3>', '<div class="ecosystem_tag">Product</div><h3 class="title-22">EraX Wallet</h3>'],
  ['<div class="ecosystem_tag">Tokenized bonds</div><h3 class="title-22">Franklin Templeton BENJI</h3>', '<div class="ecosystem_tag">Product</div><h3 class="title-22">EraX Creator</h3>'],
  ['<div class="ecosystem_tag">Stablecoin</div><h3 class="title-22">This describes a planned EraX Digital capability and is not currently available.</h3>', '<div class="ecosystem_tag">Future</div><h3 class="title-22">EraX Assets</h3>'],
  ['<div class="ecosystem_tag">Deposit / Withdrawal</div><h3 class="title-22">MoneyGram</h3>', '<div class="ecosystem_tag">Identity</div><h3 class="title-22">Digital identity</h3>'],
];
titles.forEach(([from, to]) => {
  if (!html.includes(from)) console.log("missing", from.slice(0, 60));
  html = html.replace(from, to);
});
const tmp = "built-on-stellar.html.tmpwrite";
fs.writeFileSync(tmp, html);
fs.renameSync(tmp, "built-on-stellar.html");
console.log("images replaced", n);
console.log("leftover", ["PayPal", "UNHCR", "ABN AMRO", "WisdomTree", "Franklin", "MoneyGram", "Circle.avif"].filter((s) => html.includes(s)));
