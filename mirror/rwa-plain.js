const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8");
const start = html.indexOf('class="main"');
const end = html.indexOf("<footer");
const chunk = html.slice(start, end);
const text = chunk
  .replace(/<script[\s\S]*?<\/script>/g, " ")
  .replace(/<style[\s\S]*?<\/style>/g, " ")
  .replace(/<br\s*\/?>/gi, "\n")
  .replace(/<\/(p|div|h1|h2|h3|h4|li|section)>/g, "\n")
  .replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&nbsp;/g, " ")
  .replace(/&gt;/g, ">")
  .replace(/[ \t]{2,}/g, " ")
  .replace(/\n[ \t]+/g, "\n")
  .replace(/\n{3,}/g, "\n\n");
const lines = text.split("\n").map((s) => s.trim()).filter((s) => s && s.length < 220 && !/^[A-Z]{8,}$/.test(s));
console.log(lines.join("\n"));
