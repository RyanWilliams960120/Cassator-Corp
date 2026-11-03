const fs = require("fs");
const html = fs.readFileSync("wallet.html", "utf8");
let i = 0;
let n = 0;
while ((i = html.indexOf("mailto:contact@erax.digital", i)) !== -1) {
  n++;
  const start = html.lastIndexOf("<a ", i);
  const end = html.indexOf("</a>", i) + 4;
  console.log("\nMAIL", n, "len", end - start, "parent snippet");
  console.log(html.slice(Math.max(0, start - 90), start).replace(/\s+/g, " "));
  console.log("class", (html.slice(start, start + 180).match(/class="[^"]+"/) || [])[0]);
  i = end;
}
const all = [...html.matchAll(/All News/g)];
console.log("\nall news", all.length);
const idx = fs.readFileSync("index.html", "utf8");
console.log("index newsroom", (idx.match(/newsroom/g) || []).length);
console.log("index company nav", idx.includes('class="nav_link">Company</a>'));
const ghStart = idx.indexOf('<a href="https://github.com/EraX-Digital"');
const ghEnd = idx.indexOf("</a>", ghStart) + 4;
fs.writeFileSync("mirror/github-anchor.html", idx.slice(ghStart, ghEnd));
console.log("github anchor bytes", ghEnd - ghStart);
