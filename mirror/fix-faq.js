const fs = require("fs");
let html = fs.readFileSync("rwa.html", "utf8");
const empty = '<div class="u-faq-element"><div class="u-faq-element_toggle"><div class="u-faq-icon"><div class="faq-icon">+</div></div></div><div class="drop-content-wrp"><div class="drop-content-ovh"><div class="u-faq-element_content"></div></div></div></div>';
html = html.split(empty).join("");
html = html.replace(">Token issuance is not available.</h3>", ">Is token issuance available?</h3>");
html = html.replace(
  '<h3 class="u-text-style-h4">Is token issuance available?</h3><div class="u-faq-icon"><div class="faq-icon">+</div></div></div><div class="drop-content-wrp"><div class="drop-content-ovh"><div class="u-faq-element_content"></div>',
  '<h3 class="u-text-style-h4">Is token issuance available?</h3><div class="u-faq-icon"><div class="faq-icon">+</div></div></div><div class="drop-content-wrp"><div class="drop-content-ovh"><div class="u-faq-element_content"><p>No. EraX Assets is not operational, and this page does not issue a token.</p></div>'
);
html = html.replace(
  '<h3 class="u-text-style-h4">Is there a liquidity pool?</h3><div class="u-faq-icon"><div class="faq-icon">+</div></div></div><div class="drop-content-wrp"><div class="drop-content-ovh"><div class="u-faq-element_content"></div>',
  '<h3 class="u-text-style-h4">Is there a liquidity pool?</h3><div class="u-faq-icon"><div class="faq-icon">+</div></div></div><div class="drop-content-wrp"><div class="drop-content-ovh"><div class="u-faq-element_content"><p>No. No liquidity pool is live.</p></div>'
);
for (const day of [">Day 1<", ">Day 30<", ">Day 60<", ">Day 360–720<", ">Forever<"]) {
  html = html.split(day).join(">—<");
}
const apply = "<strong>Apply </strong>to the EraX Social team";
console.log("apply", html.includes(apply));
html = html.split(apply).join("<strong>No application </strong>is open");
const tmp = "rwa.html.tmpwrite";
fs.writeFileSync(tmp, html);
fs.renameSync(tmp, "rwa.html");
console.log("saved", fs.readFileSync("rwa.html", "utf8").includes("No application"));
