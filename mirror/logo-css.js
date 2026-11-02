const fs = require("fs");
const css = fs.readFileSync("mirror/site.css", "utf8");
for (const key of [".image-2{", ".nav_logo{", ".nav_logo "]) {
  let i = 0, n = 0;
  while ((i = css.indexOf(key, i)) !== -1 && n < 3) {
    console.log(css.slice(i, i + 180));
    console.log("---");
    i += key.length;
    n++;
  }
}
