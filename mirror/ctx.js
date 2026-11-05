const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8");
function raw(needle, before, after) {
  const i = html.indexOf(needle);
  console.log("\n==== " + needle);
  console.log(html.slice(Math.max(0, i - before), i + after).replace(/\s+/g, " "));
}
raw("is mandatory for all participants.", 280, 20);
raw("1M supported assets", 500, 280);
raw("For Investors", 350, 30);
raw(">30 days", 120, 30);
raw("Higher Chances", 80, 200);
raw("Liquidity is protected", 80, 80);
raw("Broad Opportunities", 40, 160);
raw("What Do ", 40, 80);
raw("VIP events", 80, 80);
raw("Register", 40, 40);
