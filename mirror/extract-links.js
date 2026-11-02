const fs = require("fs");
const html = fs.readFileSync(__dirname + "/index.html", "utf8");
const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
const uniq = [...new Set(hrefs)];
const internal = uniq.filter((u) => u.startsWith("/") || u.includes("cassator.com"));
console.log(internal.join("\n"));
console.log("---scripts---");
[...html.matchAll(/src="([^"]+)"/g)].forEach((m) => console.log(m[1]));
