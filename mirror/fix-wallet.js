const fs = require("fs");
let html = fs.readFileSync("wallet.html", "utf8");
const pairs = [
  ["Updates in <strong>real time</strong>, shows change.", "A live portfolio view is not available yet."],
  ["One tap </strong>via the &quot;Add Asset&quot; button.", "Adding assets</strong> is not available yet."],
  [">Apple Pay</h3>", ">Not offered</h3>"],
  [">Revolut Pay</h3>", ">Not offered</h3>"],
  [">SWIFT bank transfer</h3>", ">Not offered</h3>"],
  [">$5</h3>", ">—</h3>"],
  [">Near-zero fees</h3>", ">Fees are not set</h3>"],
  ["without leaving EraX Social.", "not available yet."],
  [">Path Payment AMM</h3>", ">Not available</h3>"],
  [">During events,</strong>", ">Not scheduled</strong>"],
];
for (const [from, to] of pairs) {
  const count = html.split(from).length - 1;
  console.log(count ? "ok " + count : "MISSING", from.slice(0, 42));
  if (count) html = html.split(from).join(to);
}
fs.writeFileSync("wallet.html.tmpwrite", html);
fs.renameSync("wallet.html.tmpwrite", "wallet.html");
console.log("saved");
