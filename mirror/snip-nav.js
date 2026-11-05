const fs = require("fs");
const css = fs.readFileSync("mirror/site.css", "utf8");
[".phximg", ".phx-ascii", ".phx-trail", ".hero_bird", ".cassator-preloader"].forEach(function (key) {
  let i = 0, n = 0;
  while ((i = css.indexOf(key, i)) !== -1 && n < 4) {
    console.log("\n====", key, i, "====\n" + css.slice(Math.max(0, i - 40), i + 280));
    i += key.length;
    n++;
  }
});
