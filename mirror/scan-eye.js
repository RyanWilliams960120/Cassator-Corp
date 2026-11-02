const https = require("https");
function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    }).on("error", reject);
  });
}
(async () => {
  const js = await get("https://accipiter69.github.io/casator/eye.js");
  require("fs").writeFileSync("mirror/eye.js", js);
  js.split(/\n/).forEach((line, i) => {
    if (/mouse|pointer|clientX|hover|tilt/i.test(line)) console.log(String(i+1).padStart(4), line.trim().slice(0, 160));
  });
})();
