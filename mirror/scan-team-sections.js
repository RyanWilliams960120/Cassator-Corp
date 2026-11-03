const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
const start = html.indexOf("<main");
const end = html.indexOf("<footer");
const main = html.slice(start, end);
let i = 0;
let n = 0;
while ((i = main.indexOf("<section", i)) !== -1) {
  n++;
  const close = main.indexOf("</section>", i);
  const chunk = main.slice(i, close + 10);
  const text = chunk.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 400);
  console.log("\n==== SECTION", n, "len", chunk.length, "====");
  console.log(text);
  i = close + 10;
}
console.log("\nhead title", (html.match(/<title>[^<]+/) || [])[0]);
console.log("form", html.includes("wf-form-JOIN-CASSATOR"), html.includes("/js/apply.js"));
