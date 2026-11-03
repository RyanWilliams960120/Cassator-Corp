const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
function show(href) {
  const key = `href="${href}" class="footer_social`;
  let from = 0;
  while (true) {
    const i = html.indexOf(key, from);
    if (i < 0) break;
    const end = html.indexOf("</a>", i);
    const text = html.slice(i, end).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    console.log(href, text.slice(0, 180));
    from = end;
  }
}
show("/team");
show("/newsroom");
show("mailto:contact@erax.digital");
