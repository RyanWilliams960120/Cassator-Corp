const fs = require("fs");
const html = fs.readFileSync("trust-center.html", "utf8");
for (const s of ["Report an Issue", "How we process", "Safe Environment", "Questions"]) {
  const i = html.indexOf(s);
  console.log("\n##", s, i);
  if (i >= 0) console.log(html.slice(i - 180, i + 220).replace(/\s+/g, " "));
}
