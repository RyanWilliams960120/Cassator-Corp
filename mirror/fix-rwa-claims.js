const fs = require("fs");
let html = fs.readFileSync("rwa.html", "utf8");
const pairs = [
  [
    '<div class="u-text-style-h4 u-white-gradient"></div><div class="text-10 caps is--white-55 link-appear">minimum participation</div>',
    '<div class="u-text-style-h4 u-white-gradient">None</div><div class="text-10 caps is--white-55 link-appear">No minimum is announced</div>',
  ],
  [
    '<div class="u-text-style-h4 u-white-gradient">30 days</div><div class="text-10 caps is--white-55 link-appear">in development</div>',
    '<div class="u-text-style-h4 u-white-gradient">Planned</div><div class="text-10 caps is--white-55 link-appear">Not operational</div>',
  ],
  [
    '<div class="u-text-style-h4 u-white-gradient">75%</div><div class="text-10 caps is--white-55 link-appear">stays with the creator</div>',
    '<div class="u-text-style-h4 u-white-gradient">—</div><div class="text-10 caps is--white-55 link-appear">No creator share is announced</div>',
  ],
  ['<div class="u-paragraph-main is--white-55">REQUIRED</div>', '<div class="u-paragraph-main is--white-55">FUTURE</div>'],
  ['<div class="u-paragraph-main is--accent">LOCKED</div>', '<div class="u-paragraph-main is--accent">NOT</div>'],
  ['<div class="u-paragraph-main is--white-55">LIQUIDITY FOREVER</div>', '<div class="u-paragraph-main is--white-55">OPERATIONAL</div>'],
  ['<div class="u-paragraph-main is--accent">75%</div>', '<div class="u-paragraph-main is--accent">NO</div>'],
  ['<div class="u-paragraph-main is--white-55">CREATOR SHARE</div>', '<div class="u-paragraph-main is--white-55">TOKEN SALE</div>'],
  ['<div class="u-paragraph-main is--accent">30 DAY</div>', '<div class="u-paragraph-main is--accent">NO</div>'],
  ['<div class="u-paragraph-main is--white-55">INITIAL SALE</div>', '<div class="u-paragraph-main is--white-55">ANNOUNCED SALE</div>'],
  ['<div class="u-paragraph-main is--accent">1 000 000 000</div>', '<div class="u-paragraph-main is--accent">NO</div>'],
  ['<div class="u-paragraph-main is--white-55">TOKEN SUPPLY</div>', '<div class="u-paragraph-main is--white-55">ANNOUNCED SUPPLY</div>'],
  [
    '>10%</h3><div class="title-18 u-white-gradient">Initial Sale</div><p class="u-paragraph-small is--white-55"><strong>Initial Sale </strong>— fair starting price</p>',
    '>—</h3><div class="title-18 u-white-gradient">No sale</div><p class="u-paragraph-small is--white-55">No initial sale is announced.</p>',
  ],
  [
    '>5%</h3><div class="title-18 u-white-gradient">Liquidity Pool</div><p class="u-paragraph-small is--white-55"><strong>50M tokens </strong></p>',
    '>—</h3><div class="title-18 u-white-gradient">No pool</div><p class="u-paragraph-small is--white-55">No liquidity pool is announced.</p>',
  ],
  [
    '>75%</h3><div class="title-18 u-white-gradient">Creator</div><p class="u-paragraph-small is--white-55"><strong>Sales</strong> on their own terms for life</p>',
    '>—</h3><div class="title-18 u-white-gradient">Creator</div><p class="u-paragraph-small is--white-55">No creator sale is announced.</p>',
  ],
  ['>10% Initial Sale<', '>No sale<'],
  ['>5% LP<', '>No pool<'],
  ['>75% Creator<', '>Not set<'],
  [
    '<p class="text-11 is--white-55 link-appear">Initial Sale</p></div><h2 data-text-animation="letters-blur" class="u-text-style-h3">Presale — the fair <br/>‍<span class="is--accent">price</span>. Always.</h2>',
    '<p class="text-11 is--white-55 link-appear">Status</p></div><h2 data-text-animation="letters-blur" class="u-text-style-h3">No sale is <br/>‍<span class="is--accent">announced</span>.</h2>',
  ],
];
for (const [from, to] of pairs) {
  const count = html.split(from).length - 1;
  console.log(count ? "ok " + count : "MISSING", JSON.stringify(from).slice(0, 90));
  if (count) html = html.split(from).join(to);
}
fs.writeFileSync("rwa.html", html);
