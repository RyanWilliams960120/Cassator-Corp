const https = require("https");
const url = "https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/css/cassator-corp.webflow.shared.0ab027192.min.css";
https.get(url, (res) => {
  const chunks = [];
  res.on("data", (c) => chunks.push(c));
  res.on("end", () => {
    const css = Buffer.concat(chunks).toString("utf8");
    const i = css.indexOf(":root{");
    console.log(css.slice(i, i + 2500));
    console.log("\n\n---- body ----");
    const b = css.indexOf("body{");
    console.log(css.slice(b, b + 400));
  });
});
