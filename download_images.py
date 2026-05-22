"""
download_images.py
For each unique (brand, model), downloads the first existing image_url
already stored in cars_data.py (the imgd.aeplcdn.com CDN links).
Saves to frontend/public/images/brand-model.jpg.
Writes image_results.json for patch_cars_data.py.
"""

import os, re, sys, time, json, requests

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT_DIR    = os.path.join(SCRIPT_DIR, "frontend", "public", "images")
os.makedirs(OUT_DIR, exist_ok=True)

sys.path.insert(0, os.path.join(SCRIPT_DIR, "backend"))
from database.cars_data import CARS_DATA

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text)
    return re.sub(r'-+', '-', text)

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/124.0.0.0 Safari/537.36"
)

def download(url, dest):
    r = requests.get(url, headers={"User-Agent": UA}, timeout=20, stream=True)
    r.raise_for_status()
    with open(dest, "wb") as f:
        for chunk in r.iter_content(8192):
            f.write(chunk)

# ── collect one source URL per (brand, model) ─────────────────────────────────
model_info = {}   # (brand, model) → {source_url, colors}
for car in CARS_DATA:
    key = (car["brand"], car["model_name"])
    urls = car.get("image_urls", [])
    src  = (urls[0] if isinstance(urls, list) and urls
            else next(iter(urls.values()), None) if isinstance(urls, dict)
            else None)
    if key not in model_info:
        model_info[key] = {"source_url": src, "colors": set()}
    model_info[key]["colors"].update(car.get("colors", []))
    if src and not model_info[key]["source_url"]:
        model_info[key]["source_url"] = src

models = sorted(model_info.keys())
print(f"Downloading {len(models)} model images from existing CDN URLs\n")

results = {}

for i, (brand, model) in enumerate(models, 1):
    info   = model_info[(brand, model)]
    src    = info["source_url"]
    fname  = f"{slugify(brand)}-{slugify(model)}.jpg"
    dest   = os.path.join(OUT_DIR, fname)
    web    = f"/images/{fname}"

    if os.path.exists(dest):
        print(f"[{i:2}/{len(models)}] SKIP  {fname}  ({os.path.getsize(dest)//1024} KB)")
        results[(brand, model)] = web
        continue

    if not src:
        print(f"[{i:2}/{len(models)}] NO SRC  {brand} {model}")
        results[(brand, model)] = None
        continue

    print(f"[{i:2}/{len(models)}] GET   {brand} {model}")
    print(f"          src: {src}")
    try:
        download(src, dest)
        size = os.path.getsize(dest)
        print(f"          → saved {fname}  ({size//1024} KB)")
        results[(brand, model)] = web
    except Exception as e:
        print(f"          → FAILED: {e}")
        results[(brand, model)] = None

    time.sleep(0.5)

# ── summary ────────────────────────────────────────────────────────────────────
ok_n   = sum(1 for v in results.values() if v)
fail_n = sum(1 for v in results.values() if not v)
print(f"\n✓  Downloaded: {ok_n}   ✗  Failed: {fail_n}  (of {len(models)} models)")

log = {
    f"{b}||{m}": {
        "path":   results[(b, m)],
        "colors": sorted(model_info[(b, m)]["colors"]),
    }
    for (b, m) in models
}
log_path = os.path.join(SCRIPT_DIR, "image_results.json")
with open(log_path, "w") as f:
    json.dump(log, f, indent=2)
print(f"Log → {log_path}")
