const fs = require("fs");
let html = fs.readFileSync("wallet.html", "utf8");
const pairs = [
  ["base 9.5%", "Not offered"],
  ["base 14.5%", "Not offered"],
  ["base 19%", "Not offered"],
  [">3 Pools<", ">Not offered<"],
  [">50%<", ">Not offered<"],
  ["Invest in people.", "Digital assets, planned."],
  [">Sale Allocation<", ">Not offered<"],
  [">Sale Period<", ">Not offered<"],
];
pairs.forEach(([a, b]) => {
  const n = html.split(a).length - 1;
  console.log(n, a);
  html = html.split(a).join(b);
});
const tmp = "wallet.html.tmpwrite";
fs.writeFileSync(tmp, html);
fs.renameSync(tmp, "wallet.html");
