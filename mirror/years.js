const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
console.log([...html.matchAll(/year-text">([^<]+)/g)].map(m => m[1]));
console.log("text-32", [...html.matchAll(/text-32">([^<]+)/g)].map(m => m[1]));
