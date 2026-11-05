const fs = require("fs");

function textBetween(html, startNeedle, endNeedle, label) {
  const a = html.indexOf(startNeedle);
  const b = endNeedle ? html.indexOf(endNeedle, a + startNeedle.length) : a + 8000;
  const chunk = html.slice(a, b > a ? b : a + 4000);
  const text = chunk
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<\/(p|div|h1|h2|h3|h4|li|tr)>/g, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .replace(/[ ]{2,}/g, " ");
  console.log("\n===== " + label + " =====\n" + text.slice(0, 3500));
}

const index = fs.readFileSync("index.html", "utf8");
const team = index.indexOf('class="team');
textBetween(index, 'class="team', 'class="footer', "HOME TEAM");

const rwa = fs.readFileSync("rwa.html", "utf8");
textBetween(rwa, 'class="distribution', 'class="how-it-works', "RWA DIST");
textBetween(rwa, 'class="participation', 'class="principles_inner', "RWA PART");

const wallet = fs.readFileSync("wallet.html", "utf8");
const earn = wallet.indexOf("Earn on");
console.log("\n===== WALLET EARN =====\n" + wallet.slice(earn - 200, earn + 1800).replace(/<[^>]+>/g, " | ").replace(/\s+/g, " ").slice(0, 1600));
