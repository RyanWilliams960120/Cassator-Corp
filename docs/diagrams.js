(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ERAX_DIAGRAMS = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function card(x, y, w, h, title, note, tone) {
    const stroke = tone === "future" ? "#8A8A8A" : tone === "done" ? "#1F8A4C" : tone === "next" ? "#3D7EFF" : "#FA4C14";
    const dash = tone === "future" || tone === "planned" ? ' stroke-dasharray="5 4"' : "";
    return (
      '<g>' +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="#121212" stroke="' + stroke + '"' + dash + '/>' +
      '<text x="' + (x + 16) + '" y="' + (y + 28) + '" fill="#F5F5F5" font-size="15" font-family="Arial, sans-serif">' + esc(title) + "</text>" +
      (note ? '<text x="' + (x + 16) + '" y="' + (y + 50) + '" fill="#A3A3A3" font-size="12" font-family="Arial, sans-serif">' + esc(note) + "</text>" : "") +
      "</g>"
    );
  }

  function wrap(width, height, label, body) {
    return (
      '<figure class="docs-diagram"><figcaption>' + esc(label) + "</figcaption>" +
      '<svg viewBox="0 0 ' + width + " " + height + '" role="img" aria-label="' + esc(label) + '">' +
      '<rect width="' + width + '" height="' + height + '" fill="#0C0C0C"/>' +
      body +
      "</svg><p class=\"docs-diagram-note\">Conceptual diagram. This is not a map of deployed infrastructure.</p></figure>"
    );
  }

  const diagrams = {
    ecosystem: function () {
      return wrap(920, 340, "EraX Digital ecosystem overview",
        card(330, 24, 260, 72, "EraX Digital", "Proposed ecosystem", "current") +
        '<path d="M460 96 V150" stroke="#FA4C14" fill="none"/>' +
        '<path d="M130 150 H790" stroke="#FA4C14" fill="none"/>' +
        '<path d="M130 150 V176 M350 150 V176 M570 150 V176 M790 150 V176" stroke="#FA4C14" fill="none"/>' +
        card(40, 176, 180, 78, "EraX Social", "Planned", "current") +
        card(250, 176, 180, 78, "EraX Wallet", "Planned", "current") +
        card(460, 176, 180, 78, "EraX Creator", "Planned", "current") +
        card(680, 176, 200, 78, "EraX Assets", "Future possibility", "future")
      );
    },
    platform: function () {
      const layers = [
        ["User experience", "Interfaces for social, wallet, and creator tasks"],
        ["Social application", "Feeds, communities, messaging, publishing"],
        ["Identity and access", "Accounts, sessions, and permissions"],
        ["Wallet integration", "Connection and transaction approval"],
        ["Application data", "Off-chain content, profiles, and settings"],
        ["Smart contracts", "Selected payments and ownership logic"],
        ["Networks", "Base for activity, Ethereum for settlement"],
      ];
      let body = "";
      layers.forEach(function (layer, index) {
        body += card(80, 20 + index * 62, 760, 52, layer[0], layer[1], index > 4 ? "planned" : "current");
      });
      return wrap(920, 470, "High-level platform architecture", body);
    },
    "social-flow": function () {
      const steps = ["Register", "Profile", "Publish", "Interact", "Community"];
      let body = "";
      steps.forEach(function (step, index) {
        const x = 30 + index * 180;
        body += card(x, 80, 150, 70, step, "Planned", "current");
        if (index < steps.length - 1) {
          body += '<path d="M' + (x + 150) + ' 115 H' + (x + 180) + '" stroke="#FA4C14" fill="none"/>';
        }
      });
      return wrap(920, 230, "SocialFi user interaction flow", body);
    },
    "wallet-flow": function () {
      const steps = [
        ["Choose", "User starts"],
        ["Request", "App asks"],
        ["Approve", "User decides"],
        ["Review", "Transaction"],
        ["Submit", "Network"],
      ];
      let body = "";
      steps.forEach(function (step, index) {
        const x = 24 + index * 180;
        body += card(x, 70, 156, 78, step[0], step[1], "current");
        if (index < steps.length - 1) body += '<path d="M' + (x + 156) + ' 109 H' + (x + 180) + '" stroke="#FA4C14" fill="none"/>';
      });
      return wrap(920, 230, "Wallet connection and approval flow", body);
    },
    networks: function () {
      return wrap(920, 300, "Ethereum and Base network relationship",
        card(40, 90, 240, 90, "EraX application", "Planned client", "current") +
        '<path d="M280 135 H360" stroke="#FA4C14" fill="none"/>' +
        card(360, 40, 240, 90, "Base", "Ethereum Layer 2", "current") +
        card(360, 170, 240, 90, "Ethereum Mainnet", "Layer 1", "current") +
        '<path d="M480 130 V170" stroke="#8A8A8A" fill="none" stroke-dasharray="4 4"/>' +
        card(680, 90, 200, 90, "Wallet", "User-approved", "planned")
      );
    },
    "on-off": function () {
      return wrap(920, 320, "On-chain and off-chain operations",
        card(40, 30, 400, 250, "Off-chain candidates", "Feeds, likes, messages, discovery", "planned") +
        '<text x="56" y="110" fill="#D0D0D0" font-size="13" font-family="Arial, sans-serif">Profiles and settings</text>' +
        '<text x="56" y="136" fill="#D0D0D0" font-size="13" font-family="Arial, sans-serif">Content storage references</text>' +
        '<text x="56" y="162" fill="#D0D0D0" font-size="13" font-family="Arial, sans-serif">Notifications</text>' +
        card(480, 30, 400, 250, "On-chain candidates", "Ownership and selected payments", "current") +
        '<text x="496" y="110" fill="#D0D0D0" font-size="13" font-family="Arial, sans-serif">Wallet authorization</text>' +
        '<text x="496" y="136" fill="#D0D0D0" font-size="13" font-family="Arial, sans-serif">Creator payments</text>' +
        '<text x="496" y="162" fill="#D0D0D0" font-size="13" font-family="Arial, sans-serif">Selected ownership records</text>'
      );
    },
    "creator-pay": function () {
      const steps = ["Offer", "Review", "Approve", "Base tx", "Record"];
      let body = "";
      steps.forEach(function (step, index) {
        const x = 30 + index * 180;
        body += card(x, 80, 150, 70, step, "Proposed", "planned");
        if (index < steps.length - 1) body += '<path d="M' + (x + 150) + ' 115 H' + (x + 180) + '" stroke="#FA4C14" fill="none"/>';
      });
      return wrap(920, 230, "Creator payment flow", body);
    },
    roadmap: function () {
      const phases = [
        ["01 Foundation", "Completed", "done"],
        ["02 Infrastructure", "Completed", "done"],
        ["03 SocialFi", "Upcoming", "next"],
        ["04 Creator", "Planned", "planned"],
        ["05 Beta prep", "Planned", "planned"],
        ["06 Expansion", "Future", "future"],
      ];
      let body = "";
      phases.forEach(function (phase, index) {
        const y = 20 + index * 58;
        body += card(40, y, 840, 48, phase[0], phase[1], phase[2]);
      });
      return wrap(920, 380, "Development roadmap", body);
    },
  };

  return {
    render: function (id) {
      return diagrams[id] ? diagrams[id]() : "";
    },
  };
});
