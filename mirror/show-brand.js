const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
function show(needle) {
  let i = 0, n = 0;
  while ((i = html.indexOf(needle, i)) !== -1 && n < 6) {
    console.log("\n@" + i);
    console.log(html.slice(Math.max(0, i - 180), i + needle.length + 80).replace(/\s+/g, " "));
    i += needle.length;
    n++;
  }
}
show("Cassator_Logotype");
show("Cassator.avif");
show("alt=\"Cassator");
show(">Cassator");
console.log("\ncorp count", (html.match(/Cassator Corp/g) || []).length);
console.log("cassator count", (html.match(/[Cc]assator/g) || []).length);
