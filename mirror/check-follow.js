const fs = require("fs");
const index = fs.readFileSync("index.html", "utf8");
const a = index.indexOf('class="team u-section"');
console.log(index.slice(a, a + 1200).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 350));
const rwa = fs.readFileSync("rwa.html", "utf8");
console.log({
  gold: rwa.includes("Gold Eagle"),
  investors: rwa.includes("For Investors"),
  survival: rwa.includes("of Survival"),
  sale: rwa.includes("Initial Sale"),
  v17: rwa.includes("erax-identity.css?v=17"),
});
for (const file of ["team.html", "careers.html"]) {
  const html = fs.readFileSync(file, "utf8");
  const i = html.indexOf("Accountability");
  console.log(file, i < 0 ? "missing" : html.slice(Math.max(0, i - 15), i + 35).replace(/\s+/g, " "));
}
