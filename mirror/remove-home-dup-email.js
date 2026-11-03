const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const start = html.indexOf('<div class="nav_link-wrp is--cont">');
const end = html.indexOf('<div class="nav_link-wrp mob">', start);
if (start < 0 || end < 0) throw new Error("markers missing " + start + " " + end);
const block = html.slice(start, end);
if (!block.includes("mailto:contact@erax.digital") || (block.match(/mailto:contact@erax.digital/g) || []).length !== 1) {
  throw new Error("unexpected contact block");
}
const next = html.slice(0, start) + html.slice(end);
if ((next.match(/mailto:contact@erax.digital/g) || []).length !== 1) throw new Error("email count");
if ((next.match(/github.com\/EraX-Digital/g) || []).length !== 1) throw new Error("github count");
const tmp = "index.html.tmpwrite";
fs.writeFileSync(tmp, next);
fs.renameSync(tmp, "index.html");
console.log("removed nav contact", block.length, "remaining mailto", 1);
