const fs = require("fs");

function sub(file, pairs) {
  let html = fs.readFileSync(file, "utf8");
  for (const [a, b] of pairs) {
    const n = html.split(a).length - 1;
    if (!n) {
      console.log("MISSING", file, a.slice(0, 70));
      continue;
    }
    html = html.split(a).join(b);
    console.log("replaced", n, "in", file);
  }
  fs.writeFileSync(file, html);
}

sub("newsroom/the-rwa-tokenization-of-human-potential-a-new-concept-in-the-digital-economy.html", [
  [
    'In the case of<a href="/paid-content" target="_blank"> EraX Social</a>, this is built on Ethereum, allowing financial interactions to be embedded directly into user activity with speed, low cost, and without intermediaries.',
    'EraX Social is a planned SocialFi platform. It is not currently operational, and it does not embed live financial transactions.',
  ],
]);

sub("investors.html", [
  [">Proposed roadmap<", ">EraX Assets<"],
  [
    'Future possibility. Not available today.<span class="is--500 is--white"><em>People.</em> </span>A potential future product focused on digital asset issuance and tokenization. It is not currently operational. It is not an investment product.',
    "A potential future product focused on digital asset issuance and tokenization. It is not currently operational. It is not an investment product.",
  ],
  [
    'aria-label="View roadmap" href="/investors" target="_blank"',
    'aria-label="View roadmap" href="/#roadmap"',
  ],
]);

sub("sl8.html", [
  ['aria-label="Roadmap" href="/investors"', 'aria-label="Roadmap" href="/#roadmap"'],
  [">EraX Social<span class=\"is--accent\">platform</span>", ">EraX Social <span class=\"is--accent\">platform</span>"],
]);

sub("rwa.html", [
  ['aria-label="Become an Investor" href="/investors"', 'aria-label="EraX Assets" href="/investors"'],
  ['aria-label="For Investors" href="/investors"', 'aria-label="EraX Assets" href="/investors"'],
]);

const rwa = fs.readFileSync("rwa.html", "utf8");
const t = rwa
  .replace(/<script[\s\S]*?<\/script>/g, " ")
  .replace(/<[^>]+>/g, "\n")
  .split("\n")
  .map((s) => s.replace(/\s+/g, " ").trim())
  .filter((s) => s.length > 25 && s.length < 240)
  .slice(0, 12);
console.log("\nRWA LEAD\n" + t.join("\n"));
