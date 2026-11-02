const fs = require("fs");
const path = require("path");

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "mirror" || name === "node_modules" || name === ".git") continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (/\.html$/i.test(name)) out.push(p);
  }
  return out;
}

for (const file of walk(".")) {
  let text = fs.readFileSync(file, "utf8");
  const next = text
    .replaceAll("$CASSATOR", "EraX Digital")
    .replace(/([^-\w])CASSATOR/g, "$1EraX Digital")
    .replaceAll(">https://cassator.com/</a>", ">EraX Digital</a>")
    .replaceAll("https://compliance@cassator.corp", "mailto:compliance@erax.digital");
  if (next !== text) fs.writeFileSync(file, next);
}

const logo = fs.readFileSync("assets/erax-logo.svg");
fs.writeFileSync("assets/logo.svg", logo);

const title = fs.readFileSync("index.html", "utf8").match(/<title>[^<]+<\/title>/);
console.log(title && title[0]);
const left = [];
for (const file of walk(".")) {
  const text = fs.readFileSync(file, "utf8");
  const re = /CASSATOR|Cassator/g;
  let m;
  while ((m = re.exec(text))) {
    const slice = text.slice(Math.max(0, m.index - 24), m.index + 28).replace(/\s+/g, " ");
    if (/cassator-preloader|cassator-loaded|cassator-corp|www\.cassator|x\.com\/cassator|wefunder\.com\/cassator|brandbook|cassator-design|Cassator\.avif|JOIN-CASSATOR/.test(slice)) continue;
    left.push(path.basename(file) + " | " + slice);
  }
}
console.log("visible leftovers", left.length);
[...new Set(left)].forEach((s) => console.log(s));
