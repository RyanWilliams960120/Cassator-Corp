const fs = require("fs");
function contexts(file, re) {
  const html = fs.readFileSync(file, "utf8");
  const out = [];
  let m;
  const r = new RegExp(re, "gi");
  while ((m = r.exec(html))) {
    const s = html.slice(Math.max(0, m.index - 70), m.index + 90).replace(/\s+/g, " ");
    if (!out.includes(s)) out.push(s);
  }
  console.log("\n##", file, out.length);
  out.slice(0, 12).forEach((s) => console.log(s));
}
contexts("index.html", "Cassator|CASSATOR|SL8|Sl8|mailto:|@erax|footer_social|linkedin");
contexts("newsroom.html", "Cassator|SL8|Sl8");
contexts("trust-center.html", "Cassator|SL8|audit|certif|Security|Privacy");
contexts("team.html", "mailto:|jobs@|Careers|hello@|Apply");
