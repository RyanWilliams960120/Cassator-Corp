const https = require("https");
const url = "https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/css/cassator-corp.webflow.shared.0ab027192.min.css";
https.get(url, (res) => {
  const chunks = [];
  res.on("data", (c) => chunks.push(c));
  res.on("end", () => {
    const css = Buffer.concat(chunks).toString("utf8");
    [".hero_cards{", ".hero_card.is--2", ".hero_card.is--3", ".hero_card{", ".u-text-style-h1.is--hero"].forEach((sel) => {
      const i = css.indexOf(sel);
      console.log("\n", i < 0 ? sel + " MISSING" : css.slice(i, i + 420));
    });
  });
});
