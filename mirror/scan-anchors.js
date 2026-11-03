const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
for (const needle of ["#positions", "Open positions", "aria-label=\"Careers\"", "aria-label=\"Open"]) {
  let i = 0;
  let n = 0;
  while ((i = html.indexOf(needle, i)) !== -1 && n < 5) {
    n++;
    console.log("\n", needle, n, html.slice(i - 120, i + 160).replace(/\s+/g, " "));
    i += needle.length;
  }
}
const p = html.indexOf('<div class="position_popup">');
let depth = 0;
let i = p;
let end = -1;
for (; i < html.length; i++) {
  if (html.startsWith("<div", i)) depth++;
  else if (html.startsWith("</div>", i)) {
    depth--;
    if (depth === 0) { end = i + 6; break; }
  }
}
console.log("popup depth end", end, "len", end - p, "next", html.slice(end, end + 80).replace(/\s+/g, " "));
