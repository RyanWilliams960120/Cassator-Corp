const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8");
for (const s of ["tokenize people", "Become a Creator", "Become an Investor", "tokens in issuance", "Token Distribution", "Presale", "Liquidity Locked", "TOKEN SUPPLY"]) {
  console.log(s, html.indexOf(s));
}
const i = html.indexOf("Become a Creator");
console.log("\n" + html.slice(i - 120, i + 200).replace(/\s+/g, " "));
const j = html.indexOf("tokens in issuance");
console.log("\nISSUE\n" + html.slice(j - 180, j + 80));
