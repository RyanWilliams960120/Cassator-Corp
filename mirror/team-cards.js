const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
const start = html.indexOf("Our team");
const end = html.indexOf("Building together");
const chunk = html.slice(start, end > start ? end : start + 8000);
const cards = [...chunk.matchAll(/<img src="([^"]+)"[^>]*class="ascii_imag"[\s\S]*?<div class="text-11[^"]*">([^<]*)<\/div>[\s\S]*?<h3 class="title-22">([^<]*)<\/h3>/g)];
console.log("cards", cards.length);
cards.slice(0, 6).forEach((m, i) => {
  console.log(i + 1, m[1].slice(-60), "|", m[2], "|", m[3]);
});
