const fs = require("fs");
const html = fs.readFileSync("careers.html", "utf8");
const keys = ["application-error", 'name="Message"', 'id="Message"', "Write a message", "resume-file-name", "wf-form-JOIN"];
for (const key of keys) {
  const i = html.indexOf(key);
  console.log("\n==== " + key + " @" + i + " ====");
  if (i >= 0) console.log(html.slice(Math.max(0, i - 400), i + 500));
}
