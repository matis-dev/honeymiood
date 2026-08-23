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
scoped per **Set**, and this site has three Sets — *Pages
Polish*, *Pages English*, and *Pages German* — so each language gets its own pinned
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

| Cargo slug | Set | Source file |
|---|---|---|
| `home` | Pages Polish | `cargo/pages/home.html` |
| `o-nas` | Pages Polish | `cargo/pages/o-nas.html` |
| `miody` | Pages Polish | `cargo/pages/miody.html` |
| `zestawy` | Pages Polish | `cargo/pages/zestawy.html` *(existing page is currently titled "Zestawy i Prezenty" at slug `zestawy-i-prezenty-1` and hidden from nav — rename its title/URL to `zestawy` and paste the new content, rather than creating a fresh page; it's unpublished so there's no old URL to redirect)* |
| `gdzie-kupic` | Pages Polish | `cargo/pages/gdzie-kupic.html` |
| `fakty` | Pages Polish | `cargo/pages/fakty.html` |
| `kontakt` | Pages Polish | `cargo/pages/kontakt.html` |
| `polityka-prywatnosci` | Pages Polish | `cargo/pages/polityka-prywatnosci.html` *(review before publishing)* |
| `regulamin` | Pages Polish | `cargo/pages/regulamin.html` *(review before publishing)* |
| `zwroty-i-wysylka` | Pages Polish | `cargo/pages/zwroty-i-wysylka.html` *(review before publishing)* |
| `eng` | Pages English | `cargo/pages/eng.html` |
| `about` | Pages English | `cargo/pages/about.html` |
| `honeys` | Pages English | `cargo/pages/honeys.html` |
| `gift-sets` | Pages English | `cargo/pages/gift-sets.html` |
| `stockists` | Pages English | `cargo/pages/stockists.html` |
| `facts` | Pages English | `cargo/pages/facts.html` |
| `contact` | Pages English | `cargo/pages/contact.html` |
| `privacy-policy` | Pages English | `cargo/pages/privacy-policy.html` *(review before publishing)* |
| `terms` | Pages English | `cargo/pages/terms.html` *(review before publishing)* |
| `shipping-returns` | Pages English | `cargo/pages/shipping-returns.html` *(review before publishing)* |
| `de` | Pages German | `cargo/pages/de.html` |
| `ueber-uns` | Pages German | `cargo/pages/ueber-uns.html` |
| `honige` | Pages German | `cargo/pages/honige.html` |
| `geschenksets` | Pages German | `cargo/pages/geschenksets.html` |
| `verkaufsstellen` | Pages German | `cargo/pages/verkaufsstellen.html` |
| `fakten` | Pages German | `cargo/pages/fakten.html` |
| `kontakt-de` | Pages German | `cargo/pages/kontakt-de.html` |
| `datenschutz` | Pages German | `cargo/pages/datenschutz.html` *(review before publishing)* |
| `agb` | Pages German | `cargo/pages/agb.html` *(review before publishing)* |
| `versand-und-rueckgabe` | Pages German | `cargo/pages/versand-und-rueckgabe.html` *(review before publishing)* |

The existing 14 per-honey product pages (`rzepakowy`, `akacjowy`,
`wielokwiatowy`, `lipowy`, and their EN counterparts, etc.) are **not**
touched by this generator — they keep their own real content and
`<shop-product>` buttons, and simply pick up the new global CSS/JS
automatically once step 1–2 are done.

## 5. Remove the cookie banner

Find the pinned page titled **`banner`** (id `A3816515666`) and
**delete or unpin it**. It's hand-authored custom HTML/JS, not a Cargo
feature — see the plan's "self-inflicted" note for the full audit of
why removing it is safe: the published site sets no cookies, loads no
third-party trackers, and the only client-side storage left after
this (the Commerce cart) is exempt from consent under the ePrivacy
Directive as strictly necessary.

## 6. Fix `og:image` and add geo meta tags

Site Settings → Publish Settings → Site Preview Image currently
points at `https://example.com/path-to-your-image.jpg`. Replace it
with a real product or apiary photo — e.g. the homepage hero image,
`https://freight.cargo.site/t/original/i/T2068100808246618789267660548854/f1e07510-ca35-42bb-99d8-eb1f00ab5e60.JPG`.

**Known limitation:** Cargo exposes only this one, site-wide preview
image and `meta_tags` string — there is no per-page `<head>` in Cargo,
so the per-page `og:image`, canonical, hreflang and geo meta tags that
`tools/build-site.py` generates for the standalone build (one relevant
photo per page, not a single shared image) cannot reach the live
Cargo-hosted site. See DESIGN_RATIONALE.md for the full list of what
Cargo's hosting model rules out here.

While in that panel, also add the geo tags to the site-wide `meta_tags`
field (Site Settings → Publish Settings, same "Site Preview Image"
area exposes a custom meta tags box in most Cargo3 themes):

```html
<meta name="geo.region" content="PL-22">
<meta name="geo.placename" content="Gdynia, Kępa Redłowska">
<meta name="geo.position" content="54.4833;18.5500">
<meta name="ICBM" content="54.4833, 18.5500">
```

## 7. Verify

```
curl -sI https://honeymiood.com/ | grep -i set-cookie   # must be empty
curl -s https://honeymiood.com/ | grep -oE 'https?://[a-z.]+' | sort -u
```
The second command should list only `*.cargo.site` hosts (plus
whatever a page you're viewing links out to on click, which is fine —
only *auto-loaded* resources matter for the cookie-banner question).

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
