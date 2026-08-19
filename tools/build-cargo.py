#!/usr/bin/env python3
"""Generate paste-ready artifacts for Cargo's three code-injection points.

Cargo.site exposes exactly three places to inject custom code
(Site Settings -> CSS/HTML, and each page's own Code View):
  1. One global CSS panel                 -> cargo/global.css
  2. One global HTML panel (every page)   -> cargo/global.html
  3. Per-page Code View (HTML only)       -> cargo/pages/<cargo-slug>.html

Cargo URLs are flat (site.cargo.site/page-title) — Sets organise pages
but never nest their paths — so every internal <a href="..."> in our
templates/content/*.html source is rewritten here through SLUG_MAP to
the real Cargo slugs. Header and footer are emitted separately
(cargo/pages/_header-pl.html etc.) for pasting into their own pinned
pages, since on Cargo those live apart from each page's own content.

Run from anywhere:  python3 tools/build-cargo.py
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATES = os.path.join(ROOT, "templates")
OUT = os.path.join(ROOT, "cargo")

# Local basename (as used in templates/content hrefs) -> Cargo flat slug.
SLUG_MAP = {
    "index.html": "home",
    "o-nas.html": "o-nas",
    "miody.html": "miody",
    "zestawy.html": "zestawy-i-prezenty-1",
    "gdzie-kupic.html": "gdzie-kupic",
    "kontakt.html": "kontakt",
    "polityka-prywatnosci.html": "polityka-prywatnosci",
    "regulamin.html": "regulamin",
    "zwroty-i-wysylka.html": "zwroty-i-wysylka",
}
SLUG_MAP_EN = {
    "index.html": "eng",
    "about.html": "about",
    "honeys.html": "honeys",
    "gift-sets.html": "gift-sets",
    "stockists.html": "stockists",
    "contact.html": "contact",
    "privacy-policy.html": "privacy-policy",
    "terms.html": "terms",
    "shipping-returns.html": "shipping-returns",
}
SLUG_MAP_DE = {
    "index.html": "de",
    "ueber-uns.html": "ueber-uns",
    "honige.html": "honige",
    "geschenksets.html": "geschenksets",
    "verkaufsstellen.html": "verkaufsstellen",
    "kontakt.html": "kontakt-de",
    "datenschutz.html": "datenschutz",
    "agb.html": "agb",
    "versand-und-rueckgabe.html": "versand-und-rueckgabe",
}

# id, cargo slug, lang, content template
PAGES = [
    # Polish pages
    ("home-pl", "home", "pl", "home-pl.html"),
    ("about-pl", "o-nas", "pl", "about-pl.html"),
    ("honeys-pl", "miody", "pl", "honeys-pl.html"),
    ("gift-sets-pl", "zestawy-i-prezenty-1", "pl", "gift-sets-pl.html"),
    ("stockists-pl", "gdzie-kupic", "pl", "stockists-pl.html"),
    ("contact-pl", "kontakt", "pl", "contact-pl.html"),
    ("privacy-policy-pl", "polityka-prywatnosci", "pl", "privacy-policy-pl.html"),
    ("terms-pl", "regulamin", "pl", "terms-pl.html"),
    ("shipping-returns-pl", "zwroty-i-wysylka", "pl", "shipping-returns-pl.html"),

    # English pages
    ("home-en", "eng", "en", "home-en.html"),
    ("about-en", "about", "en", "about-en.html"),
    ("honeys-en", "honeys", "en", "honeys-en.html"),
    ("gift-sets-en", "gift-sets", "en", "gift-sets-en.html"),
    ("stockists-en", "stockists", "en", "stockists-en.html"),
    ("contact-en", "contact", "en", "contact-en.html"),
    ("privacy-policy-en", "privacy-policy", "en", "privacy-policy-en.html"),
    ("terms-en", "terms", "en", "terms-en.html"),
    ("shipping-returns-en", "shipping-returns", "en", "shipping-returns-en.html"),

    # German pages
    ("home-de", "de", "de", "home-de.html"),
    ("about-de", "ueber-uns", "de", "about-de.html"),
    ("honeys-de", "honige", "de", "honeys-de.html"),
    ("gift-sets-de", "geschenksets", "de", "gift-sets-de.html"),
    ("stockists-de", "verkaufsstellen", "de", "stockists-de.html"),
    ("contact-de", "kontakt-de", "de", "contact-de.html"),
    ("privacy-policy-de", "datenschutz", "de", "privacy-policy-de.html"),
    ("terms-de", "agb", "de", "terms-de.html"),
    ("shipping-returns-de", "versand-und-rueckgabe", "de", "shipping-returns-de.html"),
]

HOME_SLUG = {"pl": "home", "en": "eng", "de": "de"}


def read(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def rewrite_href(href, lang):
    """Rewrite one local href to its Cargo flat-slug equivalent.
    Leaves external/mailto/anchor links untouched."""
    if href.startswith(("http://", "https://", "mailto:", "#")):
        return href
    if href.startswith("en/"):
        target = href[len("en/"):]
        slug = SLUG_MAP_EN.get(target)
        return "/" + slug if slug else href
    if href.startswith("de/"):
        target = href[len("de/"):]
        slug = SLUG_MAP_DE.get(target)
        return "/" + slug if slug else href
    if href.startswith("../"):
        target = href[len("../"):]
        slug = SLUG_MAP.get(target)
        return "/" + slug if slug else href
    # same-directory link: resolve against the current page's own language
    if lang == "en":
        slug_map = SLUG_MAP_EN
    elif lang == "de":
        slug_map = SLUG_MAP_DE
    else:
        slug_map = SLUG_MAP
    slug = slug_map.get(href)
    return "/" + slug if slug else href


IMAGE_MAP = {
    "assets/images/bg.jpeg": "https://freight.cargo.site/t/original/i/T2068100808246618789267660548854/f1e07510-ca35-42bb-99d8-eb1f00ab5e60.JPG",
    "../assets/images/bg.jpeg": "https://freight.cargo.site/t/original/i/T2068100808246618789267660548854/f1e07510-ca35-42bb-99d8-eb1f00ab5e60.JPG",
    "assets/images/hero-bg-scraped.jpg": "https://freight.cargo.site/t/original/i/T2068100808246618789267660548854/f1e07510-ca35-42bb-99d8-eb1f00ab5e60.JPG",
    "../assets/images/hero-bg-scraped.jpg": "https://freight.cargo.site/t/original/i/T2068100808246618789267660548854/f1e07510-ca35-42bb-99d8-eb1f00ab5e60.JPG",
    "assets/images/giftset-mioodki.jpg": "https://freight.cargo.site/w/1200/i/O2665675402324908920199793132646/DSC04179.JPG",
    "../assets/images/giftset-mioodki.jpg": "https://freight.cargo.site/w/1200/i/O2665675402324908920199793132646/DSC04179.JPG",
    "assets/images/giftset-swieczka.jpg": "https://freight.cargo.site/w/1200/i/P2665674917637840135805561017446/DSC04183.JPG",
    "../assets/images/giftset-swieczka.jpg": "https://freight.cargo.site/w/1200/i/P2665674917637840135805561017446/DSC04183.JPG",
    "assets/images/giftset-trojmioodek.jpg": "https://freight.cargo.site/w/1200/i/W2665674697793467406180598818406/DSC04184.JPG",
    "../assets/images/giftset-trojmioodek.jpg": "https://freight.cargo.site/w/1200/i/W2665674697793467406180598818406/DSC04184.JPG",
    "assets/images/giftset-swiateczny.jpg": "https://freight.cargo.site/w/1200/i/F2665675685816999266185802271846/DSC04169.JPG",
    "../assets/images/giftset-swiateczny.jpg": "https://freight.cargo.site/w/1200/i/F2665675685816999266185802271846/DSC04169.JPG",
    "assets/images/apiary-kepa-redlowska.jpg": "https://freight.cargo.site/t/original/i/T2665650558211413843780725582582/07520010.JPG",
    "../assets/images/apiary-kepa-redlowska.jpg": "https://freight.cargo.site/t/original/i/T2665650558211413843780725582582/07520010.JPG",
    "assets/images/jarek-hives.jpg": "https://freight.cargo.site/w/1200/i/U2665660857904724278458999815270/DSC03178.JPG",
    "../assets/images/jarek-hives.jpg": "https://freight.cargo.site/w/1200/i/U2665660857904724278458999815270/DSC03178.JPG",
    "assets/images/about-honeycomb.jpg": "https://freight.cargo.site/w/1200/i/C2665665809796068285511062635622/DSC03174.JPG",
    "../assets/images/about-honeycomb.jpg": "https://freight.cargo.site/w/1200/i/C2665665809796068285511062635622/DSC03174.JPG",
    "assets/images/about-hives-smoker.jpg": "https://freight.cargo.site/w/1200/i/L2665662191544719230559640994918/DSC03175.JPG",
    "../assets/images/about-hives-smoker.jpg": "https://freight.cargo.site/w/1200/i/L2665662191544719230559640994918/DSC03175.JPG",
    "assets/images/kepa-meadows.jpg": "https://freight.cargo.site/w/1200/i/L2665617795318199409720291437302/DSC03179.JPG",
    "../assets/images/kepa-meadows.jpg": "https://freight.cargo.site/w/1200/i/L2665617795318199409720291437302/DSC03179.JPG",
    "assets/images/contact-apiary-corner.jpg": "https://freight.cargo.site/w/1200/i/F2665638948144288500242000849654/DSC01511.JPG",
    "../assets/images/contact-apiary-corner.jpg": "https://freight.cargo.site/w/1200/i/F2665638948144288500242000849654/DSC01511.JPG",
    "assets/images/stockists-cafe-shelf.jpg": "https://freight.cargo.site/w/1200/i/I2665639148722230232497678668902/DSC01514.JPG",
    "../assets/images/stockists-cafe-shelf.jpg": "https://freight.cargo.site/w/1200/i/I2665639148722230232497678668902/DSC01514.JPG",
    "assets/images/honey-jar-kepa-cliff.jpg": "https://freight.cargo.site/w/1200/i/X2847188493824277131163436526326/DSC03151.JPG",
    "../assets/images/honey-jar-kepa-cliff.jpg": "https://freight.cargo.site/w/1200/i/X2847188493824277131163436526326/DSC03151.JPG",
    "assets/images/kepa-bees-macro.jpg": "https://freight.cargo.site/w/1200/i/L2665618281113204590861333244662/DSC03172.JPG",
    "../assets/images/kepa-bees-macro.jpg": "https://freight.cargo.site/w/1200/i/L2665618281113204590861333244662/DSC03172.JPG",
    "assets/images/logo_w.png": "https://freight.cargo.site/w/1200/i/X2156015466378587388984278854390/logo_honeymiood.png",
    "../assets/images/logo_w.png": "https://freight.cargo.site/w/1200/i/X2156015466378587388984278854390/logo_honeymiood.png",
    "assets/images/logo_b.png": "https://freight.cargo.site/w/1200/i/D2056736702074654142009068169974/honeymood_logo.png",
    "../assets/images/logo_b.png": "https://freight.cargo.site/w/1200/i/D2056736702074654142009068169974/honeymood_logo.png",
    "assets/images/about-gallery-meadow-hives.jpg": "https://freight.cargo.site/t/original/i/U2093942810256049917248090090230/IMG_5976.JPG",
    "../assets/images/about-gallery-meadow-hives.jpg": "https://freight.cargo.site/t/original/i/U2093942810256049917248090090230/IMG_5976.JPG",
    "assets/images/about-gallery-path-beekeeper.jpg": "https://freight.cargo.site/t/original/i/I2073308781928368161086218906358/IMG_3791.jpg",
    "../assets/images/about-gallery-path-beekeeper.jpg": "https://freight.cargo.site/t/original/i/I2073308781928368161086218906358/IMG_3791.jpg",
    "assets/images/about-gallery-sunny-hives.jpg": "https://freight.cargo.site/t/original/i/T2066401620671872778799190059766/IMG_3648.jpg",
    "../assets/images/about-gallery-sunny-hives.jpg": "https://freight.cargo.site/t/original/i/T2066401620671872778799190059766/IMG_3648.jpg",
}


def rewrite_links(html, lang):
    def repl_href(m):
        return f'href="{rewrite_href(m.group(1), lang)}"'
    def repl_src(m):
        src = m.group(1)
        return f'src="{IMAGE_MAP.get(src, src)}"'
    html = re.sub(r'href="([^"]+)"', repl_href, html)
    html = re.sub(r'src="([^"]+)"', repl_src, html)
    return html


def wrap(fragment, lang):
    return f'<div class="hm-root" data-hm-lang="{lang}">\n{fragment}\n</div>'


def build_pages():
    for page_id, slug, lang, content_file in PAGES:
        content = read(os.path.join(TEMPLATES, "content", content_file))
        content = rewrite_links(content, lang)
        write(os.path.join(OUT, "pages", f"{slug}.html"), wrap(content, lang))


def build_header_footer():
    for lang in ("pl", "en", "de"):
        header = read(os.path.join(TEMPLATES, f"header-{lang}.html"))
        header = header.replace("___LANG_PL_HREF___", "/" + HOME_SLUG["pl"])
        header = header.replace("___LANG_EN_HREF___", "/" + HOME_SLUG["en"])
        header = header.replace("___LANG_DE_HREF___", "/" + HOME_SLUG["de"])
        # NOTE: Cargo pins are global to a Set, not per-page, so the
        # language switch here points at each language's homepage
        # rather than the exact page counterpart — the local
        # standalone site (index.html etc.) does the precise per-page
        # version; this is a disclosed limitation of Cargo's pin model.
        header = rewrite_links(header, lang)
        write(os.path.join(OUT, "pages", f"_header-{lang}.html"), wrap(header, lang))

        footer = read(os.path.join(TEMPLATES, f"footer-{lang}.html"))
        footer = rewrite_links(footer, lang)
        write(os.path.join(OUT, "pages", f"_footer-{lang}.html"), wrap(footer, lang))


def build_global_css():
    parts = []
    for name in ("tokens.css", "layout.css", "components.css", "pages.css"):
        parts.append(f"/* ===== {name} ===== */")
        parts.append(read(os.path.join(ROOT, "assets", "css", name)))
    write(os.path.join(OUT, "global.css"), "\n\n".join(parts))


def build_global_html():
    scripts = []
    for name in ("products-data.js", "app.js", "commerce.js", "catalog.js", "modal.js"):
        code = read(os.path.join(ROOT, "assets", "js", name))
        scripts.append(f"<script>\n/* ===== {name} ===== */\n{code}\n</script>")
    write(os.path.join(OUT, "global.html"), "\n\n".join(scripts))


def main():
    build_pages()
    build_header_footer()
    build_global_css()
    build_global_html()
    print(f"Wrote Cargo artifacts to {os.path.relpath(OUT, ROOT)}/")
    print("  global.css, global.html")
    print(f"  pages/ ({len(PAGES) + 6} files: {len(PAGES)} pages + 3 headers + 3 footers)")


if __name__ == "__main__":
    main()
