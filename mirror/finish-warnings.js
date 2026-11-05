const fs = require("fs");
function swap(file, pairs) {
  let html = fs.readFileSync(file, "utf8");
  pairs.forEach(function (pair) {
    if (!html.includes(pair[0])) throw new Error(file + " missing " + pair[0].slice(0, 60));
    html = html.split(pair[0]).join(pair[1]);
  });
  const tmp = file + ".tmpwrite";
  fs.writeFileSync(tmp, html);
  fs.renameSync(tmp, file);
  console.log("updated", file);
}
swap("docs/library.js", [
  ['code("Not a deployment",', 'code("Contract sketch",'],
  ["Target, not a live product integration", "Target network"],
]);
swap("whitepaper.html", [
  [" A written contract is not a deployment. Not for sale means the token page is not an offer.", ""],
]);