# Honeymiood

> **Artisanal Raw Honey from the Baltic Coast**  
> **Location**: Kępa Redłowska Nature Reserve, Gdynia, Poland (`54°29'N 18°33'E`)  
> **Heritage**: 4 generations of beekeeping knowledge since 1923 (100+ years family tradition)  
> **Website**: [honeymiood.com](https://honeymiood.com)

---

## 1. Overview & Heritage

Honeymiood is an artisanal beekeeping project rooted in the coastal microclimate of the **Kępa Redłowska Nature Reserve** in Gdynia. Operating across four generations—from Great-great-grandmother Jadwiga to Master Beekeeper Jarek—the apiary produces 100% raw, unheated, and cold-extracted single-origin honey.

The digital presence is built around **story-driven commerce**, celebrating beekeepers as biodiversity stewards and emphasizing terroir, coastal flora (linden, acacia, rapeseed, wildflower, evening primrose), and full batch transparency.

---

## 2. Seasonal Harvest & Fresh Crop Maintenance

> [!IMPORTANT]
> **Harvest Year Synchronisation (2026 Fresh Crop Update)**  
> The legacy website previously displayed **"Zbiór 2025" / "2025 Fresh Harvest"** because the old pages had not been updated upon arrival of the new season's crop. With the active 2026 harvest in progress, all product metadata and catalog pages have been updated to reflect **Zbiór 2026 / 2026 Fresh Harvest / Frische Ernte 2026**.

### Updating Harvest Years for Future Seasons
When transitioning to a new harvest season, update the harvest year in:
1. **[`data/products.json`](file:///home/matis/Desktop/projects/honeymiood/data/products.json)**: The single source of truth for all products (`"harvest": "Zbiór 2026"`).
2. **Honeys Page Hero Templates**:
   - Polish: [`templates/content/honeys-pl.html`](file:///home/matis/Desktop/projects/honeymiood/templates/content/honeys-pl.html) (`Świeży Zbiór 2026`, `Zbiór 2026`)
   - English: [`templates/content/honeys-en.html`](file:///home/matis/Desktop/projects/honeymiood/templates/content/honeys-en.html) (`2026 Fresh Harvest`, `Harvest 2026`)
   - German: [`templates/content/honeys-de.html`](file:///home/matis/Desktop/projects/honeymiood/templates/content/honeys-de.html) (`Frische Ernte 2026`, `Ernte 2026`)
3. **Rebuild Outputs**:
   Run the build scripts to re-generate the standalone HTML pages, JavaScript catalog, and Cargo deployment artifacts:
   ```bash
   python3 tools/build-site.py && python3 tools/build-cargo.py
   ```

---

## 3. Architecture & Build Pipeline

The project supports a **dual-target deployment architecture**:
1. **Standalone Static Site**: Pure static HTML5, CSS3 (*Almanac Botanical Design System*), and vanilla JavaScript. Runs on any standard static web host without external runtime dependencies.
2. **Cargo.site Production Export**: Generated paste-ready code modules for Cargo 3's flat slug structure and CMS code injection panels.

> [!IMPORTANT]
> Pasting content into the `home` page is not enough to make it
> load at the site root. Cargo requires an explicit **Set as
> Homepage** action (right-click the page → Set as Homepage, per
> [Cargo's official docs](https://docs.cargo.site/pages-and-sets)) —
> without it the temporary `*.cargo.site` address serves nothing.
> See [DEPLOY.md](file:///home/matis/Desktop/projects/honeymiood/DEPLOY.md) step 5.

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

### Build Commands

* **Build Standalone Static Site & Data**:
  ```bash
  python3 tools/build-site.py
  ```
  * Generates all 27 HTML pages across Polish (`/`), English (`/en/`), and German (`/de/`).
  * Injects server-rendered catalog cards, facts comparison table, and FAQ accordions.
  * Writes [`assets/js/products-data.js`](file:///home/matis/Desktop/projects/honeymiood/assets/js/products-data.js) from [`data/products.json`](file:///home/matis/Desktop/projects/honeymiood/data/products.json).
  * Generates `sitemap.xml`, `robots.txt`, `llms.txt`, and `llms-full.txt`.

* **Build Cargo.site Artifacts**:
  ```bash
  python3 tools/build-cargo.py
  ```
  * Flattens internal page URLs to match Cargo slugs.
  * Emits `cargo/global.css`, `cargo/global.html`, and `cargo/pages/*.html`.

* **Sanity-Check Harvest**:
  ```bash
  python3 tools/harvest.py
  ```
  * Scrapes live Cargo preloaded state to detect upstream changes.

---

## 4. Product Catalog & Regulatory Compliance

All 7 honey products, tasting profiles, botanical origin notes, and gift set packages are managed in [`data/products.json`](file:///home/matis/Desktop/projects/honeymiood/data/products.json).

* **EU Regulation 1924/2006 Compliance**: In compliance with EU food labeling laws, all medicinal, disease-prevention, and therapeutic claims (e.g. "anti-inflammatory", "detox", "diabetic cure") have been eliminated. Product descriptions strictly focus on sensory characteristics, crystallization speed, botanical terroir, and culinary pairings.
* **Zero Trackers & Privacy First**: No advertising trackers, profiling cookies, or third-party scripts.

---

## 5. Directory Structure

```
honeymiood/
├── assets/
│   ├── css/                    # Almanac Botanical Design System (tokens, layout, components)
│   ├── images/                 # Apiary, product, and brand imagery
│   └── js/                     # Vanilla JS runtime (products-data.js, catalog.js, modal.js, app.js)
├── cargo/                      # Generated Cargo.site paste-ready artifacts
├── data/
│   ├── products.json           # Canonical single source of truth for products & harvests
│   ├── cargo-site-dump.json    # Live Cargo shop sanity dump
│   └── media-hash-map.json     # CDN media hash index
├── de/                         # Standalone German pages
├── en/                         # Standalone English pages
├── templates/                  # Master source templates
│   ├── header-*.html / footer-*.html
│   └── content/                # 27 individual page templates
├── tools/                      # Build & harvest automation scripts
├── DEPLOY.md                   # Cargo deployment instructions
├── DESIGN_RATIONALE.md         # UI/UX, color palette & GEO rationale
├── Documentation.md            # Comprehensive project, business & technical documentation
└── README.md                   # Project overview & harvest guide
```

---

## 6. Further Documentation

* **[Documentation.md](file:///home/matis/Desktop/projects/honeymiood/Documentation.md)**: Full business, local SEO/GEO, entity knowledge graph, and technical documentation.
* **[DESIGN_RATIONALE.md](file:///home/matis/Desktop/projects/honeymiood/DESIGN_RATIONALE.md)**: Design philosophy, warm earth palette (`#FAF7F2`, `#9B5D1A`, `#284435`), and GEO strategy.
* **[DEPLOY.md](file:///home/matis/Desktop/projects/honeymiood/DEPLOY.md)**: Step-by-step instructions for pasting code into Cargo.site CMS.
