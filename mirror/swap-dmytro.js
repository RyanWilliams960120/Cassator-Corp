const fs = require("fs");

const src = "/assets/Yaroslav%20Boichuk.jpg";

const replacements = [
  [
    "team.html",
    '<img src="https://cdn.prod.website-files.com/6a075c0b91209580aebb0437/6a31777fd25e50e0066e940d_Dmytro.jpg" loading="lazy" width="313" height="313" alt="" sizes="313px" srcset="https://cdn.prod.website-files.com/6a075c0b91209580aebb0437/6a31777fd25e50e0066e940d_Dmytro-p-500.jpg 500w, https://cdn.prod.website-files.com/6a075c0b91209580aebb0437/6a31777fd25e50e0066e940d_Dmytro-p-800.jpg 800w, https://cdn.prod.website-files.com/6a075c0b91209580aebb0437/6a31777fd25e50e0066e940d_Dmytro.jpg 1000w" class="ascii_imag"/>',
    `<img src="${src}" loading="lazy" width="313" height="313" alt="Yaroslav Boichuk" class="ascii_imag"/>`,
  ],
  [
    "index.html",
    '<img src="https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a3177607952a0b362ede45e_Dmytro.jpg" loading="lazy" width="250" height="250" alt="" srcset="https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a3177607952a0b362ede45e_Dmytro-p-500.jpg 500w, https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a3177607952a0b362ede45e_Dmytro-p-800.jpg 800w, https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a3177607952a0b362ede45e_Dmytro.jpg 1000w" sizes="(max-width: 479px) 100vw, 250px" class="image"/>',
    `<img src="${src}" loading="lazy" width="250" height="250" alt="Yaroslav Boichuk" class="image"/>`,
  ],
  [
    "investors.html",
    '<img src="https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a3177607952a0b362ede45e_Dmytro.jpg" loading="lazy" width="444" height="444" alt="" srcset="https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a3177607952a0b362ede45e_Dmytro-p-500.jpg 500w, https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a3177607952a0b362ede45e_Dmytro-p-800.jpg 800w, https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a3177607952a0b362ede45e_Dmytro.jpg 1000w" sizes="(max-width: 479px) 100vw, 444px" class="ascii_imag"/>',
    `<img src="${src}" loading="lazy" width="444" height="444" alt="Yaroslav Boichuk" class="ascii_imag"/>`,
  ],
];

for (const [file, old, neu] of replacements) {
  let html = fs.readFileSync(file, "utf8");
  const n = html.split(old).length - 1;
  if (n !== 1) throw new Error(file + " count " + n);
  html = html.replace(old, neu);
  if (html.includes("Dmytro.jpg")) throw new Error(file + " still has Dmytro.jpg");
  fs.writeFileSync(file, html);
  console.log("updated", file);
}
