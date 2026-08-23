# Deploying to Cargo

This site is authored as plain HTML/CSS/JS in the project root (open
`index.html` directly, or run `python3 -m http.server` and visit
`localhost:8000` to preview). The `cargo/` folder is **generated** —
paste-ready copies of the same content, rewritten for Cargo's three
code-injection points and its flat URL scheme.

Regenerate `cargo/` any time you edit a page:

```
python3 tools/build-site.py    # rebuilds the local standalone site
python3 tools/build-cargo.py   # rebuilds cargo/ from it
```

## Before you start

**Duplicate the live site first** and work on the copy, so the
current shop is never broken mid-paste. Cargo's duplicate function is
in the site list view.

## 1. Global CSS (one paste)

Site Settings → CSS/HTML → **CSS** tab → paste all of
`cargo/global.css` → Update.

## 2. Global HTML/JS (one paste)

Same panel → **HTML** tab → paste all of `cargo/global.html` →
Update. This is every script (`products-data.js`, `app.js`,
`commerce.js`, `catalog.js`, `modal.js`) wrapped in `<script>` tags —
it now runs on every page of the site.

## 3. Header and footer (six pastes, once each)

The design uses one responsive header/footer, but Cargo pins are
scoped per **Set**, and this site has three Sets — _Pages
Polish_, _Pages English_, and _Pages German_ — so each language gets its own pinned
pair rather than fighting over one global pin:

1. New page inside **Pages Polish** → paste `cargo/pages/_header-pl.html`
   into Code View → **Pin** it (pin scope: this Set).
2. New page inside **Pages Polish** → paste `cargo/pages/_footer-pl.html`
   → Pin (this Set).
3. Repeat with `_header-en.html` / `_footer-en.html` inside **Pages
   English**.
4. Repeat with `_header-de.html` / `_footer-de.html` inside **Pages
   German**.

> **Known limitation:** the language switch (`PL | EN | DE`) in a pinned
> header can't vary per page — Cargo pins are one fixed piece of
> content per Set. It's wired to jump to the other language's
> **homepage** (`/home` ↔ `/eng` ↔ `/de`), not the exact page counterpart.
> The local standalone site (`index.html` etc.) does the precise
> per-page version, since each page there is authored individually.

## 4. The 30 pages

For each row below: create the page inside the matching Set, open
**Code View**, paste the file, Update.

| Cargo slug              | Set           | Source file                                                           |
| ----------------------- | ------------- | --------------------------------------------------------------------- |
| `home`                  | Pages Polish  | `cargo/pages/home.html`                                               |
| `o-nas`                 | Pages Polish  | `cargo/pages/o-nas.html`                                              |
| `miody`                 | Pages Polish  | `cargo/pages/miody.html`                                              |
| `zestawy`               | Pages Polish  | `cargo/pages/zestawy.html` _(review before publishing)_               |
| `gdzie-kupic`           | Pages Polish  | `cargo/pages/gdzie-kupic.html`                                        |
| `fakty`                 | Pages Polish  | `cargo/pages/fakty.html`                                              |
| `kontakt`               | Pages Polish  | `cargo/pages/kontakt.html`                                            |
| `polityka-prywatnosci`  | Pages Polish  | `cargo/pages/polityka-prywatnosci.html` _(review before publishing)_  |
| `regulamin`             | Pages Polish  | `cargo/pages/regulamin.html` _(review before publishing)_             |
| `zwroty-i-wysylka`      | Pages Polish  | `cargo/pages/zwroty-i-wysylka.html` _(review before publishing)_      |
| `eng`                   | Pages English | `cargo/pages/eng.html`                                                |
| `about`                 | Pages English | `cargo/pages/about.html`                                              |
| `honeys`                | Pages English | `cargo/pages/honeys.html`                                             |
| `gift-sets`             | Pages English | `cargo/pages/gift-sets.html`                                          |
| `stockists`             | Pages English | `cargo/pages/stockists.html`                                          |
| `facts`                 | Pages English | `cargo/pages/facts.html`                                              |
| `contact`               | Pages English | `cargo/pages/contact.html`                                            |
| `privacy-policy`        | Pages English | `cargo/pages/privacy-policy.html` _(review before publishing)_        |
| `terms`                 | Pages English | `cargo/pages/terms.html` _(review before publishing)_                 |
| `shipping-returns`      | Pages English | `cargo/pages/shipping-returns.html` _(review before publishing)_      |
| `de`                    | Pages German  | `cargo/pages/de.html`                                                 |
| `ueber-uns`             | Pages German  | `cargo/pages/ueber-uns.html`                                          |
| `honige`                | Pages German  | `cargo/pages/honige.html`                                             |
| `geschenksets`          | Pages German  | `cargo/pages/geschenksets.html`                                       |
| `verkaufsstellen`       | Pages German  | `cargo/pages/verkaufsstellen.html`                                    |
| `fakten`                | Pages German  | `cargo/pages/fakten.html`                                             |
| `kontakt-de`            | Pages German  | `cargo/pages/kontakt-de.html`                                         |
| `datenschutz`           | Pages German  | `cargo/pages/datenschutz.html` _(review before publishing)_           |
| `agb`                   | Pages German  | `cargo/pages/agb.html` _(review before publishing)_                   |
| `versand-und-rueckgabe` | Pages German  | `cargo/pages/versand-und-rueckgabe.html` _(review before publishing)_ |

The existing 14 per-honey product pages (`rzepakowy`, `akacjowy`,
`wielokwiatowy`, `lipowy`, and their EN counterparts, etc.) are **not**
touched by this generator — they keep their own real content and
`<shop-product>` buttons, and simply pick up the new global CSS/JS
automatically once step 1–2 are done.

## 5. Set the home page

Cargo does not treat any page as the homepage by default — pasting
content into `home` is not enough on its own. Right-click the `home`
page (inside **Pages Polish**) in the site list and choose **Set as
Homepage**. Cargo will ask whether this applies to desktop, mobile,
or both — choose both, since this site's `home` page is responsive.

**This step is easy to miss and its absence is why the temporary
`*.cargo.site` address didn't resolve to anything** during earlier
testing — without a homepage assigned, Cargo has no page to serve at
the site root. See the official docs:
[Pages and Sets — Cargo 3 Docs](https://docs.cargo.site/pages-and-sets).

## 6. Remove the cookie banner

Find the pinned page titled **`banner`** (id `A3816515666`) and
**delete or unpin it**. It's hand-authored custom HTML/JS, not a Cargo
feature — see the plan's "self-inflicted" note for the full audit of
why removing it is safe: the published site sets no cookies, loads no
third-party trackers, and the only client-side storage left after
this (the Commerce cart) is exempt from consent under the ePrivacy
Directive as strictly necessary.

## 7. Fix `og:image` and add Site Description + Meta Tags

Site Settings → Publish Settings → Site Preview Image currently
points at `https://example.com/path-to-your-image.jpg`. Replace it
with a real product or apiary photo — e.g. the homepage hero image,
`https://freight.cargo.site/t/original/i/T2068100808246618789267660548854/f1e07510-ca35-42bb-99d8-eb1f00ab5e60.JPG`.

**Known limitation:** Cargo exposes only this one, site-wide preview
image, Site Description, and Meta Tags string — there is no per-page
`<head>` in Cargo, so the per-page `og:image`, canonical, hreflang and
geo meta tags that `tools/build-site.py` generates for the standalone
build (one relevant photo per page, not a single shared image) cannot
reach the live Cargo-hosted site. See DESIGN_RATIONALE.md for the full
list of what Cargo's hosting model rules out here.

In the same panel, paste into **Site Description**:

```
Organic Honey from the Kępa Redłowska Nature Reserve in Gdynia
```

And into **Meta Tags**:

```html
<meta property="og:title" content="Honeymiood ~ Organic Honey from the Kępa Redłowska Nature Reserve in Gdynia" />
<meta property="og:description" content="Discover Honeymiood ~ Premium Organic Honey sourced from the seaside forest at Kępa Redłowska Nature Reserve in Gdynia. Pure, natural, and full of flavour." />
<meta property="og:image" content="https://freight.cargo.site/t/original/i/T2068100808246618789267660548854/f1e07510-ca35-42bb-99d8-eb1f00ab5e60.JPG" />
<meta property="og:url" content="https://honeymiood.com" />
<meta property="og:type" content="website" />
<meta name="geo.region" content="PL-22" />
<meta name="geo.placename" content="Gdynia, Kępa Redłowska" />
<meta name="geo.position" content="54.4833;18.5500" />
<meta name="ICBM" content="54.4833, 18.5500" />
```

## 8. Verify

```
curl -sI https://honeymiood.com/ | grep -i set-cookie   # must be empty
curl -s https://honeymiood.com/ | grep -oE 'https?://[a-z.]+' | sort -u
```

The second command should list only `*.cargo.site` hosts (plus
whatever a page you're viewing links out to on click, which is fine —
only _auto-loaded_ resources matter for the cookie-banner question).

Then click every nav and footer link on both languages — nothing
should 404 — and add an item to the cart to confirm Commerce still
checks out correctly with the new markup around it.

**Not deployable on Cargo:** `robots.txt`, `sitemap.xml`, `llms.txt` and
`llms-full.txt` are generated by `tools/build-site.py` into the repo
root for a standalone static deployment only. Cargo serves its own
`robots.txt` (already permissive to AI crawlers — GPTBot, OAI-SearchBot,
PerplexityBot, ClaudeBot, Google-Extended are not blocked by its default
`Allow: /`) and cannot host arbitrary root files at all, so the other
three simply won't be reachable at `honeymiood.com/llms.txt` etc. while
the site stays on Cargo. See DESIGN_RATIONALE.md.
