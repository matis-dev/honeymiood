#!/usr/bin/env python3
"""Assemble the static Honeymiood site from templates/.

Reads templates/header-{pl,en}.html, templates/footer-{pl,en}.html and
templates/content/<id>.html, and writes full standalone HTML pages to
the project root and en/. This is a build-time authoring convenience
only — the shipped output is plain static HTML5, no server or runtime
templating involved.

Run from anywhere:  python3 tools/build-site.py
"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATES = os.path.join(ROOT, "templates")
FAVICON = "https://freight.cargo.site/t/original/i/D2156016025001338173130630441718/pszczola_honeymiood.ico"
OG_IMAGE = "https://freight.cargo.site/w/1200/i/X2847188493824277131163436526326/DSC03151.JPG"

# id, out (relative to ROOT), lang, content file, title, description, counterpart out path
PAGES = [
    dict(id="home-pl", out="index.html", lang="pl", content="home-pl.html",
         title="Honeymiood — Miód znad Rezerwatu Kępa Redłowska, Gdynia",
         description="Surowy, niepasteryzowany miód z rodzinnej pasieki przy Rezerwacie Kępa Redłowska w Gdyni. Cztery pokolenia pszczelarskiej wiedzy.",
         counterpart="en/index.html", canonical=""),
    dict(id="home-en", out="en/index.html", lang="en", content="home-en.html",
         title="Honeymiood — Honey from the Kępa Redłowska Nature Reserve, Gdynia",
         description="Raw, unpasteurised honey from a family apiary by the Kępa Redłowska Nature Reserve in Gdynia. Four generations of beekeeping knowledge.",
         counterpart="index.html", canonical="eng"),

    dict(id="about-pl", out="o-nas.html", lang="pl", content="about-pl.html",
         title="O Pasiece — Honeymiood",
         description="Cztery pokolenia jednej rodziny pszczelarzy — od praprababci Jadwigi po Jarka, w pasiece przy Rezerwacie Kępa Redłowska w Gdyni.",
         counterpart="en/about.html", canonical="o-nas"),
    dict(id="about-en", out="en/about.html", lang="en", content="about-en.html",
         title="About Us — Honeymiood",
         description="Four generations of one beekeeping family — from great-great-grandmother Jadwiga to Jarek, at an apiary by the Kępa Redłowska Nature Reserve.",
         counterpart="o-nas.html", canonical="about"),

    dict(id="honeys-pl", out="miody.html", lang="pl", content="honeys-pl.html",
         title="Miody — Honeymiood",
         description="Siedem miodów z jednej pasieki przy Rezerwacie Kępa Redłowska: wielokwiatowy, lipowy, akacjowy, rzepakowy i więcej.",
         counterpart="en/honeys.html", canonical="miody"),
    dict(id="honeys-en", out="en/honeys.html", lang="en", content="honeys-en.html",
         title="Honeys — Honeymiood",
         description="Seven honeys from one apiary by the Kępa Redłowska Nature Reserve: wildflower, linden, acacia, rapeseed and more.",
         counterpart="miody.html", canonical="honeys"),

    dict(id="gift-sets-pl", out="zestawy.html", lang="pl", content="gift-sets-pl.html",
         title="Zestawy — Honeymiood",
         description="Cztery gotowe zestawy prezentowe z miodem Honeymiood — idealne na prezent lub do poznania całej naszej oferty.",
         counterpart="en/gift-sets.html", canonical="zestawy-i-prezenty-1"),
    dict(id="gift-sets-en", out="en/gift-sets.html", lang="en", content="gift-sets-en.html",
         title="Gift Sets — Honeymiood",
         description="Four ready-made Honeymiood gift sets — a great present, or a way to try our whole range at once.",
         counterpart="zestawy.html", canonical="gift-sets"),

    dict(id="stockists-pl", out="gdzie-kupic.html", lang="pl", content="stockists-pl.html",
         title="Gdzie Kupić — Honeymiood",
         description="Honeymiood znajdziesz w kawiarniach i piekarniach w Gdyni, Warszawie, Toruniu i Szamotułach.",
         counterpart="en/stockists.html", canonical="gdzie-kupic"),
    dict(id="stockists-en", out="en/stockists.html", lang="en", content="stockists-en.html",
         title="Stockists — Honeymiood",
         description="Find Honeymiood in cafés and bakeries in Gdynia, Warsaw, Toruń and Szamotuły.",
         counterpart="gdzie-kupic.html", canonical="stockists"),

    dict(id="contact-pl", out="kontakt.html", lang="pl", content="contact-pl.html",
         title="Kontakt — Honeymiood",
         description="Napisz do nas w sprawie zamówienia, współpracy B2B lub pytania o nasz miód.",
         counterpart="en/contact.html", canonical="kontakt"),
    dict(id="contact-en", out="en/contact.html", lang="en", content="contact-en.html",
         title="Contact — Honeymiood",
         description="Get in touch about an order, a wholesale partnership, or any question about our honey.",
         counterpart="kontakt.html", canonical="contact"),

    dict(id="privacy-policy-pl", out="polityka-prywatnosci.html", lang="pl", content="privacy-policy-pl.html",
         title="Polityka Prywatności i Cookies — Honeymiood",
         description="Jak przetwarzamy dane i dlaczego ta strona nie używa plików cookie do śledzenia ani reklam.",
         counterpart="en/privacy-policy.html", canonical="polityka-prywatnosci"),
    dict(id="privacy-policy-en", out="en/privacy-policy.html", lang="en", content="privacy-policy-en.html",
         title="Privacy & Cookies Policy — Honeymiood",
         description="How we process data, and why this site uses no tracking or advertising cookies.",
         counterpart="polityka-prywatnosci.html", canonical="privacy-policy"),

    dict(id="terms-pl", out="regulamin.html", lang="pl", content="terms-pl.html",
         title="Regulamin Sklepu — Honeymiood",
         description="Zasady składania zamówień, płatności, wysyłki i reklamacji w sklepie Honeymiood.",
         counterpart="en/terms.html", canonical="regulamin"),
    dict(id="terms-en", out="en/terms.html", lang="en", content="terms-en.html",
         title="Terms of Service — Honeymiood",
         description="Rules for placing orders, payment, shipping and complaints in the Honeymiood shop.",
         counterpart="regulamin.html", canonical="terms"),

    dict(id="shipping-returns-pl", out="zwroty-i-wysylka.html", lang="pl", content="shipping-returns-pl.html",
         title="Wysyłka i Zwrot — Honeymiood",
         description="Czas i koszt wysyłki oraz zasady zwrotu zamówień z Honeymiood.",
         counterpart="en/shipping-returns.html", canonical="zwroty-i-wysylka"),
    dict(id="shipping-returns-en", out="en/shipping-returns.html", lang="en", content="shipping-returns-en.html",
         title="Shipping & Returns — Honeymiood",
         description="Delivery times, shipping costs and our return policy for Honeymiood orders.",
         counterpart="zwroty-i-wysylka.html", canonical="shipping-returns"),
]

SCRIPTS = [
    "assets/js/products-data.js",
    "assets/js/app.js",
    "assets/js/commerce.js",
    "assets/js/catalog.js",
    "assets/js/modal.js",
]

STYLES = [
    "assets/css/tokens.css",
    "assets/css/layout.css",
    "assets/css/components.css",
    "assets/css/pages.css",
]


def read(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def rel_prefix(out_path):
    """'' for root-level pages, '../' for pages one directory deep."""
    depth = out_path.count("/")
    return "../" * depth


def build_page(page):
    lang = page["lang"]
    header_tpl = read(os.path.join(TEMPLATES, f"header-{lang}.html"))
    footer_tpl = read(os.path.join(TEMPLATES, f"footer-{lang}.html"))
    content = read(os.path.join(TEMPLATES, "content", page["content"]))

    prefix = rel_prefix(page["out"])
    lang_switch_href = prefix + page["counterpart"]
    header = header_tpl.replace("___LANG_SWITCH_HREF___", lang_switch_href)

    asset_prefix = prefix
    style_links = "\n  ".join(
        f'<link rel="stylesheet" href="{asset_prefix}{s}">' for s in STYLES
    )
    script_tags = "\n".join(
        f'  <script src="{asset_prefix}{s}"></script>' for s in SCRIPTS
    )

    canonical = page["canonical"]
    canonical_url = f"https://honeymiood.com/{canonical}" if canonical else "https://honeymiood.com/"

    html = f"""<!doctype html>
<html lang="{lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>{page['title']}</title>
  <meta name="description" content="{page['description']}">
  <link rel="canonical" href="{canonical_url}">
  <meta property="og:title" content="{page['title']}">
  <meta property="og:description" content="{page['description']}">
  <meta property="og:image" content="{OG_IMAGE}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{canonical_url}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{page['title']}">
  <meta name="twitter:description" content="{page['description']}">
  <meta name="twitter:image" content="{OG_IMAGE}">
  <link rel="icon" href="{FAVICON}" sizes="any">
  {style_links}
</head>
<body>
<div class="hm-root" data-hm-lang="{lang}">
{header}
<main id="hm-main">
{content}
</main>
{footer_tpl}
</div>
{script_tags}
</body>
</html>
"""
    out_path = os.path.join(ROOT, page["out"])
    os.makedirs(os.path.dirname(out_path) or ROOT, exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    return out_path


def main():
    written = []
    for page in PAGES:
        written.append(build_page(page))
    print(f"Built {len(written)} pages:")
    for w in written:
        print(" ", os.path.relpath(w, ROOT))


if __name__ == "__main__":
    main()
