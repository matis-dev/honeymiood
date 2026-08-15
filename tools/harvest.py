#!/usr/bin/env python3
"""Re-pull the live Cargo site's own content as a sanity-check source.

honeymiood.com (Cargo 3) embeds its full page state as JSON in
`window.__PRELOADED_STATE__` on every page — the same state the
editor itself renders from. This script fetches that state from a
list of known page URLs, merges the page/media records, and writes:

  data/cargo-site-dump.json   — page id -> full page record (content,
                                 media list, purl, etc.)
  data/media-hash-map.json    — freight.cargo.site image hash -> filename

Use this to check whether copy, prices (via shop-product ids/variants
in `content`), or media have changed on the live site since
assets/js/products-data.js was last hand-synced against it — this
script does NOT touch products-data.js itself, since that file's
prose has been edited by hand from the raw harvest (see its header
comment). Diff the two dumps and update products-data.js manually.

Run from anywhere:  python3 tools/harvest.py
"""
import json
import os
import re
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")

BASE = "https://honeymiood.com/"

# Known slugs across both language Sets, plus the pinned chrome pages.
# If a new product or page is added on the live site, add its slug
# here (or crawl Home/pages-polish/pages-english first to discover it).
SLUGS = [
    "", "pages-polish", "pages-english", "eng", "o-nas", "kontakt",
    "rzepakowy", "akacjowy", "wielokwiatowy", "lipowy",
    "rzepakowy-~-złote-mleko", "rzepakowy-z-pierzgą", "świeca-z-wosku-pszczelego",
    "rapeseed", "acacia", "wildflower", "linden",
    "rapeseed-~-golden-milk-2", "rapeseed-with-bee-bread-1", "beeswax-candle-1",
    "zestawy-i-prezenty-1",
]


def fetch_state(slug):
    url = BASE + urllib.parse.quote(slug)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        html = resp.read().decode("utf-8")
    marker = "window.__PRELOADED_STATE__="
    if marker not in html:
        return None
    start = html.index(marker) + len(marker)
    decoder = json.JSONDecoder()
    state, _ = decoder.raw_decode(html[start:])
    return state


def main():
    os.makedirs(DATA, exist_ok=True)
    pages = {}
    media = {}

    for slug in SLUGS:
        state = fetch_state(slug)
        if not state:
            print(f"  {slug or '(home)'}: no state found")
            continue
        page_map = state.get("pages", {}).get("byId", {})
        for _pid, page in page_map.items():
            purl = page.get("purl")
            if purl:
                pages[purl] = page
            for m in page.get("media") or []:
                if isinstance(m, dict) and "hash" in m and "name" in m:
                    media[m["hash"]] = m["name"]
        print(f"  {slug or '(home)'}: {len(page_map)} pages in state")

    with open(os.path.join(DATA, "cargo-site-dump.json"), "w", encoding="utf-8") as f:
        json.dump(pages, f, ensure_ascii=False, indent=1)
    with open(os.path.join(DATA, "media-hash-map.json"), "w", encoding="utf-8") as f:
        json.dump(media, f, ensure_ascii=False, indent=1)

    print(f"\nHarvested {len(pages)} unique pages, {len(media)} media files.")
    print("Wrote data/cargo-site-dump.json and data/media-hash-map.json")


if __name__ == "__main__":
    main()
