import urllib.request
import re

def search_ddg(query):
    url = "https://html.duckduckgo.com/html/?q=" + urllib.parse.quote(query + " car")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
    try:
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
        # DDG HTML has a hidden input or links to images? Actually DDG HTML doesn't serve images directly in the results easily.
        # Let's look for any .jpg URLs in the text
        imgs = re.findall(r'(https?://[^"\'<>]+\.jpg)', html)
        # Filter
        filtered = [i for i in imgs if 'duckduckgo' not in i]
        return list(dict.fromkeys(filtered))[:3]
    except Exception as e:
        print("Error:", e)
        return []

print(search_ddg("Volkswagen Polo 6R front"))
