const fs = require("fs");
const file = "index.html";
let html = fs.readFileSync(file, "utf8");

const done = "color:#1F8A4C";
const next = "color:#3D7EFF";
const later = "color:#8A8A8A";
const status = (color, label) => `<span style="${color}">${label}</span>`;

function once(from, to) {
  const n = html.split(from).length - 1;
  if (n !== 1) throw new Error(`Expected 1 match for "${from.slice(0, 80)}", found ${n}`);
  html = html.replace(from, to);
}

once("A proposed plan", "Development status");
once("for EraX Digital —", "Foundation is complete.");
once("six development phases", "Infrastructure is complete.");
once("none of them completed", "Social platform is next.");
once(">Vision<", ">Development status<");
once("Proposed roadmap", "Development status");
once(
  "Six phases. None are presented as completed.",
  "EraX Digital has completed its strategic foundation and core infrastructure phases, establishing the initial technical direction and architectural framework for its SocialFi ecosystem. The next stage focuses on developing the core social platform, followed by creator monetization, security validation, and ecosystem expansion."
);

once("Phase 1 — Foundation", "01 — Strategic Foundation");
once(
  "Establish independent positioning, product requirements, SocialFi architecture, and the Ethereum and Base strategy.",
  `${status(done, "Completed")}. Established the company's product vision, independent positioning, technical direction, and initial ecosystem strategy.`
);
once("Phase 2 — Core Infrastructure", "02 — Core Infrastructure");
once(
  "Plan backend architecture, authentication, profiles, wallet connectivity, databases, APIs, and security. Not started as a public milestone.",
  `${status(done, "Completed")}. Established the foundational technical architecture and infrastructure required to support the EraX Digital ecosystem.`
);
once("Phase 3 — SocialFi Platform", "03 — SocialFi Platform");
once(
  "Plan registration, feeds, publishing, likes, comments, communities, messaging, and wallet-connected experiences.",
  `${status(next, "Upcoming")}. Develop the core social experience connecting users, communities, and digital ownership. Planned capabilities include registration and profiles, feeds and publishing, likes and comments, communities, private messaging, and wallet-connected experiences.`
);
once("Phase 4 — Creator Economy", "04 — Creator Economy");
once(
  "Plan creator profiles, paid content, subscriptions, tips, and Base smart-contract integration. No token sale is offered.",
  `${status(later, "Planned")}. Introduce tools that help creators build communities and develop monetization opportunities. Planned capabilities include creator profiles, paid content and subscriptions, tipping and digital payments, Base smart-contract integration, on-chain payments, and community engagement tools.`
);
once("Phase 5 — Security and Beta", "05 — Security, Testing &amp; Beta Launch");
once(
  "Plan contract testing, security reviews, monitoring, closed beta, and product improvements. No beta is open.",
  `${status(later, "Planned")}. Prepare the platform for controlled testing and a potential beta release. Planned activities include smart-contract testing, security assessments, performance and reliability testing, monitoring, closed beta preparation, and product refinement.`
);
once("Phase 6 — Ecosystem Expansion", "06 — Ecosystem Growth &amp; Expansion");
once(
  "Later work may study scalability, creator tools, wallets, rewards, cross-chain transfer, and tokenization. Nothing here is live.",
  `${status(later, "Future Development")}. Explore additional capabilities to expand the EraX Digital ecosystem over time. Potential areas include advanced creator tools, enhanced wallet functionality, rewards and staking mechanisms, cross-chain interoperability, digital asset and tokenization capabilities, and infrastructure scalability.`
);
once("Proposed only", "Development Transparency");
once(
  "These items are planning notes. EraX Digital is not claiming users, revenue, licenses, or partnerships.",
  "Phases 01 and 02 are marked as completed development milestones. This does not imply that the complete platform or all planned features are publicly available."
);
once("Not a completed milestone", "Development Transparency");
once(
  "Do not read this timeline as company history. Dates and past achievements from the previous site have been removed.<strong>No token has been launched for EraX Digital.</strong>. No token has been launched, and no founder is named on this site. <strong>A</strong>Token launches are not part of this roadmap.<strong>has been launched</strong>. <strong>Media mentions, investment rounds, and ambassador contracts are not claimed.</strong>",
  "Phases 03–06 represent planned development activities and future capabilities. EraX Digital has not announced a token launch or token sale. No unverified claims are made regarding users, revenue, licenses, partnerships, funding rounds, or public beta availability."
);

once(
  '<h3 class="u-text-style-h4">Phase 1–2</h3>',
  `<h3 class="u-text-style-h4">Strategic Foundation <span style="${done}">Completed</span></h3>`
);
once("Define product requirements and architecture.", "Company positioning and product vision.");
once("Design wallet connectivity and the Ethereum and Base approach.", "Product requirements and ecosystem strategy.");
once("Prepare technical documentation and priorities.", "Initial SocialFi architecture.");
once(
  "No license is claimed. Regulatory review comes before any future rewards product.",
  "Ethereum Mainnet and Base network strategy."
);
once("No card program is offered.", "Security, scalability, and infrastructure principles.");

once(
  '<h3 class="u-text-style-h4">Phase 3–4</h3>',
  `<h3 class="u-text-style-h4">Core Infrastructure <span style="${done}">Completed</span></h3>`
);
once(
  "Build profiles, feeds, and communities. Add paid content, subscriptions, and tips.",
  "Backend architecture and foundational infrastructure."
);
once("Integrate Base for creator payments after testing.", "Authentication and user identity framework.");
once(
  "<strong>Planned</strong>No user or holder counts are claimed.",
  "Account and profile management foundations."
);
once("Test contracts, security, and a closed beta.", "Wallet connectivity architecture.");
once(
  "Study scalability and additional wallet features.<strong>Evaluate rewards, cross-chain transfer, and tokenization later.</strong>",
  "Database and API infrastructure."
);
once(
  "<strong>Those later ideas are not available services.</strong>No token emission is planned on this website.",
  "Foundational security and access-control design."
);

once(
  '<h3 class="u-text-style-h4">Phase 5–6</h3>',
  `<h3 class="u-text-style-h4">SocialFi Platform <span style="${next}">Upcoming</span></h3>`
);
once(
  "Keep the ecosystem useful, clear, and accessible.",
  "Registration, profiles, feeds, and content publishing."
);
once(
  "Security reviews and independent audits only where appropriate. None are claimed as complete.",
  "Communities, messaging, likes, and comments."
);
once(
  "No government or corporate partnerships are claimed.",
  "Wallet-connected user experiences."
);

fs.writeFileSync(file, html);
console.log("updated", file);
