const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8");
const start = html.indexOf('class="main"');
const end = html.indexOf('id="cta"');
const chunk = html.slice(start, end > start ? end : start + 20000);
const text = chunk
  .replace(/<script[\s\S]*?<\/script>/g, " ")
  .replace(/<[^>]+>/g, "\n")
  .replace(/&amp;/g, "&")
  .replace(/&nbsp;/g, " ")
  .split("\n")
  .map((s) => s.trim())
  .filter((s) => s && s.length < 180);
console.log(text.slice(0, 120).join("\n"));
console.log("\nLEN", text.length);
