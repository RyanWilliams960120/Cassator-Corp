const fs = require("fs");
const path = require("path");

function walk(dir, out = []) {
  for (const n of fs.readdirSync(dir)) {
    if (n === "mirror" || n === "node_modules") continue;
    const p = path.join(dir, n);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (n.endsWith(".html")) out.push(p);
  }
  return out;
}

const broken = 'href="/paid-contentu/d7a043ab93152aecfd1e1374e206f02c"';
const fixed = 'href="/sl8"';
for (const f of walk(".")) {
  let html = fs.readFileSync(f, "utf8");
  if (!html.includes(broken)) continue;
  fs.writeFileSync(f, html.split(broken).join(fixed));
  console.log("social", f);
}

let rwa = fs.readFileSync("rwa.html", "utf8");
const pairs = [
  ['<p class="u-paragraph-small">EraX Social Platform</p>', '<p class="u-paragraph-small">EraX Assets</p>'],
  [
    'Planned EraX Digital work. This is not a live product and not an offer.<span class="is--accent">tokenize people.</span>',
    'A potential future product.<span class="is--accent">Not operational.</span>',
  ],
  [
    '<p class="u-paragraph-main _w-550"><span class="is--white-55">Planned EraX Digital work. This is not a live product and not an offer.</span></p>',
    '<p class="u-paragraph-main _w-550"><span class="is--white-55">A potential future product focused on digital asset issuance and tokenization. It is not currently operational.</span></p>',
  ],
  [">Become a Creator<", ">EraX Creator<"],
  ['aria-label="Become a Creator"', 'aria-label="EraX Creator"'],
  [">Become an Investor<", ">Roadmap<"],
  ['aria-label="Become an Investor"', 'aria-label="Roadmap"'],
  ['aria-label="EraX Assets" href="/investors"', 'aria-label="Roadmap" href="/#roadmap"'],
  [">tokens in issuance<", ">No announced token supply<"],
];
for (const [a, b] of pairs) {
  const n = rwa.split(a).length - 1;
  console.log(n ? "ok " + n : "MISS", a.slice(0, 60));
  if (n) rwa = rwa.split(a).join(b);
}
rwa = rwa.replace(/>1[^<]{0,6}Billion</, ">None<");
fs.writeFileSync("rwa.html", rwa);
console.log("billion left", /Billion/.test(rwa));
