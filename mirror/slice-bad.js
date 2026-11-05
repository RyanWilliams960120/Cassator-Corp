const fs = require("fs");

function slice(file, needle, len) {
  const html = fs.readFileSync(file, "utf8");
  const i = html.indexOf(needle);
  console.log("\n##### " + file + " " + needle + " @" + i);
  console.log(html.slice(i, i + len));
}

slice("index.html", 'class="team u-section"', 2800);
slice("rwa.html", 'class="distribution u-section"', 4500);
slice("rwa.html", 'class="participation u-section"', 3500);
