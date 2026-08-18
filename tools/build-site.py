#!/usr/bin/env python3
"""Assemble the static Honeymiood site from templates/.

Reads templates/header-{pl,en,de}.html, templates/footer-{pl,en,de}.html and
templates/content/<id>.html, and writes full standalone HTML pages to
the project root, en/, and de/. This is a build-time authoring convenience
only — the shipped output is plain static HTML5, no server or runtime
templating involved.

Run from anywhere:  python3 tools/build-site.py
"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATES = os.path.join(ROOT, "templates")
FAVICON = "https://freight.cargo.site/t/original/i/D2156016025001338173130630441718/pszczola_honeymiood.ico"
OG_IMAGE = "https://freight.cargo.site/w/1200/i/X2847188493824277131163436526326/DSC03151.JPG"

# Page definition groups: (group_id, pl_meta, en_meta, de_meta)
# Each language entry: (out, content_file, title, description, canonical)
PAGE_GROUPS = [
    (
        "home",
        dict(out="index.html", content="home-pl.html",
             title="Honeymiood — Miód znad Rezerwatu Kępa Redłowska, Gdynia",
             description="Surowy, niepasteryzowany miód z rodzinnej pasieki przy Rezerwacie Kępa Redłowska w Gdyni. Cztery pokolenia pszczelarskiej wiedzy.",
             canonical=""),
        dict(out="en/index.html", content="home-en.html",
             title="Honeymiood — Honey from the Kępa Redłowska Nature Reserve, Gdynia",
             description="Raw, unpasteurised honey from a family apiary by the Kępa Redłowska Nature Reserve in Gdynia. Four generations of beekeeping knowledge.",
             canonical="eng"),
        dict(out="de/index.html", content="home-de.html",
             title="Honeymiood — Naturbelassener Rohhonig aus Gdynia",
             description="Unpasteurisierter Rohhonig aus einer Familienimkerei am Naturschutzgebiet Kępa Redłowska in Gdynia. Vier Generationen imkerliches Wissen.",
             canonical="de"),
    ),
    (
        "about",
        dict(out="o-nas.html", content="about-pl.html",
             title="O Pasiece — Honeymiood",
             description="Cztery pokolenia jednej rodziny pszczelarzy — od praprababci Jadwigi po Jarka, w pasiece przy Rezerwacie Kępa Redłowska w Gdyni.",
             canonical="o-nas"),
        dict(out="en/about.html", content="about-en.html",
             title="About Us — Honeymiood",
             description="Four generations of one beekeeping family — from great-great-grandmother Jadwiga to Jarek, at an apiary by the Kępa Redłowska Nature Reserve.",
             canonical="about"),
        dict(out="de/ueber-uns.html", content="about-de.html",
             title="Über die Imkerei — Honeymiood",
             description="Vier Generationen einer Imkerfamilie — von Ururgroßmutter Jadwiga bis zu Jarek, in der Imkerei am Naturschutzgebiet Kępa Redłowska in Gdynia.",
             canonical="ueber-uns"),
    ),
    (
        "honeys",
        dict(out="miody.html", content="honeys-pl.html",
             title="Miody — Honeymiood",
             description="Siedem miodów z jednej pasieki przy Rezerwacie Kępa Redłowska: wielokwiatowy, lipowy, akacjowy, rzepakowy i więcej.",
             canonical="miody"),
        dict(out="en/honeys.html", content="honeys-en.html",
             title="Honeys — Honeymiood",
             description="Seven honeys from one apiary by the Kępa Redłowska Nature Reserve: wildflower, linden, acacia, rapeseed and more.",
             canonical="honeys"),
        dict(out="de/honige.html", content="honeys-de.html",
             title="Unsere Honige — Honeymiood",
             description="Sieben Honigsorten aus einer Imkerei am Schutzgebiet Kępa Redłowska: Blütenhonig, Lindenhonig, Akazienhonig, Rapshonig und mehr.",
             canonical="honige"),
    ),
    (
        "gift-sets",
        dict(out="zestawy.html", content="gift-sets-pl.html",
             title="Zestawy — Honeymiood",
             description="Cztery gotowe zestawy prezentowe z miodem Honeymiood — idealne na prezent lub do poznania całej naszej oferty.",
             canonical="zestawy-i-prezenty-1"),
        dict(out="en/gift-sets.html", content="gift-sets-en.html",
             title="Gift Sets — Honeymiood",
             description="Four ready-made Honeymiood gift sets — a great present, or a way to try our whole range at once.",
             canonical="gift-sets"),
        dict(out="de/geschenksets.html", content="gift-sets-de.html",
             title="Geschenksets — Honeymiood",
             description="Vier handgefertigte Geschenksets mit Honeymiood Honig — ideal als Geschenk oder zum Probieren unserer gesamten Ernte.",
             canonical="geschenksets"),
    ),
    (
        "stockists",
        dict(out="gdzie-kupic.html", content="stockists-pl.html",
             title="Gdzie Kupić — Honeymiood",
             description="Honeymiood znajdziesz w kawiarniach i piekarniach w Gdyni, Warszawie, Toruniu i Szamotułach.",
             canonical="gdzie-kupic"),
        dict(out="en/stockists.html", content="stockists-en.html",
             title="Stockists — Honeymiood",
             description="Find Honeymiood in cafés and bakeries in Gdynia, Warsaw, Toruń and Szamotuły.",
             canonical="stockists"),
        dict(out="de/verkaufsstellen.html", content="stockists-de.html",
             title="Verkaufsstellen — Honeymiood",
             description="Finden Sie Honeymiood in Cafés und Bäckereien in Gdynia, Warschau, Toruń und Szamotuły.",
             canonical="verkaufsstellen"),
    ),
    (
        "contact",
        dict(out="kontakt.html", content="contact-pl.html",
             title="Kontakt — Honeymiood",
             description="Napisz do nas w sprawie zamówienia, współpracy B2B lub pytania o nasz miód.",
             canonical="kontakt"),
        dict(out="en/contact.html", content="contact-en.html",
             title="Contact — Honeymiood",
             description="Get in touch about an order, a wholesale partnership, or any question about our honey.",
             canonical="contact"),
        dict(out="de/kontakt.html", content="contact-de.html",
             title="Kontakt — Honeymiood",
             description="Schreiben Sie uns für Bestellungen, B2B-Zusammenarbeit oder Fragen zu unserem naturbelassenen Honig.",
             canonical="kontakt-de"),
    ),
    (
        "privacy-policy",
        dict(out="polityka-prywatnosci.html", content="privacy-policy-pl.html",
             title="Polityka Prywatności i Cookies — Honeymiood",
             description="Jak przetwarzamy dane i dlaczego ta strona nie używa plików cookie do śledzenia ani reklam.",
             canonical="polityka-prywatnosci"),
        dict(out="en/privacy-policy.html", content="privacy-policy-en.html",
             title="Privacy & Cookies Policy — Honeymiood",
             description="How we process data, and why this site uses no tracking or advertising cookies.",
             canonical="privacy-policy"),
        dict(out="de/datenschutz.html", content="privacy-policy-de.html",
             title="Datenschutz & Cookies — Honeymiood",
             description="Wie wir Daten verarbeiten und warum diese Website keine Tracking- oder Werbe-Cookies verwendet.",
             canonical="datenschutz"),
    ),
    (
        "terms",
        dict(out="regulamin.html", content="terms-pl.html",
             title="Regulamin Sklepu — Honeymiood",
             description="Zasady składania zamówień, płatności, wysyłki i reklamacji w sklepie Honeymiood.",
             canonical="regulamin"),
        dict(out="en/terms.html", content="terms-en.html",
             title="Terms of Service — Honeymiood",
             description="Rules for placing orders, payment, shipping and complaints in the Honeymiood shop.",
             canonical="terms"),
        dict(out="de/agb.html", content="terms-de.html",
             title="Allgemeine Geschäftsbedingungen — Honeymiood",
             description="Bestimmungen für Bestellungen, Zahlung, Versand und Reklamationen im Onlineshop Honeymiood.",
             canonical="agb"),
    ),
    (
        "shipping-returns",
        dict(out="zwroty-i-wysylka.html", content="shipping-returns-pl.html",
             title="Wysyłka i Zwrot — Honeymiood",
             description="Czas i koszt wysyłki oraz zasady zwrotu zamówień z Honeymiood.",
             canonical="zwroty-i-wysylka"),
        dict(out="en/shipping-returns.html", content="shipping-returns-en.html",
             title="Shipping & Returns — Honeymiood",
             description="Delivery times, shipping costs and our return policy for Honeymiood orders.",
             canonical="shipping-returns"),
        dict(out="de/versand-und-rueckgabe.html", content="shipping-returns-de.html",
             title="Versand & Rückgabe — Honeymiood",
             description="Lieferzeiten, Versandkosten und Rückgaberichtlinien für Bestellungen bei Honeymiood.",
             canonical="versand-und-rueckgabe"),
    ),
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


def rel_link(from_out, to_out):
    from_dir = os.path.dirname(from_out) or "."
    return os.path.relpath(to_out, from_dir)


def rel_prefix(out_path):
    """'' for root-level pages, '../' for pages one directory deep."""
    depth = out_path.count("/")
    return "../" * depth


def build_page(page, counterparts):
    lang = page["lang"]
    header_tpl = read(os.path.join(TEMPLATES, f"header-{lang}.html"))
    footer_tpl = read(os.path.join(TEMPLATES, f"footer-{lang}.html"))
    content = read(os.path.join(TEMPLATES, "content", page["content"]))

    prefix = rel_prefix(page["out"])
    header = header_tpl
    header = header.replace("___LANG_PL_HREF___", rel_link(page["out"], counterparts["pl"]))
    header = header.replace("___LANG_EN_HREF___", rel_link(page["out"], counterparts["en"]))
    header = header.replace("___LANG_DE_HREF___", rel_link(page["out"], counterparts["de"]))

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
    for group_id, pl_entry, en_entry, de_entry in PAGE_GROUPS:
        counterparts = {
            "pl": pl_entry["out"],
            "en": en_entry["out"],
            "de": de_entry["out"],
        }
        for lang_code, entry in (("pl", pl_entry), ("en", en_entry), ("de", de_entry)):
            p = dict(entry)
            p["id"] = f"{group_id}-{lang_code}"
            p["lang"] = lang_code
            written.append(build_page(p, counterparts))

    print(f"Built {len(written)} pages:")
    for w in written:
        print(" ", os.path.relpath(w, ROOT))


if __name__ == "__main__":
    main()
