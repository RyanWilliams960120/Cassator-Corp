const fs = require("fs");
let html = fs.readFileSync("rwa.html", "utf8");
const pairs = [
  [">Fund</strong> is not available", ">Funding</strong> is not available"],
  ["Fund</strong> is not available", "Funding</strong> is not available"],
  [">Wallet </strong>is not a live market", ">No market</strong> is open"],
  ["Wallet </strong>is not a live market", "No market</strong> is open"],
  [">Receive</strong> are not included", ">Nothing</strong> is included"],
  ["Receive</strong> are not included", "Nothing</strong> is included"],
  ["Your contribution is material. Literally.", "EraX Assets is a future concept."],
  ["Simple Financial Interest", "Not a financial product"],
  ["No named example", "No return is offered"],
  ["Token Holder Badges", "Badges"],
  ["Starting from <span class=\"text-span-12\">—</span>", "Not available"],
  ["Virtual badge in EraX Social profile — visible to the entire community", "Not available"],
  ["virtual badge in profile", "Not available"],
  ["Two different ways to participate — same ecosystem , different roles.", "No participation path is open."],
  ["Apply to the EraX Social team", "No creator application is open"],
  ["Review — no published formula", "No review process is published"],
  ["No sale window is announced", "No sale window exists"],
  ["No fund split → token promotion", "No promotion is offered"],
  ["No reserve sale is announced", "No reserve is offered"],
  ["Can liquidity be withdrawn from the pool?", "Is there a liquidity pool?"],
  [">Token Creator</h3>", ">Not a creator sale</h3>"],
];
for (const [from, to] of pairs) {
  const count = html.split(from).length - 1;
  console.log(count ? "ok " + count : "MISSING", from.slice(0, 60));
  if (count) html = html.split(from).join(to);
}
const pop = html.indexOf('class="rwa_popup"');
console.log("\nPOPUP\n" + (pop < 0 ? "none" : html.slice(pop, pop + 900).replace(/<[^>]+>/g, " | ").replace(/\s+/g, " ").slice(0, 700)));
fs.writeFileSync("rwa.html", html);
