const https = require("https");
const fs = require("fs");
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
  for (const name of ["home.js", "menu.js", "link-shuffle.js"]) {
    const js = await get("https://accipiter69.github.io/casator/" + name);
    fs.writeFileSync("mirror/" + name, js);
    console.log("\n====", name, js.length);
    const lines = js.split(/\n/);
    lines.forEach((line, i) => {
      if (/mouse|pointer|hover|tilt|parallax|clientX|mousemove/i.test(line)) {
        console.log(String(i + 1).padStart(4), line.trim().slice(0, 180));
      }
    });
  }
})();
