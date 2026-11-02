const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DESC =
  "EraX Digital is developing a connected Web3 ecosystem combining social networking, digital wallets, creator monetization and Ethereum-based technology.";
const LOGO =
  "https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a3d628e2127e33a1c24eb16_Cassator_Logotype_Horizontal_Transparent.svg";
const LEGAL =
  "<p>EraX Digital has not published this policy yet. This page is not a legal agreement, a registration, a license, or an offer. The policy will be added here when the company publishes it.</p>";
const ARTICLE =
  "<p>This is a planning note for EraX Digital. It is not a press release, a partnership announcement, or a statement that a product is available.</p><p>EraX Digital is developing a connected Web3 ecosystem that combines social networking, digital ownership, digital wallets, and creator monetization. Ethereum is the planned primary network. Base is the first Layer 2 prioritized for everyday activity. EraX Earn, EraX Bridge, and EraX Assets are future possibilities and are not operational.</p>";

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

const URLS = [
  ["https://wefunder.com/cassator", "/investors"],
  ["https://stellar.org/", "/built-on-stellar"],
  ["https://stellar.org", "/built-on-stellar"],
  ["https://cassator-brandbook.webflow.io/", "/newsroom"],
  ["https://cassator-brandbook.webflow.io", "/newsroom"],
  ["https://x.com/cassator", "/newsroom"],
  ["https://twitter.com/cassator", "/newsroom"],
  ["https://www.instagram.com/sl8.online", "/sl8"],
  ["https://instagram.com/sl8.online", "/sl8"],
  ["https://www.facebook.com/sl8.online", "/sl8"],
  ["https://facebook.com/sl8.online", "/sl8"],
  ["https://apps.apple.com/ua/app/sl8-social-platform/id1540326210", "/sl8"],
  ["https://play.google.com/store/apps/details?id=mobile.sl8.app", "/wallet"],
  ["https://sl8.online/", "/paid-content"],
  ["https://sl8.online", "/paid-content"],
  ["https://www.cassator.com/", "/"],
  ["https://www.cassator.com", "/"],
  ["https://cassator.com/", "/"],
  ["https://cassator.com", "/"],
  ["mailto:hello@erax.digital", "/team"],
  ["mailto:press@erax.digital", "/newsroom"],
  ["mailto:privacy@erax.digital", "/trust-center"],
  ["mailto:compliance@erax.digital", "/trust-center"],
  ["mailto:support@erax.digital", "/team"],
  ["mailto:hello@cassator.corp", "/team"],
  ["mailto:press@cassator.corp", "/newsroom"],
  ["mailto:privacy@cassator.corp", "/trust-center"],
  ["mailto:compliance@cassator.corp", "/trust-center"],
];

const EXACT = {
  SL8: "Ecosystem",
  "Sl8 — Overview": "EraX Social",
  "SL8 — Overview": "EraX Social",
  "RWA Platform": "EraX Assets",
  "RWA platform": "EraX Assets",
  "Wallet &amp; Staking": "EraX Wallet",
  "Wallet & Staking": "EraX Wallet",
  "Paid Content": "EraX Creator",
  "Paid content": "EraX Creator",
  Investors: "Roadmap",
  Newsroom: "Company",
  Team: "Careers",
  "About us": "About",
  "Built on Stellar": "Technology",
  "Built on Stellar Network": "Technology",
  "Go to Sl8": "Ecosystem",
  "Open Sl8": "Ecosystem",
  "Learn about the Sl8 platform": "Explore the ecosystem",
  "Learn about Sl8": "Explore the ecosystem",
  "Platform SL8": "Ecosystem",
  "App Store": "EraX Social",
  "Google Play": "EraX Wallet",
  "Web Version": "EraX Creator",
  Wefunder: "Roadmap",
  "SEC Filing": "Trust Center",
  "Stellar.org": "Technology",
  "Media Kit": "Company",
  "Invest on Wefunder": "View roadmap",
  "Download Media Kit": "View roadmap",
  "hello@erax.digital": "Contact",
  "press@erax.digital": "Contact",
  "privacy@erax.digital": "Trust Center",
  "compliance@erax.digital": "Trust Center",
  "Campaign on Wefunder": "Proposed roadmap",
  Stellar: "Base",
  "Stellar Network": "Ethereum and Base",
  "$2M": "ETH",
  "6K": "Web3",
  "Revenue for 2025": "Primary network",
  "One of the largest": "First Layer 2",
  "projects on Stellar": "for everyday use",
  "Our journey": "Roadmap",
  "From an idea": "A proposed plan",
  "to a global platform —": "for EraX Digital —",
  "the key milestones": "six development phases",
  "of EraX Digital’s development": "none of them completed",
  "Over 6 Years": "Company",
  "Unified Ecosystem": "Accessibility",
  "Uniform rules": "User Ownership",
  "Short-term Goals": "Phase 1–2",
  "Mid-Term Goals": "Phase 3–4",
  "Long-term Vision": "Phase 5–6",
  "Social network": "EraX Social",
  "Built-in Financial System": "EraX Wallet",
  "The EraX Digital Team": "Careers at EraX Digital",
  "Meet the team": "Careers",
  "Dmytro Ivanov": "Open role",
  "Jacky Shikerya": "Open role",
  "Maryna Rudenko": "Open role",
  "Taras Shved": "Open role",
  "Yevhen Sytnychenko": "Open role",
  "Nikita Lyashenko": "Open role",
  "Yurii Kostin": "Open role",
  "Volodymyr Rudenko": "Open role",
  "Mykola Mytsyk": "Open role",
  "Danylo Kolotenko": "Open role",
  "Leroy Anders": "Open role",
  "Andrii Titov": "Open role",
  "Mykola Yelnikov": "Open role",
  "Vladyslav Marynchenko": "Open role",
  "Nikita Kolysko": "Open role",
  "Dmytro Domnych": "Open role",
  "Bohdan Nazarchuk": "Open role",
  "CEO &amp; Founder": "Open role",
  "CEO and Founder": "Open role",
  "Chief Technology Officer": "Open role",
  "Chief Operating Officer": "Open role",
  "Chief Infrastructure Officer": "Open role",
  "Lead Backend Engineer": "Open role",
  "Lead Frontend Engineer": "Open role",
  "Product Designer": "Open role",
  "QA Engineer": "Open role",
  "Backend Engineer": "Open role",
  "Frontend Engineer": "Open role",
  "Global Creator Partnerships Lead": "Open role",
  "Strategic Partnerships Manager": "Open role",
  "Ecosystem Growth Manager": "Open role",
  "Brand Partnerships Manager": "Open role",
  "Europe Creator Relations Manager": "Open role",
  "Influencer Campaign Coordinator": "Open role",
  "Operations Coordinator": "Open role",
  "Community Lead": "Open role",
  "Community Manager": "Open role",
};

const FULL = [
  [
    "We&#x27;re building an ecosystem that lets people tokenize",
    "EraX Digital is developing a connected digital ecosystem where people, communities and creators can connect, share experiences and participate in the evolving digital economy.",
  ],
  [
    "Not companies,not resources,not algorithms",
    "One Ecosystem. Multiple Possibilities. Bringing social experiences, digital ownership and creator opportunities together through a connected Web3 platform.",
  ],
  ["Not companies,", "One Ecosystem."],
  ["not metals,", "Multiple"],
  ["not algorithms —", "Possibilities."],
  ["not algorithms -", "Possibilities."],
  [
    "but people at the center of the new economy",
    "Bringing social experiences, digital ownership and creator opportunities together.",
  ],
  [
    "We believe",
    "Developing accessible digital experiences through Ethereum and Base blockchain infrastructure.",
  ],
  [
    "that the future belongs to an economy",
    "Ethereum is the planned primary network for ownership and settlement. Base is the first Layer 2 prioritized for everyday activity.",
  ],
  [
    "Since December 9, 2019",
    "EraX Digital is building the next generation of connected digital experiences",
  ],
  [
    "building an ecosystem around human potential",
    "by combining social networking, blockchain technology",
  ],
  [
    "Over these years, the project has grown",
    "and creator-focused financial tools.",
  ],
  [
    "idea into a platform where social interaction",
    "The products on this site are in development.",
  ],
  [
    "financial tools, and RWA tokenization work together",
    "No launch date is being announced.",
  ],
  [
    "Social network, financial layer",
    "Make blockchain technology and digital ownership easier for everyday users to understand and use.",
  ],
  [
    "Every token launches on the same terms",
    "Give users greater control over their digital identities, assets and online experiences.",
  ],
  [
    "Fraud protection, trust, transparency.",
    "Build reliable digital services with clear information about transactions, fees, security and platform functionality.",
  ],
  [
    "SL8 is a unified platform",
    "Innovation",
  ],
  [
    "with broad functionality",
    "Continuously develop useful applications by combining social technologies, blockchain infrastructure and digital financial services.",
  ],
  [
    "No micro-targeted advertising",
    "A planned SocialFi platform for profiles, feeds, following, communities, messaging, and wallet connectivity. Not available yet.",
  ],
  [
    "Tokenization of people",
    "A possible future product for digital asset issuance and tokenization. Not operational, and not a current service.",
  ],
  [
    "Built-in wallet with on-ramp",
    "A planned wallet for Ethereum connectivity, Base, ETH, supported ERC-20 assets, portfolio display, history, and transaction authorization.",
  ],
  [
    "Monetization for influencers",
    "A planned creator system for profiles, paid content, subscriptions, tips, memberships, and analytics. Not available yet.",
  ],
  ["Founders&#x27; Meeting", "Phase 1 — Foundation"],
  ["Founders' Meeting", "Phase 1 — Foundation"],
  [
    "Formation of the idea for a new type",
    "Establish independent positioning, product requirements, SocialFi architecture, and the Ethereum and Base strategy.",
  ],
  ["First Backers and Company Founding", "Phase 2 — Core Infrastructure"],
  [
    "First few thousand dollars",
    "Plan backend architecture, authentication, profiles, wallet connectivity, databases, APIs, and security. Not started as a public milestone.",
  ],
  ["First Concept", "Phase 3 — SocialFi Platform"],
  [
    "First applications in the App Store",
    "Plan registration, feeds, publishing, likes, comments, communities, messaging, and wallet-connected experiences.",
  ],
  ["Launch of SSLX Token, First Token Sales", "Phase 4 — Creator Economy"],
  [
    "First token sales and token holders",
    "Plan creator profiles, paid content, subscriptions, tips, and Base smart-contract integration. No token sale is offered.",
  ],
  ["New SL8 Apps and Web Version", "Phase 5 — Security and Beta"],
  [
    "Work began on new SL8 apps",
    "Plan contract testing, security reviews, monitoring, closed beta, and product improvements. No beta is open.",
  ],
  ["Wefunder, Stellar nodes", "Phase 6 — Ecosystem Expansion"],
  [
    "SEC filings and launch of a test campaign",
    "Later work may study scalability, creator tools, wallets, rewards, cross-chain transfer, and tokenization. Nothing here is live.",
  ],
  ["Global Influencers, Pivot", "Proposed only"],
  [
    "Signing letters of intent",
    "These items are planning notes. EraX Digital is not claiming users, revenue, licenses, or partnerships.",
  ],
  ["Brand Ambassadors, Launch", "Not a completed milestone"],
  [
    "Signing the first contracts",
    "Do not read this timeline as company history. Dates and past achievements from the previous site have been removed.",
  ],
  [
    "The first version of the token launch",
    "No token has been launched for EraX Digital.",
  ],
  [
    "pipeline for finding and launching",
    "Token launches are not part of this roadmap.",
  ],
  [
    "We are mentioned for the first time",
    "Media mentions, investment rounds, and ambassador contracts are not claimed.",
  ],
  ["EraX Digital 2030", "Proposed roadmap"],
  [
    "Growth Trajectory",
    "Six phases. None are presented as completed.",
  ],
  ["Start scaling the RWA platform", "Define product requirements and architecture."],
  [
    "Launch of token creator dashboard",
    "Design wallet connectivity and the Ethereum and Base approach.",
  ],
  ["Expand the influencer-shareholder base", "Prepare technical documentation and priorities."],
  ["Obtain MiCA license", "No license is claimed. Regulatory review comes before any future rewards product."],
  ["Issue VISA", "No card program is offered."],
  ["Full-featured", "Build profiles, feeds, and communities."],
  ["asset marketplace", "Add paid content, subscriptions, and tips."],
  ["Number of launched tokens", "Integrate Base for creator payments after testing."],
  ["15M+", "Planned"],
  ["RWA token holders", "No user or holder counts are claimed."],
  ["Integration of distributed ledgers", "Test contracts, security, and a closed beta."],
  ["of countries that have moved", "Collect feedback before any public release."],
  ["Bringing all products to", "Study scalability and additional wallet features."],
  ["near-ideal UI/UX", "Evaluate rewards, cross-chain transfer, and tokenization later."],
  ["Start distributing part", "Those later ideas are not available services."],
  ["of the emission to states", "No token emission is planned on this website."],
  [
    "New global social and financial infrastructure",
    "Keep the ecosystem useful, clear, and accessible.",
  ],
  [
    "Ensuring the development, protection",
    "Security reviews and independent audits only where appropriate. None are claimed as complete.",
  ],
  [
    "Partnerships with states",
    "No government or corporate partnerships are claimed.",
  ],
  [
    "I do not believe in AI. I believe in people.",
    "To create a connected digital world where people, communities and digital assets can interact, create value and grow together.",
  ],
  [
    "We are building infrastructure that gives people",
    "To simplify access to Web3 technology by combining social experiences, digital ownership and financial infrastructure into one accessible digital ecosystem.",
  ],
  [
    "People are the most valuable asset on the planet",
    "EraX Digital is building the next generation of connected digital experiences by combining social networking, blockchain technology and creator-focused financial tools.",
  ],
  ["Ready to learn more about SL8?", "Explore the EraX Digital ecosystem"],
  [
    "A platform with RWA, a wallet, staking",
    "EraX Social, EraX Wallet, and EraX Creator are in development. EraX Earn, EraX Bridge, and EraX Assets are future possibilities only.",
  ],
  [
    "registered in the State of Delaware",
    "EraX Digital is an independent Web3 technology company. Product features described on this website are in development unless a live service is actually shipped. This website is informational and is not an offer to sell a token, security, or investment product.",
  ],
  ["Delaware, United States.", ""],
  [
    "SL8 — the next-generation",
    "EraX Social",
  ],
  [
    "SL8 combines a social network",
    "EraX Social is a planned SocialFi platform for profiles, feeds, communities, messaging, and wallet connectivity. It is not a live network.",
  ],
  [
    "Social network without",
    "Profiles, feeds, and communities",
  ],
  [
    "No data collection, no microtargeting",
    "Planned features include publishing, likes, comments, sharing, notifications, and wallet connectivity.",
  ],
  [
    "You see why content is shown to you.",
    "Content ranking is still being designed.",
  ],
  [
    "Zero Data Harvesting",
    "In development",
  ],
  [
    ". No behavioral profiles for advertisers.",
    "Advertising profiles are not part of the plan.",
  ],
  [
    "Stellar wallet built in.",
    "Ethereum and Base wallet connectivity is planned.",
  ],
  [
    "directly from your feed.",
    "Creator tools are planned for a later phase.",
  ],
  [
    "People tokenization",
    "Future asset tools, not available",
  ],
  [
    "Buy, send, stake, swap, and invest",
    "EraX Wallet is a planned digital wallet for Ethereum and Base. It is designed for asset display, history, and transaction authorization. It is not available yet.",
  ],
  [
    "The SL8 wallet shows your entire portfolio",
    "A future portfolio view may show ETH and supported ERC-20 assets on Ethereum and Base.",
  ],
  [
    "Total portfolio value",
    "Portfolio view",
  ],
  [
    "USDC, XLM, SSLX",
    "ETH and supported ERC-20 assets",
  ],
  [
    "Every transaction is recorded on the Stellar",
    "Transactions would be recorded on Ethereum or Base. The wallet is not live, so there is no history to show yet.",
  ],
  [
    "Your Content Is Your Income.",
    "EraX Creator",
  ],
  [
    "Sl8 is a social network where monetization",
    "EraX Creator is a planned monetization system for paid content, subscriptions, tips, memberships, and analytics. It is not available, and it does not promise income.",
  ],
  [
    "A Layer is a thematic folder",
    "Paid content and memberships are planned product ideas, not a live checkout.",
  ],
  [
    "The creator sets a monthly subscription",
    "Subscription pricing is not set because the product is not live.",
  ],
  [
    "Your content is already worth money",
    "Creator monetization is a planned phase, not a current payout system.",
  ],
  [
    "EraX Digital chose Stellar",
    "EraX Digital is planning an Ethereum-first architecture. Base is the first Layer 2 prioritized for consumer activity such as creator payments and everyday transactions.",
  ],
  [
    "A network built for real transactions",
    "Planned networks",
  ],
  [
    "Transactions confirm in seconds",
    "Ethereum settles important ownership and contract activity. Base is intended for lower-cost consumer interactions. This infrastructure is proposed, not deployed here.",
  ],
  [
    "Why this matters for",
    "Planned technical stack",
  ],
  [
    "Official releases, product updates",
    "Notes on EraX Digital's planned products and technology. These are not press releases or announcements of a live platform.",
  ],
  [
    "Who Owns Your Future Income? The Rise of RWA Human Capital Markets",
    "Digital ownership and creator participation",
  ],
  [
    "Tokenization is moving beyond assets",
    "A planning note about digital ownership. No market is being launched.",
  ],
  [
    "Can Crypto Finally Solve The",
    "Making Web3 payments easier to use",
  ],
  [
    "The RWA Tokenization Of Human Potential",
    "A planned approach to digital ownership",
  ],
  [
    "From the creator economy to the tokenized economy",
    "Creator monetization in a connected ecosystem",
  ],
  [
    "The First ",
    "A future ",
  ],
  [
    " for tokenizing people",
    " for digital ownership",
  ],
  [
    "Not oil. Not real estate. Not bonds.",
    "Future possibility. Not available today.",
  ],
  [
    "EraX Digital builds infrastructure where public figures tokenize",
    "EraX Assets is a possible future tokenization capability. It is not operational and is not an investment product.",
  ],
  [
    "Building long-term infrastructure",
    "To simplify access to Web3 by combining social experiences, digital ownership, and financial infrastructure.",
  ],
  [
    "We raise the bar at every stage",
    "Make blockchain technology and digital ownership easier for everyday users to understand and use.",
  ],
  [
    "The rules are clear, and decisions are explainable.",
    "Build reliable services with clear information about transactions, fees, security, and functionality.",
  ],
  [
    "Every decision we make is weighed against",
    "Give users greater control over their digital identities, assets, and online experiences.",
  ],
  [
    "We move fast and own our results.",
    "Continuously develop useful applications from social technology, blockchain infrastructure, and digital financial services.",
  ],
  [
    "We build for people from different countries",
    "The product should be understandable without specialist knowledge.",
  ],
  [
    "Every decision serves the entire system",
    "Social, wallet, and creator tools are being designed as one ecosystem.",
  ],
  [
    "We build infrastructure of trust",
    "Policies for privacy, security, safety, and compliance have not been published yet.",
  ],
  [
    "Four Principles of Trust",
    "Documents",
  ],
  [
    "Data minimization. Clear settings.",
    "Policy not yet published.",
  ],
  [
    "How we collect, use, and protect your data",
    "This policy has not been published.",
  ],
  ["More than 6,000", "SocialFi"],
  ["token holders", "in development"],
  ["$SSLX", "ERC-20"],
  ["24M +", "Planned"],
  ["24M+", "Planned"],
  ["4 ×", "Planned"],
  ["0 % ads", "No ads claim"],
  ["100 %", "Planned"],
  ["62% APY", "Not offered"],
  ["62%", "—"],
  ["38%", "—"],
  ["0.1–3%", "—"],
  ["0.1-3%", "—"],
  ["$500,000", "—"],
  ["$1.2M", "—"],
  ["$1.2", "—"],
  ["550K", "—"],
  ["260K", "—"],
  ["15M+", "—"],
  ["100,000", "—"],
];

const FILE_EXACT = {
  "index.html": {
    Safety: "Transparency",
  },
  "team.html": {
    "Striving for Excellence": "Accessibility",
    Transparency: "User Ownership",
    "Accountability to Members": "Transparency",
    "Speed and Accountability": "Innovation",
    Openness: "Open access",
    "Unified Platform Principle": "Connected ecosystem",
  },
};

const BANNED =
  /\b(SL8|Sl8|SSLX|Stellar|Horizon|Wefunder|Delaware|SEC|APY|MiCA|Ivanov|Cassator|CASSATOR|USDC|XLM|Forbes|VISA|Mastercard|KYC|VASP|validator|seed phrase|Wefunder|sl8)\b/;

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "mirror" || name === "node_modules" || name === ".git") continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function replaceRich(html, notice) {
  const marker = '<div class="u-rich-text w-richtext">';
  let out = "";
  let cursor = 0;
  while (true) {
    const start = html.indexOf(marker, cursor);
    if (start < 0) {
      out += html.slice(cursor);
      break;
    }
    const openEnd = start + marker.length;
    let depth = 1;
    let i = openEnd;
    let closeAt = -1;
    while (i < html.length && depth > 0) {
      const nextOpen = html.indexOf("<div", i);
      const nextClose = html.indexOf("</div>", i);
      if (nextClose < 0) break;
      if (nextOpen >= 0 && nextOpen < nextClose) {
        depth++;
        i = nextOpen + 4;
      } else {
        depth--;
        if (depth === 0) closeAt = nextClose;
        i = nextClose + 6;
      }
    }
    if (closeAt < 0) {
      out += html.slice(cursor);
      break;
    }
    out += html.slice(cursor, openEnd) + notice;
    cursor = closeAt;
  }
  return out;
}

function transformText(text, fileExact) {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (fileExact && fileExact[trimmed] != null) {
    const lead = text.match(/^\s*/)[0];
    const tail = text.match(/\s*$/)[0];
    return lead + fileExact[trimmed] + tail;
  }
  if (EXACT[trimmed] != null) {
    const lead = text.match(/^\s*/)[0];
    const tail = text.match(/\s*$/)[0];
    return lead + EXACT[trimmed] + tail;
  }
  for (const [needle, replacement] of FULL) {
    if (text.includes(needle)) return replacement;
  }
  let next = text;
  next = next.replace(/\bSL8\b/g, "EraX Social");
  next = next.replace(/\bSl8\b/g, "EraX Social");
  next = next.replace(/\bSSLX\b/g, "supported assets");
  next = next.replace(/\bStellar\b/g, "Ethereum");
  next = next.replace(/\bHorizon\b/g, "the network");
  next = next.replace(/Newsroom/g, "Company");
  next = next.replace(/hello@erax\.digital/g, "Contact");
  next = next.replace(/press@erax\.digital/g, "Contact");
  next = next.replace(/privacy@erax\.digital/g, "Trust Center");
  next = next.replace(/compliance@erax\.digital/g, "Trust Center");
  if (BANNED.test(next) && /[a-z]/.test(next)) {
    return "This describes a planned EraX Digital capability and is not currently available.";
  }
  return next;
}

function transformHtml(html, fileExact) {
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
    out += transformText(html.slice(i, end), fileExact);
    i = end;
  }
  return out;
}

function applyMeta(html, file) {
  const base = path.basename(file);
  const title = TITLES[base] || "EraX Digital";
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = html.replace(
    /property="og:title" content="[^"]*"/g,
    `property="og:title" content="${title}"`
  );
  html = html.replace(
    /name="twitter:title" content="[^"]*"/g,
    `name="twitter:title" content="${title}"`
  );
  html = html.replace(
    /name="description" content="[^"]*"/g,
    `name="description" content="${DESC}"`
  );
  html = html.replace(
    /content="[^"]*" name="description"/g,
    `content="${DESC}" name="description"`
  );
  html = html.replace(
    /property="og:description" content="[^"]*"/g,
    `property="og:description" content="${DESC}"`
  );
  html = html.replace(
    /name="twitter:description" content="[^"]*"/g,
    `name="twitter:description" content="${DESC}"`
  );
  if (base === "index.html" && !html.includes('property="og:title"')) {
    html = html.replace(
      "</title>",
      `</title><meta property="og:title" content="${title}"/><meta property="og:description" content="${DESC}"/><meta property="og:type" content="website"/><meta name="twitter:card" content="summary"/><meta name="twitter:title" content="${title}"/><meta name="twitter:description" content="${DESC}"/>`
    );
  }
  return html;
}

const legalFiles = new Set([
  "privacy-policy.html",
  "terms-of-use.html",
  "security.html",
  "safety.html",
  "compliance-kyc-aml.html",
  "cookie-policy.html",
  "privacy.html",
  "terms.html",
  "compliance.html",
  "cookies.html",
]);

const articleFiles = new Set([
  "who-owns-your-future-income-the-rise-of-rwa-human-capital-markets.html",
  "can-crypto-finally-solve-the-paying-for-the-internet-problem.html",
  "the-rwa-tokenization-of-human-potential-a-new-concept-in-the-digital-economy.html",
  "from-the-creator-economy-to-the-tokenized-economy-how-the-digital-market-is-changing.html",
]);

const files = walk(ROOT);
for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/<link rel="stylesheet" href="\/assets\/brand\.css"\/?>/g, "");
  html = html.replace(/src="\/assets\/erax-logo\.svg"/g, `src="${LOGO}"`);
  html = html.replace(/alt="EraX Digital" class="image-2"/g, 'alt="" class="image-2"');
  html = html.replace('class="header Invest on Wefunder"', 'class="header"');
  html = html.replace(
    'People are<span data-text-animation="" class="is--accent"> undervalued</span> asset',
    'Built with<span data-text-animation="" class="is--accent"> Ethereum.</span> Designed for everyone.'
  );
  html = html.replace(
    '<div class="journey_year-text">20<span class="journey_year-span">18</span>',
    '<div class="journey_year-text">Ph<span class="journey_year-span">01</span>'
  );
  const yearMap = ["18", "19", "20", "21", "22", "24", "25", "26"];
  yearMap.forEach((y, idx) => {
    html = html.replace(
      `<div class="year-text">${y}`,
      `<div class="year-text">0${idx + 1}`
    );
  });
  html = html.replace('<div class="text-32">2026</div>', '<div class="text-32">01</div>');
  html = html.replace("2027 - 2028", "02");
  html = html.replace("2029 - 2030", "03");
  for (const [from, to] of URLS) html = html.split(from).join(to);
  html = html.replace(
    /<p class="u-paragraph-main is--white-55 is--trust">[\s\S]*?<\/p>/g,
    '<p class="u-paragraph-main is--white-55 is--trust">This document has not been published. It will be added when EraX Digital releases its policies.</p>'
  );
  const base = path.basename(file);
  if (legalFiles.has(base)) html = replaceRich(html, LEGAL);
  if (articleFiles.has(base)) html = replaceRich(html, ARTICLE);
  html = transformHtml(html, FILE_EXACT[base]);
  html = applyMeta(html, file);
  fs.writeFileSync(file, html);
  console.log("updated", path.relative(ROOT, file));
}

const chrome = path.join(ROOT, "js", "chrome.js");
if (fs.existsSync(chrome)) {
  let js = fs.readFileSync(chrome, "utf8");
  js = js
    .replace(/>SL8 </, ">Ecosystem <")
    .replace(/SL8 — Overview/g, "EraX Social")
    .replace(/RWA Platform/g, "EraX Assets")
    .replace(/Wallet & Staking/g, "EraX Wallet")
    .replace(/Paid Content/g, "EraX Creator")
    .replace(/Built on Stellar/g, "Technology")
    .replace(/Platform SL8/g, "Ecosystem")
    .replace(/Stellar\.org/g, "Technology")
    .replace("https://stellar.org/", "/built-on-stellar.html");
  fs.writeFileSync(chrome, js);
  console.log("updated js/chrome.js");
}
