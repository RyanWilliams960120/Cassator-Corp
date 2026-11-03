const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const lib = require("../docs/library");

const root = path.join(__dirname, "..");
const origin = "https://companysite-wheat.vercel.app";
const icon = "https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a0f75d3489c98f0632507c8_Rectangle%2014%20(1).svg";
const logo = "../assets/erax-logotype.svg";

const navInsert =
  '<div class="nav_link-wrp"><img width="11" height="14" alt="" src="' + icon + '" loading="lazy" class="nav_icon"/><a href="/documentation" class="nav_link">Documentation</a></div>' +
  '<div class="nav_link-wrp"><img width="11" height="14" alt="" src="' + icon + '" loading="lazy" class="nav_icon"/><a href="/whitepaper" class="nav_link">Whitepaper</a></div>';

const footInsert =
  '<a href="/documentation" class="footer_link u-paragraph-small">Documentation</a>' +
  '<a href="/whitepaper" class="footer_link u-paragraph-small">Whitepaper</a>';

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name === ".git") continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
}

function patchHtml(html) {
  if (!html.includes('href="/documentation" class="nav_link"') && !html.includes('href="/documentation" aria-current="page" class="nav_link')) {
    html = html.replace(
      /(<a href="\/trust-center"(?: aria-current="page")? class="nav_link(?: w--current)?">Trust Center<\/a><\/div>)(<div class="nav_link-wrp is--cont">)/,
      "$1" + navInsert + "$2"
    );
  }
  if (!html.includes('href="/documentation" class="footer_link') && !html.includes('href="/documentation" aria-current="page" class="footer_link')) {
    html = html.replace(
      /(<a href="\/#roadmap"(?: target="_blank")? class="footer_link u-paragraph-small">Roadmap<\/a>)/g,
      "$1" + footInsert
    );
  }
  return html;
}

function patchSite() {
  const files = [];
  walk(root, files);
  let nav = 0;
  let foot = 0;
  files.forEach(function (file) {
    if (file.includes(path.sep + "docs" + path.sep)) return;
    const before = fs.readFileSync(file, "utf8");
    const after = patchHtml(before);
    if (after !== before) {
      if (after.includes(navInsert) && !before.includes('href="/documentation" class="nav_link"')) nav += 1;
      fs.writeFileSync(file, after);
      foot += 1;
    }
  });
  console.log("patched files", foot, "nav insertions attempted in changed files", nav);
}

function stripTemplateCurrent(html) {
  return html
    .replace(' aria-current="page" class="nav_link w--current">Careers</a>', ' class="nav_link">Careers</a>')
    .replace(/ aria-current="page" class="footer_link u-paragraph-small w--current">Careers<\/a>/g, ' class="footer_link u-paragraph-small">Careers</a>');
}

function markCurrent(html, which) {
  const href = which === "whitepaper" ? "/whitepaper" : "/documentation";
  const label = which === "whitepaper" ? "Whitepaper" : "Documentation";
  html = html.split('<a href="' + href + '" class="nav_link">' + label + "</a>").join(
    '<a href="' + href + '" aria-current="page" class="nav_link w--current">' + label + "</a>"
  );
  html = html.split('<a href="' + href + '" class="footer_link u-paragraph-small">' + label + "</a>").join(
    '<a href="' + href + '" aria-current="page" class="footer_link u-paragraph-small w--current">' + label + "</a>"
  );
  return html;
}

function applyMeta(html, title, description, canonical) {
  const old = '<title>Careers | EraX Digital</title><meta content="Careers | EraX Digital" property="og:title"/><meta content="Careers | EraX Digital" name="twitter:title"/>';
  const meta =
    "<title>" + lib.esc(title) + "</title>" +
    '<meta content="' + lib.esc(title) + '" property="og:title"/>' +
    '<meta content="' + lib.esc(title) + '" name="twitter:title"/>' +
    '<meta name="description" content="' + lib.esc(description) + '"/>' +
    '<meta property="og:description" content="' + lib.esc(description) + '"/>' +
    '<meta name="twitter:description" content="' + lib.esc(description) + '"/>' +
    '<meta property="og:type" content="article"/>' +
    '<meta property="og:url" content="' + canonical + '"/>' +
    '<meta name="twitter:card" content="summary"/>' +
    '<link rel="canonical" href="' + canonical + '"/>';
  if (!html.includes(old)) throw new Error("title block missing");
  html = html.replace(old, meta);
  html = html.replace("</head>", '<link rel="stylesheet" href="/docs/docs.css"/></head>');
  html = html.replace("</body>", '<script src="/docs/app.js"></script></body>');
  return html;
}

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

function assemble(template, inner, meta) {
  const mainStart = template.indexOf('<main class="main">');
  const mainEnd = template.indexOf("</main>");
  if (mainStart < 0 || mainEnd < 0) throw new Error("main missing");
  let html = template.slice(0, mainStart) + '<main class="main"><div class="docs-shell">' + inner + "</div></main>" + template.slice(mainEnd + 7);
  html = stripTemplateCurrent(html);
  html = markCurrent(html, meta.current);
  html = applyMeta(html, meta.title, meta.description, meta.canonical);
  return html;
}

function writeDocs(template) {
  const dir = path.join(root, "documentation");
  fs.mkdirSync(dir, { recursive: true });
  const sequence = [{ title: "Overview", href: "/documentation", slug: "" }].concat(
    lib.pages.map(function (item) {
      return { title: item.title, href: "/documentation/" + item.slug, slug: item.slug };
    })
  );

  const homeArticle =
    '<article class="docs-main" id="top">' +
    "<h1>Documentation</h1>" +
    '<p class="docs-lead">' + lib.esc(lib.company) + "</p>" +
    '<aside class="docs-callout"><strong>Current company information</strong><p>Connect. Create. Own. EraX Social, EraX Wallet, and EraX Creator are planned products. EraX Assets is a future possibility and is not operational. Phases 01 and 02 are completed foundational milestones. They do not mean that the products on this site are publicly available.</p></aside>' +
    "<p>Use the sections below for the product model, the proposed technical architecture, security principles, and the development roadmap. The <a href=\"/whitepaper\">technical whitepaper</a> is the long-form version of the same position.</p>" +
    lib.diagrams.render("ecosystem") +
    '<div class="docs-cards">' +
    lib.categories.map(function (category) {
      const first = lib.pages.find(function (item) { return item.category === category.id; });
      const count = lib.pages.filter(function (item) { return item.category === category.id; }).length;
      return '<a href="/documentation/' + first.slug + '"><strong>' + lib.esc(category.title) + "</strong><br/><span>" + count + (count === 1 ? " document" : " documents") + "</span></a>";
    }).join("") +
    "</div></article>";

  const home = '<button type="button" class="docs-menu-btn" data-docs-menu aria-expanded="false" aria-controls="docs-nav">Documentation menu</button>' +
    '<div class="docs-layout">' + sidebar("") + homeArticle + tocFrom(homeArticle) + "</div>";

  fs.writeFileSync(path.join(root, "documentation.html"), assemble(template, home, {
    current: "documentation",
    title: "Documentation | EraX Digital",
    description: "Documentation for EraX Digital: the planned SocialFi ecosystem, Ethereum and Base strategy, product direction, and development status.",
    canonical: origin + "/documentation",
  }));

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
    fs.writeFileSync(path.join(dir, item.slug + ".html"), assemble(template, inner, {
      current: "documentation",
      title: item.title + " | EraX Digital",
      description: item.description,
      canonical: origin + "/documentation/" + item.slug,
    }));
  });
}

function whitepaperBody() {
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

function writeWhitepaper(template) {
  const doc = whitepaperBody();
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
  const article =
    '<article class="wp-main docs-main" id="top">' +
    '<p class="docs-cat">Technical whitepaper</p>' +
    "<h1>EraX Digital — Building a Connected SocialFi Ecosystem</h1>" +
    '<p class="docs-lead">Social Networking, Digital Ownership, Wallet Infrastructure, and the Creator Economy.</p>' +
    '<p class="wp-meta">Version 1.0 · Initial Project Whitepaper · 3 November 2026</p>' +
    '<p class="no-print"><a class="wp-print" href="/docs/erax-whitepaper.pdf" download>Download PDF</a></p>' +
    "<p>This document describes EraX Digital's proposed SocialFi ecosystem. It separates current company information, completed foundational milestones, planned products, and future possibilities. It does not describe a launched network, a token, or a deployed contract.</p>" +
    "<h2 id=\"contents\">Contents</h2>" + doc.toc + doc.main +
    "</article>";
  const inner = '<button type="button" class="docs-menu-btn" data-docs-menu aria-expanded="false" aria-controls="docs-nav">Whitepaper sections</button>' +
    '<div class="docs-layout is-wide">' + side + article + "</div>";
  fs.writeFileSync(path.join(root, "whitepaper.html"), assemble(template, inner, {
    current: "whitepaper",
    title: "Whitepaper | EraX Digital",
    description: "EraX Digital technical whitepaper: a proposed SocialFi ecosystem spanning social networking, digital ownership, wallet infrastructure, and the creator economy.",
    canonical: origin + "/whitepaper",
  }));
  writePrint(doc);
}

function writePrint(doc) {
  const sections = doc.sections.map(function (section) {
    const inner = lib.renderBlocks(section.blocks).replace(/<h2 /g, "<h3 ").replace(/<\/h2>/g, "</h3>");
    return '<section class="block" id="' + section.id + '"><h2>' + lib.esc(section.title) + "</h2>" + inner + "</section>";
  }).join("");
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><title>EraX Digital — Building a Connected SocialFi Ecosystem</title><style>
    @page { size: A4; margin: 18mm 16mm 16mm;
      @top-left { content: "EraX Digital"; font-family: Arial, sans-serif; font-size: 9pt; color: #666; }
      @top-right { content: "Whitepaper 1.0"; font-family: Arial, sans-serif; font-size: 9pt; color: #666; }
      @bottom-left { content: "3 November 2026  ·  Initial Project Whitepaper"; font-family: Arial, sans-serif; font-size: 9pt; color: #666; }
      @bottom-right { content: counter(page); font-family: Arial, sans-serif; font-size: 9pt; color: #666; }
    }
    @page :first { margin: 0;
      @top-left { content: none; } @top-right { content: none; }
      @bottom-left { content: none; } @bottom-right { content: none; }
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #fff; color: #1a1a1a; font-family: Georgia, "Times New Roman", serif; }
    .cover { height: 297mm; padding: 28mm 20mm; background: #0c0c0c; color: #f5f5f5; page-break-after: always; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .cover img { height: 28px; width: auto; }
    .rule { width: 72px; height: 3px; background: #fa4c14; margin: 28px 0; }
    .cover h1 { font-family: Arial, sans-serif; font-size: 34px; line-height: 1.15; font-weight: 600; margin: 0 0 16px; }
    .cover p { font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #d0d0d0; max-width: 460px; }
    .cover .meta { margin-top: 48px; font-family: Arial, sans-serif; font-size: 13px; color: #c8c8c8; }
    h2 { font-family: Arial, sans-serif; font-size: 20px; margin: 28px 0 8px; page-break-after: avoid; }
    h3 { font-family: Arial, sans-serif; font-size: 15px; margin: 18px 0 6px; page-break-after: avoid; }
    p, li { font-size: 11.5pt; line-height: 1.55; }
    a { color: inherit; text-decoration: none; }
    .toc-page { page-break-after: always; }
    .toc-page ol { padding-left: 0; list-style: none; }
    .toc-page li { margin: 6px 0; font-family: Arial, sans-serif; font-size: 12pt; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0 18px; font-family: Arial, sans-serif; font-size: 10pt; page-break-inside: avoid; }
    th, td { border-bottom: 1px solid #ddd; text-align: left; vertical-align: top; padding: 6px; }
    th { background: #f6f6f6; }
    .docs-callout { margin: 12px 0; padding: 10px 12px; border-left: 3px solid #fa4c14; background: #faf7f5; page-break-inside: avoid; }
    .docs-callout strong { display: block; font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 0.04em; text-transform: uppercase; color: #fa4c14; }
    pre { white-space: pre-wrap; font-family: Consolas, monospace; font-size: 10pt; background: #f4f4f4; padding: 10px; }
    .docs-code-label { font-family: Arial, sans-serif; font-size: 10pt; color: #666; }
    figure { margin: 12px 0; page-break-inside: avoid; }
    figcaption, .docs-diagram-note { font-family: Arial, sans-serif; font-size: 10pt; color: #444; }
    svg { width: 100%; height: auto; }
    .endnote { margin-top: 24px; font-family: Arial, sans-serif; font-size: 10pt; color: #444; }
  </style></head><body>
  <section class="cover">
    <img src="${logo}" alt="EraX Digital"/>
    <div class="rule"></div>
    <p>Version 1.0 · Initial Project Whitepaper</p>
    <h1>Building a Connected SocialFi Ecosystem</h1>
    <p>Social Networking, Digital Ownership, Wallet Infrastructure, and the Creator Economy.</p>
    <p class="meta">EraX Digital<br/>3 November 2026<br/>Connect. Create. Own.</p>
  </section>
  <section class="toc-page">
    <h2>Contents</h2>
    ${doc.toc}
  </section>
  ${sections}
  <p class="endnote">EraX Digital · Whitepaper version 1.0 · 3 November 2026 · Informational document. Not an offer of securities, tokens, or other financial instruments.</p>
  </body></html>`;
  fs.writeFileSync(path.join(root, "docs", "whitepaper-print.html"), html);
}

function writeSearch() {
  const items = [{
    title: "Documentation",
    href: "/documentation",
    text: "EraX Digital documentation SocialFi Ethereum Base roadmap",
  }, {
    title: "Technical whitepaper",
    href: "/whitepaper",
    text: lib.whitepaper.map(function (section) { return section.title + " " + lib.textOf(section.blocks); }).join(" "),
  }].concat(lib.pages.map(function (item) {
    return {
      title: item.title,
      href: "/documentation/" + item.slug,
      text: item.description + " " + lib.textOf(item.blocks),
    };
  }));
  fs.writeFileSync(path.join(root, "docs", "search.json"), JSON.stringify(items));
  console.log("search entries", items.length);
}

function printPdf() {
  const candidates = [
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ];
  const bin = candidates.find(function (item) { return fs.existsSync(item); });
  const pdf = path.join(root, "docs", "erax-whitepaper.pdf");
  const source = path.join(root, "docs", "whitepaper-print.html");
  if (!bin) {
    console.log("pdf skipped: no Edge or Chrome");
    return;
  }
  if (fs.existsSync(pdf)) fs.unlinkSync(pdf);
  const result = spawnSync(bin, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-pdf-header-footer",
    "--print-to-pdf=" + pdf,
    "file:///" + source.replace(/\\/g, "/"),
  ], { timeout: 90000, encoding: "utf8" });
  console.log("pdf bin", bin);
  console.log("pdf status", result.status);
  if (result.stderr) console.log(String(result.stderr).slice(0, 500));
  if (fs.existsSync(pdf)) {
    const buf = fs.readFileSync(pdf);
    const pages = (buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
    console.log("pdf bytes", buf.length, "page objects", pages);
  } else {
    console.log("pdf missing");
  }
}

patchSite();
const template = fs.readFileSync(path.join(root, "team.html"), "utf8");
if (!template.includes('href="/documentation" class="nav_link"')) {
  throw new Error("documentation nav was not inserted into team.html");
}
writeDocs(template);
writeWhitepaper(template);
writeSearch();
printPdf();
console.log("pages", lib.pages.length);
