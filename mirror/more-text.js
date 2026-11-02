const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
function chunk(label, start, end) {
  const a = html.indexOf(start);
  const b = html.indexOf(end, a + 1);
  console.log("\n####", label, a, b);
  if (a < 0) return;
  const text = html.slice(a, b > a ? b : a + 4000)
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"');
  console.log(text.split("\n").map(s => s.replace(/\s+/g, " ").trim()).filter(s => s && s.length < 220).slice(0, 60).join("\n"));
}
chunk("after hero", "Learn about", "People are");
chunk("triangle", "undervalued", "Social network");
chunk("platform intro", "SL8 is a unified", "Social network");
chunk("vision items", "Short-term Goals", "Dmytro Ivanov");
chunk("team", "Dmytro Ivanov", "footer");
