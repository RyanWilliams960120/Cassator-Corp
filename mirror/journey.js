const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const i = html.indexOf("Our journey");
console.log("idx", i);
if (i < 0) {
  const j = html.toLowerCase().indexOf("journey");
  console.log("journey", j, html.slice(j, j + 200));
} else {
  const chunk = html.slice(i, i + 8000);
  const text = chunk.replace(/<[^>]+>/g, "\n").replace(/&amp;/g, "&").replace(/&#x27;/g, "'");
  console.log(text.split("\n").map(s => s.trim()).filter(Boolean).slice(0, 80).join("\n"));
}
