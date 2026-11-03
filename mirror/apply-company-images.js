const fs = require("fs");
const path = require("path");
const files = ["newsroom.html"].concat(fs.readdirSync("newsroom").filter((n) => n.endsWith(".html")).map((n) => path.join("newsroom", n)));
const swaps = [
  ["6a26a11f2d8d2b30dfe442fa_image-placeholder-title.avif", "/assets/company-ownership.svg"],
  ["6a26a01e3b54f86efb3de701_0x0.avif", "/assets/company-wallet.svg"],
  ["6a26a01e3b54f86efb3de701_0x0-p-500.avif", "/assets/company-wallet.svg"],
  ["6a26a01e3b54f86efb3de701_0x0-p-800.avif", "/assets/company-wallet.svg"],
  ["6a26a01e3b54f86efb3de701_0x0-p-1080.avif", "/assets/company-wallet.svg"],
  ["6a26a01e3b54f86efb3de701_0x0-p-1600.avif", "/assets/company-wallet.svg"],
  ["6a269ea9311fc74d4f582d9e_Untitled-design-7.avif", "/assets/company-community.svg"],
  ["6a269ea9311fc74d4f582d9e_Untitled-design-7-p-500.avif", "/assets/company-community.svg"],
  ["6a269ea9311fc74d4f582d9e_Untitled-design-7-p-800.avif", "/assets/company-community.svg"],
  ["6a269ea9311fc74d4f582d9e_Untitled-design-7-p-1080.avif", "/assets/company-community.svg"],
  ["6a269ea9311fc74d4f582d9e_Untitled-design-7-p-1600.avif", "/assets/company-community.svg"],
  ["6a2699beacc91890e367e80c_AA21bxCI.avif", "/assets/company-creator.svg"],
];
files.forEach((file) => {
  let html = fs.readFileSync(file, "utf8");
  swaps.forEach(([from, to]) => {
    html = html.split(from).join(to.split("/").pop() === from ? from : to);
  });
  // The split above replaced filenames inside full URLs with a root path only when the token is the filename.
  // If the filename was part of a longer URL, the URL is now broken (domain + /assets/...). Fix those.
  html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/[^"\s]*\/assets\//g, "/assets/");
  html = html.replace(/<div class="author-short small"><img src="[^"]+" loading="lazy" width="48" height="24" alt="[^"]*" class="icon-h-24"\/><\/div><div class="text-10 is--jet">[^<]+<\/div>/g,
    '<div class="author-short small"><img src="/assets/erax-mark.svg" loading="lazy" width="48" height="24" alt="EraX Digital" class="icon-h-24"/></div><div class="text-10 is--jet">EraX Digital</div>');
  const tmp = file + ".tmpwrite";
  fs.writeFileSync(tmp, html);
  fs.renameSync(tmp, file);
  console.log(file, html.includes("Cassator Corp") , html.includes("Thestreet"), html.includes("image-placeholder"));
});
