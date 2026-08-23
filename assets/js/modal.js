/* Honeymiood — Quick-View Modal
   Native <dialog>. Escape closes (handled natively by <dialog>),
   focus is trapped while open, body scroll is locked, and focus
   returns to the trigger on close. No storage of any kind. */

(function () {
  "use strict";

  var modal, lastTrigger, currentLang;

  var LABELS = {
    pl: { profile: "Profil smakowy", consistency: "Konsystencja", usage: "Zastosowanie", origin: "Pochodzenie",
          inquiry: "Zapytaj o ten miód", close: "Zamknij", buy: "Kup: ", subjectPrefix: "Zapytanie o " },
    en: { profile: "Tasting profile", consistency: "Consistency", usage: "Usage", origin: "Origin",
          inquiry: "Ask about this honey", close: "Close", buy: "Add to Cart: ", subjectPrefix: "Inquiry regarding " },
    de: { profile: "Geschmacksprofil", consistency: "Konsistenz", usage: "Verwendung", origin: "Herkunft",
          inquiry: "Diesen Honig anfragen", close: "Schließen", buy: "In den Warenkorb: ", subjectPrefix: "Anfrage zu " }
  };

  function lang() {
    var root = document.querySelector(".hm-root[data-hm-lang]");
    var value = (root && root.getAttribute("data-hm-lang")) || document.documentElement.lang;
    if (value === "de") return "de";
    if (value === "en") return "en";
    return "pl";
  }

  function buildModal() {
    var dialog = document.createElement("dialog");
    dialog.className = "hm-modal hm-root";
    dialog.id = "hm-product-modal";
    dialog.setAttribute("aria-labelledby", "hm-modal-title");
    dialog.innerHTML =
      '<div class="hm-modal__inner">' +
        '<div class="hm-modal__media"><img id="hm-modal-img" alt="" /></div>' +
        '<div class="hm-modal__body" tabindex="-1">' +
          '<button type="button" class="hm-modal__close modal-close-btn" aria-label="Close">&times;</button>' +
          '<span class="hm-badge" id="hm-modal-harvest"></span>' +
          '<h2 id="hm-modal-title"></h2>' +
          '<p id="hm-modal-subtitle" class="hm-product__price"></p>' +
          '<dl class="hm-product__meta">' +
            '<dt id="hm-modal-profile-label"></dt><dd id="hm-modal-profile"></dd>' +
            '<dt id="hm-modal-consistency-label"></dt><dd id="hm-modal-consistency"></dd>' +
            '<dt id="hm-modal-usage-label"></dt><dd id="hm-modal-usage"></dd>' +
            '<dt id="hm-modal-origin-label"></dt><dd id="hm-modal-origin"></dd>' +
          '</dl>' +
          '<p id="hm-modal-desc"></p>' +
          '<div class="hm-modal__sizes" id="hm-modal-sizes" role="group" aria-label="Size"></div>' +
          '<div class="hm-modal__actions">' +
            '<div class="hm-modal__buy" id="hm-modal-buy"></div>' +
            '<a class="hm-btn hm-btn--secondary hm-btn--block" id="hm-modal-inquiry-btn" href="#"></a>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(dialog);
    return dialog;
  }

  function getFocusable() {
    var nodes = modal.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
    return Array.prototype.filter.call(nodes, function (el) {
      return !el.hidden && el.offsetParent !== null;
    });
  }

  function trapFocus(e) {
    if (e.key !== "Tab") return;
    var focusable = getFocusable();
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function populateModalData(product) {
    var d = product[currentLang] || product.pl;
    var t = LABELS[currentLang];

    modal.querySelector("#hm-modal-harvest").textContent = d.harvest;
    modal.querySelector("#hm-modal-title").textContent = d.title;
    modal.querySelector("#hm-modal-subtitle").textContent = d.subtitle;
    modal.querySelector("#hm-modal-profile-label").textContent = t.profile;
    modal.querySelector("#hm-modal-profile").textContent = d.profile;
    modal.querySelector("#hm-modal-consistency-label").textContent = t.consistency;
    modal.querySelector("#hm-modal-consistency").textContent = d.consistency;
    modal.querySelector("#hm-modal-usage-label").textContent = t.usage;
    modal.querySelector("#hm-modal-usage").textContent = d.usage;
    modal.querySelector("#hm-modal-origin-label").textContent = t.origin;
    modal.querySelector("#hm-modal-origin").textContent = d.origin;
    modal.querySelector("#hm-modal-desc").textContent = d.description;

    var img = modal.querySelector("#hm-modal-img");
    img.src = product.image;
    img.alt = d.title + (currentLang === "en" ? " honey jar — " : " — słoik miodu, ") + d.origin;

    var sizesWrap = modal.querySelector("#hm-modal-sizes");
    var buyWrap = modal.querySelector("#hm-modal-buy");
    sizesWrap.innerHTML = "";
    buyWrap.innerHTML = "";

    if (product.sizes.length <= 1) {
      sizesWrap.style.display = "none";
    } else {
      sizesWrap.style.display = "flex";
    }

    product.sizes.forEach(function (size, i) {
      var pill = document.createElement("button");
      pill.type = "button";
      pill.className = "hm-pill";
      pill.textContent = size.label;
      pill.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      pill.addEventListener("click", function () {
        Array.prototype.forEach.call(sizesWrap.querySelectorAll(".hm-pill"), function (p) {
          p.setAttribute("aria-pressed", "false");
        });
        pill.setAttribute("aria-pressed", "true");
        Array.prototype.forEach.call(buyWrap.querySelectorAll("shop-product"), function (sp, j) {
          sp.hidden = j !== i;
          sp.style.display = j === i ? "" : "none";
        });
      });
      sizesWrap.appendChild(pill);

      var buyLabel = t.buy + size.label;
      var sp = document.createElement("shop-product");
      sp.setAttribute("product", size.product);
      sp.setAttribute("variant", size.variant);
      sp.setAttribute("button-text", buyLabel);
      sp.setAttribute("show-price", "true");
      sp.className = "hm-btn hm-btn--primary hm-btn--block";
      sp.textContent = buyLabel;
      sp.hidden = i !== 0;
      if (i !== 0) {
        sp.style.display = "none";
      }
      buyWrap.appendChild(sp);
    });

    if (window.hmHydrateCommerce) window.hmHydrateCommerce(buyWrap);

    var inquiry = modal.querySelector("#hm-modal-inquiry-btn");
    var subject = encodeURIComponent(t.subjectPrefix + d.title);
    inquiry.href = "mailto:honeymiood@gmail.com?subject=" + subject;
    inquiry.textContent = t.inquiry;

    modal.querySelector(".modal-close-btn").setAttribute("aria-label", t.close);
  }

  function openModal(product, trigger) {
    currentLang = lang();
    lastTrigger = trigger || null;
    populateModalData(product);
    modal.showModal();
    var body = modal.querySelector(".hm-modal__body");
    if (body) {
      body.scrollTop = 0;
      body.focus();
    }
    document.documentElement.classList.add("hm-modal-open");
    document.body.classList.add("hm-modal-open");
    modal.addEventListener("keydown", trapFocus);
  }

  function closeModal() {
    modal.close();
  }

  function initProductModal() {
    modal = buildModal();

    modal.querySelector(".modal-close-btn").addEventListener("click", closeModal);

    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });

    modal.addEventListener("close", function () {
      document.documentElement.classList.remove("hm-modal-open");
      document.body.classList.remove("hm-modal-open");
      modal.removeEventListener("keydown", trapFocus);
      if (lastTrigger) lastTrigger.focus();
    });

    // Forward wheel events anywhere inside modal (e.g. over media image) directly to modal body
    modal.addEventListener("wheel", function (e) {
      var body = modal.querySelector(".hm-modal__body");
      if (!body) return;
      if (e.target !== body && !body.contains(e.target)) {
        // deltaY isn't always pixels: Firefox reports "lines" (mode 1) and
        // some devices report "pages" (mode 2) — normalize to pixels.
        var delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 16;
        else if (e.deltaMode === 2) delta *= body.clientHeight;
        body.scrollTop += delta;
        e.preventDefault();
      }
    }, { passive: false });

    document.addEventListener("click", function (e) {
      var trigger = e.target.closest && e.target.closest("[data-open-product]");
      if (!trigger) return;
      e.preventDefault();
      var id = trigger.getAttribute("data-open-product");
      var product = (window.PRODUCTS || []).filter(function (p) { return p.id === id; })[0];
      if (product) openModal(product, trigger);
    });
  }

  document.addEventListener("DOMContentLoaded", initProductModal);
})();
