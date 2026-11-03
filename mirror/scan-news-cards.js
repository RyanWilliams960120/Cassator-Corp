const fs = require("fs");
const html = fs.readFileSync("newsroom.html", "utf8");
const re = /<img[^>]+src="([^"]+)"[^>]*>/g;
let m;
const imgs = [];
while ((m = re.exec(html))) imgs.push({ i: m.index, src: m[1].split("/").pop() });
const titles = ["WE BELIEVE", "Digital ownership", "Making Web3", "planned approach", "Creator monetization", "Press Contact"];
titles.forEach((t) => {
  const at = html.indexOf(t);
  const prev = imgs.filter((img) => img.i < at).pop();
  console.log(t, "->", prev && prev.src);
});
const c = html.indexOf(">Contact</");
console.log("contact buttons", html.split(">Contact<").length - 1);
const press = html.indexOf("Press Contact");
console.log(html.slice(press, press + 700).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 300));
