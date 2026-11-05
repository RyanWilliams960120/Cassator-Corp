const fs = require("fs");
const path = require("path");

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
}

const icon = '<link href="/assets/erax-favicon.png" rel="icon" type="image/png"/>';
const files = [];
walk(".", files);
let icons = 0;
files.forEach((file) => {
  let html = fs.readFileSync(file, "utf8");
  if (!html.includes('rel="icon"') && !html.includes("rel='icon'")) return;
  const next = html
    .replace(/<link href="[^"]+" rel="icon"[^>]*>/g, "")
    .replace(/<link href="[^"]+" rel="apple-touch-icon"[^>]*>/g, "")
    .replace("</head>", icon + "</head>");
  if (next !== html) {
    const tmp = file + ".tmpwrite";
    fs.writeFileSync(tmp, next);
    fs.renameSync(tmp, file);
    icons++;
  }
});

const indexPath = "index.html";
let index = fs.readFileSync(indexPath, "utf8");
const phoenix = index.includes("hero-phoenix-composed");
index = index.replace(
  /src="https:\/\/cdn\.prod\.website-files\.com\/[^"]*hero-phoenix-composed[^"]*"/,
  'src="/assets/erax-eagle.png"'
);
index = index.replace(
  /(<img src="\/assets\/erax-eagle.png"[^>]*?) srcset="[^"]*"/,
  "$1"
);
const triangle = index.includes("Frame%2082.webp");
index = index.replace(
  "https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a084a7adc5aa082d9826070_Frame%2082.webp",
  "/assets/erax-logo.svg"
);
const tmp = indexPath + ".tmpwrite";
fs.writeFileSync(tmp, index);
fs.renameSync(tmp, indexPath);
console.log("icons", icons, "phoenix", phoenix, "triangle", triangle, "left phoenix", index.includes("hero-phoenix"), "left frame", index.includes("Frame%2082"));
