const fs = require("fs");
const html = fs.readFileSync("built-on-stellar.html", "utf8");
const re = /class="ecosystem_img"[^>]*>|src="([^"]+)"[^>]*class="ecosystem_img"/g;
const re2 = /<img[^>]*class="ecosystem_img"[^>]*>/g;
let m;
while ((m = re2.exec(html))) {
  const src = (m[0].match(/src="([^"]+)"/) || [])[1] || "";
  console.log(src.split("/").pop());
}
