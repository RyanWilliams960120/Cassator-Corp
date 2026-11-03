const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
function around(label, len) {
  const i = html.indexOf(label);
  console.log("\n\n########", label, i);
  console.log(html.slice(i - 400, i + len));
}
around("Product &amp; Engineering", 200);
around("Creator &amp; Growth Partnerships", 200);
around("Community</div>", 200);
// find section wrappers by looking backward for class that starts a block
const markers = ["Product &amp; Engineering", "Creator &amp; Growth Partnerships", ">Community</div>"];
markers.forEach((m) => {
  const i = html.indexOf(m);
  const start = html.lastIndexOf("<section", i);
  const prev = html.lastIndexOf('class="', i - 500);
  console.log("\nSECTION", m, "sectionAt", start, "classNear", html.slice(prev, prev + 80));
});
