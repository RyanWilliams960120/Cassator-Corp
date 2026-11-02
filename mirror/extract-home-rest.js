const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const text = html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, "\n")
  .replace(/&amp;/g, "&")
  .replace(/&#x27;/g, "'")
  .replace(/&nbsp;/g, " ");
const lines = text.split("\n").map((s) => s.trim()).filter((s) => s && s.length < 280 && !/^[A-Z0-9\s]{18,}$/.test(s));
console.log(lines.slice(160).join("\n"));
