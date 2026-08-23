/* Honeymiood — Global App Behaviour
   Navigation active-state, mobile menu toggle, language helper.
   No storage of any kind is used here — nothing to write to
   localStorage/cookies means nothing here ever requires consent. */

(function () {
  "use strict";

  function markActiveNavLink() {
    var path = window.location.pathname;
    var filename = path.substring(path.lastIndexOf("/") + 1).replace(/\.html$/, "");
    if (filename === "" || filename === "index") filename = "index";

    document.querySelectorAll(".hm-header__nav a[href], .hm-header__mobile-drawer a[href]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http://") || href.startsWith("https://")) return;
      var linkFile = href.substring(href.lastIndexOf("/") + 1).replace(/\.html$/, "");
      if (linkFile === "" || linkFile === "index") linkFile = "index";

      if (linkFile === filename && !link.hasAttribute("hreflang")) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function initMobileNav() {
    var root = document.querySelector(".hm-root");
    var toggle = document.querySelector(".hm-header__menu-toggle");
    if (!root || !toggle) return;

    var labelOpen = toggle.getAttribute("data-label-open");
    var labelClose = toggle.getAttribute("data-label-close");

    function setMenuState(open) {
      root.setAttribute("data-nav-open", open ? "true" : "false");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (labelOpen && labelClose) {
        toggle.setAttribute("aria-label", open ? labelClose : labelOpen);
      }
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }

    toggle.addEventListener("click", function () {
      var open = root.getAttribute("data-nav-open") === "true";
      setMenuState(!open);
    });

    document.querySelectorAll(".hm-header__nav a, .hm-header__mobile-drawer a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuState(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.getAttribute("data-nav-open") === "true") {
        setMenuState(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900 && root.getAttribute("data-nav-open") === "true") {
        setMenuState(false);
      }
    });
  }

  function setFooterYear() {
    document.querySelectorAll("[data-hm-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    markActiveNavLink();
    initMobileNav();
    setFooterYear();
  });
})();
