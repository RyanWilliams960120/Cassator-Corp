const fs = require("fs");
const path = require("path");

let rwa = fs.readFileSync("rwa.html", "utf8");
const heading = 'Be Part of the <span class="text-span-7"><em>not a launch</em></span>';
console.log("heading", rwa.includes(heading), rwa.includes("1M"));
rwa = rwa.replace(heading, 'A future idea, <span class="text-span-7"><em>not a launch</em></span>');
console.log("1M left", /1M\s*supported/.test(rwa));
fs.writeFileSync("rwa.html", rwa);

let wallet = fs.readFileSync("wallet.html", "utf8");
const long = "Staking and liquidity pools are not part of the current wallet plan.";
let n = 0;
let i = 0;
while ((i = wallet.indexOf(long, i)) !== -1) {
  const before = wallet.slice(i - 120, i).replace(/\s+/g, " ");
  console.log("\n", n, before);
  if (n > 0) {
    wallet = wallet.slice(0, i) + "Not available" + wallet.slice(i + long.length);
    i += "Not available".length;
  } else {
    i += long.length;
  }
  n++;
}
wallet = wallet.replaceAll(">90 days", ">Not set");
wallet = wallet.replaceAll(">180 days", ">Not set");
wallet = wallet.replaceAll(">360 days", ">Not set");
fs.writeFileSync("wallet.html", wallet);
console.log("wallet days", wallet.includes(">90 days"), wallet.includes(">180 days"), wallet.includes(">360 days"));

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name === ".git") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}
let updated = 0;
let failed = 0;
for (const file of walk(".", [])) {
  let html;
  try {
    html = fs.readFileSync(file, "utf8");
  } catch (err) {
    console.log("read fail", file, err.code);
    failed++;
    continue;
  }
  if (!html.includes("/css/erax-identity.css?v=16")) continue;
  const next = html.replaceAll("/css/erax-identity.css?v=16", "/css/erax-identity.css?v=17");
  const tmp = file + ".tmpwrite";
  try {
    fs.writeFileSync(tmp, next);
    fs.renameSync(tmp, file);
    updated++;
  } catch (err) {
    console.log("write fail", file, err.code);
    failed++;
    try { fs.unlinkSync(tmp); } catch (e) {}
  }
}
console.log("updated", updated, "failed", failed);
