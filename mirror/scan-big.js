const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
console.log("big", (html.match(/icon-42 big/g) || []).length);
console.log("lh-1", (html.match(/lh-1/g) || []).length);
const i = html.indexOf("footer_socials");
console.log("socials index", i, "file", html.length);
const j = html.indexOf("footer_bottom");
console.log("between socials and bottom", j - i);
console.log(html.slice(i, Math.min(html.length, i + 3500)).includes("Contact"));
