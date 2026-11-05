const fs = require("fs");
const path = require("path");
function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name === ".git") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}
const left = [];
for (const file of walk(".", [])) {
  const html = fs.readFileSync(file, "utf8");
  if (html.includes("erax-identity.css?v=16")) left.push(file);
}
console.log("still v16", left.length);
for (const file of left) {
  const html = fs.readFileSync(file, "utf8").replaceAll("/css/erax-identity.css?v=16", "/css/erax-identity.css?v=17");
  const tmp = file + ".tmpwrite";
  fs.writeFileSync(tmp, html);
  try {
    fs.renameSync(tmp, file);
    console.log("renamed", file);
  } catch (err) {
    fs.writeFileSync(file, html);
    fs.unlinkSync(tmp);
    console.log("wrote", file, err.code);
  }
}
const rwa = fs.readFileSync("rwa.html", "utf8");
console.log("rwa css", rwa.includes("v=17"), "heading", rwa.includes("A future idea"), "1M assets", /1M\s*supported/.test(rwa), "investors", rwa.includes("For Investors"), "survival", rwa.includes("of Survival"), "rug", rwa.includes("rug pulls"));
const index = fs.readFileSync("index.html", "utf8");
console.log("home", index.includes(">The team</h2>"), index.includes("Open roles"), index.includes("v=17"));
