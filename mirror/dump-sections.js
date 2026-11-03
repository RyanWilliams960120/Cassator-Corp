const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");

function textOf(chunk) {
  return chunk
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .split("\n")
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter((s) => s && s.length < 400 && !/^[A-Z0-9]{40,}$/.test(s));
}

const sections = [...html.matchAll(/<section[^>]*class="([^"]+)"/g)].map((m) => m[1]);
console.log("SECTIONS", sections.join(" | "));

const markers = [
  "journey_text is--1",
  'class="vision ',
  "3 principles",
  "principles that",
  "Connect. Create",
  "EraX Social",
];
for (const m of markers) {
  console.log("\nMARK", m, html.indexOf(m));
}

const j = html.indexOf('class="journey');
const v = html.indexOf('class="vision ');
const t = html.indexOf('class="team ');
console.log("\n=== JOURNEY ===");
console.log(textOf(html.slice(j, v)).join("\n"));
console.log("\n=== VISION ===");
console.log(textOf(html.slice(v, t)).join("\n"));
