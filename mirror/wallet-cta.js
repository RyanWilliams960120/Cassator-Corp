const fs = require("fs");
const html = fs.readFileSync("wallet.html", "utf8");
const i = html.indexOf('id="CTA"');
const j = html.indexOf("</section>", i);
const text = html.slice(i, j).replace(/<svg[\s\S]*?<\/svg>/g, " ").replace(/<[^>]+>/g, "\n").replace(/\s+/g, " ").trim();
console.log(text.slice(0, 800));
console.log("len", j - i);
