const https = require("https");
const paths = ["/", "/sl8", "/sl8.html", "/rwa", "/investors", "/newsroom", "/team", "/trust-center", "/trust-center/privacy-policy"];
function get(url) {
  return new Promise((resolve) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        res.resume();
        resolve({ url, status: res.statusCode, location: res.headers.location || "" });
      })
      .on("error", (e) => resolve({ url, error: String(e) }));
  });
}
(async () => {
  for (const p of paths) {
    const r = await get("https://companysite-wheat.vercel.app" + p);
    console.log(r.status || r.error, r.location, r.url);
  }
})();
