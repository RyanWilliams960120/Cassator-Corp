const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8");
function around(needle, before, after) {
  const i = html.indexOf(needle);
  console.log("\n==== " + needle + " @" + i);
  if (i < 0) return;
  console.log(html.slice(i - before, i + after).replace(/<[^>]+>/g, " | ").replace(/\s+/g, " ").slice(0, 900));
}
around("30 days", 180, 40);
around("360–720 days", 160, 40);
around("No sale share", 160, 40);
around("No fund split", 160, 40);
around("Day 1", 80, 40);
around("is mandatory", 220, 40);
around("1M", 250, 200);
around("For Investors", 200, 80);
around("Token Buyer", 40, 900);
around("No country count", 180, 40);
around("Higher Chances", 40, 120);
around(">Register", 0, 0);
const i = html.indexOf("Token Buyer");
console.log("\nPATH TEXT\n" + html.slice(i, i + 2200).replace(/<[^>]+>/g, "\n").replace(/\n+/g, "\n").replace(/[ \t]{2,}/g, " "));
