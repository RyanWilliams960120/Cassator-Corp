const fs = require("fs");
const path = require("path");

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name === "assets" || name === "css" || name === "js") continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, acc);
    else if (name.endsWith(".html")) acc.push(full);
  }
  return acc;
}

const root = path.join(__dirname, "..");
const hrefs = new Set();
const css = new Set();
for (const file of walk(root)) {
  const html = fs.readFileSync(file, "utf8");
  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) hrefs.add(m[1]);
  for (const m of html.matchAll(/href="(https:\/\/cdn\.prod\.website-files\.com[^"]+\.css)"/g)) css.add(m[1]);
}
console.log("---routes---");
[...hrefs].sort().forEach((h) => console.log(h));
console.log("---css---");
[...css].forEach((h) => console.log(h));
