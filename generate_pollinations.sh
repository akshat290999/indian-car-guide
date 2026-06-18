#!/bin/bash

mkdir -p frontend/public/images

declare -A prompts
prompts["polo_stock.png"]="A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Volkswagen Polo TSI hatchback. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["polo_tuned.png"]="A highly realistic studio photograph of a modified 2026 Indian spec Volkswagen Polo TSI hatchback with aftermarket wheels, lowered suspension, and a subtle roof spoiler. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["octavia_stock.png"]="A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Skoda Octavia vRS sedan. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["octavia_tuned.png"]="A highly realistic studio photograph of a modified 2026 Indian spec Skoda Octavia vRS sedan with aggressive front splitter, aftermarket multi-spoke wheels, lowered stance. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["virtus_stock.png"]="A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Volkswagen Virtus GT sedan. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["virtus_tuned.png"]="A highly realistic studio photograph of a modified 2026 Indian spec Volkswagen Virtus GT sedan with aftermarket lowered suspension, forged wheels, and subtle aero kit. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["m340i_stock.png"]="A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec BMW M340i xDrive sedan. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["m340i_tuned.png"]="A highly realistic studio photograph of a modified 2026 Indian spec BMW M340i xDrive sedan with carbon fiber M Performance parts, lowered suspension, and custom forged wheels. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["c43_stock.png"]="A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Mercedes-AMG C43 sedan. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["c43_tuned.png"]="A highly realistic studio photograph of a modified 2026 Indian spec Mercedes-AMG C43 sedan with aggressive front bumper, larger forged wheels, and a subtle carbon fiber lip spoiler. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["abarth_stock.png"]="A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Fiat Abarth Punto hatchback. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["abarth_tuned.png"]="A highly realistic studio photograph of a modified 2026 Indian spec Fiat Abarth Punto hatchback with wider track, rally-style white wheels, and a lowered stance. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["mini_stock.png"]="A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Mini Cooper S hatchback. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["mini_tuned.png"]="A highly realistic studio photograph of a modified 2026 Indian spec Mini Cooper S hatchback with a JCW aero kit, aggressive forged wheels, and lowered suspension. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["porsche_stock.jpg"]="A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Porsche 911 Carrera S. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["porsche_tuned.jpg"]="A highly realistic studio photograph of a modified 2026 Indian spec Porsche 911 GT3 RS style with aggressive aero, huge rear wing, and center-lock forged wheels. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["rs5_stock.jpg"]="A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Audi RS5 Sportback. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["rs5_tuned.jpg"]="A highly realistic studio photograph of a modified 2026 Indian spec Audi RS5 Sportback with aftermarket lowered suspension, carbon fiber front splitter, and custom 20-inch forged wheels. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["city_stock.jpg"]="A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Honda City i-VTEC sedan. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["city_tuned.jpg"]="A highly realistic studio photograph of a modified 2026 Indian spec Honda City i-VTEC sedan with aftermarket lowered suspension, JDM style forged wheels, and subtle lip spoiler. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["i20_stock.jpg"]="A highly realistic, unedited studio photograph of a completely stock 2026 Indian spec Hyundai i20 N Line hatchback. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."
prompts["i20_tuned.jpg"]="A highly realistic studio photograph of a modified 2026 Indian spec Hyundai i20 N Line hatchback with rally-style mudflaps, wider track, aggressive wheels, and roof spoiler. The car is isolated on a pure white background. Product shot style, clean lighting, 1080p."

# URL encode using python to ensure spaces are handled correctly
for filename in "${!prompts[@]}"; do
    prompt="${prompts[$filename]}"
    echo "Generating $filename..."
    encoded_prompt=$(python3 -c "import urllib.parse, sys; print(urllib.parse.quote(sys.argv[1]))" "$prompt")
    url="https://image.pollinations.ai/prompt/${encoded_prompt}?width=1920&height=1080&nologo=true"
    curl -s -L -o "frontend/public/images/$filename" "$url"
done
echo "Done downloading all images."
