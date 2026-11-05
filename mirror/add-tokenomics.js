const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const navIcon = "https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a0f75d3489c98f0632507c8_Rectangle%2014%20(1).svg";
const navItem = `<div class="nav_link-wrp"><img width="11" height="14" alt="" src="${navIcon}" loading="lazy" class="nav_icon"/><a href="/tokenomics" class="nav_link">Tokenomics</a></div>`;
const footerItem = `<a href="/tokenomics" class="footer_link u-paragraph-small">Tokenomics</a>`;

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror") continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}

const htmlExtra = ` The proposed allocation is published on the <a href="/tokenomics">Tokenomics</a> page. The full FAQ is the <a href="/docs/erax-tokenomics-faq.pdf">EraX (ERAX) Tokenomics FAQ</a> (PDF). The allocation is an economic plan. It is not vesting code in the contract.`;
const seeHtml = `The proposed allocation is on the <a href="/tokenomics">Tokenomics</a> page. The full FAQ is the <a href="/docs/erax-tokenomics-faq.pdf">EraX (ERAX) Tokenomics FAQ</a> (PDF).`;
const lead = `<p>The proposed allocation is published on the <a href="/tokenomics">Tokenomics</a> page. The full FAQ is the <a href="/docs/erax-tokenomics-faq.pdf">EraX (ERAX) Tokenomics FAQ</a> (PDF). The allocation is an economic plan. It is not vesting code in the contract. This chapter is the written contract specification.</p>`;

let navHits = 0;
let footerHits = 0;
let missedNav = [];
let contentHits = 0;

for (const file of walk(root, [])) {
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  const navRe = />Whitepaper<\/a><\/div><div class="nav_link-wrp mob">/g;
  html = html.replace(navRe, () => {
    navHits += 1;
    return `>Whitepaper</a></div>${navItem}<div class="nav_link-wrp mob">`;
  });
  const footRe = />Whitepaper<\/a><a href="(?:\/built-on-stellar|#|\/trust-center)"/g;
  html = html.replace(footRe, (match) => {
    footerHits += 1;
    return `>Whitepaper</a>${footerItem}${match.slice(">Whitepaper</a>".length)}`;
  });
  if (html.includes(">Whitepaper</a>") && !html.includes('href="/tokenomics"') && html.includes("nav_link")) {
    missedNav.push(path.relative(root, file));
  }
  const sale = "It is not deployed and it is not for sale.";
  if (html.includes(sale) && !html.includes("erax-tokenomics-faq.pdf")) {
    html = html.replace(sale, sale + htmlExtra);
    contentHits += 1;
  }
  if (html.includes("See Tokenomics.")) {
    html = html.replace("See Tokenomics.", seeHtml);
    contentHits += 1;
  }
  const leadMark = 'class="docs-lead">The written ERAX token specification.</p>';
  if (html.includes(leadMark) && !html.includes("This chapter is the written contract specification.")) {
    html = html.replace(leadMark, leadMark + lead);
    contentHits += 1;
  }
  if (html !== before) fs.writeFileSync(file, html);
}

const indexPath = path.join(root, "index.html");
const index = fs.readFileSync(indexPath, "utf8");
const mainAt = index.indexOf("<main");
const footerAt = index.indexOf("<footer");
if (mainAt < 0 || footerAt < 0) throw new Error("index markers missing");
let head = index.slice(0, mainAt);
let foot = index.slice(footerAt);
head = head.replace(/<title>[^<]*<\/title>/, "<title>Tokenomics | EraX Digital</title>");
head = head.replace(/(property="og:title" content=")[^"]*(")/, "$1Tokenomics | EraX Digital$2");
head = head.replace(/(name="twitter:title" content=")[^"]*(")/, "$1Tokenomics | EraX Digital$2");
head = head.replace(/(<meta content=")[^"]*(" property="og:title"\/>)/, "$1Tokenomics | EraX Digital$2");
head = head.replace(/(<meta content=")[^"]*(" name="twitter:title"\/>)/, "$1Tokenomics | EraX Digital$2");
const description = "Proposed allocation of ERAX. Created – Pre-Launch. Last updated November 1, 2026.";
head = head.replace(/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`);
head = head.replace(/(<meta content=")[^"]*(" name="description"\/>)/, `$1${description}$2`);
head = head.replace(/(property="og:description" content=")[^"]*(")/, `$1${description}$2`);
head = head.replace(/(<meta content=")[^"]*(" property="og:description"\/>)/, `$1${description}$2`);
head = head.replace(/(name="twitter:description" content=")[^"]*(")/, `$1${description}$2`);
head = head.replace(/(<meta content=")[^"]*(" name="twitter:description"\/>)/, `$1${description}$2`);
if (head.includes("<body class=\"")) head = head.replace("<body class=\"", "<body class=\"erax-tokenomics ");
else head = head.replace("<body>", "<body class=\"erax-tokenomics\">");
head = head.replace("</head>", `<style>
body.erax-tokenomics .main { background: transparent !important; }
.erax-alloc {
  position: relative;
  z-index: 1;
  max-width: 880px;
  margin: 0 auto;
  padding: 168px 24px 96px;
  color: #f6f0e4;
  font-family: Manrope, "Segoe UI", sans-serif;
}
.erax-alloc-kicker {
  margin: 0 0 8px;
  color: #e4d0a4;
  font-size: 13px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.erax-alloc h1 {
  margin: 0;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-weight: 500;
  font-size: 68px;
  line-height: 0.95;
  color: #f4efe6;
}
.erax-alloc-meta { margin: 14px 0 28px; color: #c5c0b4; font-size: 16px; }
.erax-alloc table { width: 100%; border-collapse: collapse; font-size: 16px; }
.erax-alloc caption {
  caption-side: bottom;
  text-align: left;
  padding-top: 12px;
  color: #c5c0b4;
  font-size: 14px;
}
.erax-alloc th, .erax-alloc td {
  text-align: left;
  padding: 14px 10px;
  border-bottom: 1px solid rgba(228, 208, 164, 0.35);
}
.erax-alloc th { color: #e4d0a4; font-weight: 600; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; }
.erax-alloc td.num, .erax-alloc th.num { text-align: right; font-variant-numeric: tabular-nums; }
.erax-alloc tr.total td { color: #f4efe6; font-weight: 700; border-bottom-color: #e4d0a4; }
.erax-alloc-pdf {
  display: inline-block;
  margin-top: 28px;
  padding: 14px 22px;
  background: #d4bc8a;
  color: #1c150c;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
}
.erax-alloc-pdf:hover { background: #e7d3a8; }
@media (max-width: 700px) {
  .erax-alloc { padding-top: 128px; }
  .erax-alloc h1 { font-size: 48px; }
  .erax-alloc table { font-size: 14px; }
}
</style></head>`);

const main = `<main class="main"><section class="erax-alloc"><p class="erax-alloc-kicker">Tokenomics</p><h1>EraX (ERAX)</h1><p class="erax-alloc-meta">Created – Pre-Launch · Last updated November 1, 2026</p><table><thead><tr><th>Allocation</th><th class="num">Percentage</th><th class="num">Tokens</th></tr></thead><tbody><tr><td>Community &amp; Ecosystem</td><td class="num">30%</td><td class="num">300,000,000</td></tr><tr><td>Staking &amp; Rewards</td><td class="num">20%</td><td class="num">200,000,000</td></tr><tr><td>Foundation &amp; Treasury</td><td class="num">15%</td><td class="num">150,000,000</td></tr><tr><td>Team &amp; Contributors</td><td class="num">15%</td><td class="num">150,000,000</td></tr><tr><td>Private Investors</td><td class="num">10%</td><td class="num">100,000,000</td></tr><tr><td>Partnerships &amp; Marketing</td><td class="num">10%</td><td class="num">100,000,000</td></tr><tr class="total"><td>Total</td><td class="num">100%</td><td class="num">1,000,000,000</td></tr></tbody></table><a class="erax-alloc-pdf" href="/docs/erax-tokenomics-faq.pdf" download="EraX-ERAX-Tokenomics-FAQ.pdf">Download the EraX (ERAX) Tokenomics FAQ (PDF)</a></section></main>`;

let page = head + main + foot;
page = page.replace(/<script>\(function\(\)\{document\.querySelectorAll\("\.hero_bird[\s\S]*?<\/script>/, "");
page = page.replace(/<script src="https:\/\/accipiter69\.github\.io\/casator\/hero\.js"[^>]*><\/script>/, "");
page = page.replace('href="/tokenomics" class="nav_link"', 'href="/tokenomics" aria-current="page" class="nav_link w--current"');
fs.writeFileSync(path.join(root, "tokenomics.html"), page);

const searchPath = path.join(root, "docs", "search.json");
const search = JSON.parse(fs.readFileSync(searchPath, "utf8"));
const textExtra = " The proposed allocation is published at /tokenomics. The full FAQ is /docs/erax-tokenomics-faq.pdf.";
let searchChanged = false;
for (const item of search) {
  if (item.text && item.text.includes("See Tokenomics.") && !item.text.includes("/tokenomics")) {
    item.text = item.text.replace("See Tokenomics.", "The proposed allocation is at /tokenomics. The full FAQ is /docs/erax-tokenomics-faq.pdf.");
    searchChanged = true;
  }
  if (item.text && item.text.includes("It is not deployed and it is not for sale.") && !item.text.includes("/docs/erax-tokenomics-faq.pdf")) {
    item.text = item.text.replace("It is not deployed and it is not for sale.", "It is not deployed and it is not for sale." + textExtra);
    searchChanged = true;
  }
}
if (!search.some((item) => item.href === "/tokenomics")) {
  search.push({
    title: "Tokenomics",
    href: "/tokenomics",
    text: "EraX ERAX proposed allocation Community and Ecosystem 30 percent 300000000 Staking and Rewards 20 percent Foundation and Treasury 15 percent Team and Contributors 15 percent Private Investors 10 percent Partnerships and Marketing 10 percent Created Pre-Launch November 1 2026 FAQ PDF",
  });
  searchChanged = true;
}
if (searchChanged) fs.writeFileSync(searchPath, JSON.stringify(search));

console.log(JSON.stringify({ navHits, footerHits, missedNav, contentHits, pageBytes: page.length, searchChanged }, null, 2));
