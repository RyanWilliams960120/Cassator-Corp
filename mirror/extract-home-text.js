const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const text = html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, "\n")
  .replace(/&amp;/g, "&")
  .replace(/&#x27;/g, "'")
  .replace(/&nbsp;/g, " ")
  .replace(/\n{2,}/g, "\n");
const lines = text.split("\n").map((s) => s.trim()).filter((s) => s && s.length < 240 && !/^[A-Z0-9]{12,}$/.test(s));
console.log(lines.slice(0, 180).join("\n"));
console.log("---TOTAL", lines.length);
