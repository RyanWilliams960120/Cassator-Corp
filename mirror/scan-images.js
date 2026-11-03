const fs = require("fs");
const path = require("path");
function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name === ".git") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
}
const files = [];
walk(".", files);
const re = /src="([^"]*(?:Cassator|cassator|SL8|sl8|Stellar|SSLX|sslx)[^"]*)"/g;
const counts = {};
files.forEach((file) => {
  const html = fs.readFileSync(file, "utf8");
  let m;
  while ((m = re.exec(html))) {
    const src = m[1].split("/").pop();
    counts[src] = (counts[src] || 0) + 1;
  }
});
console.log(counts);
console.log("sl8 logo path count");
files.forEach((file) => {
  const html = fs.readFileSync(file, "utf8");
  const n = html.split("M153.001 170.001").length - 1;
  if (n) console.log(n, file);
});
