const fs = require("fs");
const html = fs.readFileSync("team.html", "utf8");
const scripts = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
console.log("inline scripts", scripts.length);
scripts.forEach((s, i) => {
  if (/Role|position|form|popup/i.test(s)) console.log("\n#", i, s.slice(0, 500).replace(/\s+/g, " "));
});
