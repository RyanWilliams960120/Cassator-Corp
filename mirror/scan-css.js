const https = require("https");
const fs = require("fs");
const url =
  "https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/css/cassator-corp.webflow.shared.0ab027192.min.css";
https.get(url, (res) => {
  const chunks = [];
  res.on("data", (c) => chunks.push(c));
  res.on("end", () => {
    const css = Buffer.concat(chunks).toString("utf8");
    fs.writeFileSync("mirror/site.css", css);
    console.log("bytes", css.length);
    const keys = ["cursor:", "w-mod-touch", ":hover", "pointer-events"];
    for (const k of keys) {
      let n = 0, i = 0;
      while ((i = css.indexOf(k, i)) !== -1) { n++; i += k.length; }
      console.log(k, n);
    }
    // print cursor rules
    const re = /[^{}]*cursor:[^{}]*\{[^{}]*\}/g;
    const hits = css.match(re) || [];
    console.log("--- cursor rules", hits.length);
    hits.slice(0, 25).forEach((h) => console.log(h.slice(0, 240)));
  });
});
