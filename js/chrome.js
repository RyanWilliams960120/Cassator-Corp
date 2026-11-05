(function () {
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const active = (href) => (page === href || (page === "" && href === "index.html") ? "active" : "");

  document.write(`
  <header class="header">
    <a class="brand" href="index.html" aria-label="EraX Digital">
      <img src="/assets/erax-logotype.svg" alt="EraX Digital">
    </a>
    <nav class="nav" aria-label="Primary">
      <div class="drop" id="sl8drop">
        <button class="drop-btn" aria-expanded="false" aria-controls="sl8menu">Ecosystem <i class="caret"></i></button>
        <div class="drop-menu" id="sl8menu">
          <a target="_blank" rel="noopener noreferrer" href="https://erax-digital.vercel.app/"><span>01</span> EraX Social</a>
          <a href="rwa.html"><span>02</span> EraX Assets</a>
          <a href="wallet.html"><span>03</span> EraX Wallet</a>
          <a href="paid-content.html"><span>04</span> EraX Creator</a>
        </div>
      </div>
      <a class="${active("investors.html")}" href="investors.html">Roadmap</a>
      <a class="${active("team.html")}" href="team.html">Team</a>
      <a class="${active("careers.html")}" href="careers.html">Careers</a>
      <a class="${active("trust-center.html")}" href="trust-center.html">Trust Center</a>
      <a href="/documentation">Documentation</a>
      <a href="/whitepaper">Whitepaper</a>
    </nav>
    <div class="header-right">
      <a target="_blank" rel="noopener noreferrer" class="btn-go" href="https://erax-digital.vercel.app/">Ecosystem</a>
      <button class="burger" id="burger" aria-label="Open menu"><span></span></button>
    </div>
  </header>
  <div class="mobile-panel" id="mobile">
    <a target="_blank" rel="noopener noreferrer" href="https://erax-digital.vercel.app/">01 EraX Social</a>
    <a href="rwa.html">02 EraX Assets</a>
    <a href="wallet.html">03 EraX Wallet</a>
    <a href="paid-content.html">04 EraX Creator</a>
    <a href="investors.html">Roadmap</a>
    <a href="team.html">Team</a>
    <a href="careers.html">Careers</a>
    <a href="trust-center.html">Trust Center</a>
    <a href="/documentation">Documentation</a>
    <a href="/whitepaper">Whitepaper</a>
    <a href="built-on-stellar.html">Technology</a>
    <a target="_blank" rel="noopener noreferrer" href="https://erax-digital.vercel.app/">Ecosystem</a>
  </div>`);

  window.renderFooter = function () {
    document.write(`
    <footer class="footer">
      <div class="wrap">
        <p class="footer-quote">EraX Digital is building the next generation of connected digital experiences by combining social networking, blockchain technology and creator-focused financial tools.</p>
        <div class="mails">
          <a href="mailto:contact@erax.digital">contact@erax.digital</a>
          <a href="mailto:jobs@erax.digital">jobs@erax.digital</a>
        </div>
        <div class="stores">
          <a target="_blank" rel="noopener noreferrer" href="https://erax-digital.vercel.app/">EraX Social</a>
          <a href="wallet.html">EraX Wallet</a>
          <a href="paid-content.html">EraX Creator</a>
        </div>
        <div class="foot-grid">
          <div>
            <h4>Ecosystem</h4>
            <a target="_blank" rel="noopener noreferrer" href="https://erax-digital.vercel.app/">EraX Social</a>
            <a href="rwa.html">EraX Assets</a>
            <a href="wallet.html">EraX Wallet</a>
            <a href="paid-content.html">EraX Creator</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="index.html#about">About</a>
            <a href="team.html">Team</a>
            <a href="careers.html">Careers</a>
            <a href="investors.html">Roadmap</a>
            <a href="/documentation">Documentation</a>
            <a href="/whitepaper">Whitepaper</a>
            <a href="built-on-stellar.html">Technology</a>
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
            <a href="investors.html">Roadmap</a>
            <a href="/documentation">Documentation</a>
            <a href="/whitepaper">Whitepaper</a>
            <a href="trust-center.html">Trust Center</a>
            <a href="built-on-stellar.html">Technology</a>
            <div class="socials">
              <a href="https://www.linkedin.com/company/erax-digital/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
              <a href="https://github.com/EraX-Digital" target="_blank" rel="noopener noreferrer" aria-label="EraX Digital on GitHub">GitHub</a>
            </div>
          </div>
        </div>
        <p class="legal">EraX Digital is an independent Web3 technology company. Product features described on this website are in development unless a live service is actually shipped. This website is informational and is not an offer to sell a token, security, or investment product.</p>
        <div class="legal-row">
          <span>© 2026 EraX Digital</span>
          <span>All rights reserved.</span>
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
