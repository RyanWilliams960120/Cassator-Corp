const fs = require("fs");
let html = fs.readFileSync("rwa.html", "utf8");
const i = html.indexOf("None");
console.log(html.slice(i - 80, i + 120));
html = html.replace("None tokens.", "No announced token supply.");
html = html.replace(">None</div>", ">Not announced</div>");
fs.writeFileSync("rwa.html", html);
console.log("none left", html.includes(">None<") || html.includes("None tokens"));
