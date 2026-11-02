const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");

function between(start, end) {
  const a = html.indexOf(start);
  const b = end ? html.indexOf(end, a + 1) : a + 20000;
  return html.slice(a, b > a ? b : a + 12000);
}

function texts(chunk) {
  return chunk
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<[^>]+>/g, "\n")
    .split("\n")
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter((s) => s && s.length < 240 && !/^[A-Z]{12,}$/.test(s));
}

const j = html.indexOf('class="journey');
console.log("journey idx", j);
console.log("--- JOURNEY TITLES ---");
const re = /<h3 class="u-text-style-h4[^"]*">([\s\S]*?)<\/h3>/g;
let m, n = 0;
const slice = html.slice(html.indexOf("Roadmap"), html.indexOf('class="vision') > 0 ? html.indexOf("vision_card") : html.indexOf("Phase 1"));
while ((m = re.exec(html)) && n < 20) {
  const t = m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (/Phase|Foundation|Roadmap|plan|milestone|Proposed/i.test(t) || n < 12) {
    console.log(n, t.slice(0, 160));
  }
  n++;
}

console.log("\n--- YEAR ---");
const yi = html.indexOf("journey_year");
console.log(html.slice(yi, yi + 700).replace(/></g, ">\n<"));

console.log("\n--- JOURNEY ITEMS ---");
const ji = html.indexOf("journey_text is--1");
console.log(texts(html.slice(ji, ji + 9000)).slice(0, 40).join("\n"));

console.log("\n--- VISION INTRO ---");
const vi = html.indexOf(">Vision<");
console.log(texts(html.slice(vi - 400, vi + 2500)).slice(0, 20).join("\n"));

console.log("\n--- VISION CARDS ---");
const vc = html.indexOf("vision_card");
console.log(texts(html.slice(vc, vc + 7000)).slice(0, 40).join("\n"));
