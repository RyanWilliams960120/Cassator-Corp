const fs = require("fs");
const path = require("path");

const COMPANY =
  "EraX Digital is an independent Web3 technology company developing a connected digital ecosystem that brings together social networking, digital ownership, wallet infrastructure, and creator-focused experiences.";
const NOTICE =
  "Phases 01 and 02 represent completed foundational development milestones. The completion of these phases does not imply that all planned products or features are publicly available. Subsequent phases represent planned development activities and future capabilities. EraX Digital has not announced a token launch or token sale.";
const SOCIAL =
  "A planned SocialFi platform for user profiles, social feeds, content publishing, communities, messaging, and wallet connectivity.";
const WALLET =
  "A planned wallet experience for Ethereum and Base connectivity, digital asset management, portfolio visibility, and transaction authorization.";
const CREATOR =
  "A planned creator platform for profiles, content management, subscriptions, paid content, tipping, and creator monetization.";
const ASSETS =
  "A potential future product focused on digital asset issuance and tokenization. It is not currently operational.";

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "mirror" || name === "node_modules") continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function replaceCount(html, old, neu, expected, label) {
  const n = html.split(old).length - 1;
  if (expected != null && n !== expected) {
    throw new Error(label + ": expected " + expected + " found " + n);
  }
  if (!n) throw new Error(label + ": not found");
  return html.split(old).join(neu);
}

function patchFile(file, fn) {
  const before = fs.readFileSync(file, "utf8");
  const after = fn(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    console.log("updated", file);
  }
  return after;
}

patchFile("index.html", (html) => {
  html = html.replace(
    '<section class="journey u-section">',
    '<section id="roadmap" class="journey u-section">'
  );

  html = replaceCount(
    html,
    "EraX Digital is developing a connected digital ecosystem where people, communities and creators can connect, share experiences and participate in the evolving digital economy.",
    COMPANY,
    1,
    "hero"
  );

  html = replaceCount(
    html,
    "EraX Digital is developing a connected Web3 ecosystem combining social networking, digital wallets, creator monetization and Ethereum-based technology.",
    COMPANY,
    null,
    "meta"
  );

  html = replaceCount(
    html,
    "EraX Digital is building the next generation of connected digital experiences<br/>by combining social networking, blockchain technology<br/>and creator-focused financial tools.<br/>The products on this site are in development.<br/>No launch date is being announced.",
    COMPANY,
    1,
    "triangle company"
  );

  html = replaceCount(
    html,
    "is an independent Web3 company focused on SocialFi, digital ownership, and creator tools.<br/>Products are being designed and are not live.<br/>Ethereum and Base are the planned networks.<br/>No user counts or token sales are claimed.",
    "Products described on this site are in development and are not publicly available.",
    1,
    "triangle status"
  );

  html = replaceCount(
    html,
    "EraX Digital is building the next generation of connected digital experiences by combining social networking, blockchain technology and creator-focused financial tools.",
    COMPANY,
    1,
    "footer bio"
  );

  html = replaceCount(
    html,
    '<span class="sr-only">3 </span>principles that define us',
    '<span class="sr-only">4 </span>principles that define us',
    1,
    "principle count"
  );

  html = replaceCount(
    html,
    "Make blockchain technology and digital ownership easier for everyday users to understand and use.<br/>Innovation across social, wallet, and creator tools.",
    "Making Web3 technology and digital ownership easier to understand and use.",
    1,
    "accessibility"
  );
  html = replaceCount(
    html,
    "Give users greater control over their digital identities, assets and online experiences.",
    "Giving users greater control over their digital identities, assets, and online experiences.",
    1,
    "ownership"
  );
  html = replaceCount(
    html,
    "Build reliable digital services with clear information about transactions, fees, security and platform functionality.",
    "Communicating platform functionality, transactions, fees, and security clearly.",
    1,
    "transparency principle"
  );

  const innovationCard =
    '<div class="eye-card"><div class="principles_circle-inner"><div class="circle-num">4</div><h3 class="u-text-style-h3 m-28 is--eye">Innovation</h3><p class="u-paragraph-main">Continuously exploring useful applications of social technologies and blockchain infrastructure.</p></div></div>';
  html = replaceCount(
    html,
    '<p class="u-paragraph-main">Communicating platform functionality, transactions, fees, and security clearly.</p></div></div></div></div></section>',
    '<p class="u-paragraph-main">Communicating platform functionality, transactions, fees, and security clearly.</p></div></div>' +
      innovationCard +
      "</div></div></section>",
    1,
    "innovation card"
  );

  html = replaceCount(
    html,
    '<span class="gallery-line is--g1">Innovation</span><span class="gallery-line right is--gallery">Continuously develop useful applications by combining social technologies, blockchain infrastructure and digital financial services.</span></h2><p class="u-paragraph-main is--platform is--jet">Make blockchain technology and digital ownership easier for everyday users to understand and use.</p>',
    '<span class="gallery-line is--g1">Planned products.</span><span class="gallery-line right is--gallery">Social, wallet, and creator experiences.</span></h2><p class="u-paragraph-main is--platform is--jet">EraX Social, EraX Wallet, and EraX Creator are planned. EraX Assets is a potential future product and is not currently operational.</p>',
    1,
    "platform intro"
  );

  html = replaceCount(
    html,
    "A planned SocialFi platform for profiles, feeds, following, communities, messaging, and wallet connectivity. Not available yet.",
    SOCIAL,
    1,
    "home social"
  );
  html = replaceCount(
    html,
    "A possible future product for digital asset issuance and tokenization. Not operational, and not a current service.",
    ASSETS,
    1,
    "home assets"
  );
  html = replaceCount(
    html,
    "A planned wallet for Ethereum connectivity, Base, ETH, supported ERC-20 assets, portfolio display, history, and transaction authorization.",
    WALLET,
    1,
    "home wallet"
  );
  html = replaceCount(
    html,
    "A planned creator system for profiles, paid content, subscriptions, tips, memberships, and analytics. Not available yet.",
    CREATOR,
    1,
    "home creator"
  );

  html = replaceCount(
    html,
    "EraX Social, EraX Wallet, and EraX Creator are in development. EraX Earn, EraX Bridge, and EraX Assets are future possibilities only.",
    "EraX Social, EraX Wallet, and EraX Creator are planned products. EraX Assets is a potential future product and is not currently operational.",
    1,
    "cta"
  );

  html = replaceCount(
    html,
    '<div class="year-text">07</div><div class="year-text">08</div>',
    "",
    1,
    "years"
  );
  html = replaceCount(
    html,
    '<div class="journey_div"></div><div class="journey_div"></div><div class="journey_div"></div><div class="journey_div"></div><div class="journey_div"></div><div class="journey_div"></div><div class="journey_div"></div>',
    '<div class="journey_div"></div><div class="journey_div"></div><div class="journey_div"></div><div class="journey_div"></div><div class="journey_div"></div>',
    1,
    "dots"
  );

  const phases = [
    [
      '<span style="color:#1F8A4C">Completed</span>. Established the company\'s product vision, independent positioning, technical direction, and initial ecosystem strategy.',
      '<span style="color:#1F8A4C">Completed</span>. Established the company\'s product vision, independent positioning, technical direction, and initial ecosystem strategy, including company positioning, product requirements, the initial SocialFi architecture, an Ethereum Mainnet and Base network strategy, and security, scalability, and infrastructure principles.',
    ],
    [
      '<span style="color:#1F8A4C">Completed</span>. Established the foundational technical architecture and infrastructure required to support the EraX Digital ecosystem.',
      '<span style="color:#1F8A4C">Completed</span>. Established the foundational technical architecture required to support the EraX Digital ecosystem, including backend architecture, an authentication and user identity framework, account and profile foundations, wallet connectivity architecture, database and API infrastructure, and foundational security and access-control design.',
    ],
    [
      '<span style="color:#3D7EFF">Upcoming</span>. Develop the core social experience connecting users, communities, and digital ownership. Planned capabilities include registration and profiles, feeds and publishing, likes and comments, communities, private messaging, and wallet-connected experiences.',
      '<span style="color:#3D7EFF">Upcoming</span>. Develop the core social experience connecting users, communities, and digital ownership. Planned capabilities include user registration and customizable profiles, social feeds and content publishing, likes, comments, and social interactions, community creation, private messaging, and wallet-connected user experiences.',
    ],
    [
      '<span style="color:#8A8A8A">Planned</span>. Introduce tools that help creators build communities and develop monetization opportunities. Planned capabilities include creator profiles, paid content and subscriptions, tipping and digital payments, Base smart-contract integration, on-chain payments, and community engagement tools.',
      '<span style="color:#8A8A8A">Planned</span>. Introduce tools that help creators build communities and develop monetization opportunities. Planned capabilities include creator profiles and content management, paid content and subscriptions, creator tipping and digital payments, smart-contract integration on Base, on-chain payment infrastructure, and creator and community engagement tools.',
    ],
    [
      '<span style="color:#8A8A8A">Planned</span>. Prepare the platform for controlled testing and a potential beta release. Planned activities include smart-contract testing, security assessments, performance and reliability testing, monitoring, closed beta preparation, and product refinement.',
      '<span style="color:#8A8A8A">Planned</span>. Prepare the platform for controlled testing and a potential beta release. Planned activities include smart-contract testing and validation, security assessments, backend performance and reliability testing, monitoring and operational readiness, closed beta preparation, and product refinement.',
    ],
    [
      '<span style="color:#8A8A8A">Future Development</span>. Explore additional capabilities to expand the EraX Digital ecosystem over time. Potential areas include advanced creator tools, enhanced wallet functionality, rewards and staking mechanisms, cross-chain interoperability, digital asset and tokenization capabilities, and infrastructure scalability.',
      '<span style="color:#8A8A8A">Future Development</span>. Explore additional capabilities to expand the EraX Digital ecosystem over time. Potential areas include advanced creator and community tools, enhanced wallet functionality, potential rewards and staking mechanisms, cross-chain interoperability, digital asset and tokenization capabilities, and infrastructure scalability.',
    ],
  ];
  phases.forEach((pair, i) => {
    html = replaceCount(html, pair[0], pair[1], 1, "phase " + (i + 1));
  });

  const transparency =
    '<div class="journey_text"><div class="journey_text-inner"><h3 class="u-text-style-h4 hero">Development Transparency</h3><p class="u-paragraph-main-hero">Phases 01 and 02 are marked as completed development milestones. This does not imply that the complete platform or all planned features are publicly available.</p></div></div><div class="journey_text"><div class="journey_text-inner"><h3 class="u-text-style-h4 hero">Development Transparency</h3><p class="u-paragraph-main-hero">Phases 03–06 represent planned development activities and future capabilities. EraX Digital has not announced a token launch or token sale. No unverified claims are made regarding users, revenue, licenses, partnerships, funding rounds, or public beta availability.</p></div></div>';
  html = replaceCount(html, transparency, "", 1, "transparency cards");

  html = replaceCount(
    html,
    "To create a connected digital world where people, communities and digital assets can interact, create value and grow together.",
    "Open roles",
    1,
    "careers heading"
  );

  html = replaceCount(
    html,
    '</div></section><section class="vision u-section">',
    '</div><div class="u-container"><p class="u-paragraph-main">' +
      NOTICE +
      '</p></div></section><section class="vision u-section">',
    1,
    "notice"
  );

  const vStart = html.indexOf('<section class="vision u-section">');
  const vEnd = html.indexOf('<section class="team ', vStart);
  let vision = html.slice(vStart, vEnd);
  const vReplace = [
    ['<p class="u-paragraph-small link-appear">Development status</p>', '<p class="u-paragraph-small link-appear">Company</p>'],
    ['<h2 data-text-animation="letters-blur" class="u-text-style-h2 u-white-gradient">Development status</h2>', '<h2 data-text-animation="letters-blur" class="u-text-style-h2 u-white-gradient">Vision</h2>'],
    [
      "EraX Digital has completed its strategic foundation and core infrastructure phases, establishing the initial technical direction and architectural framework for its SocialFi ecosystem. The next stage focuses on developing the core social platform, followed by creator monetization, security validation, and ecosystem expansion.",
      "To create a connected digital world where people, communities and digital assets can interact, create value and grow together.",
    ],
    ['Strategic Foundation <span style="color:#1F8A4C">Completed</span>', "Vision"],
    ["Company positioning and product vision.", "People, communities, and digital assets."],
    ["Product requirements and ecosystem strategy.", "Interaction in a connected digital world."],
    ["Initial SocialFi architecture.", "Shared creation of value."],
    ["Ethereum Mainnet and Base network strategy.", "Space for communities to grow together."],
    ["Security, scalability, and infrastructure principles.", "One vision for the EraX Digital ecosystem."],
    ['Core Infrastructure <span style="color:#1F8A4C">Completed</span>', "Mission"],
    ["Backend architecture and foundational infrastructure.", "Simpler access to Web3 technology."],
    ["Authentication and user identity framework.", "Social experiences."],
    ["Account and profile management foundations.", "Digital ownership."],
    ["Wallet connectivity architecture.", "Financial infrastructure."],
    ["Database and API infrastructure.", "One accessible digital ecosystem."],
    ["Foundational security and access-control design.", "Wallet infrastructure and creator-focused experiences."],
    ['SocialFi Platform <span style="color:#3D7EFF">Upcoming</span>', "Positioning"],
    ["Registration, profiles, feeds, and content publishing.", "An independent Web3 technology company."],
    ["Communities, messaging, likes, and comments.", "Social networking, digital ownership, and wallet infrastructure."],
    ["Wallet-connected user experiences.", "Creator-focused experiences, still in development."],
  ];
  vReplace.forEach(([a, b], i) => {
    if (!vision.includes(a)) throw new Error("vision missing " + i + ": " + a.slice(0, 80));
    vision = vision.replace(a, b);
  });
  html = html.slice(0, vStart) + vision + html.slice(vEnd);

  html = replaceCount(
    html,
    "To simplify access to Web3 technology by combining social experiences, digital ownership and financial infrastructure into one accessible digital ecosystem.",
    "To simplify access to Web3 technology by combining social experiences, digital ownership, and financial infrastructure into one accessible digital ecosystem.",
    1,
    "mission punctuation"
  );

  return html;
});

const files = walk(".");
for (const file of files) {
  if (file === "index.html") continue;
  patchFile(file, (html) => {
    const pairs = [
      [
        "EraX Social is a planned SocialFi platform for profiles, feeds, communities, messaging, and wallet connectivity. It is not a live network.",
        SOCIAL,
      ],
      [
        "EraX Wallet is a planned digital wallet for Ethereum and Base. It is designed for asset display, history, and transaction authorization. It is not available yet.",
        WALLET,
      ],
      [
        "EraX Creator is a planned monetization system for paid content, subscriptions, tips, memberships, and analytics. It is not available, and it does not promise income.",
        CREATOR,
      ],
      [
        "EraX Assets is a possible future tokenization capability. It is not operational and is not an investment product.",
        ASSETS + " It is not an investment product.",
      ],
      [
        "EraX Digital is building the next generation of connected digital experiences by combining social networking, blockchain technology and creator-focused financial tools.",
        COMPANY,
      ],
    ];
    for (const [a, b] of pairs) {
      if (html.includes(a)) html = html.split(a).join(b);
    }
    html = html.replace(/<a\b[^>]*href="\/investors"[^>]*>[\s\S]*?<\/a>/g, (tag) => {
      const text = tag.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (text === "Roadmap") return tag.replace('href="/investors"', 'href="/#roadmap"');
      return tag;
    });
    return html;
  });
}

patchFile("index.html", (html) =>
  html.replace(/<a\b[^>]*href="\/investors"[^>]*>[\s\S]*?<\/a>/g, (tag) => {
    const text = tag.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (text === "Roadmap") return tag.replace('href="/investors"', 'href="/#roadmap"');
    return tag;
  })
);

const newsFixes = [
  [
    "newsroom/can-crypto-finally-solve-the-paying-for-the-internet-problem.html",
    "a Ethereum-based platform built by EraX Digital that brings together social interaction, digital wallets, peer-to-peer payments, and tokenization infrastructure.",
    "a planned SocialFi platform for user profiles, social feeds, content publishing, communities, messaging, and wallet connectivity.",
  ],
  [
    "newsroom/can-crypto-finally-solve-the-paying-for-the-internet-problem.html",
    "But EraX Social brings financial infrastructure much closer to the core experience, making wallets, monetization, and tokenization central from the start.",
    "EraX Social is planned to bring wallet connectivity and creator monetization closer to the social experience. Those capabilities are not available yet.",
  ],
  [
    "newsroom/from-the-creator-economy-to-the-tokenized-economy-how-the-digital-market-is-changing.html",
    "This approach is supported by a concrete infrastructure .This approach is supported by a concrete infrastructure. Through the EraX Social platform, users receive not just a social profile, but also an integrated wallet, monetization tools, peer-to-peer payments, and the ability to tokenize their value. This allows it to become a digital asset supported by a community and actively participating in the economy.",
    "EraX Social is a planned SocialFi platform for user profiles, social feeds, content publishing, communities, messaging, and wallet connectivity. Those features are not publicly available.",
  ],
  [
    "newsroom/from-the-creator-economy-to-the-tokenized-economy-how-the-digital-market-is-changing.html",
    "The platform is built on Ethereum Distributed Ledger Technology (DLT), enabling fast and transparent transactions as well as scalability. At the same time, upcoming partnerships with influencers reaching over 400 million people demonstrate clear market interest.",
    "EraX Digital plans to use Ethereum as its primary network and Base as its first Layer 2. No partnerships or audience figures are claimed.",
  ],
  [
    "newsroom/who-owns-your-future-income-the-rise-of-rwa-human-capital-markets.html",
    "Unlike traditional social platforms, EraX Social is built from the outset as a socio-financial infrastructure in which a person ceases to be just a user and becomes a participant in their own economic system. The platform combines the functions of a social network, a digital wallet, peer-to-peer payments, and tokenization tools, creating conditions under which talent, reputation, and audience can be transformed into digital assets.",
    "Unlike traditional social platforms, EraX Social is a planned product intended to connect social networking with wallet infrastructure and creator-focused experiences. It is not currently operational, and it does not offer tokenization.",
  ],
];

for (const [file, a, b] of newsFixes) {
  patchFile(file, (html) => {
    if (!html.includes(a)) throw new Error("missing news sentence in " + file + ": " + a.slice(0, 70));
    return html.replace(a, b);
  });
}

const loose = [
  ["rwa.html", "Who can issue their own token on EraX Social?", "Token issuance is not available."],
  ["compliance.html", "Creators complete verification before a token can be issued.", "Token issuance has not been announced."],
  ["terms.html", "Tokens launched on the RWA platform follow the published supply and distribution formula.", "EraX Digital has not announced a token launch or token sale."],
];
for (const [file, a, b] of loose) {
  patchFile(file, (html) => {
    if (!html.includes(a)) {
      console.log("skip missing", file, a.slice(0, 50));
      return html;
    }
    return html.replace(a, b);
  });
}

const home = fs.readFileSync("index.html", "utf8");
const checks = {
  journeyCards: (home.match(/class="journey_text"/g) || []).length + (home.match(/class="journey_text is--1"/g) || []).length,
  years: (home.match(/class="year-text"/g) || []).length,
  dots: (home.match(/class="journey_div/g) || []).length,
  transparencyHeadings: (home.match(/Development Transparency/g) || []).length,
  developmentStatus: (home.match(/Development status/g) || []).length,
  eyeCards: (home.match(/class="eye-card/g) || []).length,
  notice: home.includes(NOTICE),
  company: (home.match(new RegExp(COMPANY.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length,
};
console.log(JSON.stringify(checks, null, 2));
