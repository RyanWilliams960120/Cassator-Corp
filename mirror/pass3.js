const fs = require("fs");
const files = ["investors.html", "rwa.html", "sl8.html", "paid-content.html", "wallet.html"];
const KEEP = /Planned EraX|not a live|not operational|not available|not an offer|not currently|not live|in development|proposed|Ethereum is the planned|Base is the|A future portfolio|A planned |Planned features|Advertising profiles|Creator tools are planned|Future asset tools|Transactions would be recorded|Subscription pricing is not set|This architecture is proposed|supported ERC-20/;
const NEUTRAL = "Planned EraX Digital work. This is not a live product and not an offer.";

function transform(html) {
  let out = "";
  let i = 0;
  while (i < html.length) {
    if (html.startsWith("<script", i) || html.startsWith("<style", i)) {
      const tag = html.startsWith("<script", i) ? "script" : "style";
      const end = html.indexOf(`</${tag}>`, i);
      const close = end < 0 ? html.length : end + tag.length + 3;
      out += html.slice(i, close);
      i = close;
      continue;
    }
    if (html[i] === "<") {
      const end = html.indexOf(">", i);
      out += html.slice(i, end < 0 ? html.length : end + 1);
      i = end < 0 ? html.length : end + 1;
      continue;
    }
    const next = html.indexOf("<", i);
    const end = next < 0 ? html.length : next;
    let text = html.slice(i, end);
    const trimmed = text.replace(/\s+/g, " ").trim();
    if (trimmed.length > 48 && /[a-z]/.test(trimmed) && /\s/.test(trimmed) && !KEEP.test(trimmed)) {
      text = NEUTRAL;
    }
    out += text;
    i = end;
  }
  return out;
}

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const next = transform(html);
  if (next !== html) {
    fs.writeFileSync(file, next);
    console.log("cleaned", file);
  }
}
