const fs = require("fs");
const html = fs.readFileSync("trust-center/privacy-policy.html", "utf8");
const i = html.indexOf("<main");
const text = html.slice(i, i + 6000).replace(/<[^>]+>/g, "\n").replace(/\s+/g, " ").slice(0, 800);
console.log(text);
console.log("---classes---");
const j = html.indexOf("privacy");
console.log("rich", html.includes("w-richtext"), "policy", html.includes("u-rich-text"));
