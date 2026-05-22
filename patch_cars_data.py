"""
patch_cars_data.py
Rewrites CARS_DATA so every car's image_urls is a dict:
  {"Color Name": "<path_or_url>", ...}

Priority per (brand, model, color):
  1. /images/brand-model-color.jpg  — color-specific local file
  2. /images/brand-model.jpg        — model-level local file
  3. existing image_urls[0] URL     — keep original CDN/external URL
"""

import os, sys, re, json

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE  = os.path.join(SCRIPT_DIR, "backend", "database", "cars_data.py")
IMG_DIR    = os.path.join(SCRIPT_DIR, "frontend", "public", "images")

sys.path.insert(0, os.path.join(SCRIPT_DIR, "backend"))
from database.cars_data import CARS_DATA

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text)
    return re.sub(r'-+', '-', text)

def resolve_image(brand, model, color, fallback_url):
    """Return the best available image path/URL for this combo."""
    color_file = f"{slugify(brand)}-{slugify(model)}-{slugify(color)}.jpg"
    model_file = f"{slugify(brand)}-{slugify(model)}.jpg"

    if os.path.exists(os.path.join(IMG_DIR, color_file)):
        return f"/images/{color_file}"
    if os.path.exists(os.path.join(IMG_DIR, model_file)):
        return f"/images/{model_file}"
    return fallback_url   # original CDN URL

# ── build patched records ─────────────────────────────────────────────────────
updated = []
local_count = 0
fallback_count = 0

for car in CARS_DATA:
    c = dict(car)
    brand  = c["brand"]
    model  = c["model_name"]
    colors = c.get("colors", [])

    existing = c.get("image_urls", [])
    if isinstance(existing, list):
        fallback = existing[0] if existing else None
    elif isinstance(existing, dict):
        fallback = next(iter(existing.values()), None)
    else:
        fallback = None

    image_dict = {}
    for color in colors:
        path = resolve_image(brand, model, color, fallback)
        image_dict[color] = path
        if path and path.startswith("/images/"):
            local_count += 1
        else:
            fallback_count += 1

    c["image_urls"] = image_dict
    updated.append(c)

print(f"Records processed : {len(updated)}")
print(f"  → local images  : {local_count}")
print(f"  → external URLs : {fallback_count}")

# ── serialise to Python source ────────────────────────────────────────────────
def fmt_dict(d):
    pairs = ", ".join(f"{repr(k)}: {repr(v)}" for k, v in d.items())
    return "{" + pairs + "}"

def fmt_list(lst):
    return "[" + ", ".join(repr(x) for x in lst) + "]"

def fmt_val(v):
    if isinstance(v, dict): return fmt_dict(v)
    if isinstance(v, list): return fmt_list(v)
    return repr(v)

lines = ["CARS_DATA = ["]
for car in updated:
    lines.append("    {")
    for k, v in car.items():
        lines.append(f"        {repr(k)}: {fmt_val(v)},")
    lines.append("    },")
lines.append("]")
new_src = "\n".join(lines) + "\n"

# ── backup + write ─────────────────────────────────────────────────────────────
backup = DATA_FILE + ".bak"
with open(DATA_FILE) as f:
    orig = f.read()
with open(backup, "w") as f:
    f.write(orig)
print(f"\nBackup : {backup}")

with open(DATA_FILE, "w") as f:
    f.write(new_src)
print(f"Patched: {DATA_FILE}")

# ── quick verify ───────────────────────────────────────────────────────────────
print("\n── Sample image_urls ──────────────────────────────────────────────────")
seen = set()
for car in updated:
    key = (car["brand"], car["model_name"])
    if key not in seen:
        seen.add(key)
        print(f"  {car['brand']} {car['model_name']}: {car['image_urls']}")
