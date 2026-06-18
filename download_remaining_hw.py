import urllib.request
import urllib.parse
import json
import ssl
import sys
import os

ssl._create_default_https_context = ssl._create_unverified_context

def search_commons_and_download(query, filename):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch={urllib.parse.quote(query)}&gsrlimit=10&prop=imageinfo&iiprop=url"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        resp = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
        data = json.loads(resp)
        pages = data.get('query', {}).get('pages', {})
        for page_id, page in pages.items():
            if 'imageinfo' in page:
                img_url = page['imageinfo'][0]['url']
                if img_url.lower().endswith(('.jpg', '.png')):
                    print(f"Downloading {img_url} to {filename}...")
                    os.system(f"curl -sL -o 'frontend/public/images/{filename}' '{img_url}'")
                    return
        print(f"No image found for {query}")
    except Exception as e:
        print("Error:", e)

search_commons_and_download("Engine Control Unit", "hardware_ecu.jpg")
search_commons_and_download("Intercooler car", "hardware_intercooler.jpg")
search_commons_and_download("exhaust downpipe car", "hardware_downpipe.jpg")
search_commons_and_download("Air intake", "hardware_intake.jpg")
