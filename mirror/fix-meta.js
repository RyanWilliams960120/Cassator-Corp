const fs = require("fs");
const path = require("path");
const ROOT = ".";
const TITLES = {
  "index.html": "EraX Digital | SocialFi, Web3 and Digital Ownership",
  "sl8.html": "EraX Social | EraX Digital",
  "rwa.html": "EraX Assets | EraX Digital",
  "wallet.html": "EraX Wallet | EraX Digital",
  "paid-content.html": "EraX Creator | EraX Digital",
  "investors.html": "Roadmap | EraX Digital",
  "newsroom.html": "Company | EraX Digital",
  "team.html": "Careers | EraX Digital",
  "built-on-stellar.html": "Technology | EraX Digital",
  "trust-center.html": "Trust Center | EraX Digital",
  "privacy-policy.html": "Privacy Policy | EraX Digital",
  "terms-of-use.html": "Terms of Use | EraX Digital",
  "security.html": "Security | EraX Digital",
  "safety.html": "Safety | EraX Digital",
  "compliance-kyc-aml.html": "Compliance | EraX Digital",
  "cookie-policy.html": "Cookie Policy | EraX Digital",
  "privacy.html": "Privacy Policy | EraX Digital",
  "terms.html": "Terms of Use | EraX Digital",
  "compliance.html": "Compliance | EraX Digital",
  "cookies.html": "Cookie Policy | EraX Digital",
  "who-owns-your-future-income-the-rise-of-rwa-human-capital-markets.html":
    "Digital ownership and creator participation | EraX Digital",
  "can-crypto-finally-solve-the-paying-for-the-internet-problem.html":
    "Making Web3 payments easier to use | EraX Digital",
  "the-rwa-tokenization-of-human-potential-a-new-concept-in-the-digital-economy.html":
    "A planned approach to digital ownership | EraX Digital",
  "from-the-creator-economy-to-the-tokenized-economy-how-the-digital-market-is-changing.html":
    "Creator monetization in a connected ecosystem | EraX Digital",
};
function walk(dir, acc=[]) {
  for (const name of fs.readdirSync(dir)) {
    if (["mirror","node_modules",".git"].includes(name)) continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}
const OLD_TITLES = [
  ["Who Owns Your Future Income? The Rise of RWA Human Capital Markets", "Digital ownership and creator participation"],
  ["Can Crypto Finally Solve The “Paying For The Internet” Problem?", "Making Web3 payments easier to use"],
  ["Can Crypto Finally Solve The \"Paying For The Internet\" Problem?", "Making Web3 payments easier to use"],
  ["The RWA Tokenization Of Human Potential: A New Concept In The Digital Economy", "A planned approach to digital ownership"],
  ["From the creator economy to the tokenized economy: How the digital market is changing", "Creator monetization in a connected ecosystem"],
];

for (const file of walk(ROOT)) {
  const base = path.basename(file);
  const title = TITLES[base];
  if (!title) continue;
  let html = fs.readFileSync(file, "utf8");
  for (const [a, b] of OLD_TITLES) html = html.split(a).join(b);
  if (base === "team.html") {
    html = html.replace(
      "The <span class=\"is--accent is--italic\">EraX Digital</span> Careers",
      "Careers at <span class=\"is--accent is--italic\">EraX Digital</span>"
    );
  }
  const next = html
    .replace(/content="[^"]*" property="og:title"/g, `content="${title}" property="og:title"`)
    .replace(/content="[^"]*" name="twitter:title"/g, `content="${title}" name="twitter:title"`);
  if (next !== html) {
    fs.writeFileSync(file, next);
    console.log("meta", base);
  }
}
