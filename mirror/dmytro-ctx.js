const fs = require("fs");
const files = ["team.html", "index.html", "investors.html"];
for (const f of files) {
  const html = fs.readFileSync(f, "utf8");
  const i = html.indexOf("Dmytro.jpg");
  console.log("\n====", f, i);
  if (i < 0) continue;
  console.log(html.slice(i - 500, i + 700).replace(/\s+/g, " ").slice(0, 1400));
}
