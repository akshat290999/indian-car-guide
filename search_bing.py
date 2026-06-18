import urllib.request
import re
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

def search_bing(query):
    try:
        bing_url = "https://www.bing.com/images/async?q=" + urllib.parse.quote(query) + "&first=1&count=5"
        req = urllib.request.Request(bing_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'})
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
        
        # Bing stores URLs in m="{...\"murl\":\"https...\"...}"
        imgs = re.findall(r'murl&quot;:&quot;(http[^&]+?)&quot;', html)
        if not imgs:
             imgs = re.findall(r'murl":"(http[^"]+?)"', html)
        return imgs[:3]
    except Exception as e:
        print("Error:", e)
        return []

print("Polo Stock:", search_bing("Volkswagen Polo 6R front"))
print("Octavia vRS Tuned:", search_bing("modified Skoda Octavia vRS Mk3"))
