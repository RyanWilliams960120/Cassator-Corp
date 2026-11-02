const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const start = html.indexOf("journey_text is--1");
const end = html.indexOf("Careers", html.indexOf("vision_card"));
const text = html.slice(start, end)
  .replace(/<[^>]+>/g, "\n")
  .split("\n")
  .map(s => s.replace(/\s+/g, " ").trim())
  .filter(s => s && s.length < 280 && !/^[A-Z]{10,}$/.test(s));
console.log(text.join("\n"));
console.log("\nOLD", ["none of them completed", "Not started", "Proposed only", "Phase 1–2", "No token has been launched"].filter(s => html.includes(s)));
