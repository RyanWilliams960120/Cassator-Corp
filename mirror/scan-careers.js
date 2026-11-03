const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
const keys = ["Product", "Engineering", "Creator", "Growth", "Partnership", "Community", "department", "Open role", "Apply"];
keys.forEach((k) => {
  let i = 0, n = 0;
  while ((i = html.indexOf(k, i)) !== -1 && n < 3) {
    console.log("\n==", k, i);
    console.log(html.slice(Math.max(0, i - 80), i + 120).replace(/\s+/g, " "));
    i += k.length; n++;
  }
});
