const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const classes = new Set();
for (const m of html.matchAll(/class="([^"]*cursor[^"]*)"/gi)) classes.add(m[1]);
for (const m of html.matchAll(/class="([^"]*mouse[^"]*)"/gi)) classes.add(m[1]);
console.log([...classes].slice(0, 40).join("\n") || "none");
const hits = [];
let i = 0;
while ((i = html.toLowerCase().indexOf("cursor", i)) !== -1 && hits.length < 15) {
  hits.push(html.slice(Math.max(0, i - 40), i + 60).replace(/\s+/g, " "));
  i += 6;
}
console.log("---");
hits.forEach((h) => console.log(h));
