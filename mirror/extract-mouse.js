const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const scripts = [...html.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
scripts.forEach((s, i) => {
  if (/mouse|pointer|cursor|hover|shuffle/i.test(s)) {
    console.log("\n===== SCRIPT", i, "len", s.length, "=====\n");
    console.log(s.slice(0, 2500));
  }
});
