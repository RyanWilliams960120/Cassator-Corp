const fs = require("fs");

function swap(file, pairs) {
  let html = fs.readFileSync(file, "utf8");
  for (const [from, to] of pairs) {
    const count = html.split(from).length - 1;
    if (!count) {
      console.log("MISSING", file, JSON.stringify(from).slice(0, 80));
      continue;
    }
    html = html.split(from).join(to);
    console.log("ok", count, file, JSON.stringify(from).slice(0, 70));
  }
  fs.writeFileSync(file, html);
}

swap("team.html", [["Accountabilityto<em>", "Accountability to<em>"]]);
swap("careers.html", [["Accountabilityto<em>", "Accountability to<em>"]]);

swap("wallet.html", [
  [">Get the App<", ">Planned<"],
  [
    "Start using </em><strong><em>EraX Social Wallet today.",
    "EraX Wallet is </em><strong><em>a planned product.",
  ],
]);

swap("rwa.html", [
  [
    'product.<span class="is--accent">Not operational.',
    'product. <span class="is--accent">Not operational.',
  ],
  [
    'Every Token Strengthens <span class="is--accent eagle">Gold Eagle</span>',
    'EraX Assets is <span class="is--accent eagle">not operational</span>',
  ],
  [
    '<span class="is--accent eagle">GoldEagle</span>',
    '<span class="is--accent eagle">No token sale</span>',
  ],
  [
    '<h3 class="u-text-style-h2 is--accent">10%</h3><div class="title-18 is--accent">Gold Eagle</div><p class="u-paragraph-small is--white-55">Miner reward pool · <strong>1 000 days</strong></p>',
    '<h3 class="u-text-style-h2 is--accent">—</h3><div class="title-18 is--accent">Not announced</div><p class="u-paragraph-small is--white-55">No reward pool is announced.</p>',
  ],
  [
    "Days of <strong>Gold Eagle</strong> Prize Pool Distribution",
    "No prize pool is announced",
  ],
  ["10% supply → Gold Eagle", "No announced supply"],
  ["10% Gold Eagle", "No pool"],
  [
    '<span class="text-span-14">Michael Jackson</span>',
    '<span class="text-span-14">No named example</span>',
  ],
  ["Gold Eagle", "EraX Assets"],
]);
