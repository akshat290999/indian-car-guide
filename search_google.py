import urllib.request
import re
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

def search_google(query):
    url = "https://www.google.com/search?tbm=isch&q=" + urllib.parse.quote(query)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
    try:
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
        # Google inline images
        imgs = re.findall(r'src="(https://encrypted-tbn0\.gstatic\.com/images[^"]+)"', html)
        return imgs[:5]
    except Exception as e:
        print("Error:", e)
        return []

print(search_google("Volkswagen Polo 6R modified track"))
