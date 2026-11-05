const fs = require("fs");

function show(file, needles) {
  const html = fs.readFileSync(file, "utf8");
  console.log("\n######## " + file);
  for (const needle of needles) {
    let i = 0, n = 0;
    while ((i = html.indexOf(needle, i)) !== -1 && n < 2) {
      console.log("\n@" + needle + " " + i);
      console.log(html.slice(Math.max(0, i - 80), i + 220).replace(/\s+/g, " "));
      i += needle.length;
      n++;
    }
    if (n === 0) console.log("missing " + needle);
  }
}

show("index.html", ["Open roles", "Careers</div>", "Yaroslav Boichuk"]);
show("rwa.html", ["Gold Eagle", "Michael Jackson", "Initial Sale", "not live", "for sale", "APY"]);
show("wallet.html", ["Start using", "EraX Social Wallet", "Not offered"]);
