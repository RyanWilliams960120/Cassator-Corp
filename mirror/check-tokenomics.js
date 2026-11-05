const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}
const bad = [];
for (const file of walk(root, [])) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file);
  if (html.includes(">Whitepaper</a>") && !html.includes('href="/tokenomics"')) bad.push(rel + " no tokenomics");
  let i = 0;
  while ((i = html.indexOf(">Whitepaper</a>", i)) !== -1) {
    const next = html.slice(i, i + 180);
    if (!next.includes("/tokenomics") && !next.includes("nav_link-wrp")) bad.push(rel + " :: " + next.replace(/\s+/g, " ").slice(0, 140));
    i += 12;
  }
}
console.log(bad.join("\n") || "all whitepaper links followed");
const page = fs.readFileSync(path.join(root, "tokenomics.html"), "utf8");
console.log("page checks", {
  vesting: /vesting|emission|utility|TGE|82,000,000/i.test(page),
  rows: (page.match(/300,000,000|200,000,000|150,000,000|100,000,000/g) || []).length,
  pdf: page.includes("/docs/erax-tokenomics-faq.pdf"),
  current: page.includes('href="/tokenomics" aria-current="page"'),
  hero: page.includes("hero.js"),
  title: /<title>([^<]+)<\/title>/.exec(page)[1],
});
const wp = fs.readFileSync(path.join(root, "whitepaper.html"), "utf8");
console.log("whitepaper pointer", wp.includes("erax-tokenomics-faq.pdf"), "disclaimer intact", wp.includes("This whitepaper is provided for informational purposes only."));
const doc = fs.readFileSync(path.join(root, "documentation", "tokenomics.html"), "utf8");
console.log("docs pointer", doc.includes("This chapter is the written contract specification."), "still spec", doc.includes("No vesting, staking") || doc.includes("not vesting"));
const faq = fs.readFileSync(path.join(root, "documentation", "faq.html"), "utf8");
console.log("faq pointer", faq.includes("See Tokenomics.") ? "STILL SEE" : "updated", faq.includes('href="/tokenomics">Tokenomics</a> page'));
