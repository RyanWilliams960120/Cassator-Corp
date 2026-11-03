const fs = require("fs");
const path = require("path");

const github = fs.readFileSync("mirror/github-anchor.html", "utf8");
if (!github.startsWith('<a href="https://github.com/EraX-Digital"') || !github.endsWith("</a>")) {
  throw new Error("github anchor unexpected");
}

function removeDiv(html, start) {
  let depth = 0;
  for (let i = start; i < html.length; i++) {
    if (html.startsWith("<div", i)) depth++;
    else if (html.startsWith("</div>", i)) {
      depth--;
      if (depth === 0) return html.slice(0, start) + html.slice(i + 6);
    }
  }
  throw new Error("unclosed div at " + start);
}

function hideCompany(html) {
  html = html.replace(/<div class="nav_link-wrp"><img\b[^>]*class="nav_icon"\/><a href="\/newsroom"(?: aria-current="page")? class="nav_link(?: w--current)?">Company<\/a><\/div>/g, "");
  html = html.replace(/<a href="\/newsroom"(?: target="_blank")?(?: aria-current="page")? class="footer_link u-paragraph-small(?: w--current)?">Company<\/a>/g, "");
  return html;
}

function oneContact(html) {
  const marker = '<div class="nav_link-wrp is--cont">';
  let guard = 0;
  while (html.includes(marker)) {
    if (++guard > 4) throw new Error("header contact loop");
    html = removeDiv(html, html.indexOf(marker));
  }
  let kept = 0;
  html = html.replace(/<a href="mailto:contact@erax\.digital" class="footer_social w-inline-block">[\s\S]*?<\/a>/g, function (full) {
    if (!full.includes("icon-42 big") && !full.includes('class="icon-42 big')) return full;
    kept++;
    return kept === 1 ? full : "";
  });
  return html;
}

function addGithub(html) {
  if (html.includes("https://github.com/EraX-Digital")) return html;
  const needle = 'href="https://www.linkedin.com/company/erax-digital/"';
  let pos = 0;
  let added = 0;
  while ((pos = html.indexOf(needle, pos)) !== -1) {
    const open = html.lastIndexOf("<a ", pos);
    const tag = html.slice(open, html.indexOf(">", open));
    const end = html.indexOf("</a>", pos);
    if (tag.includes("footer_social") && !html.slice(end, end + 120).includes("github.com/EraX-Digital")) {
      html = html.slice(0, end + 4) + github + html.slice(end + 4);
      added++;
      pos = end + 4 + github.length;
    } else pos = end + 4;
  }
  return html;
}

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
}

const files = [];
walk(".", files);
let changed = 0;
let githubAdded = 0;
let stillCompany = [];
files.forEach((file) => {
  const before = fs.readFileSync(file, "utf8");
  let html = addGithub(hideCompany(oneContact(before)));
  if (html !== before) {
    const tmp = file + ".tmpwrite";
    fs.writeFileSync(tmp, html);
    fs.renameSync(tmp, file);
    changed++;
    if (!before.includes("github.com/EraX-Digital") && html.includes("github.com/EraX-Digital")) githubAdded++;
  }
  if (/href="\/newsroom"[^>]*>Company</.test(html) || /class="nav_link[^"]*"[^>]*>Company</.test(html)) stillCompany.push(file);
});

let chrome = fs.readFileSync("js/chrome.js", "utf8");
chrome = chrome.replace(/\s*<a class="\$\{active\("newsroom\.html"\)\}" href="newsroom\.html">Company<\/a>/g, "");
chrome = chrome.replace(/\s*<a href="newsroom\.html">Company<\/a>/g, "");
if (!chrome.includes("github.com/EraX-Digital")) {
  chrome = chrome.replace(
    '<a href="https://www.linkedin.com/company/erax-digital/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>',
    '<a href="https://www.linkedin.com/company/erax-digital/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>\n              <a href="https://github.com/EraX-Digital" target="_blank" rel="noopener noreferrer" aria-label="EraX Digital on GitHub">GitHub</a>'
  );
}
fs.writeFileSync("js/chrome.js", chrome);

const index = fs.readFileSync("index.html", "utf8");
const wallet = fs.readFileSync("wallet.html", "utf8");
console.log("changed", changed, "github added", githubAdded, "company left", stillCompany.length);
console.log("index company nav", index.includes(">Company</a>"), "mails", (index.match(/mailto:contact@erax\.digital/g) || []).length, "github", (index.match(/github\.com\/EraX-Digital/g) || []).length);
console.log("wallet company nav", wallet.includes(">Company</a>"), "mails", (wallet.match(/mailto:contact@erax\.digital/g) || []).length, "github", (wallet.match(/github\.com\/EraX-Digital/g) || []).length, "header contact", wallet.includes("is--cont"));
console.log("chrome company", chrome.includes("newsroom.html"), "chrome github", chrome.includes("github.com/EraX-Digital"));
if (stillCompany.length) console.log(stillCompany.slice(0, 8).join("\n"));
if ((index.match(/github\.com\/EraX-Digital/g) || []).length !== 1) throw new Error("index github count");
if ((wallet.match(/mailto:contact@erax\.digital/g) || []).length !== 1) throw new Error("wallet mail count");
if (wallet.includes(">Company</a>")) throw new Error("wallet company remains");
