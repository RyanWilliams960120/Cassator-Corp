const fs = require("fs");
const https = require("https");

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(get(res.headers.location));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      })
      .on("error", reject);
  });
}

function scripts(html) {
  const out = [];
  for (const m of html.matchAll(/<script\b[^>]*>/gi)) out.push(m[0].slice(0, 220));
  return out;
}

(async () => {
  const live = await get("https://www.cassator.com/");
  const local = fs.readFileSync("index.html", "utf8");
  fs.writeFileSync("mirror/live-index.html", live);
  console.log("live bytes", live.length, "local bytes", local.length);
  const ls = scripts(live);
  const os = scripts(local);
  console.log("--- live scripts", ls.length);
  ls.forEach((s) => console.log(s));
  console.log("--- only in live");
  const setL = new Set(os);
  ls.filter((s) => !setL.has(s)).forEach((s) => console.log(s));
  console.log("--- only in local");
  const setO = new Set(ls);
  os.filter((s) => !setO.has(s)).forEach((s) => console.log(s));
  const pubL = (live.match(/Last Published:[^<]+/) || [])[0];
  const pubO = (local.match(/Last Published:[^<]+/) || [])[0];
  console.log("published live", pubL);
  console.log("published local", pubO);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
