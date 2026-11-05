const fs = require("fs");
const path = require("path");

function must(html, from, to, label) {
  const count = html.split(from).length - 1;
  if (count !== 1) {
    console.log("COUNT " + count + " " + label);
    if (!count) return html;
  } else {
    console.log("ok " + label);
  }
  return html.split(from).join(to);
}

let rwa = fs.readFileSync("rwa.html", "utf8");

const pairs = [
  ["No announced token supply. <span class=\"is--accent\">Always.</span>", "Not a token sale. <span class=\"is--accent\">Not live.</span>"],
  ["Nothing further is announced.", "EraX Assets does not sell tokens."],
  ["No initial sale is announced.", "Issuance is not open."],
  ["No liquidity pool is announced.", "No pool is live."],
  ["No reward pool is announced.", "No rewards are live."],
  ["No creator sale is announced.", "No creator sale is live."],
  ["No sale is <br/>‍<span class=\"is--accent\">announced</span>.", "This is not <br/>‍<span class=\"is--accent\">a sale</span>."],
  [">30 days </span>", ">Not set</span>"],
  [">360–720 days</span>", ">Not set</span>"],
  [">No sale share</span>", ">No sale</span>"],
  [">No fund split</span>", ">No split</span>"],
  ["Participation Limits", "Not available"],
  ["supported assets Staked", "Current status"],
  ["Initial Sale Limit", "Availability"],
  [">1 000 </p>", ">None</p>"],
  [">10 000 </p>", ">None</p>"],
  [">No limit</p>", ">None</p>"],
  [">Max Access</div>", ">Not open</div>"],
  ["Minimum participation —  for any tier", "No tier is open."],
  ["For Buyers", "Status"],
  ["What Do <span class=\"is--accent\">Buyers Get?</span>", "What this page <span class=\"is--accent\">does not offer</span>"],
  [">Five reasons </p>", ">Future only</p>"],
  ["VIP events</span>in development", "Events</span> are not scheduled"],
  ["Higher Chances <span class=\"text-span-9\"><em>of Survival</em></span>", "No promise <span class=\"text-span-9\"><em>of results</em></span>"],
  ["Not guarantees. Better odds.", "EraX Assets makes no performance claim."],
  ["Broad Opportunities for <span class=\"text-span-8\"><em>Earning and Fundraising</em></span>", "No live path for <span class=\"text-span-8\"><em>earning or fundraising</em></span>"],
  ["Liquidity is protected from <strong>rug pulls</strong>", "No liquidity pool is live."],
  [" is mandatory for all participants.", "No participation rule is in force."],
  ["No country count is published", "No launch geography is set"],
  ["Be Part of the <em>Future Today</em>", "A future idea, <em>not a launch</em>"],
  ["1M supported assets", "Not live"],
  ["Part of each <strong>new RWA</strong>", "No asset share is set"],
  ["No prize pool is announced", "No prize is offered"],
  ["<strong>Register </strong>→ activate wallet", "<strong>Registration </strong>is not open"],
  ["via on-ramp provider", "is not available"],
  ["→ RWA → choose a token", "is not a live market"],
  ["creator privileges", "are not included"],
  [">Token Buyer</h3>", ">Not a buyer flow</h3>"],
];

for (const [from, to] of pairs) rwa = must(rwa, from, to, from.slice(0, 48));

const ten = rwa.split(">10%</div>").length - 1;
console.log("10% headings", ten);
if (ten === 1) rwa = rwa.replace(">10%</div>", ">None</div>");

const prize = rwa.indexOf("No prize is offered");
if (prize > 0) {
  const pre = rwa.slice(prize - 360, prize);
  const num = pre.match(/u-text-style-h4">([^<]*\d[^<]*)</);
  console.log("prize heading", num && num[1]);
  if (num) rwa = rwa.slice(0, prize - 360) + pre.replace(num[0], 'u-text-style-h4">None<') + rwa.slice(prize);
}

const cta = rwa.indexOf(">For Investors</div>");
console.log("investors", cta);
if (cta > 0) {
  rwa = rwa.replace(">For Investors</div>", ">History</div>");
  const anchor = rwa.indexOf("<a ", cta);
  const end = rwa.indexOf("</a>", anchor);
  const tag = rwa.slice(anchor, end);
  console.log("anchor", tag.replace(/\s+/g, " ").slice(0, 240));
  const next = tag
    .replace(/aria-label="[^"]*"/, 'aria-label="History"')
    .replace(/href="[^"]*"/, 'href="/#history"')
    .replace(/\s*target="_blank"/, "");
  rwa = rwa.slice(0, anchor) + next + rwa.slice(end);
}

const srcs = new Set();
for (const m of rwa.matchAll(/<img[^>]*class="ascii_image"[^>]*>/g)) {
  const src = m[0].match(/src="([^"]+)"/);
  if (src) srcs.add(src[1]);
}
console.log("ascii srcs", [...srcs]);
for (const src of srcs) {
  if (/eagle|phoenix|Frame%2082|Group%2020|cassator/i.test(src)) {
    rwa = rwa.split(src).join("/assets/erax-logo.svg");
    console.log("swapped", src);
  }
}

fs.writeFileSync("rwa.html", rwa);

let index = fs.readFileSync("index.html", "utf8");
const a = index.indexOf('class="team u-section"');
const b = index.indexOf('id="CTA"', a);
let team = index.slice(a, b);
team = must(team, ">Careers</p>", ">Team</p>", "eyebrow");
team = must(team, ">Open roles</h2>", ">The team</h2>", "heading");
team = must(team, ">Careers</div>", ">Meet the team</div>", "button");
team = must(team, 'aria-label="Careers" href="/careers"', 'aria-label="Meet the team" href="/team"', "link");
index = index.slice(0, a) + team + index.slice(b);
fs.writeFileSync("index.html", index);

let wallet = fs.readFileSync("wallet.html", "utf8");
wallet = must(
  wallet,
  'Earn on <span class="is--accent">your assets.</span>',
  'Yield is <span class="is--accent">not offered.</span>',
  "wallet heading"
);
wallet = must(
  wallet,
  ">Not offered</p>",
  ">Staking and liquidity pools are not part of the current wallet plan.</p>",
  "wallet lead"
);
const offered = wallet.split(">Not offered</h3>").length - 1;
console.log("wallet h3 not offered", offered);
wallet = wallet.split(">Not offered</h3>").join(">Not available</h3>");
wallet = must(wallet, ">Protocol-level AMM</div>", ">Not in this plan</div>", "amm");
fs.writeFileSync("wallet.html", wallet);

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name === ".git") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
}
let n = 0;
for (const file of walk(".", [])) {
  const html = fs.readFileSync(file, "utf8");
  const next = html.replaceAll("/css/erax-identity.css?v=16", "/css/erax-identity.css?v=17");
  if (next !== html) {
    fs.writeFileSync(file, next);
    n += 1;
  }
}
console.log("css v17", n);
