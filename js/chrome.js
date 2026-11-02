(function () {
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const active = (href) => (page === href || (page === "" && href === "index.html") ? "active" : "");

  document.write(`
  <header class="header">
    <a class="brand" href="index.html" aria-label="Cassator Corp.">
      <img src="assets/logo.svg" alt="Cassator Corp.">
    </a>
    <nav class="nav" aria-label="Primary">
      <div class="drop" id="sl8drop">
        <button class="drop-btn" aria-expanded="false" aria-controls="sl8menu">SL8 <i class="caret"></i></button>
        <div class="drop-menu" id="sl8menu">
          <a href="sl8.html"><span>01</span> SL8 — Overview</a>
          <a href="rwa.html"><span>02</span> RWA Platform</a>
          <a href="wallet.html"><span>03</span> Wallet &amp; Staking</a>
          <a href="paid-content.html"><span>04</span> Paid Content</a>
        </div>
      </div>
      <a class="${active("investors.html")}" href="investors.html">Investors</a>
      <a class="${active("newsroom.html")}" href="newsroom.html">Newsroom</a>
      <a class="${active("team.html")}" href="team.html">Team</a>
      <a class="${active("trust-center.html")}" href="trust-center.html">Trust Center</a>
    </nav>
    <div class="header-right">
      <a class="btn-go" href="https://sl8.online/" target="_blank" rel="noopener">Go to Sl8</a>
      <button class="burger" id="burger" aria-label="Open menu"><span></span></button>
    </div>
  </header>
  <div class="mobile-panel" id="mobile">
    <a href="sl8.html">01 SL8 — Overview</a>
    <a href="rwa.html">02 RWA Platform</a>
    <a href="wallet.html">03 Wallet &amp; Staking</a>
    <a href="paid-content.html">04 Paid Content</a>
    <a href="investors.html">Investors</a>
    <a href="newsroom.html">Newsroom</a>
    <a href="team.html">Team</a>
    <a href="trust-center.html">Trust Center</a>
    <a href="built-on-stellar.html">Built on Stellar</a>
    <a href="https://sl8.online/" target="_blank" rel="noopener">Go to Sl8</a>
  </div>`);

  window.renderFooter = function () {
    document.write(`
    <footer class="footer">
      <div class="wrap">
        <p class="footer-quote">People are the most valuable asset on the planet. We are building infrastructure that empowers people to turn their potential into digital assets.</p>
        <div class="mails">
          <a href="mailto:hello@cassator.corp">hello@cassator.corp</a>
          <a href="mailto:press@cassator.corp">press@cassator.corp</a>
        </div>
        <div class="stores">
          <a href="https://apps.apple.com/ua/app/sl8-social-platform/id1540326210" target="_blank" rel="noopener">App Store</a>
          <a href="https://play.google.com/store/apps/details?id=mobile.sl8.app" target="_blank" rel="noopener">Google Play</a>
          <a href="https://sl8.online/" target="_blank" rel="noopener">Web Version</a>
        </div>
        <div class="foot-grid">
          <div>
            <h4>Platform SL8</h4>
            <a href="sl8.html">SL8 — Overview</a>
            <a href="rwa.html">RWA Platform</a>
            <a href="wallet.html">Wallet &amp; Staking</a>
            <a href="paid-content.html">Paid Content</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="index.html#about">About us</a>
            <a href="team.html">Team</a>
            <a href="newsroom.html">Newsroom</a>
            <a href="investors.html">Investors</a>
            <a href="built-on-stellar.html">Built on Stellar</a>
          </div>
          <div>
            <h4>Trust &amp; Legal</h4>
            <a href="trust-center.html">Trust Center</a>
            <a href="privacy.html">Privacy Policy</a>
            <a href="terms.html">Terms of Use</a>
            <a href="security.html">Security</a>
            <a href="safety.html">Safety</a>
            <a href="compliance.html">Compliance</a>
            <a href="cookies.html">Cookies</a>
          </div>
          <div>
            <h4>Resources</h4>
            <a href="https://wefunder.com/cassator" target="_blank" rel="noopener">Wefunder</a>
            <a href="investors.html">SEC Filing</a>
            <a href="https://stellar.org/" target="_blank" rel="noopener">Stellar.org</a>
            <a href="https://cassator-brandbook.webflow.io/" target="_blank" rel="noopener">Media Kit</a>
            <div class="socials">
              <a href="https://x.com/cassator" target="_blank" rel="noopener" aria-label="X">X</a>
              <a href="https://t.me/Sl8_Community" target="_blank" rel="noopener" aria-label="Telegram">Tg</a>
              <a href="https://www.instagram.com/sl8.online" target="_blank" rel="noopener" aria-label="Instagram">Ig</a>
              <a href="https://www.facebook.com/sl8.online" target="_blank" rel="noopener" aria-label="Facebook">Fb</a>
            </div>
          </div>
        </div>
        <p class="legal">Cassator Corp is registered in the State of Delaware, USA. SEC filings: Regulation CF / Regulation D. Cassator Corp is not a licensed financial institution. Investments in tokens and digital assets carry high risk. Past results do not guarantee future results. This website is for informational purposes only and does not constitute a public offer or investment recommendation.</p>
        <div class="legal-row">
          <span>© 2026 Cassator Corp.</span>
          <span>All rights reserved. Delaware, United States.</span>
        </div>
      </div>
    </footer>`);
  };

  document.addEventListener("DOMContentLoaded", function () {
    const drop = document.getElementById("sl8drop");
    const btn = drop && drop.querySelector(".drop-btn");
    const burger = document.getElementById("burger");
    const mobile = document.getElementById("mobile");
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const open = drop.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      document.addEventListener("click", function () {
        drop.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    }
    if (burger && mobile) {
      burger.addEventListener("click", function () {
        mobile.classList.toggle("open");
      });
    }
  });
})();
