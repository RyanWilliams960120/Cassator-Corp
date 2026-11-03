const fs = require("fs");
function meta(file) {
  const html = fs.readFileSync(file, "utf8");
  const pick = (name) => {
    const m = html.match(new RegExp("<meta[^>]*(?:name|property)=\"" + name + "\"[^>]*content=\"([^\"]*)\"", "i"))
      || html.match(new RegExp("<meta[^>]*content=\"([^\"]*)\"[^>]*(?:name|property)=\"" + name + "\"", "i"));
    return m ? m[1] : "";
  };
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const canon = (html.match(/rel="canonical" href="([^"]*)"/) || [])[1] || "";
  const version = (html.match(/Version[^<]{0,40}/) || [])[0] || "";
  const date = (html.match(/Publication date[^<]{0,80}|3 November 2026|November 3, 2026|2026-11-03/g) || []).slice(0, 4);
  console.log("\nFILE", file);
  console.log("title", title);
  console.log("description", pick("description").slice(0, 180));
  console.log("og:title", pick("og:title"));
  console.log("canonical", canon);
  console.log("version snippet", version);
  console.log("dates", date.join(" | "));
}
meta("documentation.html");
meta("whitepaper.html");
meta("documentation/introduction.html");
const pdf = fs.statSync("docs/erax-whitepaper.pdf");
const head = fs.readFileSync("docs/erax-whitepaper.pdf").subarray(0, 8).toString();
console.log("\nPDF", pdf.size, head);
const search = JSON.parse(fs.readFileSync("docs/search.json", "utf8"));
console.log("search entries", search.length);
