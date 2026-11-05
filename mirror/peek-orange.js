const https = require("https");
const url = "https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/css/cassator-corp.webflow.shared.0ab027192.min.css";
https.get(url, (res) => {
  const chunks = [];
  res.on("data", (c) => chunks.push(c));
  res.on("end", () => {
    const css = Buffer.concat(chunks).toString("utf8");
    const re = /([^{}]+)\{[^}]*#fa4c14[^}]*\}/gi;
    const sels = new Set();
    let m;
    while ((m = re.exec(css))) {
      m[1].split(",").forEach((s) => sels.add(s.trim().slice(0, 80)));
    }
    console.log([...sels].join("\n"));
    console.log("count", sels.size);
  });
});
