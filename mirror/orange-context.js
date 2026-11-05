const fs = require("fs");
const css = fs.readFileSync("mirror/site.css", "utf8");
const i = css.indexOf(".market_tabs-toggle.is--active-tab");
console.log(css.slice(i, i + 420));
console.log("\n--- text-span ---");
[".text-span-35", ".text-span-36", ".text-span-37", ".text-span-38", ".italic-text-2", ".ascii_wrap-2"].forEach((n) => {
  const j = css.indexOf(n + "{");
  console.log(n, j < 0 ? "missing" : css.slice(j, j + 160));
});

function snippet(file, needle) {
  const html = fs.readFileSync(file, "utf8");
  const j = html.indexOf(needle);
  console.log("\n## " + file + " " + needle + " " + j);
  if (j >= 0) console.log(html.slice(j, j + 500).replace(/<[^>]+>/g, " | ").replace(/\s+/g, " ").slice(0, 450));
}
snippet("rwa.html", "Every Token Strengthens");
snippet("wallet.html", "liqu-big");
snippet("index.html", "how-it-works");
snippet("built-on-stellar.html", "architecture_item is--accent");
