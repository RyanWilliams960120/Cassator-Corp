const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const scripts = [...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map((m) => m[1]);
console.log(scripts.join("\n"));
const i = html.indexOf("cylinderCarousel");
console.log("inline", i);
