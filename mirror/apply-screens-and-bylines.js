const fs = require("fs");
const path = require("path");

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name === ".git") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
}

const screens = {
  "screen-all.html": "all",
  "screen-portfolio.html": "portfolio",
  "screen-topup.html": "topup",
  "screen-send.html": "send",
  "screen-earn.html": "earn",
  "screen-rwa.html": "rwa",
  "cnt-screen-layers.html": "layers",
  "cnt-screen-subscriptions.html": "subscriptions",
  "cnt-screen-feed.html": "feed",
};

const files = [];
walk(".", files);
let screensChanged = 0;
files.forEach((file) => {
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  Object.keys(screens).forEach((name) => {
    html = html.split("https://cassator-design.vercel.app/pages/screens/" + name).join("/assets/planned-screen.html?view=" + screens[name]);
  });
  html = html.replace(/>(Thestreet|Sean Lee|Benziga|MSN)<\/div>/g, ">EraX Digital</div>");
  html = html.replace(/<img src="https:\/\/cdn\.prod\.website-files\.com\/[^"]+" loading="lazy"(?: width="48" height="24")? alt="(?:Thestreet|Sean Lee|Benziga|MSN)?" class="icon-h-24"\/>/g,
    '<img src="/assets/erax-mark.svg" loading="lazy" alt="EraX Digital" class="icon-h-24"/>');
  if (file === "newsroom.html") {
    const at = html.indexOf("For journalists, analysts, and media inquiries:");
    if (at > 0) {
      const button = html.indexOf('class="button_main_text">Contact</div>', at);
      if (button > 0 && button < at + 2500) {
        html = html.slice(0, button) + 'class="button_main_text">contact@erax.digital</div>' + html.slice(button + 'class="button_main_text">Contact</div>'.length);
      }
      const link = html.indexOf('class="clickable_link', at);
      if (link > 0 && link < at + 4000) {
        html = html.replace('href="/newsroom" class="clickable_link w-inline-block"></a></div></div><div class="news_aside-card">',
          'href="mailto:contact@erax.digital" class="clickable_link w-inline-block"></a></div></div><div class="news_aside-card">');
      }
    }
  }
  if (html !== before) {
    const tmp = file + ".tmpwrite";
    fs.writeFileSync(tmp, html);
    fs.renameSync(tmp, file);
    screensChanged++;
  }
});
console.log("files", screensChanged);
const wallet = fs.readFileSync("wallet.html", "utf8");
console.log("old screens", wallet.includes("cassator-design"));
console.log("planned", wallet.includes("planned-screen.html"));
const article = fs.readFileSync("newsroom/who-owns-your-future-income-the-rise-of-rwa-human-capital-markets.html", "utf8");
console.log("thestreet left", article.includes("Thestreet"));
console.log("news contact", fs.readFileSync("newsroom.html", "utf8").includes("button_main_text\">contact@erax.digital"));
