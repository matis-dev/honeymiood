/* Honeymiood — Global App Behaviour
   Navigation active-state, mobile menu toggle, language helper.
   No storage of any kind is used here — nothing to write to
   localStorage/cookies means nothing here ever requires consent. */

(function () {
  "use strict";

  function markActiveNavLink() {
    var here = window.location.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
    if (here === "") here = "/";
    document.querySelectorAll(".hm-header__nav a[href]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href) return;
      var normalized = href.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
      if (normalized === here || (href === "index.html" && (here === "/" || here === "/index"))) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function initMobileNav() {
    var root = document.querySelector(".hm-root");
    var toggle = document.querySelector(".hm-header__menu-toggle");
    var nav = document.querySelector(".hm-header__nav");
    if (!root || !toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = root.getAttribute("data-nav-open") === "true";
      root.setAttribute("data-nav-open", open ? "false" : "true");
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        root.setAttribute("data-nav-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.getAttribute("data-nav-open") === "true") {
        root.setAttribute("data-nav-open", "false");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
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
