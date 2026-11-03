const fs = require("fs");
const path = require("path");

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror" || name === ".git") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
}

function stripOldSocials(html) {
  const start = html.indexOf('class="footer_socials"');
  if (start < 0) return html;
  const open = html.lastIndexOf("<div", start);
  let i = open;
  let depth = 0;
  while (i < html.length) {
    const nextOpen = html.indexOf("<div", i);
    const nextClose = html.indexOf("</div>", i);
    if (nextClose < 0) return html;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      i = nextOpen + 4;
    } else {
      depth--;
      i = nextClose + 6;
      if (depth === 0) {
        const block = html.slice(open, i);
        const kept = block.replace(/<a\b[^>]*class="footer_social[\s\S]*?<\/a>/g, (anchor) =>
          anchor.includes("linkedin.com/company/erax-digital") ? anchor : ""
        );
        return html.slice(0, open) + kept + html.slice(i);
      }
    }
  }
  return html;
}

function pointContact(html) {
  html = html
    .replace(/href="\/team" class="footer_social/g, 'href="mailto:contact@erax.digital" class="footer_social')
    .replace(/href="\/newsroom" class="footer_social/g, 'href="mailto:contact@erax.digital" class="footer_social');
  return html.replace(/<a href="mailto:contact@erax\.digital" class="footer_social[\s\S]*?<\/a>/g, (anchor) =>
    anchor.replace(/>(\s*)Contact(\s*)<\/p>/g, ">$1contact@erax.digital$2</p>")
  );
}

const files = [];
walk(".", files);
let changed = 0;
files.forEach((file) => {
  let html = fs.readFileSync(file, "utf8");
  const next = pointContact(stripOldSocials(html));
  if (next !== html) {
    const tmp = file + ".tmpwrite";
    fs.writeFileSync(tmp, next);
    fs.renameSync(tmp, file);
    changed++;
  }
});
console.log("updated", changed);
const index = fs.readFileSync("index.html", "utf8");
console.log("linkedin", index.includes("linkedin.com/company/erax-digital"));
console.log("instagram path left", index.includes("M24.5 33V22.5"));
console.log("x path left", index.includes("M12 11H16.8L22 18.1"));
console.log("footer team social", index.includes('href="/team" class="footer_social'));
console.log("footer newsroom social", index.includes('href="/newsroom" class="footer_social'));
