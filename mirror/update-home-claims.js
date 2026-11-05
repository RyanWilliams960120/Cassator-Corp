const fs = require("fs");
const file = "index.html";
let html = fs.readFileSync(file, "utf8");
const pairs = [
  [
    "Products described on this site are in development and are not publicly available.",
    "EraX Social is available. EraX Wallet and EraX Creator are in development. EraX Assets is not operational.",
  ],
  [
    "Planned products.</span><span class=\"gallery-line right is--gallery\">Social, wallet, and creator experiences.",
    "EraX Social.</span><span class=\"gallery-line right is--gallery\">Available now. Wallet and creator tools are planned.",
  ],
  [
    "EraX Social, EraX Wallet, and EraX Creator are planned. EraX Assets is a potential future product and is not currently operational.",
    "EraX Social is the current product. EraX Wallet and EraX Creator are planned. EraX Assets is a potential future product and is not currently operational.",
  ],
  [
    "A planned SocialFi platform for user profiles, social feeds, content publishing, communities, messaging, and wallet connectivity.",
    "The current social product for accounts, posts, follows, comments, communities, and messages.",
  ],
  [
    "Social platform is next.",
    "2026 through 2028.",
  ],
  [
    "EraX Social, EraX Wallet, and EraX Creator are planned products. EraX Assets is a potential future product and is not currently operational.",
    "EraX Social is the current product. EraX Wallet and EraX Creator are planned. EraX Assets is not currently operational.",
  ],
];
pairs.forEach(function (pair) {
  const at = html.indexOf(pair[0]);
  if (at < 0 || html.indexOf(pair[0], at + 1) >= 0) throw new Error("not unique " + pair[0]);
  html = html.replace(pair[0], pair[1]);
});
fs.writeFileSync(file + ".tmpwrite", html);
fs.renameSync(file + ".tmpwrite", file);
console.log("homepage claims updated");
