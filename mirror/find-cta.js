const fs = require("fs");
const css = fs.readFileSync("mirror/site.css", "utf8");
[".cta-img", ".cta>", ".cta{", ".cta "].forEach(function (key) {
  let i = css.indexOf(key);
  console.log("\n====", key, i, "====");
  if (i >= 0) console.log(css.slice(i, i + 360));
});
