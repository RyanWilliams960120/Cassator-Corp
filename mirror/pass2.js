const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(".");

const AGGRESSIVE = new Set([
  "investors.html",
  "rwa.html",
  "wallet.html",
  "paid-content.html",
  "sl8.html",
  "built-on-stellar.html",
]);

const CLAIM =
  /already live|real users|550,000|260,000|on sale|BlackRock|Franklin|Taylor Swift|MrBeast|Spotify|founder|CEO|Ukrainian|white paper|Initial Sale|1 billion|USDC|KYC|STARDUST|Gold Eagle|mining|rug pull|hyperinflation|store of value|seed phrase|Download EraX|2 minutes|Apple Pay|Paybis|Banxa|Revolut|Mastercard|MoneyGram|PayPal|WisdomTree|UNHCR|already working|utility token|Leading financial|PYUSD|refugees|money market|\$500M|fan token|staking|Stake|reward pool|InformNapalm|live and earning|earn every month|under 5 minutes|helps you collect|Become a creator|Traditional Platforms|Fan Badge|Statistics section|protocol level|liquidity pool|buying shares|250M|Only we offer|willpower|prize pool|dollar-denominated|BCG|investment infrastructure|liquid participation|backroom|Liquidity Locked|personal token|going first|pitch deck|running platform|operational platform|actively on sale|token has been launched|tokenization of real world|full-fledged|mining application|unified platform where|Apple device|debit or credit|OnRamp|fractions of a cent|Protocol 18|paid out|one-tap|Your wallet is already|No seed|weekly and paid|Instant top-up|Instant transfer|Auto-finds|third-party|Native Ethereum AMM|Participate in fan|Live progress|allocated share|countdown to sale|Rewards are added|Top up your wallet|Any debit|Low-fee|in-wallet swaps|You can be live|You earn every|Profile →|New Layer|unlock price|backstage|Paid investigations|New tracks|each lesson|vs Traditional|must drive|one tap|Reads content|Sends tips|Creates Layers|Views detailed|creator on EraX|Minimal \(Ethereum|Integrated —|Every EraX Social user|Switch|set the subscription|Discounts are applied|one-time payment|referral|organic growth|Who Already|6 Ways to Earn|Monthly Income|Payment only|How subscribers|Organize Content|in USDC|directly, in|Patreon|stablecoin|DM sales|Engagement rewards|3-tier|Receive Payments|Set Prices|Publish Content|Create a Layer|Individual Post|Post Unlock|subscription price|ALL content|non-subscribers|Statistics|Fan or Creator|wallet activation|pure silver|pure gold|next\b|influencers with|emergency measure|After the old one|Five reasons|Prepare to gather|10% of every|Distributed daily|Influencer launches|miners|buyback|rug |day-one|allocation depends|Additional issuance|BlackRock tokenizes|total supply|open markets|lock period|promoting token|Support others|Keep options|Connection to supported|not simply buying|Exclusive content|private chats|virtual badge|pure silver|What if you|young and promising|Six reasons|Unified Social|destroyed|In reality, there were|reward pool|Gold Eagle|STARDUST|institutional players|regulatory-ready|participation economy|Micropayments and rewards|Token utility|RWA platform infrastructure|Asset · Utility|utility token|already building on Ethereum|PayPal launched|UN agency|European bank|WisdomTree|largest asset managers|largest money transfer|foundation of the financial layer|open to partnering|investors who believe|Fees measured|high transaction throughput|real-world load|Payments, asset tokenization|not just an infrastructure|Tokenization · RWA|Financial Layer ·|Compliance · Fast|We are open|partnering with|AUM|Circle |Franklin Templeton|ABN AMRO|humanitarian|tokenized bond|tokenized gold|money market fund|cash-in and cash-out|Jobs@|jobs@|security@|press@|hello@|privacy@|compliance@|KYC|100 USDC|1,000 USDC|10,000 USDC|10 000 USDC|100 000 USDC|1 USDC/i;

const GOOD =
  /planned|not available|not operational|not a live|not currently|in development|Proposed|Phase |is developing|is building|Open role|future possibilit|not an offer|not a current|not yet published|will be added|planning note|none are presented|no token|no launch|no beta|no license|no government|no user or holder|do not read this timeline|these items are planning/i;

const NEUTRAL = "Planned EraX Digital work. This is not a live product and not an offer.";

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (["mirror", "node_modules", ".git"].includes(name)) continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function transform(html, aggressive) {
  let out = "";
  let i = 0;
  while (i < html.length) {
    if (html.startsWith("<script", i) || html.startsWith("<style", i)) {
      const tag = html.startsWith("<script", i) ? "script" : "style";
      const end = html.indexOf(`</${tag}>`, i);
      const close = end < 0 ? html.length : end + tag.length + 3;
      out += html.slice(i, close);
      i = close;
      continue;
    }
    if (html[i] === "<") {
      const end = html.indexOf(">", i);
      const close = end < 0 ? html.length : end + 1;
      out += html.slice(i, close);
      i = close;
      continue;
    }
    const next = html.indexOf("<", i);
    const end = next < 0 ? html.length : next;
    let text = html.slice(i, end);
    const trimmed = text.replace(/\s+/g, " ").trim();
    const prose = trimmed.length > 24 && /[a-z]/.test(trimmed) && /\s/.test(trimmed);
    const shortClaim = /^(KYC|USDC|1 USDC\.|100 USDC|1,000 USDC|10,000 USDC|10 000 USDC|100 000 USDC|jobs@erax\.digital|security@erax\.digital)$/i.test(trimmed);
    if (!GOOD.test(trimmed) && ((aggressive && prose && CLAIM.test(trimmed)) || shortClaim || CLAIM.test(trimmed) && prose)) {
      text = NEUTRAL;
    }
    out += text;
    i = end;
  }
  return out;
}

const INDEX_FIXES = [
  ["is creating a unified platform where social interaction,", "is an independent Web3 company focused on SocialFi, digital ownership, and creator tools."],
  ["financial tools, and the tokenization of real world assets", "Products are being designed and are not live."],
  ["work together — giving every participant the opportunity", "Ethereum and Base are the planned networks."],
  ["to become a full-fledged part of the digital economy.", "No user counts or token sales are claimed."],
  ["RWA platform, mining application", "Innovation across social, wallet, and creator tools."],
  ["The first RWA token, EraX Digital, has been launched — the token of EraX Digital’s CEO and founder.", "No token has been launched, and no founder is named on this site."],
  ["The first RWA token, EraX Digital, has been launched — the token of EraX Digital's CEO and founder.", "No token has been launched, and no founder is named on this site."],
];

for (const file of walk(ROOT)) {
  let html = fs.readFileSync(file, "utf8");
  const original = html;
  const base = path.basename(file);
  html = html.replace(/aria-label="Invest on Wefunder"/g, 'aria-label="View roadmap"');
  html = html.replace(/aria-label="press@erax\.digital"/g, 'aria-label="Contact"');
  html = html.replace(/aria-label="jobs@erax\.digital"/g, 'aria-label="Careers"');
  html = html.replace(/aria-label="security@erax\.digital"/g, 'aria-label="Trust Center"');
  html = html.replace(/mailto:jobs@erax\.digital/g, "/team");
  html = html.replace(/mailto:security@erax\.digital/g, "/trust-center");
  html = html.replace(/jobs@erax\.digital/g, "Careers");
  html = html.replace(/security@erax\.digital/g, "Trust Center");
  if (base === "index.html") {
    for (const [a, b] of INDEX_FIXES) html = html.split(a).join(b);
  }
  html = transform(html, AGGRESSIVE.has(base));
  if (base === "built-on-stellar.html") {
    html = html.replace(
      "This document has not been published. It will be added when EraX Digital releases its policies.",
      "Ethereum is the planned primary network. Base is the first Layer 2 for creator payments, memberships, and everyday transactions. This architecture is proposed, not deployed."
    );
    html = html.replace("Partners / BD", "View roadmap");
  }
  if (html !== original) {
    fs.writeFileSync(file, html);
    console.log("cleaned", path.relative(ROOT, file));
  }
}
