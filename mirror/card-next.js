const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf("Yaroslav%20Boichuk.jpg");
console.log("INDEX\n" + html.slice(i, i + 700));
const inv = fs.readFileSync("investors.html", "utf8");
let n = 0;
let p = 0;
while ((p = inv.indexOf("Yaroslav", p)) !== -1) {
  n++;
  console.log("\nINV", n, inv.slice(p, p + 450).replace(/\s+/g, " "));
  p += 8;
}
const team = fs.readFileSync("team.html", "utf8");
for (const key of ["Jacky", "Maryna%20Rudenko", "Taras%20Shved"]) {
  const k = team.indexOf(key);
  const img = team.slice(k - 120, k + 200);
  console.log("\nKEY", key, "\n", img.replace(/\s+/g, " "));
}
