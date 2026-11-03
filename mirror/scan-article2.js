const fs = require("fs");
const html = fs.readFileSync("documentation/responsible-disclosure.html", "utf8");
const main = html.slice(html.indexOf("<main"), html.indexOf("<footer"));
const plain = main.replace(/<[^>]+>/g, "\n").replace(/&amp;/g, "&").split("\n").map(s => s.trim()).filter(s => s.length > 40 && s.length < 400);
console.log(plain.slice(0, 25).join("\n---\n"));
console.log("len", main.length);
