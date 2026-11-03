const fs = require("fs");
const html = fs.readFileSync("mirror/index.html", "utf8");
for (const s of ["mailto:hello@cassator.corp", "mailto:press@cassator.corp"]) {
  let i = 0;
  while (true) {
    const at = html.indexOf(s, i);
    if (at < 0) break;
    console.log(s, at);
    i = at + 10;
  }
}
