const fs = require("fs");
const css = fs.readFileSync("mirror/site.css", "utf8");
const sels = [
  ".cta-inner_grad{",
  ".principles_inner-cell.sticky{",
  ".vision_visual-devider{",
  ".journey_year{",
  ".features_num{",
  ".ecosystem_tag{",
  ".distribution_line-inner.is--3{",
  ".u-orange-corner-2{",
  ".features_item-img{",
];
for (const sel of sels) {
  const i = css.indexOf(sel);
  console.log("\n---", sel, "---\n", i < 0 ? "missing" : css.slice(i, i + 320));
}
