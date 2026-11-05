const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
const link = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600&display=swap"/>';

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}

let files = 0;
let links = 0;
let busts = 0;
for (const file of walk(root, [])) {
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  if (html.includes(link)) {
    html = html.split(link).join("");
    links += 1;
  }
  const next = html.replace(/\/css\/erax-identity\.css\?v=1[01]/g, "/css/erax-identity.css?v=12");
  if (next !== html) busts += 1;
  html = next
    .replaceAll('font-family: Manrope, "Segoe UI", sans-serif;', 'font-family: "Golos Text", sans-serif;')
    .replaceAll('font-family: "Cormorant Garamond", Georgia, serif;', 'font-family: "Playfair Display", serif;');
  if (html !== before) {
    fs.writeFileSync(file, html);
    files += 1;
  }
}
console.log(JSON.stringify({ files, links, busts }));
