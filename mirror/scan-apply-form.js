const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
const i = html.indexOf("wf-form-JOIN");
console.log("form at", i);
console.log(html.slice(i, i + 4500).replace(/></g, ">\n<"));
