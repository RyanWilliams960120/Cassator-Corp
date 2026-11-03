const fs = require("fs");
const zlib = require("zlib");
const raw = fs.readFileSync("docs/erax-whitepaper.pdf").toString("latin1");
const re = /stream\r?\n([\s\S]*?)endstream/g;
let i = 0;
let m;
while ((m = re.exec(raw))) {
  try {
    const out = zlib.inflateSync(Buffer.from(m[1], "latin1")).toString("latin1");
    if (i === 0) {
      console.log("page1 dark", /0\.0[0-5]/.test(out), "len", out.length);
      const idx = out.indexOf("0.047");
      console.log("0.047", idx);
      console.log(out.slice(0, 500).replace(/[^\x20-\x7E]/g, "."));
    }
    i++;
  } catch (e) {}
}
console.log("pages inflated", i);
