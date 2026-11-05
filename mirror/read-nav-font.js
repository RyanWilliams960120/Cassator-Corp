const fs = require("fs");
const css = fs.readFileSync("mirror/site.css", "utf8");
for (const sel of [".text-13{", ".horiz-8{", ".button_main_text{", ".u-paragraph-small{", ".footer_link{"]) {
  const i = css.indexOf(sel);
  console.log("\n", sel, i >= 0 ? css.slice(i, i + 220) : "missing");
}
