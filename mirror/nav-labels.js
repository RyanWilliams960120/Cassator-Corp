const fs = require("fs");
function buttons(file) {
  const html = fs.readFileSync(file, "utf8");
  const a = html.indexOf("<header");
  const b = html.indexOf("<main");
  const chunk = html.slice(a, b);
  const re = /button_main_text">([^<]+)/g;
  const labels = [];
  let m;
  while ((m = re.exec(chunk))) labels.push(m[1]);
  const nav = [...chunk.matchAll(/class="nav_link">([^<]+)/g)].map(x => x[1]);
  console.log(file, "buttons", labels, "nav", nav.slice(0, 20));
}
buttons("index.html");
buttons("investors.html");
buttons("sl8.html");
