const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
const mainStart = html.indexOf('<main class="main">');
const mainEnd = html.indexOf("</main>");
console.log("len", html.length, "mainStart", mainStart, "mainEnd", mainEnd);
const head = html.slice(0, mainStart);
const tail = html.slice(mainEnd);
console.log("--- HEAD TAIL MARKERS ---");
["<title>", 'name="description"', "og:description", "twitter:description", "canonical", "og:url", "</head>"].forEach((k) => {
  const i = head.indexOf(k);
  console.log(k, i);
  if (i >= 0) console.log(head.slice(Math.max(0, i - 80), i + 220).replace(/\n/g, " "));
});
const navNeedle = 'href="/trust-center" class="nav_link">Trust Center</a></div><div class="nav_link-wrp is--cont">';
console.log("nav needle", head.indexOf(navNeedle), "count", head.split(navNeedle).length - 1);
const footerNeedle = 'class="footer_link u-paragraph-small">Roadmap</a>';
let idx = 0;
let n = 0;
while ((idx = tail.indexOf(footerNeedle, idx)) !== -1) {
  n++;
  console.log("footer", n, tail.slice(idx - 80, idx + footerNeedle.length));
  idx += footerNeedle.length;
}
console.log("tail starts", tail.slice(0, 200));
console.log("body script area", tail.slice(-400));
