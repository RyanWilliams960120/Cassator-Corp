const fs = require("fs");
function text(file) {
  const html = fs.readFileSync(file, "utf8");
  const main = html.slice(html.indexOf("<main"), html.indexOf("<footer"));
  const plain = main
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s && s.length < 240 && !/^[\s.\u00A0]*$/.test(s));
  console.log("\n====", file, "====");
  console.log(plain.slice(0, 80).join("\n"));
}
["trust-center.html", "trust-center/security.html", "trust-center/privacy-policy.html", "trust-center/compliance-kyc-aml.html"].forEach(text);
