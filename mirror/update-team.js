const fs = require("fs");

const people = [
  { src: "/assets/Yaroslav%20Boichuk.jpg", name: "Yaroslav Boichuk", role: "Co-Founder" },
  { src: "/assets/Roman%20Kotyk.jpg", name: "Roman Kotyk", role: "CTO" },
  { src: "/assets/Tal%20Shahar.jpg", name: "Tal Shahar", role: "Investor" },
  { src: "/assets/Maryna%20Shabelnykova.jpg", name: "Maryna Shabelnykova", role: "CFO" },
];

let html = fs.readFileSync("team.html", "utf8");
let count = 0;
html = html.replace(
  /<div role="listitem" class="team_item-card w-dyn-item">[\s\S]*?<h3 class="title-22">[^<]*<\/h3>/g,
  (card) => {
    if (count >= people.length) return card;
    const person = people[count++];
    let next = card.replace(
      /<img src="[^"]+"[^>]*class="ascii_imag"\/>/,
      `<img src="${person.src}" loading="lazy" width="313" height="313" alt="${person.name}" class="ascii_imag"/>`
    );
    next = next.replace(
      /<div class="text-11 is--white-55 team-item is--jet">[^<]*<\/div>/,
      `<div class="text-11 is--white-55 team-item is--jet">${person.role}</div>`
    );
    next = next.replace(
      /<h3 class="title-22">[^<]*<\/h3>/,
      `<h3 class="title-22">${person.name}</h3>`
    );
    return next;
  }
);
if (count !== 4) throw new Error("updated " + count);
fs.writeFileSync("team.html", html);

function labelAfterPhoto(file, photo) {
  let text = fs.readFileSync(file, "utf8");
  const marker = photo;
  let n = 0;
  let i = 0;
  while ((i = text.indexOf(marker, i)) !== -1) {
    const slice = text.slice(i, i + 900);
    let chunk = slice;
    chunk = chunk.replace(
      /(<div class="text-11 is--white-55 is--jet">)[^<]*/,
      "$1Co-Founder"
    );
    chunk = chunk.replace(/(<h3 class="[^"]+">)[^<]*/, "$1Yaroslav Boichuk");
    chunk = chunk.replace(
      /(<p class="u-paragraph-main is---a9a9a9">)[^<]*/,
      "$1Co-Founder"
    );
    text = text.slice(0, i) + chunk + text.slice(i + slice.length);
    n++;
    i += marker.length;
  }
  fs.writeFileSync(file, text);
  console.log(file, "photo labels", n);
}

labelAfterPhoto("index.html", "Yaroslav%20Boichuk.jpg");
labelAfterPhoto("investors.html", "Yaroslav%20Boichuk.jpg");

const team = fs.readFileSync("team.html", "utf8");
for (const p of people) {
  if (!team.includes(p.src) || !team.includes(p.name) || !team.includes(`>${p.role}<`)) {
    throw new Error("missing " + p.name);
  }
}
console.log("team cards ok");
