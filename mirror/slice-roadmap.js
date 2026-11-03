const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");

function show(label, startNeedle, endNeedle, pad = 0) {
  const i = html.indexOf(startNeedle);
  const j = endNeedle ? html.indexOf(endNeedle, i + startNeedle.length) : i + 2500;
  console.log("\n======== " + label + " @" + i + " ========");
  console.log(html.slice(i, (j > 0 ? j : i + 2000) + pad).slice(0, 3500));
}

show("YEAR CLOCK", 'class="journey_year', 'class="journey_text is--1"');
show("FIRST DOTS", 'class="journey_line"', 'class="journey_year');
show("CARD7", "Development Transparency", "class=\"team ");
