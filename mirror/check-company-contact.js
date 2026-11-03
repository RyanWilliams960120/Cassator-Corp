const fs = require("fs");
const path = require("path");
const bad = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (name.endsWith(".html")) {
      const html = fs.readFileSync(full, "utf8");
      const mails = (html.match(/mailto:contact@erax\.digital/g) || []).length;
      const gh = (html.match(/github\.com\/EraX-Digital/g) || []).length;
      const company = (html.match(/>Company<\/a>/g) || []).length;
      const linkedin = html.includes("linkedin.com/company/erax-digital");
      const usesChrome = html.includes("js/chrome.js");
      const otherMail = [...html.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)]
        .map((m) => m[0])
        .filter((a) => a !== "contact@erax.digital" && a !== "jobs@erax.digital" && a !== "you@example.com");
      if (company || otherMail.length || (linkedin && gh !== 1) || (!usesChrome && html.includes("footer_socials") && mails !== 1) || html.includes("is--cont")) {
        bad.push(full + " mails=" + mails + " gh=" + gh + " company=" + company + " chrome=" + usesChrome + " other=" + [...new Set(otherMail)].join(","));
      }
    }
  }
}
walk(".");
console.log("issues", bad.length);
console.log(bad.slice(0, 40).join("\n"));
