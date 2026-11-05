const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8");
const i = html.indexOf("ascii-css");
console.log("ASCII CONTEXT\n" + html.slice(i - 350, i + 200).replace(/\s+/g, " "));
const d = html.indexOf("distribution_card");
console.log("\nDIST\n" + html.slice(d - 200, d + 1800).replace(/<[^>]+>/g, " | ").replace(/\s+/g, " ").slice(0, 1600));
const m = html.indexOf("market_contain is--2");
console.log("\nMARKET\n" + html.slice(m, m + 1600).replace(/<[^>]+>/g, " | ").replace(/\s+/g, " ").slice(0, 1400));
