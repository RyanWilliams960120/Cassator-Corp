const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
function show(label, needle, before, after) {
  const i = html.indexOf(needle);
  console.log("\n====", label, i);
  if (i < 0) return;
  console.log(html.slice(i - before, i + after));
}
show("nav roadmap", '>Roadmap</a>', 180, 40);
show("section", 'id="roadmap"', 80, 200);
show("eyebrow roadmap", ">Roadmap</p>", 120, 40);
show("cta roadmap", ">Roadmap</h3>", 160, 80);
const vision = html.indexOf(">Vision</h2>");
console.log("\n==== vision h2", vision);
console.log(html.slice(vision - 250, vision + 500));
