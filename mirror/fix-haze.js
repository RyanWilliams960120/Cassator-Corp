const fs = require("fs");
const path = require("path");

const stop =
  '<script>(function(){document.querySelectorAll(".hero_bird .phximg,.hero_bird canvas,.cassator-preloader canvas").forEach(function(n){if(n.parentNode)n.parentNode.removeChild(n);});document.documentElement.classList.add("cassator-loaded");if(document.body)document.body.classList.add("cassator-loaded");})();</script>';
const hero = '<script src="https://accipiter69.github.io/casator/hero.js" defer></script>';

let index = fs.readFileSync("index.html", "utf8");
if (!index.includes(stop)) {
  if (!index.includes(hero)) throw new Error("hero script missing");
  index = index.replace(hero, stop + hero);
}
index = index.replace(/erax-identity\.css\?v=\d+/g, "erax-identity.css?v=6");
fs.writeFileSync("index.html", index);
console.log("index", index.includes(stop), index.includes("erax-identity.css?v=6"));

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror") continue;
    const full = path.join(dir, name);
    let st;
    try { st = fs.statSync(full); } catch (e) { continue; }
    if (st.isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
}
const files = [];
walk(".", files);
let n = 0;
const failed = [];
files.forEach((file) => {
  if (file === "index.html") return;
  let html;
  try { html = fs.readFileSync(file, "utf8"); } catch (e) { return; }
  if (!/erax-identity\.css\?v=\d+/.test(html)) return;
  const next = html.replace(/erax-identity\.css\?v=\d+/g, "erax-identity.css?v=6");
  if (next === html) return;
  try { fs.writeFileSync(file, next); n++; }
  catch (e) { failed.push(file + " " + e.code); }
});
console.log("others", n, "failed", failed.join(" | "));
