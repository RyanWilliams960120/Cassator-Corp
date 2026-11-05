const fs = require("fs");
const path = require("path");

const head =
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600&display=swap"/>' +
  '<link rel="stylesheet" href="/css/erax-identity.css"/>';
const script = '<script src="/js/erax-atmosphere.js" defer></script>';

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror") continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
}

const files = [];
walk(".", files);
let changed = 0;
files.forEach((file) => {
  if (file.includes("whitepaper-print")) return;
  let html = fs.readFileSync(file, "utf8");
  if (!html.includes("cassator-corp.webflow")) return;
  let next = html;
  if (!next.includes("/css/erax-identity.css")) {
    if (!next.includes("</head>")) return;
    next = next.replace("</head>", head + "</head>");
  }
  if (!next.includes("/js/erax-atmosphere.js")) {
    next = next.replace("</body>", script + "</body>");
  }
  if (next !== html) {
    const tmp = file + ".tmpwrite";
    fs.writeFileSync(tmp, next);
    fs.renameSync(tmp, file);
    changed++;
  }
});
console.log("updated", changed, "of", files.length);
