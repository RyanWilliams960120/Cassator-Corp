const fs = require("fs");
function show(file, needle, span = 350) {
  const html = fs.readFileSync(file, "utf8");
  let i = 0;
  let n = 0;
  while ((i = html.indexOf(needle, i)) !== -1 && n < 4) {
    n++;
    console.log("\n", file, n, html.slice(Math.max(0, i - 180), i + span).replace(/\s+/g, " ").slice(0, 500));
    i += needle.length;
  }
}
show("index.html", "Open roles");
show("index.html", 'aria-label="Careers"');
const files = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = dir + "/" + name;
    if (name === "node_modules" || name === "mirror") continue;
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (name.endsWith(".html") && fs.readFileSync(p, "utf8").includes('href="/team">Contact</a>')) files.push(p);
  }
}
walk(".");
console.log("contact files", files);
files.forEach((file) => show(file, 'href="/team">Contact</a>', 200));
const partner = [];
function walk2(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = dir + "/" + name;
    if (name === "node_modules" || name === "mirror") continue;
    if (fs.statSync(p).isDirectory()) walk2(p);
    else if (name.endsWith(".html") && fs.readFileSync(p, "utf8").includes("Partners / BD")) partner.push(p);
  }
}
walk2(".");
console.log("partner", partner);
partner.forEach((file) => show(file, "Partners / BD", 120));
