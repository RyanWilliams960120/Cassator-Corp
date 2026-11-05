const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const needles = [
  "not publicly available",
  "Planned products",
  "Social platform is next",
  "A planned SocialFi platform",
  "are planned products",
];
needles.forEach((needle) => {
  const i = html.indexOf(needle);
  console.log("\n==", needle, i);
  if (i >= 0) console.log(html.slice(i - 80, i + 180).replace(/\s+/g, " "));
});
