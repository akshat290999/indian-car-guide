import urllib.request
import urllib.parse
import json
import ssl
import sys
import os

ssl._create_default_https_context = ssl._create_unverified_context

prompts = {
    "polo_stock.png": "A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Volkswagen Polo TSI hatchback. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    "polo_tuned.png": "A highly realistic studio photograph of a modified 2026 Indian spec Volkswagen Polo TSI hatchback with aftermarket wheels, lowered suspension, and a subtle roof spoiler. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    
    "octavia_stock.png": "A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Skoda Octavia vRS sedan. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    "octavia_tuned.png": "A highly realistic studio photograph of a modified 2026 Indian spec Skoda Octavia vRS sedan with aggressive front splitter, aftermarket multi-spoke wheels, lowered stance. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    
    "virtus_stock.png": "A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Volkswagen Virtus GT sedan. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    "virtus_tuned.png": "A highly realistic studio photograph of a modified 2026 Indian spec Volkswagen Virtus GT sedan with aftermarket lowered suspension, forged wheels, and subtle aero kit. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    
    "m340i_stock.png": "A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec BMW M340i xDrive sedan. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    "m340i_tuned.png": "A highly realistic studio photograph of a modified 2026 Indian spec BMW M340i xDrive sedan with carbon fiber M Performance parts, lowered suspension, and custom forged wheels. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    
    "c43_stock.png": "A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Mercedes-AMG C43 sedan. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    "c43_tuned.png": "A highly realistic studio photograph of a modified 2026 Indian spec Mercedes-AMG C43 sedan with aggressive front bumper, larger forged wheels, and a subtle carbon fiber lip spoiler. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    
    "abarth_stock.png": "A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Fiat Abarth Punto hatchback. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    "abarth_tuned.png": "A highly realistic studio photograph of a modified 2026 Indian spec Fiat Abarth Punto hatchback with wider track, rally-style white wheels, and a lowered stance. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    
    "mini_stock.png": "A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Mini Cooper S hatchback. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    "mini_tuned.png": "A highly realistic studio photograph of a modified 2026 Indian spec Mini Cooper S hatchback with a JCW aero kit, aggressive forged wheels, and lowered suspension. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    
    "porsche_stock.jpg": "A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Porsche 911 Carrera S. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    "porsche_tuned.jpg": "A highly realistic studio photograph of a modified 2026 Indian spec Porsche 911 GT3 RS style with aggressive aero, huge rear wing, and center-lock forged wheels. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    
    "rs5_stock.jpg": "A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Audi RS5 Sportback. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    "rs5_tuned.jpg": "A highly realistic studio photograph of a modified 2026 Indian spec Audi RS5 Sportback with aftermarket lowered suspension, carbon fiber front splitter, and custom 20-inch forged wheels. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    
    "city_stock.jpg": "A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Honda City i-VTEC sedan. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    "city_tuned.jpg": "A highly realistic studio photograph of a modified 2026 Indian spec Honda City i-VTEC sedan with aftermarket lowered suspension, JDM style forged wheels, and subtle lip spoiler. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    
    "i20_stock.jpg": "A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Hyundai i20 N Line hatchback. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
    "i20_tuned.jpg": "A highly realistic studio photograph of a modified 2026 Indian spec Hyundai i20 N Line hatchback with rally-style mudflaps, wider track, aggressive wheels, and roof spoiler. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p.",
}

os.makedirs('frontend/public/images', exist_ok=True)

for filename, prompt in prompts.items():
    print(f"Generating {filename}...")
    url = f"https://image.pollinations.ai/prompt/{urllib.parse.quote(prompt)}?width=1920&height=1080&nologo=true"
    filepath = os.path.join('frontend/public/images', filename)
    try:
        urllib.request.urlretrieve(url, filepath)
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
