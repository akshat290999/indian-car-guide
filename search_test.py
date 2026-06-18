import os
from duckduckgo_search import DDGS
import requests

queries = {
    "polo_stock": "Volkswagen Polo 6R front 3/4 high quality",
    "polo_light": "Volkswagen Polo 6R lowered on wheels",
    "polo_heavy": "Volkswagen Polo 6R track build widebody"
}

os.makedirs("search_results", exist_ok=True)

with DDGS() as ddgs:
    for name, q in queries.items():
        results = list(ddgs.images(q, max_results=3))
        for i, res in enumerate(results):
            url = res['image']
            try:
                r = requests.get(url, timeout=5)
                if r.status_code == 200:
                    ext = url.split('.')[-1].split('?')[0]
                    if ext not in ['jpg', 'jpeg', 'png']:
                        ext = 'jpg'
                    path = f"search_results/{name}_{i}.{ext}"
                    with open(path, 'wb') as f:
                        f.write(r.content)
                    print(f"Downloaded: {path} from {url}")
            except Exception as e:
                print(f"Failed {url}: {e}")
