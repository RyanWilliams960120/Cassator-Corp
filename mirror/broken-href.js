const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf("/paid-contentu/");
console.log(html.slice(i - 300, i + 200));
console.log("\nCOUNT", html.split("/paid-contentu/").length - 1);
const rwa = fs.readFileSync("rwa.html", "utf8").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<script[\s\S]*?<\/script>/g, " ");
const lines = rwa.replace(/<[^>]+>/g, "\n").split("\n").map((s) => s.replace(/\s+/g, " ").trim()).filter((s) => s && s.length > 2 && s.length < 280 && !/^[A-Z0-9 .]{30,}$/.test(s));
const start = lines.findIndex((s) => s === "EraX Social Platform");
console.log("\nRWA FROM HERO\n" + lines.slice(start, start + 30).join("\n"));
