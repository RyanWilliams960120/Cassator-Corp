const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

const phrases = [
  " Not a deployment and not an offer.",
  '<aside class="docs-callout"><strong>Not deployed and not an offer</strong><p>The ERAX token contract is written and tested in the EraXToken project. It is not deployed, not audited, and not verified. This page is not an offer to sell a token or any other financial instrument. No price, yield, vesting schedule, or contract address is published.</p></aside>',
  '<aside class="docs-callout"><strong>Not yet available</strong><p>These controls are design requirements for a future product, not settings that exist today.</p></aside>',
  "Planned EraX Digital work. This is not a live product and not an offer.",
  "This describes a planned EraX Digital capability and is not currently available.",
  " Product features described on this website are in development unless a live service is actually shipped. This website is informational and is not an offer to sell a token, security, or investment product.",
];

function clean(html) {
  phrases.forEach(function (phrase) {
    html = html.split(phrase).join("");
  });
  let prev;
  do {
    prev = html;
    html = html.replace(/<(p|h2|h3|h4|strong|em|span|li)(\s[^>]*)?>\s*<\/\1>/g, "");
  } while (html !== prev);
  html = html.replace(/<section class="text-fill u-section"><div class="text-fill_container u-container"><\/div><\/section>/g, "");
  return html;
}

function write(file, html) {
  const tmp = file + ".tmpwrite";
  fs.writeFileSync(tmp, html);
  fs.renameSync(tmp, file);
}

let files = 0;
let buttons = 0;
function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (entry) {
    if (entry.name === "mirror" || entry.name === "node_modules") return;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(html|js|json)$/.test(entry.name)) {
      const before = fs.readFileSync(full, "utf8");
      const after = clean(before);
      if (after !== before) {
        write(full, after);
        files++;
        const empty = after.match(/class="button_main_text"><\/div>/g);
        if (empty) {
          buttons += empty.length;
          console.log("empty button", path.relative(root, full), empty.length);
        }
      }
    }
  });
}
walk(root);
const left = [];
function scan(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (entry) {
    if (entry.name === "mirror" || entry.name === "node_modules") return;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scan(full);
    else if (/\.(html|js)$/.test(entry.name)) {
      const text = fs.readFileSync(full, "utf8");
      if (text.includes("not an offer") || text.includes("Not a deployment") || text.includes("not a live product")) {
        left.push(path.relative(root, full));
      }
    }
  });
}
scan(root);
console.log("updated", files);
console.log("remaining", left.join(", ") || "none");
