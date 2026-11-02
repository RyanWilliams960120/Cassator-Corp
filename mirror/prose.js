const fs = require("fs");
const files = ["rwa.html","investors.html","wallet.html","sl8.html","paid-content.html","built-on-stellar.html","index.html","team.html","trust-center.html"];
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
    if (t.length > 28 && t.length < 240 && /[a-z]/.test(t) && /\s/.test(t)) out.push(t);
    i = e;
  }
  return out;
}
for (const f of files) {
  console.log("\n####", f);
  const uniq = [...new Set(texts(fs.readFileSync(f, "utf8")))];
  console.log(uniq.slice(0, 40).join("\n"));
}
