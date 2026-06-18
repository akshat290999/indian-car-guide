import urllib.parse
import os
import subprocess

prompts = {
    "rs5_tuned.jpg": "A highly realistic studio photograph of a modified 2026 Indian spec Audi RS5 Sportback with aftermarket lowered suspension, carbon fiber front splitter, and custom 20-inch forged wheels. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p, correct proportions, photorealistic.",
    "city_stock.jpg": "A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Honda City i-VTEC sedan. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p, correct proportions, photorealistic.",
    "city_tuned.jpg": "A highly realistic studio photograph of a modified 2026 Indian spec Honda City i-VTEC sedan with aftermarket lowered suspension, JDM style forged wheels, and subtle lip spoiler. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p, correct proportions, photorealistic.",
    "i20_stock.jpg": "A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Hyundai i20 N Line hatchback. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p, correct proportions, photorealistic.",
    "i20_tuned.jpg": "A highly realistic studio photograph of a modified 2026 Indian spec Hyundai i20 N Line hatchback with rally-style mudflaps, wider track, aggressive wheels, and roof spoiler. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p, correct proportions, photorealistic."
}

os.makedirs('frontend/public/images', exist_ok=True)

for filename, prompt in prompts.items():
    print(f"Generating {filename}...")
    encoded_prompt = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=1024&height=1024&nologo=true&seed=42"
    filepath = os.path.join('frontend/public/images', filename)
    subprocess.run(["curl", "-s", "-L", "-o", filepath, url])
    print(f"Downloaded {filename}")
