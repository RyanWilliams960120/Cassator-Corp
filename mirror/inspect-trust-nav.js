const fs = require("fs");
function show(file) {
  const html = fs.readFileSync(file, "utf8");
  const j = html.indexOf("Trust Center");
  console.log("\n====", file, "first Trust Center", j);
  console.log(html.slice(j - 350, j + 280));
  const k = html.indexOf("footer_link");
  console.log("--- footer", k);
  if (k > 0) console.log(html.slice(k - 100, k + 500));
}
show("trust-center.html");
show("investors.html");
show("compliance.html");
