const fs = require("fs");
const path = require("path");
const files = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "mirror") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (name.endsWith(".html")) files.push(full);
  }
}
walk(".");
let old = 0;
let teamNav = 0;
let careersNav = 0;
let missingTeam = [];
files.forEach((file) => {
  const html = fs.readFileSync(file, "utf8");
  const stale = (html.match(/href="\/team"[^>]*>Careers</g) || []).length;
  if (stale) {
    old += stale;
    missingTeam.push(file + " stale " + stale);
  }
  if (html.includes('class="nav_link">Team</a>') || html.includes('class="nav_link w--current">Team</a>')) teamNav++;
  if (html.includes('href="/careers"')) careersNav++;
});
console.log("files", files.length, "team nav", teamNav, "careers href", careersNav, "stale careers-on-team", old);
missingTeam.slice(0, 15).forEach((line) => console.log(line));
const team = fs.readFileSync("team.html", "utf8");
const careers = fs.readFileSync("careers.html", "utf8");
console.log("team popup div", team.includes('class="position_popup"'));
console.log("team jobs", team.includes("Product Manager"));
console.log("team people", team.includes("Maryna Shabelnykova"));
console.log("careers people", careers.includes("Yaroslav"));
console.log("careers resume", careers.includes('name="Resume"'), "message", careers.includes('name="Message"'), "api", careers.includes('action="/api/apply"'));
console.log("index careers button", /aria-label="Careers" href="\/careers"/.test(fs.readFileSync("index.html", "utf8")));
console.log("team current", /href="\/team" aria-current="page" class="nav_link w--current">Team</.test(team));
console.log("careers current", /href="\/careers" aria-current="page" class="nav_link w--current">Careers</.test(careers));
