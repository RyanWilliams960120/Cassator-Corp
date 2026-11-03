const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const re = /<a href="(\/team|\/newsroom|mailto:[^"]+)" class="footer_social/g;
let m;
while ((m = re.exec(html))) {
  console.log("\n", m[1], "at", m.index);
  console.log(html.slice(m.index - 80, m.index + 40).replace(/\s+/g, " "));
}
