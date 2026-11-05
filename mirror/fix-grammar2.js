const fs = require("fs");
let html = fs.readFileSync("rwa.html", "utf8");
const i = html.indexOf("Your contribution is");
console.log(html.slice(i, i + 220).replace(/\s+/g, " "));
const pairs = [
  ["is not a live market", "is not open"],
  ["Simple Financial <span class=\"is--accent\">Interest</span>", "Not a financial <span class=\"is--accent\">product</span>"],
  ["Token Holder <span class=\"is--accent\">Badges</span>", "Profile <span class=\"is--accent\">badges</span>"],
  ["Virtual badge in <strong class=\"bold-text-3\">EraX Social profile</strong> — visible to the entire community", "Not available"],
  ["Two different ways to participate — same <strong>ecosystem</strong>, different roles.", "No participation path is open."],
  ["— no published formula", "is not published"],
  ["<strong>No fund split </strong>→ token promotion", "<strong>No promotion </strong>is offered"],
  [">10%</h3>", ">None</h3>"],
  [">1 000</h3>", ">None</h3>"],
];
for (const [from, to] of pairs) {
  const count = html.split(from).length - 1;
  console.log(count ? "ok " + count : "MISSING", from.slice(0, 50));
  if (count) html = html.split(from).join(to);
}
const c = html.indexOf("Your contribution is");
const end = html.indexOf("</h2>", c);
const heading = html.slice(c, end);
console.log("HEAD", heading.replace(/\s+/g, " "));
html = html.slice(0, c) + "EraX Assets is a future concept." + html.slice(end);
fs.writeFileSync("rwa.html", html);
