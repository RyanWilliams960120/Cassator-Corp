const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;

// The original scripts skip pointer effects when the browser reports
// prefers-reduced-motion. The embedded preview does that even when a
// The original site still runs the hover effects, so the
// phoenix letter field, link glitch, ASCII scatter, card parallax, and
// CTA tilt never start. Report "no reduced motion" before any page
// script reads matchMedia. Layout breakpoints are left alone.
const motionBoot = `<script>(function(){var orig=window.matchMedia.bind(window);window.matchMedia=function(q){var s=String(q);var list=orig(q);if(s.indexOf("prefers-reduced-motion")===-1||s.indexOf("reduce")===-1||s.indexOf("no-preference")!==-1)return list;return new Proxy(list,{get:function(t,p){if(p==="matches")return false;var v=t[p];return typeof v==="function"?v.bind(t):v;}});};})();</script>`;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf"
};

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]).replace(/\/+$/, "") || "/";
  const rel = clean === "/" ? "index.html" : clean.replace(/^\//, "");
  const candidates = [rel, rel + ".html", path.join(rel, "index.html")];
  for (const candidate of candidates) {
    const file = path.normalize(path.join(root, candidate));
    if (!file.startsWith(root)) continue;
    if (fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  }
  return null;
}

http.createServer((req, res) => {
  const pathname = decodeURIComponent((req.url || "/").split("?")[0]);
  if (req.method === "POST" && pathname === "/api/apply") {
    try {
      require("./api/apply")(req, res);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: false, error: "The application could not be sent. Please try again in a moment." }));
    }
    return;
  }
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Method not allowed");
    return;
  }
  const file = resolveFile(req.url);
  if (!file) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error");
      return;
    }
    const ext = path.extname(file);
    const type = types[ext] || "application/octet-stream";
    if (ext === ".html") {
      const html = data.toString("utf8").replace("<head>", "<head>" + motionBoot);
      res.writeHead(200, {
        "Content-Type": type,
        "Cache-Control": "no-store"
      });
      res.end(html);
      return;
    }
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
}).listen(8080, "127.0.0.1", () => {
  console.log("EraX Digital clone at http://127.0.0.1:8080");
});
