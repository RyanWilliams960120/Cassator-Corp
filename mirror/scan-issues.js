const fs = require("fs");
const path = require("path");

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name === ".git") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
}

const files = [];
walk(".", files);

const needles = [
  "Cassator",
  "cassator",
  "SL8",
  "Michael Jackson",
  "LaunchYour",
  "Gold Eagle",
  "GoldEagle",
  "phximg",
  "erax-eagle",
  "Not a deployment",
  "not an offer",
  "Not for sale",
  "you@example.com",
  "example.com",
  "lorem",
  "Lorem",
  "TODO",
  "FIXME",
  "undefined",
  "null",
  "Accountabilityto",
  "Roadmap",
  "First Layer 2",
  "for sale",
  "APY",
  "audit",
];

const counts = {};
for (const n of needles) counts[n] = [];

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  for (const n of needles) {
    const c = html.split(n).length - 1;
    if (c) counts[n].push(file.replace(/\\/g, "/") + ":" + c);
  }
}

for (const n of needles) {
  if (!counts[n].length) continue;
  console.log("\n== " + n + " ==");
  console.log(counts[n].slice(0, 18).join("\n"));
  if (counts[n].length > 18) console.log("... " + counts[n].length + " files");
}
