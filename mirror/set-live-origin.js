const fs = require("fs");
const path = require("path");
const from = "https://companysite-wheat.vercel.app";
const to = "https://erax-digital.vercel.app";
const files = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (/\.(html|js)$/.test(name)) files.push(full);
  }
}
walk(".");
let changed = 0;
let replacements = 0;
files.forEach((file) => {
  const before = fs.readFileSync(file, "utf8");
  if (!before.includes(from)) return;
  const count = before.split(from).length - 1;
  const html = before.split(from).join(to);
  const tmp = file + ".tmpwrite";
  fs.writeFileSync(tmp, html);
  fs.renameSync(tmp, file);
  changed++;
  replacements += count;
});
const left = [];
files.forEach((file) => {
  if (fs.readFileSync(file, "utf8").includes(from)) left.push(file);
});
console.log("changed", changed, "replacements", replacements, "left", left.length);
const sample = fs.readFileSync("documentation.html", "utf8");
const i = sample.indexOf("erax-digital.vercel.app");
console.log(sample.slice(i - 40, i + 80));
if (left.length || !sample.includes(to) || sample.includes(from)) process.exit(1);
