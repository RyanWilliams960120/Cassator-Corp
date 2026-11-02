const https = require("https");
const fs = require("fs");
const urls = [
  "https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a15f63808d5fc0425318eb7_Cassator.avif",
  "https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a3d628e2127e33a1c24eb16_Cassator_Logotype_Horizontal_Transparent.svg"
];
function get(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(get(res.headers.location, dest));
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        fs.writeFileSync(dest, Buffer.concat(chunks));
        resolve(dest + " " + res.statusCode + " " + fs.statSync(dest).size);
      });
    }).on("error", reject);
  });
}
(async () => {
  console.log(await get(urls[0], "mirror/cassator.avif"));
  console.log(await get(urls[1], "mirror/logotype.svg"));
  const team = fs.readFileSync("team.html", "utf8");
  let i = team.indexOf("Cassator.avif");
  console.log(team.slice(i - 250, i + 120).replace(/\s+/g, " "));
  const tc = fs.readFileSync("trust-center.html", "utf8");
  i = tc.indexOf("Cassator.avif");
  console.log("---");
  console.log(tc.slice(i - 250, i + 120).replace(/\s+/g, " "));
})();
