const fs = require("fs");
function hits(file) {
  const text = fs.readFileSync(file, "utf8");
  const re = /CASSATOR/g;
  let m, n = 0;
  console.log("\n==", file);
  while ((m = re.exec(text)) && n < 12) {
    console.log(text.slice(Math.max(0, m.index - 70), m.index + 50).replace(/\s+/g, " "));
    console.log("---");
    n++;
  }
}
hits("index.html");
hits("investors.html");
hits("rwa.html");
hits("team.html");
hits("newsroom/from-the-creator-economy-to-the-tokenized-economy-how-the-digital-market-is-changing.html");
