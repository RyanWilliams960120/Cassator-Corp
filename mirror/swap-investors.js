const fs = require("fs");
const file = "investors.html";
let html = fs.readFileSync(file, "utf8");
const src = "/assets/Yaroslav%20Boichuk.jpg";
html = html.replace(/<img\b[^>]*Dmytro\.jpg[^>]*>/g, (tag) => {
  const width = (tag.match(/width="(\d+)"/) || [])[1];
  const height = (tag.match(/height="(\d+)"/) || [])[1];
  const cls = (tag.match(/class="([^"]+)"/) || [])[1];
  return `<img src="${src}" loading="lazy" width="${width}" height="${height}" alt="Yaroslav Boichuk" class="${cls}"/>`;
});
if (html.includes("Dmytro.jpg")) throw new Error("jpg remains");
fs.writeFileSync(file, html);
console.log("updated investors, name text left", html.includes("Dmytro"));
