const fs = require("fs");
let html = fs.readFileSync("rwa.html", "utf8");
const needle = '<div class="text-10 caps is--white-55 link-appear">in development</div>';
const i = html.indexOf(needle);
if (i < 0) {
  console.log("missing");
  process.exit(1);
}
const start = html.lastIndexOf("<div class=\"u-text-style-h4 u-white-gradient\">", i);
const end = i + needle.length;
const from = html.slice(start, end);
const to = '<div class="u-text-style-h4 u-white-gradient">Planned</div><div class="text-10 caps is--white-55 link-appear">Not operational</div>';
html = html.slice(0, start) + to + html.slice(end);
fs.writeFileSync("rwa.html", html);
console.log("replaced", JSON.stringify(from));
