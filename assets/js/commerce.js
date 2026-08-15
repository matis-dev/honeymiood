/* Honeymiood — Commerce Bridge
   <shop-product> is Cargo Commerce's own custom element; it only
   hydrates (and shows live prices) once Cargo's frontend script has
   registered it. When that script isn't present — local preview, or
   any page not actually served by Cargo — every <shop-product> tag
   is degraded to a plain, honestly-labelled preview button instead
   of silently rendering nothing. Reads only; writes no storage. */

(function () {
  "use strict";

  function isCargoCommerceReady() {
    return typeof customElements !== "undefined" && !!customElements.get("shop-product");
  }

  function degrade(el) {
    if (el.dataset.hmDegraded === "true") return;
    el.dataset.hmDegraded = "true";
    var label = el.getAttribute("button-text") || el.textContent.trim() || "Zobacz ofertę";
    el.textContent = label;
    el.setAttribute("aria-disabled", "true");
    el.setAttribute("role", "note");
    el.classList.add("hm-buy--preview");
  }

  function hydrate(root) {
    var scope = root && root.querySelectorAll ? root : document;
    var tags = scope.querySelectorAll("shop-product");
    if (isCargoCommerceReady()) return;
    tags.forEach(function (el) { degrade(el); });
  }

  window.hmHydrateCommerce = hydrate;

  document.addEventListener("DOMContentLoaded", function () {
    hydrate(document);
  });
})();
