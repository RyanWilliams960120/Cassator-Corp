const fs = require("fs");
const file = "index.html";
let html = fs.readFileSync(file, "utf8");
const pairs = [
  ['<div class="text-32">01</div><h3 class="u-text-style-h4">Vision</h3>', '<div class="text-32">2026</div><h3 class="u-text-style-h4">EraX Social</h3>'],
  ['<div class="text-32 is--2">02</div><h3 class="u-text-style-h4">Mission</h3>', '<div class="text-32 is--2">2027</div><h3 class="u-text-style-h4">Wallet and creator tools</h3>'],
  ['<div class="text-32 is--3">03</div><h3 class="u-text-style-h4">Positioning</h3>', '<div class="text-32 is--3">2028</div><h3 class="u-text-style-h4">Ecosystem growth</h3>'],
  [">People, communities, and digital assets.</p>", ">EraX Social is the current product.</p>"],
  [">Interaction in a connected digital world.</p>", ">Accounts, posts, follows, and comments.</p>"],
  [">Shared creation of value.</p>", ">Communities and private messages.</p>"],
  [">Space for communities to grow together.</p>", ">Foundation and infrastructure are completed.</p>"],
  [">One vision for the EraX Digital ecosystem.</p>", ">The ERAX token is specified and not deployed.</p>"],
  [">Simpler access to Web3 technology.</p>", ">EraX Wallet is planned.</p>"],
  [">Social experiences.</p>", ">Paid content, subscriptions, and tips.</p>"],
  [">Digital ownership.</p>", ">Security testing before a wider release.</p>"],
  [">Financial infrastructure.</p>", ">Creator payments are intended on Base.</p>"],
  [">One accessible digital ecosystem.</p>", ">Token deployment is not scheduled and is not a sale.</p>"],
  [">Wallet infrastructure and creator-focused experiences.</p>", ">This year is not a public beta date.</p>"],
  [">An independent Web3 technology company.</p>", ">Broader creator and community tools.</p>"],
  [">Social networking, digital ownership, and wallet infrastructure.</p>", ">EraX Assets stays a future possibility.</p>"],
  [">Creator-focused experiences, still in development.</p>", ">It is not operational and not an investment product.</p>"],
];
pairs.forEach(function (pair) {
  const at = html.indexOf(pair[0]);
  if (at < 0 || html.indexOf(pair[0], at + 1) >= 0) throw new Error("not unique " + pair[0]);
  html = html.replace(pair[0], pair[1]);
});
const tmp = file + ".tmpwrite";
fs.writeFileSync(tmp, html);
fs.renameSync(tmp, file);
console.log("vision cards updated");
