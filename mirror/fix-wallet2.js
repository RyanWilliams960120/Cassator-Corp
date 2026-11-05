const fs = require("fs");
let html = fs.readFileSync("wallet.html", "utf8");
const pairs = [
  ["Any way <span class=\"is--accent\">you want.</span>", "No top-up <span class=\"is--accent\">is live.</span>"],
  [">One-tap participation</h3>", ">Not available</h3>"],
  ["Configurable tolerance per swap", "Not available"],
  ["For exchanges, DEX and frequent recipients", "Not available"],
];
for (const [from, to] of pairs) {
  const count = html.split(from).length - 1;
  console.log(count ? "ok" : "MISSING", from.slice(0, 40));
  if (count === 1) html = html.split(from).join(to);
}
fs.writeFileSync("wallet.html.tmpwrite", html);
fs.renameSync("wallet.html.tmpwrite", "wallet.html");
