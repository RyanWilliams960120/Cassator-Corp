const fs = require("fs");
let html = fs.readFileSync("index.html", "utf8");
if (!html.includes("https://github.com/EraX-Digital")) {
  const github = '<a href="https://github.com/EraX-Digital" target="_blank" rel="noopener noreferrer" aria-label="EraX Digital on GitHub" class="footer_social w-inline-block"><div class="icon-42 w-embed"><svg width="100%" height="100%" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 39V42H4V43H0V39H1ZM18 42V43H11V42H18ZM32 42V43H25V42H32ZM43 39V43H39V42H42V39H43ZM1 25V32H0V25H1ZM43 25V32H42V25H43ZM1 11V18H0V11H1ZM43 11V18H42V11H43ZM4 0V1H1V4H0V0H4ZM43 0V4H42V1H39V0H43ZM18 0V1H11V0H18ZM32 0V1H25V0H32Z" fill="currentColor"/><path d="M21.5 11.2c-4.9 0-8.8 4-8.8 8.9 0 3.9 2.5 7.2 6 8.4.4.1.6-.2.6-.4v-1.6c-2.4.5-3-1.1-3-1.1-.4-1-.9-1.3-.9-1.3-.7-.5.1-.5.1-.5.8.1 1.3.9 1.3.9.7 1.2 1.9.9 2.4.7.1-.6.3-.9.5-1.1-1.9-.2-3.9-1-3.9-4.3 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.4.9.7-.2 1.4-.3 2.2-.3s1.5.1 2.2.3c1.7-1.2 2.4-.9 2.4-.9.5 1.2.2 2.1.1 2.3.6.6.9 1.4.9 2.3 0 3.3-2 4.1-3.9 4.3.3.3.6.8.6 1.5v2.2c0 .2.2.5.6.4 3.5-1.2 6-4.5 6-8.4 0-4.9-4-8.9-8.8-8.9z" fill="currentColor"/></svg></div></a>';
  const at = html.indexOf('aria-label="LinkedIn"');
  if (at < 0) throw new Error("linkedin missing");
  const end = html.indexOf("</a>", at) + 4;
  html = html.slice(0, end) + github + html.slice(end);
}
let seen = 0;
html = html.replace(/<a href="mailto:contact@erax\.digital" class="footer_social[\s\S]*?<\/a>/g, (anchor) => {
  if (!anchor.includes("icon-42 big")) return anchor;
  seen += 1;
  return seen === 3 ? "" : anchor;
});
fs.writeFileSync("index.html.tmpwrite", html);
fs.renameSync("index.html.tmpwrite", "index.html");
console.log("github", html.includes("https://github.com/EraX-Digital"));
console.log("big mail buttons", (html.match(/icon-42 big/g) || []).length);
