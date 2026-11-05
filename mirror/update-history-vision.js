const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const icon = '<img src="https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a0841ede71127a317dcdc45_Rectangle%2014.svg" loading="lazy" width="14" height="11" alt="" class="icon-14"/>';

function write(file, html) {
  const tmp = file + ".tmpwrite";
  fs.writeFileSync(tmp, html);
  fs.renameSync(tmp, file);
}

function once(html, from, to, label) {
  const at = html.indexOf(from);
  if (at < 0 || html.indexOf(from, at + 1) >= 0) throw new Error("not unique: " + label);
  return html.replace(from, to);
}

function list(items) {
  return items.map(function (text) {
    return '<div class="vision_card-li">' + icon + '<p class="u-paragraph-small m-12">' + text + "</p></div>";
  }).join("");
}

function replaceList(html, open, close, items) {
  const start = html.indexOf(open);
  if (start < 0) throw new Error("missing list " + open);
  const inner = start + open.length;
  const end = html.indexOf(close, inner);
  if (end < 0) throw new Error("missing list end " + open);
  return html.slice(0, inner) + list(items) + html.slice(end);
}

function hideRoadmap(html) {
  html = html.replace(/<div class="nav_link-wrp"><img width="11" height="14" alt="" src="https:\/\/cdn\.prod\.website-files\.com\/6a05b20ea997c01d3bc68f2b\/6a0f75d3489c98f0632507c8_Rectangle%2014%20\(1\)\.svg" loading="lazy" class="nav_icon"\/><a href="\/#roadmap"[^>]*>Roadmap<\/a><\/div>/g, "");
  html = html.replace(/<a href="\/#roadmap"[^>]*>Roadmap<\/a>/g, "");
  return html;
}

function updateHome(html) {
  html = once(html, 'id="roadmap"', 'id="history"', "section id");
  html = once(
    html,
    'href="/#roadmap" class="cta_card w-inline-block"><h3 class="u-paragraph-small is--500 link-appear">Roadmap</h3>',
    'href="#history" class="cta_card w-inline-block"><h3 class="u-paragraph-small is--500 link-appear">History</h3>',
    "history card"
  );
  html = once(html, 'link-appear">Roadmap</p>', 'link-appear">History</p>', "history eyebrow");
  html = once(
    html,
    '<span class="gallery-line">Development status</span><span class="gallery-line j-2">Foundation is complete.</span><span class="gallery-line j-3">Infrastructure is complete.</span><span class="gallery-line right">2026 through 2028.</span>',
    '<span class="gallery-line">Company history</span><span class="gallery-line j-2">Founded in 2026.</span><span class="gallery-line j-3">EraXToken and EraX Social.</span><span class="gallery-line right">Launch preparation.</span>',
    "history heading"
  );
  html = once(
    html,
    '<div class="year-text">2026<br/></div><div class="year-text">2026</div><div class="year-text">2027</div><div class="year-text">2027</div><div class="year-text">2028</div><div class="year-text">2028</div>',
    '<div class="year-text">2026<br/></div><div class="year-text">2026</div><div class="year-text">2026</div><div class="year-text">2026</div><div class="year-text">2026</div><div class="year-text">2026</div>',
    "history years"
  );

  const steps = [
    ["2026 — Foundation", "2026 — Company founding", '<span style="color:#1F8A4C">Established</span>. EraX Digital is established with a vision to build a new generation of digital social and financial experiences.'],
    ["2026 — EraX Social", "2026 — EraXToken", '<span style="color:#3D7EFF">In progress</span>. The company begins its own digital ecosystem with the creation and planned launch of EraXToken.'],
    ["2027 — Wallet and creator tools", "2026 — EraX Social", '<span style="color:#3D7EFF">In progress</span>. Work progresses on EraX Social alongside token development.'],
    ["2027 — Security and testing", "2026 — Wallet connectivity", '<span style="color:#8A8A8A">Planned</span>. Ethereum and Solana wallet connectivity is planned, bringing blockchain functionality and digital asset interactions into the product.'],
    ["2028 — Ecosystem growth", "2026 — Ecosystem foundation", '<span style="color:#1F8A4C">Established</span>. The foundation is set for an interconnected ecosystem of social networking, digital ownership, and decentralized technologies.'],
    ["2028 — EraX Assets", "2026 — Launch preparation", '<span style="color:#3D7EFF">In progress</span>. Product launch preparation covers EraXToken and EraX Social.'],
  ];
  steps.forEach(function (step) {
    const from = '<h3 class="u-text-style-h4 hero">' + step[0] + "</h3>";
    const at = html.indexOf(from);
    if (at < 0) throw new Error("missing step " + step[0]);
    const pEnd = html.indexOf("</p>", at);
    html = html.slice(0, at) +
      '<h3 class="u-text-style-h4 hero">' + step[1] + '</h3><p class="u-paragraph-main-hero">' + step[2] + "</p>" +
      html.slice(pEnd + 4);
  });

  html = once(
    html,
    "To create a connected digital world where people, communities and digital assets can interact, create value and grow together. From 2026 through 2028 that work is sequenced by year: EraX Social in 2026, wallet and creator tools in 2027, and broader ecosystem growth in 2028.",
    "EraX Digital aims to build a global digital ecosystem that brings together social networking, digital assets, and blockchain technology in one unified platform. The vision is to make Web3 accessible by connecting familiar social experiences with decentralized technologies. Through EraXToken and EraX Social, people can connect, communicate, create content, participate in communities, and interact with digital assets. The mission is to connect people, technology, and digital ownership by building accessible products that make the decentralized internet more useful, engaging, and valuable for everyone. Connect. Create. Own.",
    "vision paragraph"
  );

  html = once(html, '<div class="text-32">2026</div><h3 class="u-text-style-h4">EraX Social</h3>', '<div class="text-32">2026</div><h3 class="u-text-style-h4">Short-term Goals</h3>', "2026 title");
  html = once(html, '<div class="text-32 is--2">2027</div><h3 class="u-text-style-h4">Wallet and creator tools</h3>', '<div class="text-32 is--2">2027</div><h3 class="u-text-style-h4">Mid-term Goals</h3>', "2027 title");
  html = once(html, '<div class="text-32 is--3">2028</div><h3 class="u-text-style-h4">Ecosystem growth</h3>', '<div class="text-32 is--3">2028</div><h3 class="u-text-style-h4">Long-term Vision</h3>', "2028 title");

  html = replaceList(html, '<div class="vision_card-list is--1">', '</div></div><div class="vision_card is--2">', [
    "Establish EraX Digital and define its core ecosystem.",
    "Complete development and launch the first version of EraXToken.",
    "Develop and prepare EraX Social for public launch.",
    "Integrate Ethereum and Solana wallet connectivity into EraX Social.",
    "Establish the foundation for token utility within the EraX ecosystem.",
    "Build the initial user community and attract early adopters.",
    "Establish strategic partnerships with blockchain projects and technology providers.",
    "Prepare the technical and operational foundation for international expansion.",
  ]);
  html = replaceList(html, '<div class="vision_card-list is--2">', '</div></div><div class="vision_card is--3">', [
    "Expand EraX Social and grow an international user community.",
    "Integrate Ethereum and Solana wallets into the platform.",
    "Develop the EraXToken ecosystem and expand its utility.",
    "Introduce new opportunities for creator monetization and community participation.",
    "Establish strategic partnerships with Web3 projects and digital communities.",
    "Improve platform scalability, security, and user experience.",
  ]);
  html = replaceList(html, '<div class="vision_card-list">', '</div></div></div></div></section>', [
    "Establish EraX Digital as a global social and digital ownership ecosystem.",
    "Build an integrated creator economy with monetization and digital rewards.",
    "Expand cross-chain capabilities and blockchain integrations.",
    "Develop digital asset services and marketplace functionality.",
    "Build a global network of creators, users, communities, and strategic partners.",
    "Create sustainable economic opportunities through the EraX ecosystem.",
  ]);

  const claims = [
    ["EraX Social is available. EraX Wallet and EraX Creator are in development. EraX Assets is not operational.", "EraX Social is being prepared for public launch. EraX Wallet and EraX Creator are in development. EraX Assets is not operational."],
    ["Available now. Wallet and creator tools are planned.", "Prepared for launch. Ethereum and Solana wallet connectivity is planned."],
    ["The current social product for accounts, posts, follows, comments, communities, and messages.", "In development for public launch, with Ethereum and Solana wallet connectivity planned."],
    ["EraX Social is the current product. EraX Wallet and EraX Creator are planned. EraX Assets is a potential future product and is not currently operational.", "EraX Social is being prepared for public launch. EraX Wallet and EraX Creator are planned. EraX Assets is not currently operational."],
    ["EraX Social is the current product. EraX Wallet and EraX Creator are planned. EraX Assets is not currently operational.", "EraX Social is being prepared for public launch. EraX Wallet and EraX Creator are planned. EraX Assets is not currently operational."],
  ];
  claims.forEach(function (pair) {
    html = once(html, pair[0], pair[1], pair[0].slice(0, 40));
  });
  return html;
}

function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (entry) {
    if (entry.name === "mirror" || entry.name === "node_modules") return;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) {
      let html = fs.readFileSync(full, "utf8");
      const next = hideRoadmap(entry.name === "index.html" ? updateHome(html) : html);
      if (next !== html) write(full, next);
    }
  });
}
walk(root);

const chromePath = path.join(root, "js", "chrome.js");
let chrome = fs.readFileSync(chromePath, "utf8");
chrome = chrome.replace(/\r\n/g, "\n");
chrome = chrome.replace('      <a class="${active("investors.html")}" href="investors.html">Roadmap</a>\n', "");
chrome = chrome.replace(/      <a href="investors\.html">Roadmap<\/a>\n/g, "");
if (chrome.includes(">Roadmap<")) throw new Error("chrome still has Roadmap");
write(chromePath, chrome);

const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (home.includes(">Roadmap<")) throw new Error("homepage still shows Roadmap");
if (!home.includes("Short-term Goals") || !home.includes("Company founding")) throw new Error("history or vision missing");
console.log("homepage roadmap anchors", (home.match(/#roadmap/g) || []).length);
console.log("done");
