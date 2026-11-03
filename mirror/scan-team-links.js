const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const re = /<a[^>]*href="\/team"[^>]*>[\s\S]*?<\/a>/g;
let m;
let n = 0;
while ((m = re.exec(html))) {
  n++;
  console.log("\n---", n, "---");
  console.log(m[0].replace(/\s+/g, " ").slice(0, 500));
}
console.log("count", n);
const team = fs.readFileSync("team.html", "utf8");
let n2 = 0;
const re2 = /<a[^>]*href="\/team"[^>]*>[\s\S]*?<\/a>/g;
while ((m = re2.exec(team))) {
  n2++;
  console.log("\nTEAM FILE", n2, m[0].replace(/\s+/g, " ").slice(0, 400));
}
console.log("team file links", n2);
