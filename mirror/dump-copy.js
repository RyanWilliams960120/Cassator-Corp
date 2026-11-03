const fs = require("fs");
const path = require("path");

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function texts(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .split("\n")
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter((s) => s.length > 40 && s.length < 600 && !/^[A-Z0-9]{20,}$/.test(s));
}

const files = walk(".");
const keys = [
  /EraX (Social|Wallet|Creator|Assets|Earn|Bridge)/i,
  /independent/i,
  /planned/i,
  /not (currently |a live|available|operational)/i,
  /token/i,
  /Connect\. Create/i,
  /principle/i,
  /roadmap/i,
  /Development/i,
  /Cassator/i,
  /Stellar/i,
  /completed/i,
];

for (const f of files) {
  const html = fs.readFileSync(f, "utf8");
  const lines = [...new Set(texts(html))].filter((t) => keys.some((k) => k.test(t)));
  if (!lines.length) continue;
  console.log("\n##### " + f);
  for (const l of lines) console.log("- " + l);
}
