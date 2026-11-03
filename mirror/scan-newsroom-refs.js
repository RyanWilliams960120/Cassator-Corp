const fs = require("fs");
const path = require("path");
const hits = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (name.endsWith(".html") || name.endsWith(".js")) {
      const html = fs.readFileSync(full, "utf8");
      if (html.includes("All News") || (html.includes("/newsroom") && !html.includes("nav_link"))) {
        const n = (html.match(/\/newsroom/g) || []).length;
        if (n && !full.startsWith("newsroom")) hits.push(full + " " + n);
      }
    }
  }
}
walk(".");
console.log(hits.join("\n"));
console.log("--- chrome company context ---");
const chrome = fs.readFileSync("js/chrome.js", "utf8");
let i = 0;
while ((i = chrome.indexOf("newsroom", i)) !== -1) {
  console.log(chrome.slice(Math.max(0, i - 80), i + 60).replace(/\n/g, " "));
  i += 8;
}
