# Honeymiood — Technical, Business & SEO/GEO Documentation

> **Site & Project Knowledge Base**  
> **Brand**: Honeymiood (`https://honeymiood.com`)  
> **Location**: Gdynia, Poland · Rezerwat Kępa Redłowska (`54°29'N 18°33'E`)  
> **Target Audience**: Retail honey lovers, specialty cafe & bakery clients, gift buyers, B2B wholesale partners (PL, EN, DE).

---

## 1. Executive Summary & Brand Profile

### 1.1 Brand Identity & Heritage
* **Name**: Honeymiood
* **Domain**: `https://honeymiood.com`
* **Tradition**: 4 generations of beekeeping knowledge since **1923 (over 100 years of family tradition)**.
* **Lineage**:
  * **Generation I**: Great-great-grandmother Jadwiga (*Praprababcia Jadwiga*) — founded the original family apiary.
  * **Generation II & III**: Traditional beekeeping methods passed down through Grandpa Grzegorz (*Dziadek Grzegorz*).
  * **Generation IV**: Jarek — current master beekeeper operating hives at the cliffside edge of the nature reserve in Gdynia.

### 1.2 Terroir & Coastal Microclimate
* **Apiary Location**: Bordering the **Kępa Redłowska Nature Reserve** (*Rezerwat Przyrody Kępa Redłowska*) in Gdynia, Pomerania, Poland.
* **Coastal Botanical Profile**:
  * Sea breeze from the Bay of Gdańsk (*Zatoka Gdańska*) meeting protected coastal flora.
  * Primary nectars & pollens: Linden (*Lipa*), Acacia (*Akacja*), Rapeseed (*Rzepak*), Evening Primrose (*Wiesiołek*), Wild Rose (*Dzika Róża*), Cornflowers (*Bławatki*).

### 1.3 Strategic Philosophy: Story-Driven Commerce
* **Selling the Story to Boost Honey Sales**: Instead of treating honey as an anonymous commodity competing on price, the site sells the **story of the place (Kępa Redłowska cliffside reserve) and the people (4 generations of beekeeping stewards)**. This emotional resonance and authentic provenance elevates perceived product value and directly boosts conversion and customer loyalty.
* **The Beekeepers as Nature Keepers**: The narrative celebrates beekeepers as respectful guardians of coastal biodiversity rather than industrial honey producers.
* **Emotional Warmth & Earth Tones**: Refined from the legacy site to radiate warmth, sunlight, and organic terroir (`#FAF7F2` linen paper, `#9B5D1A` seaside amber, `#284435` Baltic pine) rather than cold, clinical e-commerce minimalism.

### 1.4 Core Value Propositions (USPs)
1. **100% Raw & Unheated**: Extracted cold directly from the comb, never pasteurized, retaining active enzymes (diastase, invertase), bio-flavonoids, and micronutrients.
2. **True Single-Origin & Batch Integrity**: Traceable to specific family apiary locations with transparent harvest years.
3. **No Additives or Synthetic Processing**: Zero sugar feeding during honey flow, no micro-filtering or chemical clarifying.
4. **Zero-Tracking & Privacy First**: Clean site code with no advertising trackers, analytics cookies, or third-party bloat.

---

## 2. Technical Architecture & Build Pipeline

The project uses a **dual-target deployment architecture**:
1. **Local Standalone Static Site**: Static HTML5/CSS/JS files running directly in any browser or local web server with zero external dependencies.
2. **Cargo.site Production Platform**: Generated paste-ready code chunks for Cargo's flat URL structure and CMS code-injection panels.

```
                         templates/
              (headers, footers, content fragments)
                          + assets/
                              │
          ┌───────────────────┴───────────────────┐
          │                                       │
          ▼                                       ▼
tools/build-site.py                     tools/build-cargo.py
          │                                       │
          ▼                                       ▼
  Local Standalone Site                    Cargo.site Output
  ├─ index.html, o-nas.html...             ├─ cargo/global.css
  ├─ en/ (about.html, honeys.html...)      ├─ cargo/global.html
  └─ de/ (ueber-uns.html...)               ├─ cargo/pages/_header-*.html
                                           └─ cargo/pages/*.html
```

### 2.1 Technology Stack
* **Markup**: Semantic HTML5 (`<dialog>`, `<article>`, `<dl>`, `<section>`, `<nav>`).
* **Styling**: Vanilla CSS3 with Custom Properties (*Almanac Botanical Design System*).
  * **Typography**: Google Fonts — *Fraunces* (editorial serif) & *Plus Jakarta Sans* (modern geometric sans).
* **JavaScript**: Vanilla ES5/ES6. No runtime frameworks (no React/Vue), zero dependencies.
* **Commerce Engine**: Cargo Commerce `<shop-product>` custom element with graceful offline/local fallback.
* **Asset CDN**: `https://freight.cargo.site/` for production imagery.

### 2.2 JavaScript Modules & Runtime
* [`assets/js/products-data.js`](file:///home/matis/Desktop/projects/honeymiood/assets/js/products-data.js): **Single Source of Truth** for all 7 honeys, gift sets, pricing IDs, harvest notes, tasting profiles, health benefits, and variant attributes.
* [`assets/js/catalog.js`](file:///home/matis/Desktop/projects/honeymiood/assets/js/catalog.js): Dynamic client-side renderer that injects product cards into `#hm-catalog` containers based on current language (`pl`, `en`, `de`).
* [`assets/js/modal.js`](file:///home/matis/Desktop/projects/honeymiood/assets/js/modal.js): Native accessible `<dialog>` quick-view modal with focus trapping, size selector, mailto inquiry bridge, and direct purchase triggers.
* [`assets/js/commerce.js`](file:///home/matis/Desktop/projects/honeymiood/assets/js/commerce.js): Bridges Cargo Commerce custom elements with fallback preview state for non-Cargo environments.
* [`assets/js/app.js`](file:///home/matis/Desktop/projects/honeymiood/assets/js/app.js): Header scroll state observer, active navigation link highlighting, mobile navigation drawer toggle, dynamic copyright year.

---

## 3. Directory Structure & File Map

```
honeymiood/
├── assets/
│   ├── css/
│   │   ├── tokens.css          # Design tokens (colors, fluid typography, spacing)
│   │   ├── layout.css          # Container widths, header, footer, navigation drawer
│   │   ├── components.css      # Hero cards, buttons, badges, dialog modal, dl lists
│   │   └── pages.css           # Timeline cards, stockists layout, contact styles
│   ├── images/                 # Local image assets
│   └── js/
│       ├── products-data.js    # Central product catalog data (PL / EN / DE)
│       ├── catalog.js          # Product grid renderer
│       ├── modal.js            # Quick-view <dialog> modal logic
│       ├── commerce.js         # Cargo Commerce bridge
│       └── app.js              # Header, nav, mobile drawer interactions
├── cargo/                      # GENERATED: Paste-ready Cargo.site artifacts
│   ├── global.css              # Combined CSS for Cargo Site Settings -> CSS
│   ├── global.html             # Combined JS for Cargo Site Settings -> HTML
│   └── pages/                  # Per-page HTML files & pinned header/footer pairs
├── data/
│   ├── cargo-site-dump.json    # Harvested raw Cargo site content dump
│   └── media-hash-map.json     # CDN media hash dictionary
├── templates/                  # MASTER SOURCE TEMPLATES
│   ├── header-pl.html / header-en.html / header-de.html
│   ├── footer-pl.html / footer-en.html / footer-de.html
│   └── content/                # 27 individual page content templates
├── tools/
│   ├── build-site.py           # Builds standalone HTML site (root, en/, de/)
│   ├── build-cargo.py          # Builds cargo/ folder with flat URLs and CDN mapping
│   └── harvest.py              # Scrapes/dumps live Cargo shop configuration
├── en/                         # Standalone English pages
├── de/                         # Standalone German pages
├── index.html                  # Standalone Polish homepage
├── DEPLOY.md                   # Cargo deployment instructions
├── Documentation.md            # This master reference document
└── README.md                   # Project overview & harvest guide
```

---

## 4. Full Page Matrix (27 Pages across 3 Languages)

| Page Group | Polish (Root) | English (`/en/`) | German (`/de/`) | Cargo Slugs (PL / EN / DE) |
|---|---|---|---|---|
| **Homepage** | `index.html` | `en/index.html` | `de/index.html` | `home` / `eng` / `de` |
| **About Us** | `o-nas.html` | `en/about.html` | `de/ueber-uns.html` | `o-nas` / `about` / `ueber-uns` |
| **All Honeys** | `miody.html` | `en/honeys.html` | `de/honige.html` | `miody` / `honeys` / `honige` |
| **Gift Sets** | `zestawy.html` | `en/gift-sets.html` | `de/geschenksets.html` | `zestawy` / `gift-sets` / `geschenksets` |
| **Stockists** | `gdzie-kupic.html` | `en/stockists.html` | `de/verkaufsstellen.html` | `gdzie-kupic` / `stockists` / `verkaufsstellen` |
| **Contact & B2B**| `kontakt.html` | `en/contact.html` | `de/kontakt.html` | `kontakt` / `contact` / `kontakt-de` |
| **Privacy Policy**| `polityka-prywatnosci.html` | `en/privacy-policy.html` | `de/datenschutz.html` | `polityka-prywatnosci` / `privacy-policy` / `datenschutz` |
| **Terms of Service**| `regulamin.html` | `en/terms.html` | `de/agb.html` | `regulamin` / `terms` / `agb` |
| **Shipping & Returns**| `zwroty-i-wysylka.html` | `en/shipping-returns.html` | `de/versand-und-rueckgabe.html` | `zwroty-i-wysylka` / `shipping-returns` / `versand-und-rueckgabe` |

---

## 5. Product Catalog & Entity Knowledge Graph

| ID | Polish Name | EN / DE Name | Terroir / Origin | Tasting & Botanical Profile | Core Health & Nutritional Benefits | Sizes |
|---|---|---|---|---|---|---|
| `rzepakowy` | Miód Rzepakowy | Rapeseed Honey / Rapshonig | Mazovian plain & Gdynia | Creamy, fine-grained, snow-white color. Mild, delicate floral sweetness. | High glucose content, fast natural energy, cardiac support, liver detox. | 320g, 1000g |
| `akacjowy` | Miód Akacjowy | Acacia Honey / Akazienhonig | Kępa Redłowska, Gdynia | Liquid, light translucent amber, delicate floral aroma. Slow crystallization. | High fructose, soothing for gastrointestinal tract, nervous tension relief. | 320g, 1000g |
| `wielokwiatowy` | Miód Wielokwiatowy | Wildflower Honey / Blütenhonig | Kępa Redłowska, Gdynia | Golden amber, rich multi-botanical bouquet from coastal wild meadows. | General immunity booster, allergy mitigation (coastal pollens), daily vitality. | 320g, 1000g |
| `lipowy` | Miód Lipowy | Linden Honey / Lindenhonig | Kępa Redłowska, Gdynia | Light amber with greenish tint, distinct minty/herbal pungent finish. | Powerful natural antiseptic, diaphoretic for colds/flu, cough relief. | 320g, 1000g |
| `zlote-mleko` | Złote Mleko | Golden Milk / Goldene Milch | Honeymiood Pasieka | Creamed raw honey blended with turmeric, ginger, cardamom, black pepper. | Potent anti-inflammatory, warming, digestive stimulant, curcumin absorption. | 320g |
| `pierzga` | Pierzga Pszczela | Bee Bread / Bienenbrot | Honeymiood Pasieka | Lactic-fermented pollen grains preserved with honey in the honeycomb. | Complete bioavailable protein, enzymes, B-complex, iron, immune superfood. | 180g |
| `swieca` | Świeca z Wosku | Beeswax Candle / Bienenwachskerze | Honeymiood Pasieka | 100% pure raw beeswax hand-poured candle with natural cotton wick. | Air ionization, negative ions neutralize dust/allergens, subtle honey scent. | 1 unit |

### Curated Gift Sets:
1. **Zestaw Mioodki**: 6 mini tasting jars (30g each) of different varietals.
2. **Zestaw ze Świecą**: Raw honey jar + hand-crafted pure beeswax candle + wooden honey dipper.
3. **Trójmioodek**: 3 selected full-size raw honey jars in an eco-friendly gift box.
4. **Zestaw Świąteczny**: Seasonal festive holiday collection with spices and beeswax ornament.

---

## 6. Geographic & Local SEO Signals (GEO Entities)

### 6.1 Coordinates & Regional Anchors
* **Coordinates**: `54°29'N 18°33'E`
* **City / Region**: Gdynia, Trójmiasto (Gdynia–Sopot–Gdańsk), Pomerania (*Województwo Pomorskie*), Poland.
* **Natural Landmarks**: *Rezerwat Przyrody Kępa Redłowska*, *Klif Orłowski / Redłowski*, *Zatoka Gdańska*, *Morze Bałtyckie*.

### 6.2 Physical Stockists (Local Citations & Retail Partners)
* **Gdynia**:
  * *Pokusa Bakery* — ul. Świętojańska 3, Gdynia
  * *Tłok Kawiarnia* — ul. Józefa Wybickiego 3/1, Gdynia
  * *Kultura Smaku Thelikatesy* — al. Zwycięstwa 231/1, Gdynia
* **Warszawa**:
  * *Kubuś Piekarenka* — ul. Górnośląska 16, Warszawa
* **Toruń**:
  * *Bread House Cafe* — ul. Fosa Staromiejska 2, Toruń
* **Szamotuły**:
  * *ZAO Coffee* — ul. Wroniecka 23, Szamotuły
  (Corrected 2026-08: this section previously listed "Kawiarnia Ratuszowa,
  Rynek 1" for Szamotuły, which does not match the address actually shipped
  on `templates/content/stockists-*.html`. If Kawiarnia Ratuszowa is in fact
  the current stockist, update the templates and this line together.)

---

## 7. Current SEO & GEO State & Gap Analysis

*(Updated 2026-08 after the GEO implementation pass — see DESIGN_RATIONALE.md §7 for full rationale.)*

### 7.1 Implemented & Working Well
* Fast loading performance (zero tracker overhead, instant LCP/INP).
* Semantic HTML5 layout hierarchy (`<header>`, `<main>`, `<article>`, `<section>`, `<dl>`, `<table>`, `<details>`).
* Per-page `<title>`, `<meta name="description">`, Open Graph (now with a distinct, page-relevant `og:image` per page instead of one shared photo), and Twitter Cards.
* Optimized images with explicit dimensions, `loading="lazy"`, and `fetchpriority="high"`.
* Head-level `<link rel="alternate" hreflang="pl|en|de|x-default">` on every page, plus the existing in-page language-switcher links.
* `geo.region`, `geo.placename`, `geo.position` and `ICBM` meta tags on every page (standalone build only — see 7.2).
* JSON-LD `@graph` on every page: `Organization`/`LocalBusiness`, `WebSite`, `BreadcrumbList`; `Product` nodes (real Cargo SKUs, no invented price) on the home and honeys pages; `FAQPage` on the new Facts page.
* Server-rendered product catalog: all 7 products' titles, tasting notes, origin, and full descriptions are in the static HTML on both the home and honeys pages, with real anchors (`#rzepakowy` etc.) — no longer JS-only. JavaScript now only hydrates the Cargo Commerce buy buttons and skips rendering if the SSR cards are already present.
* A dedicated Facts & FAQ page (`fakty.html` / `facts.html` / `fakten.html`) with a product fact-comparison table and six FAQ entries, linked from every page's footer.
* `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt` generated for a standalone static deployment (see 7.2 for why these don't reach the Cargo-hosted domain today).
* Health/medicinal claims (disease claims, antibacterial/anti-inflammatory/immune-support/detox language) removed from all product copy in all three languages — see DESIGN_RATIONALE.md §7 for the legal basis (EU Reg. 1924/2006) and what was changed.
* **Seasonal Harvest Year Synchronisation (2026 Fresh Crop)**: Updated all honey product entries and hero banners from the outdated legacy "Zbiór 2025" / "2025 Fresh Harvest" to the active "Zbiór 2026" / "2026 Fresh Harvest" / "Frische Ernte 2026".

### 7.2 Remaining Gaps — Cargo.site Hosting Ceiling, Not a To-Do List
These are not oversights; they were checked against the live site and are
structurally impossible while the site stays on Cargo.site:
1. **`llms.txt` / `llms-full.txt` / a custom `robots.txt` / `sitemap.xml` are not reachable on `honeymiood.com`.** Cargo hosts no arbitrary root files (`honeymiood.com/llms.txt` 404s) and serves its own `robots.txt` (which, verified live, already allows GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot and Google-Extended — the "allow AI crawlers" ask was already satisfied before this work started).
2. **Per-page `<head>` content doesn't reach Cargo.** Cargo exposes exactly three global surfaces — one preview image, one Site Description field, and one Meta Tags string — no per-page `<head>`. Per-page titles, descriptions, canonical URLs, `hreflang` alternates and geo meta tags therefore exist only in the standalone build; on the live Cargo site, JSON-LD is instead appended to each page's `<body>` (`tools/build-cargo.py`), which is valid per schema.org and is where Google/Perplexity read it from regardless.
3. **No laboratory certificate data.** Diastase activity, HMF, water content and similar figures are not published anywhere by this apiary today; the fact-comparison table has no analytical column until real certificate values exist, rather than an invented one.
4. **No price data in JSON-LD.** The live Cargo shop's own preloaded state confirms `commerce.products` is empty (`hasShopModel: false`) — no price feed exists to read from. `Offer.price` is omitted rather than guessed; it will populate automatically once real prices are added to `data/products.json`.

---

## 8. Direct Prompts for Specialized SEO & GEO Agents

Copy and paste this ready-to-use prompt directly into your specialized SEO/GEO agent:

```markdown
You are an expert in Technical SEO, Local SEO, and Generative Engine Optimization (GEO for Perplexity, Google AI Overviews, and ChatGPT Search).

We have an artisanal raw honey brand website with the following parameters:
- Brand: Honeymiood (https://honeymiood.com)
- Location: Rezerwat Kępa Redłowska, Gdynia, Poland (54°29'N 18°33'E)
- Story: 4-generation family apiary operating since 1923 (100+ years of tradition)
- Products: 7 raw, unpasteurized single-origin honeys (Rzepakowy, Akacjowy, Wielokwiatowy, Lipowy, Złote Mleko, Pierzga, Świeca z wosku) + 4 gift sets
- Languages: Polish (default), English (/en/), German (/de/)
- Retail Partners: Specialty cafes and bakeries in Gdynia, Warszawa, Toruń, and Szamotuły

Please produce:
1. Complete, production-ready JSON-LD schemas:
   - Organization & LocalBusiness (with GeoCoordinates and retail citations)
   - Product schemas for all 7 honey varieties with Offer, Brand, and ItemAvailability
   - FAQPage schema with high-value consumer search questions
2. Head tag improvements:
   - Multi-language `<link rel="alternate" hreflang="...">` tags for all 9 page groups
   - Exact Local SEO Geo meta tags (`geo.region`, `geo.position`, `ICBM`)
3. Generative Engine Optimization (GEO) Content Strategy:
   - Specific Q&A blocks and factual bullet lists designed to be cited directly in AI search summaries
   - Keyword cluster map for Polish (e.g., "surowy miód Gdynia", "prawdziwy miód Kępa Redłowska", "pierzga właściwości"), English, and German
4. Recommendation on pre-rendering product catalog HTML for non-JS AI web scrapers
```
