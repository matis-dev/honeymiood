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

## 3. Header and footer (four pastes, once each)

The design uses one responsive header/footer, but Cargo pins are
scoped per **Set**, and this site already has two Sets — *Pages
Polish* and *Pages English* — so each language gets its own pinned
pair rather than fighting over one global pin:

1. New page inside **Pages Polish** → paste `cargo/pages/_header-pl.html`
   into Code View → **Pin** it (pin scope: this Set).
2. New page inside **Pages Polish** → paste `cargo/pages/_footer-pl.html`
   → Pin (this Set).
3. Repeat with `_header-en.html` / `_footer-en.html` inside **Pages
   English**.

> **Known limitation:** the language switch (`PL | EN`) in a pinned
> header can't vary per page — Cargo pins are one fixed piece of
> content per Set. It's wired to jump to the other language's
> **homepage** (`/home` ↔ `/eng`), not the exact page counterpart.
> The local standalone site (`index.html` etc.) does the precise
> per-page version, since each page there is authored individually.

## 4. The 12 new pages

For each row below: create the page inside the matching Set, open
**Code View**, paste the file, Update.

| Cargo slug | Set | Source file |
|---|---|---|
| `home` | Pages Polish | `cargo/pages/home.html` |
| `o-nas` | Pages Polish | `cargo/pages/o-nas.html` |
| `miody` | Pages Polish | `cargo/pages/miody.html` |
| `zestawy-i-prezenty-1` | Pages Polish | `cargo/pages/zestawy-i-prezenty-1.html` *(already exists — replace its content)* |
| `gdzie-kupic` | Pages Polish | `cargo/pages/gdzie-kupic.html` *(new — was buried inside `kontakt`)* |
| `kontakt` | Pages Polish | `cargo/pages/kontakt.html` |
| `polityka-prywatnosci` | Pages Polish | `cargo/pages/polityka-prywatnosci.html` *(review before publishing — see below)* |
| `regulamin` | Pages Polish | `cargo/pages/regulamin.html` *(review before publishing)* |
| `zwroty-i-wysylka` | Pages Polish | `cargo/pages/zwroty-i-wysylka.html` *(review before publishing)* |
| `eng` | Pages English | `cargo/pages/eng.html` |
| `about` | Pages English | `cargo/pages/about.html` |
| `honeys` | Pages English | `cargo/pages/honeys.html` |
| `gift-sets` | Pages English | `cargo/pages/gift-sets.html` |
| `stockists` | Pages English | `cargo/pages/stockists.html` *(new)* |
| `contact` | Pages English | `cargo/pages/contact.html` |
| `privacy-policy` | Pages English | `cargo/pages/privacy-policy.html` *(review before publishing)* |
| `terms` | Pages English | `cargo/pages/terms.html` *(review before publishing)* |
| `shipping-returns` | Pages English | `cargo/pages/shipping-returns.html` *(review before publishing)* |

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

## 6. Fix `og:image`

Site Settings → Publish Settings → Site Preview Image currently
points at `https://example.com/path-to-your-image.jpg`. Replace it
with a real product or apiary photo (e.g. the hero image used on the
new homepage).

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
