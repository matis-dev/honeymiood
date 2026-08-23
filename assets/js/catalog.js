/* Honeymiood — Catalog Renderer
   Builds the alternating editorial product grid from the single
   PRODUCTS source (assets/js/products-data.js), so the 7-product
   bilingual catalog is authored exactly once. Runs only on pages
   that contain a #hm-catalog container.

   tools/build-site.py now server-renders the same cards into
   #hm-catalog at build time (so crawlers without JS see the full
   catalog); this script becomes a no-op fallback in that case and
   only builds the grid itself if the container is still empty. */

(function () {
  "use strict";

  var LABELS = {
    pl: { consistency: "Konsystencja", usage: "Zastosowanie", details: "Zobacz Partię / Szczegóły",
          whereToBuy: "Gdzie Kupić", buy: "Kup: " },
    en: { consistency: "Consistency", usage: "Usage", details: "View Batch / Details",
          whereToBuy: "Where to Buy", buy: "Add to Cart: " },
    de: { consistency: "Konsistenz", usage: "Verwendung", details: "Ernte / Details ansehen",
          whereToBuy: "Verkaufsstellen", buy: "In den Warenkorb: " }
  };

  function lang() {
    var root = document.querySelector(".hm-root[data-hm-lang]");
    var value = (root && root.getAttribute("data-hm-lang")) || document.documentElement.lang;
    if (value === "de") return "de";
    if (value === "en") return "en";
    return "pl";
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function buildCard(product, currentLang) {
    var d = product[currentLang] || product.pl;
    var t = LABELS[currentLang] || LABELS.pl;
    var whereHref = currentLang === "de" ? "verkaufsstellen.html" : (currentLang === "en" ? "stockists.html" : "gdzie-kupic.html");

    var article = el("article", "hm-product");
    article.id = product.id;

    var media = el("div", "hm-product__media");
    var img = document.createElement("img");
    img.src = product.image;
    img.alt = d.title + (currentLang === "en" ? " honey jar — " : " — słoik miodu, ") + d.origin;
    img.loading = "lazy";
    img.width = 800;
    img.height = 1000;
    media.appendChild(img);
    article.appendChild(media);

    var content = el("div", "hm-product__content");

    content.appendChild(el("span", "hm-badge hm-badge--accent", d.harvest));
    content.appendChild(el("h2", "hm-product__title", d.title));
    content.appendChild(el("p", "hm-product__profile", d.profile));

    var dl = el("dl", "hm-product__meta");
    dl.appendChild(el("dt", null, t.consistency));
    dl.appendChild(el("dd", null, d.consistency));
    dl.appendChild(el("dt", null, t.usage));
    dl.appendChild(el("dd", null, d.usage));
    content.appendChild(dl);

    var buyRow = el("div", "hm-product__actions");
    product.sizes.forEach(function (size) {
      var label = t.buy + size.label;
      var sp = document.createElement("shop-product");
      sp.setAttribute("product", size.product);
      sp.setAttribute("variant", size.variant);
      sp.setAttribute("button-text", label);
      sp.setAttribute("show-price", "true");
      sp.className = "hm-btn hm-btn--primary";
      sp.textContent = label;
      buyRow.appendChild(sp);
    });
    content.appendChild(buyRow);

    var actionRow = el("div", "hm-product__actions");
    var detailsBtn = document.createElement("button");
    detailsBtn.type = "button";
    detailsBtn.className = "hm-btn hm-btn--secondary";
    detailsBtn.setAttribute("data-open-product", product.id);
    detailsBtn.textContent = t.details;
    actionRow.appendChild(detailsBtn);

    var whereLink = document.createElement("a");
    whereLink.className = "hm-btn hm-btn--secondary";
    whereLink.href = whereHref;
    whereLink.textContent = t.whereToBuy;
    actionRow.appendChild(whereLink);

    content.appendChild(actionRow);
    article.appendChild(content);

    return article;
  }

  function renderCatalog() {
    var container = document.getElementById("hm-catalog");
    if (!container || !window.PRODUCTS) return;
    if (container.querySelector(".hm-product")) return; // already server-rendered
    var currentLang = lang();
    var limit = parseInt(container.getAttribute("data-limit"), 10);
    var items = limit ? window.PRODUCTS.slice(0, limit) : window.PRODUCTS;
    items.forEach(function (product) {
      container.appendChild(buildCard(product, currentLang));
    });
    if (window.hmHydrateCommerce) window.hmHydrateCommerce(container);
  }

  document.addEventListener("DOMContentLoaded", renderCatalog);
})();
