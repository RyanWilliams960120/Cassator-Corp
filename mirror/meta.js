const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const head = html.slice(0, html.indexOf("</head>") + 7);
const metas = [...head.matchAll(/<meta[^>]+>/g)].map(m => m[0]);
for (const m of metas) {
  if (/description|og:|twitter|title/i.test(m)) console.log(m.slice(0, 400));
}
const can = head.match(/rel="canonical"[^>]*>/);
console.log("canonical", can && can[0]);
const ld = head.indexOf("ld+json");
console.log("ld", ld);
