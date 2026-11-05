const fs = require("fs");
const file = "index.html";
let html = fs.readFileSync(file, "utf8");
const from = "https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a084be55abeeac53f6d0dce_Group%2020.svg";
const to = "/assets/erax-logo.svg";
if (!html.includes(from)) {
  console.log("src missing");
  process.exit(1);
}
html = html.replace(from, to);
html = html.replace("erax-identity.css?v=4", "erax-identity.css?v=5");
fs.writeFileSync(file, html);
console.log("index updated", html.includes(to), html.includes("erax-identity.css?v=5"));
