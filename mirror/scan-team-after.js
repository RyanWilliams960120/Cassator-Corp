const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
const main = html.slice(html.indexOf("<main"), html.indexOf("<footer"));
const plain = main
  .replace(/<script[\s\S]*?<\/script>/g, "")
  .replace(/<style[\s\S]*?<\/style>/g, "")
  .replace(/<[^>]+>/g, "\n")
  .replace(/&amp;/g, "&")
  .split("\n")
  .map((s) => s.trim())
  .filter((s) => s && s.length < 80 && !/^[\s.\u00A0A-Z]{20,}$/.test(s));
console.log(plain.filter((s) => /team|engineer|product|community|creator|leadership|open|manager|founder|role|partnership|business|trust|apply|job/i.test(s)).join("\n"));
console.log("--- team_item count", (html.match(/class="team_item"/g) || []).length);
const i = html.indexOf("jobs@erax.digital");
console.log(html.slice(i - 120, i + 80).replace(/\s+/g, " "));
