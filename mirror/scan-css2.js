const fs = require("fs");
const css = fs.readFileSync("mirror/site.css", "utf8");
let i = 0, n = 0;
while ((i = css.indexOf("cursor:", i)) !== -1 && n < 30) {
  console.log(css.slice(Math.max(0, i - 80), i + 40).replace(/\s+/g, " "));
  console.log("---");
  i += 7;
  n++;
}
console.log("TOUCH CONTEXT");
i = css.indexOf("w-mod-touch");
console.log(css.slice(Math.max(0, i - 120), i + 200));
