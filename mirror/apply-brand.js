const fs = require("fs");
const path = require("path");

const src = fs.readFileSync("assets/cassator-logotype-source.svg", "utf8");
const paths = src.match(/<path\b[^>]*\/>/g) || [];
const kept = paths.filter((p) => {
  const d = (p.match(/\bd="([^"]+)"/) || [])[1] || "";
  const m = d.match(/^M\s*([\d.]+)/);
  return m && Number(m[1]) < 750;
});
if (kept.length < 8) throw new Error("symbol paths missing: " + kept.length);
const logo = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="2200" height="825" viewBox="0 0 2200 825" fill="none" role="img" aria-label="EraX Digital">
${kept.join("\n")}
<text x="700" y="478" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="132" letter-spacing="-1.5">EraX Digital</text>
</svg>
`;
fs.writeFileSync("assets/erax-logotype.svg", logo);
console.log("logo paths", kept.length, "bytes", logo.length);

const LOGO_OLD = "https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a3d628e2127e33a1c24eb16_Cassator_Logotype_Horizontal_Transparent.svg";
const LOGO_NEW = "/assets/erax-logotype.svg";
const LINKEDIN = `<a href="https://www.linkedin.com/company/erax-digital/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="footer_social w-inline-block"><div class="icon-42 w-embed"><svg width="100%" height="100%" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 39V42H4V43H0V39H1ZM18 42V43H11V42H18ZM32 42V43H25V42H32ZM43 39V43H39V42H42V39H43ZM1 25V32H0V25H1ZM43 25V32H42V25H43ZM1 11V18H0V11H1ZM43 11V18H42V11H43ZM4 0V1H1V4H0V0H4ZM43 0V4H42V1H39V0H43ZM18 0V1H11V0H18ZM32 0V1H25V0H32Z" fill="currentColor"/><path d="M13.15 17.7H16.55V29.9H13.15V17.7ZM14.85 12.15C13.68 12.15 12.75 13.08 12.75 14.25C12.75 15.42 13.68 16.35 14.85 16.35C16.02 16.35 16.95 15.42 16.95 14.25C16.95 13.08 16.02 12.15 14.85 12.15ZM18.15 17.7H21.4V19.35H21.45C21.9 18.4 23.15 17.45 24.95 17.45C28.45 17.45 29.15 19.75 29.15 22.85V29.9H25.75V23.45C25.75 22.15 25.72 20.5 23.95 20.5C22.15 20.5 21.85 21.95 21.85 23.35V29.9H18.45V17.7H18.15Z" fill="currentColor"/></svg></div></a>`;

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name === ".git") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
}

function replaceSl8(html) {
  const mark = "M153.001 170.001";
  let count = 0;
  let from = 0;
  while (true) {
    const at = html.indexOf(mark, from);
    if (at < 0) break;
    const start = html.lastIndexOf("<a ", at);
    const end = html.indexOf("</a>", at);
    if (start < 0 || end < 0 || end < at) throw new Error("SL8 anchor bounds");
    html = html.slice(0, start) + LINKEDIN + html.slice(end + 4);
    count++;
    from = start + LINKEDIN.length;
  }
  return { html, count };
}

function removeTeamItem(html, label) {
  const marker = `>${label}</div>`;
  const at = html.indexOf(marker);
  if (at < 0) throw new Error("missing department " + label);
  const start = html.lastIndexOf('<div class="team_item">', at);
  if (start < 0) throw new Error("no team_item " + label);
  let depth = 0;
  let i = start;
  while (i < html.length) {
    const nextOpen = html.indexOf("<div", i);
    const nextClose = html.indexOf("</div>", i);
    if (nextClose < 0) throw new Error("unbalanced " + label);
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      i = nextOpen + 4;
    } else {
      depth--;
      i = nextClose + 6;
      if (depth === 0) {
        const removed = html.slice(start, i);
        if (/Product Manager|Blockchain Engineer|Head of Trust/.test(removed)) {
          throw new Error(label + " contains job records");
        }
        const after = html.slice(i, i + 180).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        console.log("remove", label, "chars", removed.length, "then:", after.slice(0, 140));
        return html.slice(0, start) + html.slice(i);
      }
    }
  }
  throw new Error("no end " + label);
}

const files = [];
walk(".", files);
let logos = 0;
let socials = 0;
let contacts = 0;
files.forEach((file) => {
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  const logoCount = html.split(LOGO_OLD).length - 1;
  html = html.split(LOGO_OLD).join(LOGO_NEW);
  logos += logoCount;
  html = html.replace(/src="\/assets\/erax-logotype\.svg" loading="lazy" alt=""/g, 'src="/assets/erax-logotype.svg" loading="lazy" alt="EraX Digital"');
  const social = replaceSl8(html);
  html = social.html;
  socials += social.count;
  const contactCount = html.split('class="nav_contuct">Contact</p><a href="/team"').length - 1;
  html = html.split('class="nav_contuct">Contact</p><a href="/team"').join('class="nav_contuct">Contact</p><a href="mailto:contact@erax.digital"');
  contacts += contactCount;
  if (file === "team.html") {
    html = html.replace(
      'Explore open positions or email us at <a href="/team">Careers</a>.',
      'Explore open positions or email us at <a href="mailto:jobs@erax.digital">jobs@erax.digital</a>.'
    );
    ["Product &amp; Engineering", "Creator &amp; Growth Partnerships", "Community"].forEach((label) => {
      html = removeTeamItem(html, label);
    });
  }
  if (file === "trust-center.html") {
    html = html.replace(
      "This document has not been published. It will be added when EraX Digital releases its policies.",
      "Security is an important consideration throughout the development of EraX Digital. Our approach focuses on protecting user interactions, supporting secure wallet connectivity, and establishing appropriate safeguards across the platform architecture. The policy pages linked from this Trust Center have not been published yet and are not legal agreements, certifications, or audit reports."
    );
    html = html.replace(
      ">Privacy</h3><p class=\"u-paragraph-main is--white-55 _w-370\">Policy not yet published.</p>",
      ">Privacy and data protection</h3><p class=\"u-paragraph-main is--white-55 _w-370\">Personal information should be limited to what a feature needs, with access limited to people who need it. Data written to a public blockchain can be visible to anyone. The formal Privacy Policy is not published yet.</p>"
    );
    html = html.replace(
      ">Security</h3><p class=\"u-paragraph-main is--white-55 _w-370\">Protecting accounts, infrastructure, and transactions.</p>",
      ">Wallet security</h3><p class=\"u-paragraph-main is--white-55 _w-370\">Where a wallet connection is supported, authorization stays with the user in that wallet. EraX Digital does not store or control private keys. Review every transaction before confirming it, and you remain responsible for the wallet you use and the approvals you sign.</p>"
    );
    html = html.replace(
      ">Safe Environment</h3><p class=\"u-paragraph-main is--white-55 _w-370\">Community rules and moderation tools.</p>",
      ">Smart contract security</h3><p class=\"u-paragraph-main is--white-55 _w-370\">Smart-contract work is intended to go through secure development, testing, code review, and vulnerability assessment before deployment. No independent audit has been published.</p>"
    );
    html = html.replace(
      ">Transparency</h3><p class=\"u-paragraph-main is--white-55 _w-370\">Public updates about policies and incidents.</p>",
      ">Development transparency</h3><p class=\"u-paragraph-main is--white-55 _w-370\">Phases 01 and 02 are completed foundation and infrastructure milestones. SocialFi development is upcoming, creator functionality is planned, and broader ecosystem expansion is future work. A completed phase is not a finished public product.</p>"
    );
    html = html.replace(
      "Found a security vulnerability, a rule violation, or want to report an incident?",
      "If you identify a potential security vulnerability or security-related issue involving EraX Digital, please contact our team at contact@erax.digital with a clear description of the issue. Please avoid publicly disclosing vulnerabilities before our team has had an opportunity to investigate."
    );
    html = html.replace(
      '<div aria-hidden="true" class="button_main_text">Trust Center</div>',
      '<div aria-hidden="true" class="button_main_text">contact@erax.digital</div>'
    );
    html = html.replace(
      'aria-label="Trust Center" href="/trust-center"',
      'aria-label="Email contact@erax.digital" href="mailto:contact@erax.digital"'
    );
  }
  if (file.replace(/\\/g, "/") === "trust-center/security.html") {
    html = html.replace(
      "EraX Digital has not published this policy yet. This page is not a legal agreement, a registration, a license, or an offer. The policy will be added here when the company publishes it.",
      "EraX Digital has not published this policy yet. This page is not a legal agreement, a registration, a license, an audit, or an offer. The policy will be added here when the company publishes it. If you identify a potential security vulnerability, contact contact@erax.digital and avoid public disclosure until the team has had an opportunity to investigate."
    );
  }
  if (html !== before) {
    const tmp = file + ".tmpwrite";
    fs.writeFileSync(tmp, html);
    fs.renameSync(tmp, file);
  }
});
console.log("logos", logos, "linkedin replacements", socials, "contact hrefs", contacts);

const print = fs.readFileSync("docs/whitepaper-print.html", "utf8");
if (!print.includes(LOGO_NEW)) console.log("WARNING print logo missing");
const team = fs.readFileSync("team.html", "utf8");
["Product &amp; Engineering", "Creator &amp; Growth Partnerships", ">Community</div>"].forEach((s) => {
  console.log("still in team", s, team.includes(s));
});
console.log("jobs mail", team.includes("mailto:jobs@erax.digital"));
console.log("sl8 icon left", team.includes("M153.001 170.001"));
