const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
let i = 0;
while (true) {
  const at = html.toLowerCase().indexOf("cassator", i);
  if (at < 0) break;
  const s = html.slice(Math.max(0, at - 60), at + 80).replace(/\s+/g, " ");
  console.log(at, s);
  i = at + 8;
}
