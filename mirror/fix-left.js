const fs = require("fs");
const path = require("path");

let rwa = fs.readFileSync("rwa.html", "utf8");
const i = rwa.search(/1M\s*supported assets/);
console.log("1M", i, i < 0 ? "" : JSON.stringify(rwa.slice(i, i + 24)));
if (i >= 0) rwa = rwa.replace(/1M\s*supported assets/, "Not live");

const f = rwa.indexOf("Future Today");
console.log("future", f < 0 ? "missing" : rwa.slice(f - 80, f + 40).replace(/\s+/g, " "));
if (f >= 0) {
  rwa = rwa.replace("Future Today", "not a launch");
}

const p = rwa.indexOf("No prize is offered");
console.log("prize ctx", rwa.slice(p - 220, p + 30).replace(/\s+/g, " "));

const inv = rwa.indexOf(">History</div>");
console.log("history buttons", rwa.split(">History</div>").length - 1);
console.log(rwa.slice(inv - 500, inv + 80).replace(/<svg[\s\S]*?<\/svg>/g, "").replace(/\s+/g, " ").slice(0, 500));

fs.writeFileSync("rwa.html", rwa);

const wallet = fs.readFileSync("wallet.html", "utf8");
let w = 0;
let j = 0;
const needle = "Staking and liquidity pools are not part of the current wallet plan.";
while ((j = wallet.indexOf(needle, j)) !== -1) {
  console.log("\nWALLET", wallet.slice(j - 180, j).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(-140));
  j += needle.length;
  w++;
}
console.log("wallet leads", w);

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name === ".git") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}
let n = 0;
for (const file of walk(".", [])) {
  const html = fs.readFileSync(file, "utf8");
  const next = html.replaceAll("/css/erax-identity.css?v=16", "/css/erax-identity.css?v=17");
  if (next !== html) {
    fs.writeFileSync(file, next);
    n++;
  }
}
console.log("css", n);
