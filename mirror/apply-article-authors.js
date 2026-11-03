const fs = require("fs");
const path = require("path");
const files = fs.readdirSync("newsroom").filter((n) => n.endsWith(".html")).map((n) => path.join("newsroom", n));
const names = ["Thestreet", "Sean Lee", "Benziga", "MSN", "Benzinga"];
files.forEach((file) => {
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/<div class="author-short small"><img src="[^"]+"[^>]*><\/div><div class="text-10[^"]*">(?:Thestreet|Sean Lee|Benziga|Benzinga|MSN)<\/div>/g,
    '<div class="author-short small"><img src="/assets/erax-mark.svg" loading="lazy" alt="EraX Digital" class="icon-h-24"/></div><div class="text-10">EraX Digital</div>');
  names.forEach((name) => {
    if (html.includes(name)) console.log("still", file, name);
  });
  const tmp = file + ".tmpwrite";
  fs.writeFileSync(tmp, html);
  fs.renameSync(tmp, file);
});
console.log("done");
