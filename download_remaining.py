import urllib.request
import urllib.parse
import json
import ssl
import sys
import os

ssl._create_default_https_context = ssl._create_unverified_context

def search_commons_and_download(query, filename):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch={urllib.parse.quote(query)}&gsrlimit=3&prop=imageinfo&iiprop=url"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        resp = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
        data = json.loads(resp)
        pages = data.get('query', {}).get('pages', {})
        for page_id, page in pages.items():
            if 'imageinfo' in page:
                img_url = page['imageinfo'][0]['url']
                print(f"Downloading {img_url} to {filename}...")
                os.system(f"curl -sL -o 'frontend/public/images/{filename}' '{img_url}'")
                return
        print(f"No image found for {query}")
    except Exception as e:
        print("Error:", e)

# Hardware
search_commons_and_download("Engine Control Unit isolated", "hardware_ecu.jpg")
search_commons_and_download("Turbocharger", "hardware_turbo.jpg")
search_commons_and_download("Intercooler white background", "hardware_intercooler.jpg")
search_commons_and_download("exhaust downpipe", "hardware_downpipe.jpg")
search_commons_and_download("Forged piston", "hardware_piston.jpg")

# Remaining Cars
search_commons_and_download("Porsche 911 992 front", "porsche_stock.jpg")
search_commons_and_download("Porsche 911 GT3 RS 992", "porsche_tuned.jpg")
search_commons_and_download("Audi RS5 Sportback", "rs5_stock.jpg")
search_commons_and_download("Audi RS5 modified", "rs5_tuned.jpg")
search_commons_and_download("Honda City 2014 white", "city_stock.jpg")
search_commons_and_download("Honda City modified", "city_tuned.jpg")
search_commons_and_download("Hyundai i20 N Line", "i20_stock.jpg")
search_commons_and_download("Hyundai i20 rally", "i20_tuned.jpg")
