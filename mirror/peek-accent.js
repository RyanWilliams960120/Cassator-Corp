const https = require("https");
const url = "https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/css/cassator-corp.webflow.shared.0ab027192.min.css";
https.get(url, (res) => {
  const chunks = [];
  res.on("data", (c) => chunks.push(c));
  res.on("end", () => {
    const css = Buffer.concat(chunks).toString("utf8");
    [".is--accent{", ".title-row.assent-left{", ".title-row.assent-right{", ".button_main_wrap{", ".button_main_wrap.orange", ".orange{", "body{", ".footer{", ".nav{", ".hero{"].forEach((sel) => {
      let i = 0;
      let n = 0;
      while ((i = css.indexOf(sel, i)) >= 0 && n < 2) {
        console.log("\n", css.slice(i, i + 320));
        i += sel.length;
        n++;
      }
    });
  });
});
