const fs = require("fs");
const html = fs.readFileSync("documentation.html", "utf8");
const i = html.indexOf('id="docs-nav"');
console.log(html.slice(i, i + 1800));
console.log("--- careers current count", (html.match(/w--current">Careers/g) || []).length);
console.log("docs current", (html.match(/w--current">Documentation/g) || []).length);
