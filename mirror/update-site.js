const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const product = "https://erax-digital.vercel.app/";

function write(file, html) {
  const tmp = file + ".tmpwrite";
  fs.writeFileSync(tmp, html);
  fs.renameSync(tmp, file);
}

const jobs = [
  {
    title: "Smart Contract Engineer",
    jd: "Write and test Solidity for the ERAX token and later payment contracts. The token is specified and not deployed.",
    budget: "Budget agreed per hire",
  },
  {
    title: "Backend Engineer",
    jd: "Build accounts, posts, messages, and APIs for EraX Social.",
    budget: "Budget agreed per hire",
  },
  {
    title: "QA Engineer",
    jd: "Test EraX Social and later wallet and contract flows before a release.",
    budget: "Budget agreed per hire",
  },
  {
    title: "Web3 Frontend Engineer",
    jd: "Build wallet connection and social screens for Ethereum and Base.",
    budget: "Budget agreed per hire",
  },
];

const careersPath = path.join(root, "careers.html");
let careers = fs.readFileSync(careersPath, "utf8");
const start = careers.indexOf('id="positions"');
const end = careers.indexOf("position_popup");
if (start < 0 || end < 0) throw new Error("careers markers missing");
let chunk = careers.slice(start, end);
let n = 0;
chunk = chunk.replace(/data-position="[^"]+"([\s\S]*?)<h3 class="u-text-style-h4 u-white-gradient">[^<]*<\/h3>([\s\S]*?)<div class="text-11 is--white-55">[^<]*<\/div>([\s\S]*?)<div class="text-11 is--white-55">[^<]*<\/div>/g, function (_m, a, b, c) {
  const job = jobs[n++];
  if (!job) throw new Error("extra job card");
  return 'data-position="' + job.title + '"' + a +
    '<h3 class="u-text-style-h4 u-white-gradient">' + job.title + "</h3>" +
    '<p class="u-paragraph-small is--white-55">' + job.jd + "</p>" +
    b + '<div class="text-11 is--white-55">' + job.budget + "</div>" +
    c + '<div class="text-11 is--white-55">Remote</div>';
});
if (n !== 4) throw new Error("job cards " + n);
careers = careers.slice(0, start) + chunk + careers.slice(end);
if (/Product Manager \(Social Network\)|Blockchain Engineer|Head of Trust and Safety|Business Development/.test(careers)) {
  throw new Error("old role remains");
}
write(careersPath, careers);

const phases = [
  ["01 — Strategic Foundation", "2026 — Foundation", '<span style="color:#1F8A4C">Completed</span>. Company positioning, product requirements, the Ethereum and Base direction, and the architecture for accounts, data, and wallet connectivity.'],
  ["02 — Core Infrastructure", "2026 — EraX Social", '<span style="color:#1F8A4C">Available</span>. Accounts, posts, follows, comments, bookmarks, communities, and messages are in the current product. Creator subscriptions and on-chain payments are not.'],
  ["03 — SocialFi Platform", "2027 — Wallet and creator tools", '<span style="color:#8A8A8A">Planned</span>. EraX Wallet, paid content, subscriptions, and tips. This is not a public beta date.'],
  ["04 — Creator Economy", "2027 — Security and testing", '<span style="color:#8A8A8A">Planned</span>. Contract review, security testing, and release preparation. The ERAX token is specified and not deployed.'],
  ["05 — Security, Testing &amp; Beta Launch", "2028 — Ecosystem growth", '<span style="color:#8A8A8A">Future</span>. Broader creator, community, and wallet capability after the 2027 work.'],
  ["06 — Ecosystem Growth &amp; Expansion", "2028 — EraX Assets", '<span style="color:#8A8A8A">Future</span>. Issuance and tokenization remain a possibility. EraX Assets is not operational and is not an investment product.'],
];

const indexPath = path.join(root, "index.html");
let home = fs.readFileSync(indexPath, "utf8");
phases.forEach(function (phase) {
  const from = '<h3 class="u-text-style-h4 hero">' + phase[0] + "</h3>";
  const at = home.indexOf(from);
  if (at < 0) throw new Error("missing " + phase[0]);
  const pEnd = home.indexOf("</p>", at);
  home = home.slice(0, at) +
    '<h3 class="u-text-style-h4 hero">' + phase[1] + '</h3><p class="u-paragraph-main-hero">' + phase[2] + "</p>" +
    home.slice(pEnd + 4);
});
home = home.replace(
  '<div class="year-text">01<br/></div><div class="year-text">02</div><div class="year-text">03</div><div class="year-text">04</div><div class="year-text">05</div><div class="year-text">06</div>',
  '<div class="year-text">2026<br/></div><div class="year-text">2026</div><div class="year-text">2027</div><div class="year-text">2027</div><div class="year-text">2028</div><div class="year-text">2028</div>'
);
const vision = "To create a connected digital world where people, communities and digital assets can interact, create value and grow together.";
const visionNext = vision + " From 2026 through 2028 that work is sequenced by year: EraX Social in 2026, wallet and creator tools in 2027, and broader ecosystem growth in 2028.";
if (!home.includes(vision)) throw new Error("vision missing");
home = home.replace(vision, visionNext);
write(indexPath, home);

function retarget(html) {
  html = html.replace(/href="\/sl8"/g, 'href="' + product + '"');
  html = html.replace(/href="sl8\.html"/g, 'href="' + product + '"');
  return html.replace(/<a\b[^>]*href="https:\/\/erax-digital\.vercel\.app\/"[^>]*>/g, function (tag) {
    if (!/target=/.test(tag)) tag = tag.replace("<a", '<a target="_blank" rel="noopener noreferrer"');
    else if (!/rel=/.test(tag)) tag = tag.replace("<a", '<a rel="noopener noreferrer"');
    return tag;
  });
}

function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (entry) {
    if (entry.name === "mirror" || entry.name === "node_modules") return;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html") || entry.name === "chrome.js") {
      const before = fs.readFileSync(full, "utf8");
      const after = retarget(before);
      if (after !== before) write(full, after);
    }
  });
}
walk(root);

const chrome = fs.readFileSync(path.join(root, "js", "chrome.js"), "utf8");
if (chrome.includes("sl8.html") || chrome.includes('href="/sl8"')) throw new Error("chrome still points at sl8");
console.log("careers roles", n);
console.log("home years", (home.match(/2026 —/g) || []).length);
console.log("remaining sl8 hrefs", (fs.readFileSync(indexPath, "utf8").match(/href="\/sl8"/g) || []).length);
