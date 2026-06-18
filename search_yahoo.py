import urllib.request
import json
import re
import ssl
import time

ssl._create_default_https_context = ssl._create_unverified_context

def search_images(query):
    try:
        yahoo_url = "https://images.search.yahoo.com/search/images?p=" + urllib.parse.quote(query)
        req_y = urllib.request.Request(yahoo_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        html_y = urllib.request.urlopen(req_y, timeout=10).read().decode('utf-8')
        
        imgs = re.findall(r'imgurl=(http[^&]+)&', html_y)
        if not imgs:
            imgs = re.findall(r'"iurl":"([^"]+)"', html_y)
            
        decoded_imgs = [urllib.parse.unquote(img).replace('\\/', '/') for img in imgs]
        # Filter out icons/logos/watermarked domains
        filtered = []
        for img in decoded_imgs:
            lower = img.lower()
            if 'yimg.com' not in lower and 'logo' not in lower and 'stock' not in lower and 'alamy' not in lower:
                filtered.append(img)
        return list(dict.fromkeys(filtered))[:10] # unique and max 10
    except Exception as e:
        print("Error:", e)
        return []

queries = [
    "Volkswagen Polo 6R front red",
    "Skoda Octavia Mk3 vRS blue front",
    "Volkswagen Virtus GT front",
    "BMW M340i G20 front",
    "Mercedes-AMG C43 W205 front",
    "Fiat Abarth Punto front",
    "Mini Cooper S F56 front",
    "Porsche 911 992 Carrera S",
    "Audi RS5 B9 coupe front",
    "Honda City 2014 front",
    "Hyundai i20 N Line front"
]

for q in queries:
    print(f"--- {q} ---")
    results = search_images(q)
    for r in results[:3]:
         print(r)
    time.sleep(1)
