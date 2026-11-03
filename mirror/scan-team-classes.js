const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
const start = html.indexOf("<main");
const end = html.indexOf("<footer");
const main = html.slice(start, end);
const marks = ["hero-inner", "values", "team_wrp", "team-section", "position", "Join US", "section_team", "class=\"team", "id=\"positions\"", "id=\"cta\""];
marks.forEach((mark) => console.log(mark, main.indexOf(mark)));
let i = 0;
while ((i = main.indexOf("class=\"", i)) !== -1 && i < 1500) {
  const c = main.slice(i, main.indexOf(">", i));
  if (/section|hero|value|team|position|cta/i.test(c)) console.log(i, c.slice(0, 120));
  i += 8;
}
console.log("--- later classes ---");
["team_list", "team_wrp", "team_section", "positions_section", "position_list", "cta_section", "section is--"].forEach((s) => {
  console.log(s, main.indexOf(s));
});
const classes = [...main.matchAll(/class="([^"]*(?:team|position|cta|value|hero)[^"]*)"/gi)].map((m) => m[1]);
console.log([...new Set(classes)].slice(0, 80).join("\n"));
