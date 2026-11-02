const fs = require("fs");
const path = require("path");

const LOGO =
  "https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a3d628e2127e33a1c24eb16_Cassator_Logotype_Horizontal_Transparent.svg";

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "mirror" || name === "node_modules" || name === ".git") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(html|js)$/i.test(name)) out.push(p);
  }
  return out;
}

function rebrand(text, isHtml) {
  const masks = [];
  const mask = (re) => {
    text = text.replace(re, (m) => {
      const token = "\u0000" + masks.length + "\u0000";
      masks.push(m);
      return token;
    });
  };

  text = text.split(LOGO).join("/assets/erax-logo.svg");

  mask(/https?:\/\/[^\s"'<>]*cassator[^\s"'<>]*/gi);
  mask(/cassator-corp\.webflow[^"'<>\s]*/gi);
  mask(/cassator-preloader/g);
  mask(/cassator-loaded/g);
  mask(/www\.cassator\.com/g);
  mask(/assets\/logo\.svg/g);

  text = text
    .replaceAll("Cassator Corp.", "EraX Digital")
    .replaceAll("Cassator Corp", "EraX Digital")
    .replaceAll("Cassator’s", "EraX Digital’s")
    .replaceAll("Cassator&#x27;s", "EraX Digital&#x27;s")
    .replaceAll("Cassator's", "EraX Digital's")
    .replaceAll("@cassator.corp", "@erax.digital")
    .replace(/\bCassator\b/g, "EraX Digital");

  text = text.replace(/\u0000(\d+)\u0000/g, (_, n) => masks[Number(n)]);

  if (isHtml && !text.includes("/assets/brand.css")) {
    text = text.replace("</head>", '<link rel="stylesheet" href="/assets/brand.css"></head>');
  }
  if (isHtml) {
    text = text.replace(
      'src="/assets/erax-logo.svg" loading="lazy" alt=""',
      'src="/assets/erax-logo.svg" loading="lazy" alt="EraX Digital"'
    );
  }
  return text;
}

const files = walk(".");
let changed = 0;
for (const file of files) {
  const before = fs.readFileSync(file, "utf8");
  const after = rebrand(before, file.endsWith(".html"));
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
  }
}
console.log("updated", changed, "of", files.length);

const left = [];
for (const file of walk(".")) {
  const text = fs.readFileSync(file, "utf8");
  const re = /cassator/gi;
  let m;
  while ((m = re.exec(text))) {
    const slice = text.slice(Math.max(0, m.index - 30), m.index + 40).replace(/\s+/g, " ");
    left.push(path.basename(file) + " | " + slice);
  }
}
const uniq = [...new Set(left)];
console.log("--- remaining", uniq.length);
uniq.forEach((s) => console.log(s));
