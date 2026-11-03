const fs = require("fs");
const html = fs.readFileSync("mirror/index.html", "utf8");
function anchorAt(at) {
  const start = html.lastIndexOf("<a ", at);
  const end = html.indexOf("</a>", at);
  return html.slice(start, end + 4);
}
const hello = anchorAt(109336).replaceAll("hello@cassator.corp", "contact@erax.digital").replaceAll("press@cassator.corp", "contact@erax.digital");
const press = anchorAt(111300).replaceAll("hello@cassator.corp", "contact@erax.digital").replaceAll("press@cassator.corp", "contact@erax.digital");
fs.writeFileSync("mirror/footer-contacts.html", hello + press);
console.log("hello", hello.length, "press", press.length);
console.log(hello.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 200));
console.log(press.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 200));
