const fs = require("fs");
const path = require("path");
const https = require("https");

const root = path.join(__dirname, "..");
const pages = [
  ["/", "index.html"],
  ["/sl8", "sl8.html"],
  ["/rwa", "rwa.html"],
  ["/wallet", "wallet.html"],
  ["/paid-content", "paid-content.html"],
  ["/investors", "investors.html"],
  ["/newsroom", "newsroom.html"],
  ["/team", "team.html"],
  ["/trust-center", "trust-center.html"],
  ["/built-on-stellar", "built-on-stellar.html"],
  ["/trust-center/privacy-policy", "trust-center/privacy-policy.html"],
  ["/trust-center/terms-of-use", "trust-center/terms-of-use.html"],
  ["/trust-center/security", "trust-center/security.html"],
  ["/trust-center/safety", "trust-center/safety.html"],
  ["/trust-center/compliance-kyc-aml", "trust-center/compliance-kyc-aml.html"],
  ["/trust-center/cookie-policy", "trust-center/cookie-policy.html"],
  ["/newsroom/can-crypto-finally-solve-the-paying-for-the-internet-problem", "newsroom/can-crypto-finally-solve-the-paying-for-the-internet-problem.html"],
  ["/newsroom/from-the-creator-economy-to-the-tokenized-economy-how-the-digital-market-is-changing", "newsroom/from-the-creator-economy-to-the-tokenized-economy-how-the-digital-market-is-changing.html"],
  ["/newsroom/the-rwa-tokenization-of-human-potential-a-new-concept-in-the-digital-economy", "newsroom/the-rwa-tokenization-of-human-potential-a-new-concept-in-the-digital-economy.html"],
  ["/newsroom/who-owns-your-future-income-the-rise-of-rwa-human-capital-markets", "newsroom/who-owns-your-future-income-the-rise-of-rwa-human-capital-markets.html"],
  ["/news-categories/blockchain", "news-categories/blockchain.html"],
  ["/news-categories/creator-economy", "news-categories/creator-economy.html"],
  ["/news-categories/human-capital", "news-categories/human-capital.html"],
  ["/news-categories/platform", "news-categories/platform.html"],
  ["/news-categories/press", "news-categories/press.html"],
  ["/news-categories/privacy", "news-categories/privacy.html"],
  ["/news-categories/rwa", "news-categories/rwa.html"],
  ["/news-categories/socialfi", "news-categories/socialfi.html"]
];

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        get(res.headers.location).then(resolve, reject);
        return;
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

(async () => {
  for (const [route, file] of pages) {
    const dest = path.join(root, file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const buf = await get("https://www.cassator.com" + route);
    fs.writeFileSync(dest, buf);
    console.log(file, buf.length);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
