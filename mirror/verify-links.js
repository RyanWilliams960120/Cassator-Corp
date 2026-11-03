const fs = require("fs");
const path = require("path");
const lib = require("../docs/library");
const root = path.join(__dirname, "..");
const slugs = new Set(lib.pages.map(function (p) { return p.slug; }));
let bad = 0;
function check(file) {
  const html = fs.readFileSync(file, "utf8");
  const hrefs = html.match(/href="\/documentation\/[a-z0-9-]+"/g) || [];
  hrefs.forEach(function (href) {
    const slug = href.slice("href=\"/documentation/".length, -1);
    if (!slugs.has(slug)) {
      bad += 1;
      if (bad < 8) console.log("bad", path.basename(file), slug);
    }
  });
}
check(path.join(root, "documentation.html"));
fs.readdirSync(path.join(root, "documentation")).forEach(function (name) {
  check(path.join(root, "documentation", name));
});
console.log("bad", bad);
const wp = fs.readFileSync(path.join(root, "docs", "whitepaper-print.html"), "utf8");
const text = wp.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
console.log("print words", text.split(" ").length);
["EraX Digital ecosystem overview", "High-level platform architecture", "SocialFi user interaction flow", "Wallet connection and approval flow", "Ethereum and Base network relationship", "On-chain and off-chain operations", "Creator payment flow", "Development roadmap"].forEach(function (label) {
  console.log(label, wp.includes(label));
});
const disc = "This whitepaper is provided for informational purposes only. It describes the current vision, proposed architecture, and intended development direction of EraX Digital. Certain features and technical components remain under development or are planned for future consideration. This document does not constitute an offer to sell securities, tokens, or other financial instruments, nor does it guarantee future functionality, performance, financial returns, or product availability. Technical specifications and development priorities may evolve.";
console.log("print disclaimer", wp.includes(disc));
