const fs = require("fs");
const path = require("path");

function removeBlock(html, openAt) {
  if (openAt < 0) throw new Error("block not found");
  const tag = html.slice(openAt, openAt + 8).startsWith("<section") ? "section" : "div";
  const open = "<" + tag;
  const close = "</" + tag + ">";
  let depth = 0;
  for (let i = openAt; i < html.length; i++) {
    if (html.startsWith(open, i)) depth++;
    else if (html.startsWith(close, i)) {
      depth--;
      if (depth === 0) return html.slice(0, openAt) + html.slice(i + close.length);
    }
  }
  throw new Error("unclosed " + tag);
}

function sectionStart(html, marker) {
  const at = html.indexOf(marker);
  if (at < 0) throw new Error("missing " + marker);
  const open = html.lastIndexOf("<section", at);
  if (open < 0 || at - open > 200) throw new Error("section open not near " + marker);
  return open;
}

const original = fs.readFileSync("team.html", "utf8");
const teamIntro = '<p class="u-paragraph-main _w-400"><span class="is--white-55">EraX Digital is an independent Web3 technology company.</span> These are the people leading the company. <span class="is--white-55">Names and roles are shown only as published.</span></p>';
const careersIntro = '<p class="u-paragraph-main _w-400"><span class="is--white-55">Review the published openings below, or send a general application.</span> Include your CV and a short message. Applications go to <a href="mailto:jobs@erax.digital">jobs@erax.digital</a>.</p>';
const oldIntro = '<p class="u-paragraph-main _w-400"><span class="is--white-55">To simplify access to Web3 by combining social experiences, digital ownership, and financial infrastructure.</span> product, security, compliance, and growth <span class="is--white-55">— in one system.</span></p>';
if (!original.includes(oldIntro)) throw new Error("intro missing");

let team = original.replace(oldIntro, teamIntro);
team = team.replace('<p class="u-paragraph-small link-appear is--jet">Careers</p>', '<p class="u-paragraph-small link-appear is--jet">Team</p>');
team = team.replace("Careers at <span class=\"is--accent is--italic\">EraX Digital</span>", "The team at <span class=\"is--accent is--italic\">EraX Digital</span>");
team = team.replace(">Open positions</div>", ">Careers</div>");
team = team.replace('aria-label="Open positions" href="#positions"', 'aria-label="Careers" href="/careers"');
team = team.replace("Explore open positions or email us at", "Open roles are listed on the Careers page, or email");
team = removeBlock(team, sectionStart(team, 'class="position u-section"'));
team = removeBlock(team, team.indexOf('<div class="position_popup">'));
team = team.replace('<link rel="stylesheet" href="/js/apply.css"/>', "");
team = team.replace('<script src="/js/apply.js"></script>', "");
team = team.replace(/<title>Careers \| EraX Digital<\/title>/g, "<title>Team | EraX Digital</title>");
if (!team.includes('name="description"')) {
  team = team.replace("</title>", '</title><meta name="description" content="The people leading EraX Digital. Published names and roles only."/>');
}

let careers = original.replace(oldIntro, careersIntro);
careers = removeBlock(careers, sectionStart(careers, 'class="team u-section"'));
if (!careers.includes('name="description"')) {
  careers = careers.replace("</title>", '</title><meta name="description" content="Careers at EraX Digital. Review published openings or send a CV and message to jobs@erax.digital."/>');
}

function nav(html, mode) {
  const teamClass = mode === "team" ? ' aria-current="page" class="nav_link w--current"' : ' class="nav_link"';
  const careersClass = mode === "careers" ? ' aria-current="page" class="nav_link w--current"' : ' class="nav_link"';
  const footTeam = mode === "team" ? ' aria-current="page" class="footer_link u-paragraph-small w--current"' : ' class="footer_link u-paragraph-small"';
  const footCareers = mode === "careers" ? ' aria-current="page" class="footer_link u-paragraph-small w--current"' : ' class="footer_link u-paragraph-small"';
  const navRe = /<div class="nav_link-wrp"><img\b[^>]*class="nav_icon"\/><a href="\/team"(?: aria-current="page")? class="nav_link(?: w--current)?">Careers<\/a><\/div>/g;
  let count = 0;
  html = html.replace(navRe, function (full) {
    count++;
    const img = full.match(/<img\b[^>]*class="nav_icon"\/>/)[0];
    return '<div class="nav_link-wrp">' + img + '<a href="/team"' + teamClass + '>Team</a></div><div class="nav_link-wrp">' + img + '<a href="/careers"' + careersClass + '>Careers</a></div>';
  });
  const footRe = /<a href="\/team"(?: aria-current="page")? class="footer_link u-paragraph-small(?: w--current)?">Careers<\/a>/g;
  let feet = 0;
  html = html.replace(footRe, function () {
    feet++;
    return '<a href="/team"' + footTeam + '>Team</a><a href="/careers"' + footCareers + '>Careers</a>';
  });
  html = html.replace(/aria-label="Careers" href="\/team"/g, 'aria-label="Careers" href="/careers"');
  html = html.replace(/aria-label="Partners \/ BD" href="\/team"/g, 'aria-label="Partners / BD" href="/careers"');
  html = html.replace(/<a href="\/team">Contact<\/a>/g, '<a href="mailto:contact@erax.digital">Contact</a>');
  return { html, count, feet };
}

function write(file, html) {
  const tmp = file + ".tmpwrite";
  fs.writeFileSync(tmp, html);
  fs.renameSync(tmp, file);
}

const teamNav = nav(team, "team");
const careersNav = nav(careers, "careers");
if (teamNav.count < 1 || careersNav.count < 1) throw new Error("nav not updated on new pages " + teamNav.count + " " + careersNav.count);
write("team.html", teamNav.html);
write("careers.html", careersNav.html);

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html") && name !== "team.html" && name !== "careers.html") out.push(full);
  }
}
const files = [];
walk(".", files);
let navPages = 0;
let footPages = 0;
files.forEach((file) => {
  const before = fs.readFileSync(file, "utf8");
  if (!before.includes('href="/team"') && !before.includes(">Careers</a>")) return;
  const updated = nav(before, "other");
  if (updated.html !== before) {
    write(file, updated.html);
    if (updated.count) navPages++;
    if (updated.feet) footPages++;
  }
});

let chrome = fs.readFileSync("js/chrome.js", "utf8");
chrome = chrome.replace(
  '<a class="${active("team.html")}" href="team.html">Careers</a>',
  '<a class="${active("team.html")}" href="team.html">Team</a>\n      <a class="${active("careers.html")}" href="careers.html">Careers</a>'
);
chrome = chrome.replace(
  '<a href="team.html">Careers</a>',
  '<a href="team.html">Team</a>\n    <a href="careers.html">Careers</a>'
);
chrome = chrome.replace(
  '<a href="team.html">Careers</a>',
  '<a href="team.html">Team</a>\n            <a href="careers.html">Careers</a>'
);
if (chrome.includes(">Careers</a>") && !chrome.includes("careers.html")) throw new Error("chrome careers link remains");
fs.writeFileSync("js/chrome.js", chrome);

const check = fs.readFileSync("team.html", "utf8");
const jobs = fs.readFileSync("careers.html", "utf8");
if (check.includes("Yaroslav Boichuk") === false) throw new Error("team lost people");
if (check.includes("Product Manager")) throw new Error("jobs still on team");
if (check.includes("position_popup")) throw new Error("form still on team");
if (jobs.includes("Yaroslav Boichuk")) throw new Error("people still on careers");
if (!jobs.includes("wf-form-JOIN-CASSATOR") || !jobs.includes("/api/apply")) throw new Error("form missing");
if (!jobs.includes("Product Manager (Social Network)")) throw new Error("jobs missing");
console.log("nav pages", navPages, "footer pages", footPages);
console.log("team has Team nav", check.includes(">Team</a>"), "careers form", jobs.includes('name="Resume"'));
console.log("chrome team+careers", chrome.includes("team.html") && chrome.includes("careers.html"));
