const fs = require("fs");
["sl8.html", "rwa.html"].forEach(function (file) {
  const html = fs.readFileSync(file, "utf8");
  const i = html.indexOf('class="button_main_text">Roadmap');
  console.log("\n", file);
  console.log(html.slice(i, i + 900).replace(/\s+/g, " "));
});
