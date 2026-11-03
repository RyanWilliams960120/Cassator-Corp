const fs = require("fs");
const html = fs.readFileSync("rwa.html", "utf8").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<script[\s\S]*?<\/script>/gi, " ");
const main = html.slice(html.indexOf('class="hero-inner'));
const texts = [...main.matchAll(/<(h1|h2|h3|p|div class="[^"]*button_main_text|div class="text-[^"]+")[^>]*>([^<]{1,180})</g)].map((m) => m[2].replace(/\s+/g, " ").trim()).filter(Boolean);
console.log(texts.slice(0, 80).join("\n"));
