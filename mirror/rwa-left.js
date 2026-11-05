const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8");
["New token issuance", "1M supported", "days to distribute", "Participate"].forEach((n) => {
  const i = html.indexOf(n);
  console.log("\n##", n, i);
  if (i >= 0) console.log(html.slice(i - 20, i + 140).replace(/\s+/g, " "));
});
