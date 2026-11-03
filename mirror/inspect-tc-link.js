const fs = require("fs");
const html = fs.readFileSync("trust-center.html", "utf8");
const re = /<a href="\/trust-center"[^>]*>Trust Center<\/a>/g;
let m;
while ((m = re.exec(html))) {
  console.log(m[0]);
  console.log("--- context ---");
  console.log(html.slice(m.index - 80, m.index + m[0].length + 80));
  console.log("====");
}
console.log("count", (html.match(re) || []).length);
const re2 = /nav_link[^<]{0,40}Trust Center/g;
console.log("loose", html.match(re2));
