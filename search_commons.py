import urllib.request
import urllib.parse
import json
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

def search_commons(query):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch={urllib.parse.quote(query)}&gsrlimit=3&prop=imageinfo&iiprop=url"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        resp = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
        data = json.loads(resp)
        pages = data.get('query', {}).get('pages', {})
        urls = []
        for page_id, page in pages.items():
            if 'imageinfo' in page:
                urls.append(page['imageinfo'][0]['url'])
        return urls
    except Exception as e:
        print("Error:", e)
        return []

print(search_commons("Volkswagen Polo 6R front"))
print(search_commons("modified Polo 6R"))
print(search_commons("tuned Octavia Mk3"))
