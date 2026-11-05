const fs = require("fs");
const html = fs.readFileSync("documentation/tokenomics.html", "utf8");
let i = 0;
let n = 0;
while ((i = html.indexOf("wf-form-JOIN-CASSATOR", i)) >= 0 && n < 2) {
  console.log("\n---", n, i);
  console.log(html.slice(i - 120, i + 180).replace(/\s+/g, " "));
  i += 20;
  n++;
}
console.log("intro form", fs.readFileSync("documentation/introduction.html", "utf8").includes("wf-form-JOIN-CASSATOR"));
