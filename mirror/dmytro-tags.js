const fs = require("fs");
const html = fs.readFileSync("investors.html", "utf8");
const re = /<img\b[^>]*Dmytro\.jpg[^>]*>/g;
const tags = html.match(re) || [];
console.log("tags", tags.length);
tags.forEach((t, i) => {
  console.log("\nTAG", i, "len", t.length);
  console.log(t);
});
for (const f of ["team.html", "index.html"]) {
  console.log(f, fs.readFileSync(f, "utf8").includes("Dmytro.jpg") ? "STILL" : "clear");
}
