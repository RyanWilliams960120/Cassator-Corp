const fs = require("fs");
const path = require("path");
const lib = require("../docs/library");

const root = path.join(__dirname, "..");
const origin = "https://erax-digital.vercel.app";

function sidebar(active) {
  let html = '<nav id="docs-nav" class="docs-side" aria-label="Documentation">' +
    '<label class="docs-sr" for="docs-search">Search documentation</label>' +
    '<input id="docs-search" class="docs-search" type="search" data-docs-search placeholder="Search documentation" autocomplete="off"/>' +
    '<div class="docs-results" data-docs-results></div>' +
    '<a class="' + (active ? "" : "is-active") + '" href="/documentation">Overview</a>';
  lib.categories.forEach(function (category) {
    html += '<div class="docs-cat">' + lib.esc(category.title) + "</div>";
    lib.pages.filter(function (item) { return item.category === category.id; }).forEach(function (item) {
      html += '<a class="' + (item.slug === active ? "is-active" : "") + '" href="/documentation/' + item.slug + '">' + lib.esc(item.title) + "</a>";
    });
  });
  html += '<div class="docs-cat">Whitepaper</div><a href="/whitepaper">Technical whitepaper</a></nav>';
  return html;
}

function tocFrom(article) {
  const heads = [...article.matchAll(/<h2 id="([^"]+)">([^<]*)<\/h2>/g)];
  let html = '<nav class="docs-toc" aria-label="On this page"><p class="docs-cat">On this page</p>';
  if (!heads.length) html += '<a href="#top">Overview</a>';
  heads.forEach(function (head) {
    html += '<a href="#' + head[1] + '">' + head[2] + "</a>";
  });
  html += "</nav>";
  return html;
}

function pager(index, list) {
  const prev = list[index - 1];
  const next = list[index + 1];
  return '<nav class="docs-pager" aria-label="Documents">' +
    (prev ? '<a href="' + prev.href + '"><span class="docs-cat">Previous</span><br/>' + lib.esc(prev.title) + "</a>" : "<span></span>") +
    (next ? '<a href="' + next.href + '"><span class="docs-cat">Next</span><br/>' + lib.esc(next.title) + "</a>" : "<span></span>") +
    "</nav>";
}

function categoryTitle(id) {
  const found = lib.categories.find(function (item) { return item.id === id; });
  return found ? found.title : "";
}

function replaceMain(html, inner) {
  const start = html.indexOf('<main class="main">');
  const end = html.indexOf("</main>", start);
  if (start < 0 || end < 0) throw new Error("main missing");
  return html.slice(0, start) + '<main class="main"><div class="docs-shell">' + inner + "</div></main>" + html.slice(end + 7);
}

function setMeta(html, title, description, canonical) {
  const safeTitle = lib.esc(title);
  const safeDescription = lib.esc(description);
  html = html.replace(/<title>[^<]*<\/title>/, "<title>" + safeTitle + "</title>");
  html = html.replace(/(<meta content=")[^"]*(" property="og:title"\/>)/, "$1" + safeTitle + "$2");
  html = html.replace(/(<meta content=")[^"]*(" name="twitter:title"\/>)/, "$1" + safeTitle + "$2");
  html = html.replace(/(<meta name="description" content=")[^"]*("\/>)/, "$1" + safeDescription + "$2");
  html = html.replace(/(<meta property="og:description" content=")[^"]*("\/>)/, "$1" + safeDescription + "$2");
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*("\/>)/, "$1" + safeDescription + "$2");
  html = html.replace(/(<link rel="canonical" href=")[^"]*("\/>)/, "$1" + canonical + "$2");
  html = html.replace(/(<meta property="og:url" content=")[^"]*("\/>)/, "$1" + canonical + "$2");
  return html;
}

function writeHtml(file, html) {
  const tmp = file + ".tmpwrite";
  fs.writeFileSync(tmp, html);
  fs.renameSync(tmp, file);
}

const sequence = [{ title: "Overview", href: "/documentation", slug: "" }].concat(
  lib.pages.map(function (item) {
    return { title: item.title, href: "/documentation/" + item.slug, slug: item.slug };
  })
);

const shellPath = path.join(root, "documentation", "introduction.html");
const shell = fs.readFileSync(shellPath, "utf8");

const homeArticle =
  '<article class="docs-main" id="top">' +
  "<h1>Documentation</h1>" +
  '<p class="docs-lead">' + lib.esc(lib.company) + "</p>" +
  '<aside class="docs-callout"><strong>Current company information</strong><p>Connect. Create. Own. EraX Social is the current product. EraX Wallet and EraX Creator are planned. EraX Assets is a future possibility and is not operational. The public plan is 2026, 2027, and 2028. The ERAX token is specified, not deployed, and not for sale.</p></aside>' +
  "<p>Use the sections below for the product model, the technical architecture, tokenomics, security principles, and the yearly roadmap. The <a href=\"/whitepaper\">technical whitepaper</a> is the long-form version of the same position.</p>" +
  lib.diagrams.render("ecosystem") +
  '<div class="docs-cards">' +
  lib.categories.map(function (category) {
    const first = lib.pages.find(function (item) { return item.category === category.id; });
    const count = lib.pages.filter(function (item) { return item.category === category.id; }).length;
    return '<a href="/documentation/' + first.slug + '"><strong>' + lib.esc(category.title) + "</strong><br/><span>" + count + (count === 1 ? " document" : " documents") + "</span></a>";
  }).join("") +
  "</div></article>";

const homeInner = '<button type="button" class="docs-menu-btn" data-docs-menu aria-expanded="false" aria-controls="docs-nav">Documentation menu</button>' +
  '<div class="docs-layout">' + sidebar("") + homeArticle + tocFrom(homeArticle) + "</div>";

let homeHtml = replaceMain(fs.readFileSync(path.join(root, "documentation.html"), "utf8"), homeInner);
homeHtml = setMeta(homeHtml, "Documentation | EraX Digital", "Documentation for EraX Digital: EraX Social, the ERAX token specification, Ethereum and Base, and the 2026 to 2028 roadmap.", origin + "/documentation");
writeHtml(path.join(root, "documentation.html"), homeHtml);

lib.pages.forEach(function (item, index) {
  const body = lib.renderBlocks(item.blocks);
  const article =
    '<article class="docs-main" id="top">' +
    '<nav class="docs-crumb" aria-label="Breadcrumb"><a href="/documentation">Documentation</a> / <a href="/documentation/' + lib.pages.find(function (page) { return page.category === item.category; }).slug + '">' + lib.esc(categoryTitle(item.category)) + "</a> / <span>" + lib.esc(item.title) + "</span></nav>" +
    "<h1>" + lib.esc(item.title) + "</h1>" +
    '<p class="docs-lead">' + lib.esc(item.description) + "</p>" +
    body +
    pager(index + 1, sequence) +
    "</article>";
  const inner = '<button type="button" class="docs-menu-btn" data-docs-menu aria-expanded="false" aria-controls="docs-nav">Documentation menu</button>' +
    '<div class="docs-layout">' + sidebar(item.slug) + article + tocFrom(article) + "</div>";
  const file = path.join(root, "documentation", item.slug + ".html");
  const source = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : shell;
  let html = replaceMain(source, inner);
  html = setMeta(html, item.title + " | EraX Digital", item.description, origin + "/documentation/" + item.slug);
  writeHtml(file, html);
});

function whitepaperParts() {
  const sections = lib.whitepaper.filter(function (section) { return section.id !== "cover"; });
  const toc = '<ol class="wp-toc">' + sections.map(function (section) {
    return '<li><a href="#' + section.id + '">' + lib.esc(section.title) + "</a></li>";
  }).join("") + "</ol>";
  const main = sections.map(function (section) {
    const inner = lib.renderBlocks(section.blocks).replace(/<h2 /g, "<h3 ").replace(/<\/h2>/g, "</h3>");
    return '<section id="' + section.id + '"><h2>' + lib.esc(section.title) + "</h2>" + inner + "</section>";
  }).join("");
  return { toc: toc, main: main, sections: sections };
}

const doc = whitepaperParts();
const side = '<nav id="docs-nav" class="docs-side" aria-label="Whitepaper sections">' +
  '<label class="docs-sr" for="wp-search">Search documentation</label>' +
  '<input id="wp-search" class="docs-search" type="search" data-docs-search placeholder="Search documentation" autocomplete="off"/>' +
  '<div class="docs-results" data-docs-results></div>' +
  '<a href="/documentation">Documentation</a>' +
  '<div class="docs-cat">Sections</div>' +
  doc.sections.map(function (section) {
    return '<a href="#' + section.id + '">' + lib.esc(section.title) + "</a>";
  }).join("") +
  "</nav>";
const wpArticle =
  '<article class="wp-main docs-main" id="top">' +
  '<p class="docs-cat">Technical whitepaper</p>' +
  "<h1>EraX Digital — Building a Connected SocialFi Ecosystem</h1>" +
  '<p class="docs-lead">Social Networking, Digital Ownership, Wallet Infrastructure, and the Creator Economy.</p>' +
  '<p class="wp-meta">Version 1.1 · Project Whitepaper · 5 November 2026</p>' +
  '<p class="no-print"><a class="wp-print" href="/docs/erax-whitepaper.pdf" download>Download PDF</a></p>' +
  "<p>This document describes EraX Digital from 2026 through 2028. EraX Social is the current product. EraX Wallet and EraX Creator are planned. The ERAX token is specified and is not deployed, audited, or offered for sale. Diagrams remain conceptual where a service is not running.</p>" +
  "<h2 id=\"contents\">Contents</h2>" + doc.toc + doc.main +
  "</article>";
const wpInner = '<button type="button" class="docs-menu-btn" data-docs-menu aria-expanded="false" aria-controls="docs-nav">Whitepaper sections</button>' +
  '<div class="docs-layout is-wide">' + side + wpArticle + "</div>";
let wpHtml = replaceMain(fs.readFileSync(path.join(root, "whitepaper.html"), "utf8"), wpInner);
wpHtml = setMeta(wpHtml, "Whitepaper | EraX Digital", "EraX Digital technical whitepaper: EraX Social, the ERAX token specification, and the 2026 to 2028 roadmap.", origin + "/whitepaper");
writeHtml(path.join(root, "whitepaper.html"), wpHtml);

const printPath = path.join(root, "docs", "whitepaper-print.html");
let printHtml = fs.readFileSync(printPath, "utf8");
const printSections = doc.sections.map(function (section) {
  const inner = lib.renderBlocks(section.blocks).replace(/<h2 /g, "<h3 ").replace(/<\/h2>/g, "</h3>");
  return '<section class="block" id="' + section.id + '"><h2>' + lib.esc(section.title) + "</h2>" + inner + "</section>";
}).join("");
const tocStart = printHtml.indexOf('<section class="toc-page">');
const endNote = printHtml.indexOf('<p class="endnote">');
if (tocStart < 0 || endNote < 0) throw new Error("print markers missing");
printHtml = printHtml.slice(0, tocStart) +
  '<section class="toc-page"><h2>Contents</h2>' + doc.toc + "</section>" +
  printSections + "\n  " + printHtml.slice(endNote);
printHtml = printHtml.replace("Whitepaper 1.0", "Whitepaper 1.1");
printHtml = printHtml.replace("Version 1.0 · Initial Project Whitepaper", "Version 1.1 · Project Whitepaper");
printHtml = printHtml.replace("3 November 2026  ·  Initial Project Whitepaper", "5 November 2026  ·  Project Whitepaper");
printHtml = printHtml.replace("3 November 2026<br/>", "5 November 2026<br/>");
printHtml = printHtml.replace("Whitepaper version 1.0 · 3 November 2026", "Whitepaper version 1.1 · 5 November 2026");
writeHtml(printPath, printHtml);

const search = [{
  title: "Documentation",
  href: "/documentation",
  text: "EraX Digital documentation SocialFi Ethereum Base roadmap tokenomics 2026 2027 2028",
}, {
  title: "Technical whitepaper",
  href: "/whitepaper",
  text: lib.whitepaper.map(function (section) { return section.title + " " + lib.textOf(section.blocks); }).join(" "),
}].concat(lib.pages.map(function (item) {
  return { title: item.title, href: "/documentation/" + item.slug, text: item.description + " " + lib.textOf(item.blocks) };
}));
writeHtml(path.join(root, "docs", "search.json"), JSON.stringify(search));
console.log("pages", lib.pages.length, "search", search.length);
