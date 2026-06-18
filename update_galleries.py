import re

mapping = {
    "vw-polo-tsi": ("polo_stock.png", "polo_tuned.png"),
    "skoda-octavia-vrs": ("octavia_stock.png", "octavia_tuned.png"),
    "vw-virtus-gt": ("virtus_stock.png", "virtus_tuned.png"),
    "bmw-m340i": ("m340i_stock.png", "m340i_tuned.png"),
    "mercedes-amg-c43": ("c43_stock.png", "c43_tuned.png"),
    "fiat-abarth-punto": ("abarth_stock.png", "abarth_tuned.png"),
    "mini-cooper-s": ("mini_stock.png", "mini_tuned.png"),
    "porsche-911": ("porsche_stock.jpg", "porsche_tuned.jpg"),
    "audi-rs5": ("rs5_stock.jpg", "rs5_tuned.jpg"),
    "honda-city-ivtec": ("city_stock.jpg", "city_tuned.jpg"),
    "hyundai-i20-nline": ("i20_stock.jpg", "i20_tuned.jpg")
}

with open('frontend/src/tuningData.js', 'r') as f:
    content = f.read()

for key, (st, tu) in mapping.items():
    # regex to find the gallery block for each car.
    # We find the key, then the next gallery: [...]
    pattern = rf'("{key}":\s*{{.*?img:.*?")(.*?gallery:\s*\[.*?\])(.*?)'
    
    # Actually, a simpler way is to split by car key.
    # Or just replace all galleries with a generic regex using a function.

def replacer(match):
    car_id = match.group(1).replace('"', '')
    if car_id in mapping:
        st, tu = mapping[car_id]
        gallery_str = f'gallery: [\n      {{ type: "Stock", url: "/images/{st}" }},\n      {{ type: "Tuned", url: "/images/{tu}" }}\n    ]'
        return f'"{car_id}": {{\n    name: {match.group(2)},\n    category: {match.group(3)},\n    description: {match.group(4)},\n    img: "/images/{st}",\n    potential: {match.group(6)},\n    stock_power: {match.group(7)},\n    {gallery_str}'
    return match.group(0)

# The parsing needs to be very robust.
# Let's just do it directly.
new_content = content
for key, (st, tu) in mapping.items():
    # replace img: "..."
    # replace gallery: [...]
    
    # We'll match the gallery block starting from gallery: [ until ]
    # But only inside the specific car's block.
    
    block_start = new_content.find(f'"{key}":')
    if block_start == -1:
        continue
    
    block_end = new_content.find('owner_builds:', block_start)
    if block_end == -1:
        continue
        
    sub_content = new_content[block_start:block_end]
    
    # replace img: "..."
    sub_content = re.sub(r'img:\s*".*?"', f'img: "/images/{st}"', sub_content)
    
    # replace gallery
    new_gal = f'gallery: [\n      {{ type: "Stock", url: "/images/{st}" }},\n      {{ type: "Tuned", url: "/images/{tu}" }}\n    ],'
    sub_content = re.sub(r'gallery:\s*\[.*?\]\s*,', new_gal, sub_content, flags=re.DOTALL)
    
    new_content = new_content[:block_start] + sub_content + new_content[block_end:]

with open('frontend/src/tuningData.js', 'w') as f:
    f.write(new_content)
print("Updated tuningData.js")
