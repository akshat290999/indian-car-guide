import urllib.request
import re
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

def search_tuningblog(query):
    try:
        url = "https://www.tuningblog.eu/?s=" + urllib.parse.quote(query)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
        
        # tuningblog uses large thumbnails
        imgs = re.findall(r'<img[^>]+src="([^"]+)"', html)
        # Filter for jpg/png and exclude logos/avatars
        imgs = [i for i in imgs if ('.jpg' in i or '.png' in i) and 'avatar' not in i and 'logo' not in i]
        return list(dict.fromkeys(imgs))[:3]
    except Exception as e:
        print("Error:", e)
        return []

print(search_tuningblog("Skoda Octavia vRS"))
print(search_tuningblog("Volkswagen Polo"))
