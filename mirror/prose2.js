const fs = require("fs");
const files = ["rwa.html","investors.html","wallet.html","sl8.html","paid-content.html","built-on-stellar.html","index.html"];
const skip = /planned|not available|not operational|not a live|not currently|in development|Proposed|Phase |is developing|is building|not an offer|not a current|will be added|Ethereum is the planned|Open role|View roadmap|EraX Digital is an independent|Connect\. Create|One Ecosystem|Accessibility|User Ownership|Transparency|Innovation|Primary network|SocialFi|First Layer|Careers|Company|Roadmap/;
function texts(html) {
  const out = [];
  let i = 0;
  while (i < html.length) {
    if (html.startsWith("<script", i) || html.startsWith("<style", i)) {
      const tag = html.startsWith("<script", i) ? "script" : "style";
      const end = html.indexOf("</" + tag + ">", i);
      i = end < 0 ? html.length : end + tag.length + 3;
      continue;
    }
    if (html[i] === "<") { const e = html.indexOf(">", i); i = e < 0 ? html.length : e + 1; continue; }
    const n = html.indexOf("<", i);
    const e = n < 0 ? html.length : n;
    const t = html.slice(i, e).replace(/\s+/g, " ").trim();
    if (t.length > 40 && t.length < 220 && /[a-z]/.test(t) && /\s/.test(t) && !skip.test(t)) out.push(t);
    i = e;
  }
  return [...new Set(out)];
}
for (const f of files) {
  const rows = texts(fs.readFileSync(f, "utf8"));
  console.log("\n####", f, rows.length);
  console.log(rows.slice(0, 18).join("\n"));
}
