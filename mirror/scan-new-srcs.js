const fs = require("fs");
const html = fs.readFileSync("newsroom.html", "utf8");
const srcs = [...html.matchAll(/src="([^"]+)"/g)].map((m) => m[1]).filter((s) => /company-|erax-mark|cdn/.test(s));
console.log(srcs.slice(0, 20).join("\n"));
