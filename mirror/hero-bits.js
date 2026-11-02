const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
for (const s of ["Revenue for 2025", "projects on Stellar", "token holders", "People are the most", "We're building an ecosystem", "We&#x27;re building", "valuable asset"]) {
  const i = html.indexOf(s);
  console.log("\n==", s, i);
  if (i >= 0) console.log(html.slice(i - 80, i + s.length + 40).replace(/\s+/g, " "));
}
