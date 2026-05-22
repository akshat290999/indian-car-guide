import os, sys, re, time, json, urllib.parse
from playwright.sync_api import sync_playwright

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT_DIR    = os.path.join(SCRIPT_DIR, "frontend", "public", "images")
os.makedirs(OUT_DIR, exist_ok=True)

sys.path.insert(0, os.path.join(SCRIPT_DIR, "backend"))
from database.cars_data import CARS_DATA

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/124.0.0.0 Safari/537.36"
)

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text)
    return re.sub(r'-+', '-', text)

def get_first_image_url(page, query):
    url = f"https://www.bing.com/images/search?q={urllib.parse.quote_plus(query)}"
    page.goto(url, wait_until="domcontentloaded", timeout=30000)

    # The first a.iusc element holds a JSON blob in its `m` attribute.
    # The "murl" key inside that JSON is the direct link to the source image.
    m_attr = page.locator("a.iusc").first.get_attribute("m", timeout=10000)
    data   = json.loads(m_attr)
    return data["murl"]

def _wikimedia_fix(url):
    # Bing's murl for Wikimedia images often points to a /thumb/.../Npx-File.jpg path.
    # The thumb server returns 400 for non-standard sizes; the original file always works.
    m = re.match(
        r'(https://upload\.wikimedia\.org/wikipedia/[^/]+)/thumb/(\w+/\w+/.+?)/\d+px-.+$',
        url,
    )
    return f"{m.group(1)}/{m.group(2)}" if m else url


def download_image(ctx, url, dest):
    url  = _wikimedia_fix(url)
    resp = ctx.request.get(
        url,
        headers={
            # A real Accept header — some servers 403 on */*
            "Accept":          "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            # Bing referer satisfies hotlink-protection checks on most image hosts
            "Referer":         "https://www.bing.com/images/",
        },
        timeout=30000,
    )
    if not resp.ok:
        raise Exception(f"{resp.status} {resp.status_text}")
    with open(dest, "wb") as f:
        f.write(resp.body())

# ── Build the full list of unique (brand, model, color) triples ──────────────
triples = []
seen    = set()
for car in CARS_DATA:
    brand  = car["brand"]
    model  = car["model_name"]
    for color in car.get("colors", []):
        key = (brand, model, color)
        if key not in seen:
            seen.add(key)
            triples.append(key)

total = len(triples)
print(f"Unique (brand, model, color) triples to process: {total}\n")

ok_count   = 0
skip_count = 0
fail_count = 0

with sync_playwright() as pw:
    browser = pw.chromium.launch(headless=True)
    ctx     = browser.new_context(
        user_agent=UA,
        viewport={"width": 1280, "height": 800}
    )
    page = ctx.new_page()

    for i, (brand, model, color) in enumerate(triples, 1):
        fname = f"{slugify(brand)}-{slugify(model)}-{slugify(color)}.jpg"
        dest  = os.path.join(OUT_DIR, fname)

        if os.path.exists(dest):
            print(f"[{i:3}/{total}] SKIP   {fname}")
            skip_count += 1
            continue

        query = f"{brand} {model} {color} car india high resolution"
        print(f"[{i:3}/{total}] SEARCH {brand} {model} – {color}")

        try:
            img_url = get_first_image_url(page, query)

            if not img_url:
                print(f"          → no image URL found")
                fail_count += 1
                time.sleep(1)
                continue

            download_image(ctx, img_url, dest)
            kb = os.path.getsize(dest) // 1024
            print(f"          → saved {fname}  ({kb} KB)  <- {img_url[:60]}...")
            ok_count += 1

        except Exception as e:
            print(f"          → FAILED: {e}")
            if os.path.exists(dest):
                os.remove(dest)
            fail_count += 1

        time.sleep(2)

    browser.close()

print(f"\n── Summary {'─' * 50}")
print(f"  Saved   : {ok_count}")
print(f"  Skipped : {skip_count}")
print(f"  Failed  : {fail_count}")
print(f"  Total   : {total}")