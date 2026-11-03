const fs = require("fs");
const index = fs.readFileSync("index.html", "utf8");
const wallet = fs.readFileSync("wallet.html", "utf8");

function around(html, needle, label) {
  const i = html.indexOf(needle);
  console.log("\n==", label, i, "==");
  console.log(html.slice(Math.max(0, i - 120), i + needle.length + 80).replace(/\s+/g, " ").slice(0, 420));
}

const gh = index.indexOf("github.com/EraX-Digital");
console.log("INDEX GITHUB BLOCK\n");
console.log(index.slice(gh - 80, index.indexOf("</a>", gh) + 4).slice(0, 2500));
console.log("\nindex mailto count", (index.match(/mailto:contact@erax.digital/g) || []).length);
console.log("wallet mailto count", (wallet.match(/mailto:contact@erax.digital/g) || []).length);
around(wallet, 'class="nav_link">Company</a>', "wallet nav company");
around(index, 'class="nav_link">Company</a>', "index nav company");
around(wallet, "footer_socials", "wallet socials start");
const ws = wallet.indexOf('class="footer_socials"');
console.log("\nWALLET SOCIALS\n", wallet.slice(ws, ws + 400).replace(/\s+/g, " "));
const mail = wallet.indexOf('mailto:contact@erax.digital');
console.log("\nWALLET FIRST MAIL CONTEXT\n", wallet.slice(mail - 200, mail + 80).replace(/\s+/g, " "));
console.log("\nsecond mail", wallet.indexOf('mailto:contact@erax.digital', mail + 10));
