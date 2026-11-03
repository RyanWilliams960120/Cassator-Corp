const fs = require("fs");
const path = require("path");
function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name === ".git" || name === "docs") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
}
const files = [];
walk(".", files);
const needles = ["Cassator Corp", "CASSATOR", "sl8.online", "hello@cassator", "press@cassator", "stellar.expert", "SSLX", "BSLX"];
files.forEach((file) => {
  const html = fs.readFileSync(file, "utf8");
  needles.forEach((n) => {
    const c = html.split(n).length - 1;
    if (c) console.log(c, n, file);
  });
});
console.log("jobs pages", files.filter((f) => fs.readFileSync(f, "utf8").includes("mailto:jobs@erax.digital")).length);
console.log("contact pages", files.filter((f) => fs.readFileSync(f, "utf8").includes("mailto:contact@erax.digital")).length);
