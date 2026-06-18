import urllib.request
import re
import ssl
import os
import json
import time

ssl._create_default_https_context = ssl._create_unverified_context

CARS = {
  "vw-polo-tsi": {
    "Stock": "Volkswagen Polo 6R GT TSI stock photography front",
    "Light Tuned": "Volkswagen Polo 6R modified wheels lowered stance",
    "Heavy Tuned": "Volkswagen Polo 6R track build widebody"
  },
  "skoda-octavia-vrs": {
    "Stock": "Skoda Octavia Mk3 vRS stock front photography",
    "Light Tuned": "Skoda Octavia Mk3 vRS modified wheels lowered",
    "Heavy Tuned": "Skoda Octavia Mk3 vRS track car race modified"
  },
  "vw-virtus-gt": {
    "Stock": "Volkswagen Virtus GT stock front india",
    "Light Tuned": "Volkswagen Virtus GT modified lowered stance",
    "Heavy Tuned": "Volkswagen Virtus GT race car wrap modified"
  },
  "bmw-m340i": {
    "Stock": "BMW M340i G20 stock front photography",
    "Light Tuned": "BMW M340i G20 modified wheels lowered stance",
    "Heavy Tuned": "BMW M340i G20 track car big turbo aerodynamic"
  },
  "mercedes-amg-c43": {
    "Stock": "Mercedes-AMG C43 W205 stock front photography",
    "Light Tuned": "Mercedes-AMG C43 W205 modified lowered stance",
    "Heavy Tuned": "Mercedes-AMG C43 W205 track aero modified"
  },
  "fiat-abarth-punto": {
    "Stock": "Fiat Abarth Punto India stock front",
    "Light Tuned": "Fiat Abarth Punto modified wheels stance",
    "Heavy Tuned": "Fiat Abarth Punto track build race"
  },
  "mini-cooper-s": {
    "Stock": "Mini Cooper S F56 stock front photography",
    "Light Tuned": "Mini Cooper S F56 modified lowered stance",
    "Heavy Tuned": "Mini Cooper S F56 track build aero"
  },
  "porsche-911": {
    "Stock": "Porsche 911 992 Carrera S stock front photography",
    "Light Tuned": "Porsche 911 992 Carrera S modified wheels stance",
    "Heavy Tuned": "Porsche 911 992 Carrera S track tuned race aero"
  },
  "audi-rs5": {
    "Stock": "Audi RS5 B9 stock front photography",
    "Light Tuned": "Audi RS5 B9 modified lowered stance",
    "Heavy Tuned": "Audi RS5 B9 track tuned aero race"
  },
  "honda-city-ivtec": {
    "Stock": "Honda City 4th gen 2014 stock front",
    "Light Tuned": "Honda City 4th gen modified lowered stance",
    "Heavy Tuned": "Honda City 4th gen turbo track build aero"
  },
  "hyundai-i20-nline": {
    "Stock": "Hyundai i20 N Line stock front photography",
    "Light Tuned": "Hyundai i20 N Line modified lowered stance",
    "Heavy Tuned": "Hyundai i20 N Line track build aero race"
  }
}

DEST_DIR = "/Users/akshatpandey/Desktop/indian-car-guide /frontend/public/images"
os.makedirs(DEST_DIR, exist_ok=True)

def search_bing(query):
    try:
        bing_url = "https://www.bing.com/images/async?q=" + urllib.parse.quote(query) + "&first=1&count=10"
        req = urllib.request.Request(bing_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
        imgs = re.findall(r'murl&quot;:&quot;(http[^&]+?(?:jpg|jpeg|png))&quot;', html)
        if not imgs:
             imgs = re.findall(r'murl":"(http[^"]+?(?:jpg|jpeg|png))"', html)
        return imgs
    except Exception as e:
        print("Bing Error:", e)
        return []

def download_image(url, dest_path):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
        resp = urllib.request.urlopen(req, timeout=10)
        with open(dest_path, 'wb') as f:
            f.write(resp.read())
        return True
    except Exception as e:
        print("Download Error:", e)
        return False

results = {}

for car_id, states in CARS.items():
    results[car_id] = {}
    for state_name, query in states.items():
        print(f"Fetching {car_id} - {state_name}...")
        urls = search_bing(query)
        success = False
        state_slug = state_name.lower().replace(" ", "-")
        dest_filename = f"{car_id}-{state_slug}.jpg"
        dest_path = os.path.join(DEST_DIR, dest_filename)
        
        for url in urls:
            print(f"Trying URL: {url}")
            if download_image(url, dest_path):
                # Verify it has some size
                if os.path.getsize(dest_path) > 10000: # at least 10KB
                    results[car_id][state_name] = f"/images/{dest_filename}"
                    success = True
                    break
            time.sleep(0.5)
        
        if not success:
            print(f"FAILED to download {car_id} - {state_name}")

with open("/Users/akshatpandey/Desktop/indian-car-guide /downloaded_images_map.json", "w") as f:
    json.dump(results, f, indent=2)

print("DONE.")
