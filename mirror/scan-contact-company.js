const fs = require("fs");
const path = require("path");
const files = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (name.endsWith(".html") || name.endsWith(".js")) files.push(full);
  }
}
walk(".");
const emails = {};
const github = {};
const company = {};
files.forEach((file) => {
  const html = fs.readFileSync(file, "utf8");
  const mails = html.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) || [];
  mails.forEach((mail) => {
    emails[mail] = emails[mail] || { count: 0, files: new Set() };
    emails[mail].count++;
    if (emails[mail].files.size < 8) emails[mail].files.add(file);
  });
  const ghs = html.match(/https?:\/\/github\.com[^"'\s<]*/g) || [];
  ghs.forEach((url) => {
    github[url] = (github[url] || 0) + 1;
  });
  if (!html.includes("github.com/EraX-Digital") && html.includes("linkedin.com/company/erax-digital")) {
    github.missing = github.missing || [];
    if (github.missing.length < 12) github.missing.push(file);
    github.missingCount = (github.missingCount || 0) + 1;
  }
  const comps = html.match(/<a[^>]*href="[^"]*newsroom[^"]*"[^>]*>[^<]*<\/a>/g) || [];
  comps.forEach((a) => {
    const key = a.replace(/\s+/g, " ").slice(0, 180);
    company[key] = (company[key] || 0) + 1;
  });
  const navCompany = html.match(/<a[^>]*class="nav_link[^"]*"[^>]*>Company<\/a>|<a[^>]*>Company<\/a>/g) || [];
  navCompany.forEach((a) => {
    const key = "NAV " + a.replace(/\s+/g, " ").slice(0, 160);
    company[key] = (company[key] || 0) + 1;
  });
});
console.log("EMAILS");
Object.keys(emails).sort().forEach((mail) => {
  console.log(mail, emails[mail].count, [...emails[mail].files].join(", "));
});
console.log("\nGITHUB URLS");
Object.keys(github).filter((k) => k !== "missing").forEach((url) => console.log(github[url], url));
console.log("pages with linkedin but no github", github.missingCount);
console.log("sample", (github.missing || []).join("\n"));
console.log("\nCOMPANY LINKS");
Object.keys(company).forEach((key) => console.log(company[key], key));
