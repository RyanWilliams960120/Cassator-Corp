const fs = require("fs");
let html = fs.readFileSync("rwa.html", "utf8");
const pairs = [
  ["50% of Initial Sale", "No sale share"],
  ["50% of funds", "No fund split"],
  ["Minimum participation is <strong>supported assets </strong>staked.", "No participation minimum is announced."],
  ["Initial Sale — <strong>30 days</strong>", "No sale window is announced"],
  ["<strong>More than 100 countries</strong>", "<strong>No country count is published</strong>"],
  ["1 – 10M supported assets", "Not announced"],
  ["&gt; 10M supported assets", "Not announced"],
  ["> 10M supported assets", "Not announced"],
  ["Future token sales from the <strong>75% reserve</strong>", "No reserve sale is announced"],
  [
    "<div>A future token</div><div>is <span class=\"is--accent\">not live</span></div>",
    "<div>A future token is </div><div><span class=\"is--accent\">not live</span></div>",
  ],
];
for (const [from, to] of pairs) {
  const count = html.split(from).length - 1;
  console.log(count ? "ok " + count : "MISSING", JSON.stringify(from).slice(0, 70));
  if (count) html = html.split(from).join(to);
}
fs.writeFileSync("rwa.html", html);
