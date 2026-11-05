const fs = require("fs");
let html = fs.readFileSync("rwa.html", "utf8");
const pairs = [
  [
    "New token issuance and distribution <strong>to 360–720 day</strong> stakers. <strong>supported assets</strong>",
    "No issuance schedule is announced.",
  ],
  [">1M supported assets<", ">Not announced<"],
  [">days to distribute pool tokens<", ">No distribution schedule<"],
  ["<strong>Participate </strong>in the Initial Sale", "<strong>No sale </strong>is open"],
];
for (const [from, to] of pairs) {
  const count = html.split(from).length - 1;
  console.log(count ? "ok " + count : "MISSING", from.slice(0, 60));
  if (count) html = html.split(from).join(to);
}
fs.writeFileSync("rwa.html", html);
