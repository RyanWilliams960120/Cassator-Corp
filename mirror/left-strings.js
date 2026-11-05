const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8");
const needles = [
  "live market",
  "contribution",
  "Financial",
  "Token Holder",
  "Badges",
  "Virtual badge",
  "virtual badge",
  "participate",
  "Apply to",
  "published formula",
  "fund split",
  "token promotion",
  "10%",
  "1 000",
  "1 000",
];
for (const n of needles) {
  const i = html.indexOf(n);
  console.log("\n## " + JSON.stringify(n) + " @" + i);
  if (i >= 0) console.log(html.slice(i - 40, i + 90).replace(/\s+/g, " "));
}
