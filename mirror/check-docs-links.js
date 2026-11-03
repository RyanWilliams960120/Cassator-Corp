const fs = require("fs");
const path = require("path");
const root = process.cwd();
function files(dir) {
  return fs.readdirSync(dir).filter((name) => name.endsWith(".html")).map((name) => path.join(dir, name));
}
const pages = ["documentation.html", "whitepaper.html"].concat(files("documentation"));
const missing = [];
let links = 0;
pages.forEach((file) => {
  const html = fs.readFileSync(file, "utf8");
  const hrefs = html.match(/href="(\/[^"#?]*)/g) || [];
  hrefs.forEach((raw) => {
    const href = raw.slice(6);
    if (!href.startsWith("/documentation") && href !== "/whitepaper" && !href.startsWith("/docs/")) return;
    links++;
    let target = href.replace(/^\//, "");
    if (target.endsWith("/")) target += "index.html";
    const candidates = [target, target + ".html", path.join(target, "index.html")];
    if (!candidates.some((item) => fs.existsSync(item))) missing.push(file + " -> " + href);
  });
});
const intro = fs.readFileSync("documentation/introduction.html", "utf8");
console.log("pages", pages.length, "internal doc links", links, "missing", missing.length);
missing.slice(0, 20).forEach((line) => console.log(line));
["docs-crumb", "docs-toc", "docs-pager", "docs-prev", "Previous", "Next"].forEach((token) => {
  console.log(token, intro.includes(token));
});
const pdf = fs.readFileSync("docs/erax-whitepaper.pdf");
const count = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
console.log("pdf page objects", count);
