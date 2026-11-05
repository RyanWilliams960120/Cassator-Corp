const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const careers = fs.readFileSync("careers.html", "utf8");
const roles = [...careers.matchAll(/data-position="([^"]+)"/g)].map((m) => m[1]);
console.log(roles.join(" | "));
const bins = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
];
const bin = bins.find((item) => fs.existsSync(item));
if (!bin) {
  console.log("no browser for pdf");
  process.exit(0);
}
const source = path.resolve("docs/whitepaper-print.html");
const pdf = path.resolve("docs/erax-whitepaper.pdf");
const result = spawnSync(bin, [
  "--headless=new",
  "--disable-gpu",
  "--no-first-run",
  "--no-pdf-header-footer",
  "--print-to-pdf=" + pdf,
  "file:///" + source.replace(/\\/g, "/"),
], { timeout: 90000, encoding: "utf8" });
console.log("status", result.status, "bin", bin);
if (result.stderr) console.log(String(result.stderr).slice(0, 400));
if (fs.existsSync(pdf)) {
  const buf = fs.readFileSync(pdf);
  const pages = (buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log("pdf", buf.length, "pages", pages, "header", buf.slice(0, 5).toString());
}
