const https = require("https");
const url = "https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/css/cassator-corp.webflow.shared.0ab027192.min.css";
https.get(url, (res) => {
  const chunks = [];
  res.on("data", (c) => chunks.push(c));
  res.on("end", () => {
    const css = Buffer.concat(chunks).toString("utf8");
    console.log("bytes", css.length);
    const keys = [".header{", ".nav_logo", ".hero{", ".hero_bird", ".hero_card{", ".u-section{", ".footer{", ".button_main_wrap.orange", ".is--accent", "background:#fff", "background:#fff", "#fa4c14", "#FA4C14"];
    keys.forEach((k) => console.log(k, css.toLowerCase().split(k.toLowerCase()).length - 1));
    function grab(sel) {
      const i = css.indexOf(sel);
      console.log("\n", sel, i < 0 ? "MISSING" : css.slice(i, i + 280));
    }
    grab(".hero_bird{");
    grab(".hero_card{");
    grab(".nav_logo{");
    grab(".image-2{");
    grab(".journey_year{");
    grab(".button_main_wrap.orange{");
    grab(".u-text-style-h1{");
  });
});
