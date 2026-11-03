const fs = require("fs");
const path = require("path");
function walk(dir, out = []) {
  for (const n of fs.readdirSync(dir)) {
    if (n === "mirror" || n === "node_modules") continue;
    const p = path.join(dir, n);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (n.endsWith(".html")) out.push(p.replace(/\\/g, "/"));
  }
  return out;
}
const files = walk(".");
const known = new Set(files.map((f) => f.replace(/\.html$/, "").replace(/\/index$/, "")));
known.add("");
const missing = [];
for (const f of files) {
  const html = fs.readFileSync(f, "utf8");
  const hrefs = html.match(/href="\/[^"]*"/g) || [];
  for (const raw of hrefs) {
    let href = raw.slice(6, -1).split("#")[0].split("?")[0];
    if (href.endsWith("/")) href = href.slice(0, -1);
    if (!href.startsWith("/")) continue;
    const key = href.slice(1);
    if (known.has(key) || known.has(key + "/index")) continue;
    if (fs.existsSync(key) || fs.existsSync(key + ".html") || fs.existsSync(path.join(key, "index.html"))) continue;
    missing.push(f + " -> " + raw);
  }
}
console.log([...new Set(missing)].slice(0, 40).join("\n") || "no missing internal hrefs");
console.log("checked", files.length);

const rwa = fs.readFileSync("rwa.html", "utf8").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<script[\s\S]*?<\/script>/g, " ");
const lines = rwa.replace(/<[^>]+>/g, "\n").split("\n").map((s) => s.replace(/\s+/g, " ").trim()).filter((s) => s && s.length < 220 && !/^[A-Z0-9]{20,}$/.test(s));
console.log("\nRWA TEXT\n" + lines.slice(0, 25).join("\n"));
