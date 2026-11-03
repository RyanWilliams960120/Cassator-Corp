const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name === ".git" || name === "docs" || name === "documentation") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
}
const files = [];
walk(root, files);
let missingNav = [];
let missingFoot = [];
files.forEach(function (file) {
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes('class="nav_link"')) return;
  if (!html.includes('href="/documentation"') || !html.includes(">Documentation<") || !html.includes(">Whitepaper<")) missingNav.push(path.relative(root, file));
  if (html.includes('class="footer_link') && html.includes(">Roadmap<") && !html.includes('href="/documentation" class="footer_link') && !html.includes('href="/documentation" aria-current="page" class="footer_link')) missingFoot.push(path.relative(root, file));
});
console.log("webflow pages", files.length);
console.log("missing nav", missingNav);
console.log("missing foot", missingFoot);

const lib = require("../docs/library");
const slugs = lib.pages.map(function (p) { return p.slug; });
const docsDir = path.join(root, "documentation");
slugs.forEach(function (slug) {
  if (!fs.existsSync(path.join(docsDir, slug + ".html"))) console.log("missing page", slug);
});
console.log("doc files", fs.readdirSync(docsDir).length);

const wp = fs.readFileSync(path.join(root, "whitepaper.html"), "utf8");
const disclaimer = "This whitepaper is provided for informational purposes only. It describes the current vision, proposed architecture, and intended development direction of EraX Digital. Certain features and technical components remain under development or are planned for future consideration. This document does not constitute an offer to sell securities, tokens, or other financial instruments, nor does it guarantee future functionality, performance, financial returns, or product availability. Technical specifications and development priorities may evolve.";
console.log("disclaimer", wp.includes(disclaimer));
console.log("version", wp.includes("Version 1.0"));
console.log("date", wp.includes("3 November 2026"));
console.log("pdf link", wp.includes("/docs/erax-whitepaper.pdf"));
["ecosystem", "platform", "social-flow", "wallet-flow", "networks", "on-off", "creator-pay", "roadmap"].forEach(function (id) {
  console.log("diagram", id, wp.includes('aria-label="') && (wp.split(id).length));
});
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
console.log("old transparency", index.includes("Phases 01 and 02 represent completed foundational"));
console.log("home docs nav", index.includes('href="/documentation" class="nav_link">Documentation'));
console.log("home foot", (index.match(/href="\/documentation" class="footer_link/g) || []).length);

const bad = [];
function checkFile(file) {
  const html = fs.readFileSync(file, "utf8");
  const hrefs = html.match(/href="\/documentation\/[a-z0-9-]+"/g) || [];
  hrefs.forEach(function (href) {
    const slug = href.slice(20, -1);
    if (!slugs.includes(slug)) bad.push(path.basename(file) + " -> " + slug);
  });
}
checkFile(path.join(root, "documentation.html"));
fs.readdirSync(docsDir).forEach(function (name) { checkFile(path.join(docsDir, name)); });
console.log("bad doc links", bad.slice(0, 20), "count", bad.length);
console.log("pdf", fs.existsSync(path.join(root, "docs", "erax-whitepaper.pdf")), fs.statSync(path.join(root, "docs", "erax-whitepaper.pdf")).size);
