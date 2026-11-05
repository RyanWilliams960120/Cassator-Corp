const fs = require("fs");
["sl8.html", "rwa.html", "index.html"].forEach(function (file) {
  const html = fs.readFileSync(file, "utf8");
  let i = 0;
  let n = 0;
  console.log("\nFILE", file, "count", html.split(">Roadmap<").length - 1);
  while ((i = html.indexOf(">Roadmap<", i)) >= 0 && n < 6) {
    console.log(html.slice(i - 160, i + 20).replace(/\s+/g, " "));
    i += 8;
    n++;
  }
});
const home = fs.readFileSync("index.html", "utf8");
console.log("history", home.includes("Company founding"), "team", home.includes('class="team u-section"'), "long", home.includes("Long-term Vision"), "nav", home.includes('class="nav_link">Roadmap'));
console.log("chrome", fs.readFileSync("js/chrome.js", "utf8").includes("Roadmap"));
