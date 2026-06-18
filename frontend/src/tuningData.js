export const PLATFORMS_DATA = {
  "vw-polo-tsi": {
    name: "VW Polo 1.0/1.2 TSI",
    category: "The VAG Turbo Legends",
    description: "The definitive hot hatch of India. A massive aftermarket ecosystem exists making this the perfect starter project.",
    img: "/images/polo_stock.png",
    potential: "High",
    stock_power: "110 HP / 175 Nm",
    recommended_fuel: "95 RON minimum (Speed 97 recommended for tuned cars)",
    known_limits: "Stock turbo maxes out around 160 HP. Clutch slippage above 240 Nm on manual gearbox. DQ200 DSG has weak mechatronics.",
    tuning_notes: "The 1.0 TSI is the most forgiving engine to tune in India. It handles Stage 1 on regular 95 octane without issues. Always get a TCU tune with the DSG to prevent clutch pack slippage on higher torque maps.",
    gallery: [
      { type: "Stock", url: "/images/polo_stock.png" },
      { type: "Tuned", url: "/images/polo_tuned.png" }
    ],
    tuning_stages: [
      { stage: "Stage 1", power: "135 HP / 220 Nm", cost: "₹25,000", mods: "ECU Remap only (95 Octane fuel recommended)." },
      { stage: "Stage 2", power: "150 HP / 240 Nm", cost: "₹80,000", mods: "ECU Remap, Decat Downpipe, High-Flow Air Filter, Upgraded Intercooler." },
      { stage: "Stage 3", power: "180+ HP / 280+ Nm", cost: "₹2,50,000+", mods: "IS12 or hybrid turbo upgrade, full exhaust system, custom dyno tune, forged internals." }
    ],
    tuner_options: [
      { name: "Code6 Tuning", style: "Aggressive low-end torque. Great for city overtakes.", price: "₹28,000" },
      { name: "Wolf Moto", style: "Linear power delivery. Very safe for daily driving.", price: "₹25,000" },
      { name: "APR", style: "Premium global maps, high peak horsepower.", price: "₹45,000" }
    ],
    indian_builds: [
      { title: "The Pune Sleeper", desc: "Stage 2+ by Code6 pushing 155 HP with full Cobra exhaust on a manual 1.0 TSI.", power: "155 HP", tuner: "Code6" },
      { title: "DSG Rocket", desc: "DQ200 DSG with TCU tune and Stage 1 remap. 0-100 in 8.2 seconds.", power: "138 HP", tuner: "Wolf Moto" },
      { title: "Track Day Weapon", desc: "IS12 hybrid turbo swap, lowered on KW V1 coilovers, full roll cage.", power: "185 HP", tuner: "GT Tunerz" }
    ],
    intl_builds: [
      { title: "UK GTI Killer", desc: "A Polo GTI running Revo Stage 2+ making it faster than a Golf GTI Clubsport.", power: "230 HP", tuner: "Revo" },
      { title: "German Time Attack", desc: "Fully stripped Polo R WRC replica with hybrid turbo and cage.", power: "260 HP", tuner: "HPA Motorsport" },
      { title: "Dutch Daily", desc: "Ultra-clean Stage 1 daily with Oettinger exhaust and BBS wheels.", power: "140 HP", tuner: "Oettinger" }
    ]
  },
  "skoda-octavia-vrs": {
    name: "Skoda Octavia vRS (Mk3/Mk4)",
    category: "The VAG Turbo Legends",
    description: "The EA888 engine is legendary. With just a tune, it competes with sports cars double its price.",
    img: "/images/octavia_stock.png",
    potential: "Extreme",
    stock_power: "230 HP / 350 Nm",
    recommended_fuel: "Speed 97 or higher. E85 blend for Stage 2+.",
    known_limits: "Stock IS20 turbo maxes around 330 HP. Stock clutch packs on DQ381 DSG can slip above 480 Nm. Connecting rods are the weak link above 400 HP.",
    tuning_notes: "The EA888 Gen3 is one of the best platforms in the world. The IS20 turbo can be upgraded to IS38 (from Golf R) for a bolt-on 100+ HP gain. Always upgrade your intercooler first in Indian summers — heat soak kills power instantly.",
    gallery: [
      { type: "Stock", url: "/images/octavia_stock.png" },
      { type: "Tuned", url: "/images/octavia_tuned.png" }
    ],
    tuning_stages: [
      { stage: "Stage 1", power: "300 HP / 420 Nm", cost: "₹45,000", mods: "ECU & TCU (DSG) Remap." },
      { stage: "Stage 2", power: "330 HP / 480 Nm", cost: "₹1,50,000", mods: "ECU/TCU Tune, 3-inch Downpipe, Intake." },
      { stage: "Stage 3", power: "450+ HP / 550+ Nm", cost: "₹5,00,000+", mods: "IS38 / IS470 Turbo Upgrade, Water-Meth." }
    ],
    tuner_options: [
      { name: "APR India", style: "The gold standard for EA888 engines. Incredible top-end.", price: "₹60,000" },
      { name: "TVST", style: "Custom tailored map for Indian 95 octane. Focuses on longevity.", price: "₹40,000" },
      { name: "Code6 Tuning", style: "High torque spikes for aggressive launches.", price: "₹35,000" }
    ],
    indian_builds: [
      { title: "The 400HP Daily", desc: "IS38 turbo with Revo Stage 2 software, 0-100 in 4.1 seconds on Indian roads.", power: "400 HP", tuner: "Pete's Automotive" },
      { title: "Mumbai Street King", desc: "Stage 1 APR map with Wagner intercooler. Runs consistent times in Mumbai heat.", power: "305 HP", tuner: "APR India" },
      { title: "Bangalore Track Car", desc: "Full Stage 2+ with catless downpipe, water-meth injection, KW V3 coilovers.", power: "350 HP", tuner: "Code6" }
    ],
    intl_builds: [
      { title: "800HP Czech Monster", desc: "Fully built engine with GT35 turbo, standalone ECU, sequential gearbox.", power: "800 HP", tuner: "JR Motorsport" },
      { title: "Nürburgring Weapon", desc: "IS470 turbo, forged internals, Öhlins suspension, sub-8 minute BTG times.", power: "480 HP", tuner: "Revo" },
      { title: "UK Drag Champion", desc: "10-second quarter mile Octavia running E85 and a Pure IS600 turbo.", power: "550 HP", tuner: "Custom" }
    ]
  },
  "vw-virtus-gt": {
    name: "VW Virtus / Skoda Slavia 1.5 TSI",
    category: "The VAG Turbo Legends",
    description: "The new kings of the C-segment. The 1.5 EVO engine has massive headroom thanks to an excellent chassis.",
    img: "/images/virtus_stock.png",
    potential: "Very High",
    stock_power: "150 HP / 250 Nm",
    recommended_fuel: "95 RON standard. Speed 97 for Stage 2.",
    known_limits: "Stock turbo limits around 220 HP. The 1.5 EVO has cylinder deactivation (ACT) which should be left active. DQ200 DSG is the weak link above 300 Nm.",
    tuning_notes: "This is a relatively new platform in India. The 1.5 TSI EVO is extremely responsive to ECU tunes. Keep the cylinder deactivation active for fuel savings. The chassis handles the extra power beautifully — consider lowering springs before anything else.",
    gallery: [
      { type: "Stock", url: "/images/virtus_stock.png" },
      { type: "Tuned", url: "/images/virtus_tuned.png" }
    ],
    tuning_stages: [
      { stage: "Stage 1", power: "185 HP / 300 Nm", cost: "₹35,000", mods: "ECU Remap." },
      { stage: "Stage 2", power: "210 HP / 340 Nm", cost: "₹1,20,000", mods: "Downpipe, Intake, Intercooler." }
    ],
    tuner_options: [
      { name: "Wolf Moto", style: "Smooth progressive map, great for highway cruising.", price: "₹30,000" },
      { name: "Code6 Tuning", style: "Aggressive throttle response mapping.", price: "₹32,000" }
    ],
    indian_builds: [
      { title: "The Slavia vRS Project", desc: "Stage 2 Slavia by Wolf Moto, lowered on Cobra springs with 18-inch wheels.", power: "210 HP", tuner: "Wolf Moto" },
      { title: "Virtus GT Highway Cruiser", desc: "Stage 1 map with padel shift tune. Cruises at 180 km/h all day long.", power: "185 HP", tuner: "Code6" },
      { title: "Weekend Warrior", desc: "Full exhaust with catless downpipe, Stage 2 with dyno plot showing 208 HP.", power: "208 HP", tuner: "Wolf Moto" }
    ],
    intl_builds: [
      { title: "Polish 1.5 TSI Build", desc: "Running a custom turbo setup from a 2.0 TSI making crazy power from 1.5L.", power: "280 HP", tuner: "Custom" },
      { title: "Spanish SEAT Leon Clone", desc: "Same 1.5 EVO on a SEAT Leon Cupra pushing stage 2+ with stock turbo.", power: "225 HP", tuner: "APR" },
      { title: "German Jetta GLI Build", desc: "The Jetta GLI in the US shares the 1.5T — tuned to 200 HP with simple bolt-ons.", power: "200 HP", tuner: "Unitronic" }
    ]
  },
  "bmw-m340i": {
    name: "BMW M340i (xDrive)",
    category: "Premium Performance",
    description: "The B58 is the modern 2JZ. It is famously over-engineered and can handle massive power on stock internals.",
    img: "/images/m340i_stock.png",
    potential: "God-Tier",
    stock_power: "374 HP / 500 Nm",
    recommended_fuel: "Speed 97 mandatory. E30-E50 blend for Stage 2+.",
    known_limits: "Stock B58 internals handle 600+ HP reliably. Stock ZF8 transmission handles up to 700 Nm with a flash. The charge pipe is weak and cracks above Stage 1 boost.",
    tuning_notes: "The B58 is the most tunable engine of this generation. It responds to a simple flash tune with 70+ HP gains. Upgrade the chargepipe immediately — the plastic OEM one will pop under higher boost. The ZF8 gearbox is a masterpiece and takes a TCU flash extremely well for sharper shifts.",
    gallery: [
      { type: "Stock", url: "/images/m340i_stock.png" },
      { type: "Tuned", url: "/images/m340i_tuned.png" }
    ],
    tuning_stages: [
      { stage: "Stage 1", power: "440 HP / 600 Nm", cost: "₹60,000", mods: "Bootmod3 / MHD OTS Map." },
      { stage: "Stage 2", power: "480 HP / 650 Nm", cost: "₹2,00,000", mods: "Catless Downpipe, Chargepipe upgrade." },
      { stage: "Stage 3", power: "600-800+ HP", cost: "₹8,00,000+", mods: "Pure800 Turbo upgrade, Port Injection." }
    ],
    tuner_options: [
      { name: "Bootmod3 (OTS)", style: "Off-the-shelf maps. User switchable via mobile app.", price: "₹55,000" },
      { name: "MHD Tuning", style: "Excellent exhaust burble controls and smooth delivery.", price: "₹50,000" },
      { name: "Harmonixx Tuning", style: "Custom dyno tune tailored perfectly for Indian fuel.", price: "₹85,000" }
    ],
    indian_builds: [
      { title: "The Supercar Slayer", desc: "Pure800 turbo and custom E50 tune. Runs 10-second quarter miles at Aamby Valley.", power: "750 HP", tuner: "Harmonixx" },
      { title: "Delhi Highway King", desc: "Stage 1 Bootmod3 with VRSF downpipe and chargepipe. 0-200 in 12 seconds.", power: "460 HP", tuner: "Bootmod3" },
      { title: "Bangalore M-Fest Car", desc: "MHD Stage 2 with custom crackle map. Kw V3 coilovers, Vorsteiner wheels.", power: "485 HP", tuner: "MHD" }
    ],
    intl_builds: [
      { title: "1000HP US Build", desc: "Twin Pure turbos, built transmission, E85 fuel system. 9-second quarter mile.", power: "1000 HP", tuner: "FBO" },
      { title: "German Autobahn Express", desc: "Stage 2 with HJ Motorsport downpipe, hits 305 km/h on the unrestricted Autobahn.", power: "500 HP", tuner: "HJ Motorsport" },
      { title: "Middle East Drag King", desc: "Pure900 turbo, methanol injection, full cage. Beats Lamborghinis at the drag strip.", power: "850 HP", tuner: "Custom" }
    ]
  },
  "mercedes-amg-c43": {
    name: "Mercedes-AMG C43",
    category: "Premium Performance",
    description: "AMG's entry-level beast. The M276 responds incredibly well to increased boost.",
    img: "/images/c43_stock.png",
    potential: "Very High",
    stock_power: "390 HP / 520 Nm",
    recommended_fuel: "Speed 97 mandatory. Premium 100 RON for aggressive maps.",
    known_limits: "Stock turbos are small and max out around 500 HP. The 9G-Tronic is bulletproof but TCU tune is essential for faster shifts. Rear differential can be stressed under heavy launches.",
    tuning_notes: "The C43 is not a 'true' AMG like the C63, but it responds brilliantly to a simple ECU flash. The twin-turbo V6 makes gorgeous noise with an exhaust upgrade. Always pair your ECU tune with a TCU flash for the 9-speed — stock shift logic is too lazy for the extra power.",
    gallery: [
      { type: "Stock", url: "/images/c43_stock.png" },
      { type: "Tuned", url: "/images/c43_tuned.png" }
    ],
    tuning_stages: [
      { stage: "Stage 1", power: "440 HP / 600 Nm", cost: "₹80,000", mods: "ECU Remap." },
      { stage: "Stage 2", power: "480 HP / 650 Nm", cost: "₹3,00,000", mods: "Armytrix Exhaust, Catless downpipes." }
    ],
    tuner_options: [
      { name: "Renntech", style: "Globally renowned AMG specialist maps.", price: "₹1,20,000" },
      { name: "Harmonixx Tuning", style: "Local custom calibration for maximum safe power.", price: "₹90,000" }
    ],
    indian_builds: [
      { title: "The Autobahn Express", desc: "Stage 2 with Armytrix exhaust, 0-100 in 3.8 seconds on Indian roads.", power: "480 HP", tuner: "Harmonixx" },
      { title: "Mumbai Night Runner", desc: "Stage 1 Renntech with IPE exhaust. Sounds like a V8.", power: "440 HP", tuner: "Renntech" },
      { title: "Delhi Drift Car", desc: "Lowered on KW V2, rear LSD upgrade, Stage 1 map. Used for drift events.", power: "445 HP", tuner: "Custom" }
    ],
    intl_builds: [
      { title: "UAE C43 500HP", desc: "RENNtech Stage 2 with full exhaust. Runs 11.5-second quarters.", power: "500 HP", tuner: "Renntech" },
      { title: "UK AMG Build", desc: "Ecu-tek Stage 1 with carbon fibre intake and custom exhaust.", power: "455 HP", tuner: "Ecu-tek" },
      { title: "US Military Spec", desc: "Full cage, stripped interior, built for time attack at Laguna Seca.", power: "490 HP", tuner: "Weistec" }
    ]
  },
  "fiat-abarth-punto": {
    name: "Fiat Abarth Punto",
    category: "The Classics",
    description: "The original Indian hot hatch. A 1.4 T-Jet engine that loves to be pushed.",
    img: "/images/abarth_stock.png",
    potential: "High",
    stock_power: "145 HP / 212 Nm",
    recommended_fuel: "95 RON minimum. Speed 97 for Stage 2.",
    known_limits: "Stock turbo maxes at ~200 HP. The gearbox synchros are weak on 2nd and 3rd gear. The clutch starts slipping above 280 Nm.",
    tuning_notes: "The T-Jet engine is extremely overbuilt from the factory. Wolf Moto has perfected the art of tuning these engines in India. The TD04 turbo swap from a Subaru WRX is a popular bolt-on upgrade that doubles the power ceiling. Always upgrade the clutch before going Stage 2.",
    gallery: [
      { type: "Stock", url: "/images/abarth_stock.png" },
      { type: "Tuned", url: "/images/abarth_tuned.png" }
    ],
    tuning_stages: [
      { stage: "Stage 1", power: "170 HP / 260 Nm", cost: "₹25,000", mods: "ECU Remap." },
      { stage: "Stage 2", power: "190 HP / 290 Nm", cost: "₹90,000", mods: "Downpipe, Full Exhaust, Intake." },
      { stage: "Stage 3", power: "250+ HP", cost: "₹3,00,000+", mods: "TD04 Turbo Upgrade, Forged Internals." }
    ],
    tuner_options: [
      { name: "Wolf Moto", style: "The undisputed kings of Fiat tuning in India.", price: "₹25,000" },
      { name: "Code6 Tuning", style: "Aggressive boost maps for maximum midrange.", price: "₹26,000" }
    ],
    indian_builds: [
      { title: "The Scorpion King", desc: "TD04 turbo upgrade pushing 240 HP at the wheels. Full exhaust by Wolf Moto.", power: "240 HP", tuner: "Wolf Moto" },
      { title: "BIC Track Special", desc: "Stage 2 with Brembo BBK upgrade, lowered on Bilstein B14 coilovers.", power: "195 HP", tuner: "Code6" },
      { title: "Daily Abarth", desc: "Clean Stage 1 remap with BMC intake. Perfect daily with just enough punch.", power: "170 HP", tuner: "Wolf Moto" }
    ],
    intl_builds: [
      { title: "Italian 300HP Abarth", desc: "Fully built engine with Garrett turbo, running on E85 in Italian hillclimbs.", power: "300 HP", tuner: "Tuning Art" },
      { title: "UK Time Attack", desc: "Stripped and caged Abarth Punto Evo with sequential gearbox.", power: "280 HP", tuner: "Autotecnica" },
      { title: "German Track Weapon", desc: "Full roll cage, 6-point harness, slick tires, TD04 swap.", power: "265 HP", tuner: "Custom" }
    ]
  },
  "mini-cooper-s": {
    name: "Mini Cooper S (F56)",
    category: "Premium Performance",
    description: "Go-kart handling meets BMW's B48 engine. Huge tuning potential.",
    img: "/images/mini_stock.png",
    potential: "Extreme",
    stock_power: "192 HP / 280 Nm",
    recommended_fuel: "Speed 97 mandatory. Premium for Stage 2+.",
    known_limits: "Stock turbo maxes around 300 HP. The B48 shares many parts with the B58 and is extremely strong. The Aisin 8-speed auto is the weak link vs the Getrag manual.",
    tuning_notes: "The Cooper S uses BMW's B48 engine which shares architecture with the legendary B58. This means excellent aftermarket support. Bootmod3 works flawlessly on it. The go-kart handling means you should invest in suspension before power — the car is already fast enough to have fun with just a Stage 1 tune.",
    gallery: [
      { type: "Stock", url: "/images/mini_stock.png" },
      { type: "Tuned", url: "/images/mini_tuned.png" }
    ],
    tuning_stages: [
      { stage: "Stage 1", power: "260 HP / 380 Nm", cost: "₹45,000", mods: "Bootmod3 Map." },
      { stage: "Stage 2", power: "290 HP / 420 Nm", cost: "₹1,50,000", mods: "Decat downpipe, Intercooler." }
    ],
    tuner_options: [
      { name: "Bootmod3", style: "Switchable maps via phone. Super convenient.", price: "₹50,000" },
      { name: "Harmonixx Tuning", style: "Custom ECU and crackle maps tailored for B48.", price: "₹65,000" }
    ],
    indian_builds: [
      { title: "JCW Killer", desc: "Stage 2 Cooper S that runs faster lap times than a factory JCW at BIC.", power: "290 HP", tuner: "Harmonixx" },
      { title: "Mumbai Weekend Car", desc: "Stage 1 Bootmod3 with Remus exhaust. Perfect weekend blast.", power: "260 HP", tuner: "Bootmod3" },
      { title: "The Goa Road Tripper", desc: "Lowered on Eibach springs, Stage 1, custom wrap. Instagram famous.", power: "255 HP", tuner: "Bootmod3" }
    ],
    intl_builds: [
      { title: "Nürburgring Mini", desc: "Full KW V3 coilovers, roll cage, BBK, Stage 2+ running 7:45 BTG.", power: "310 HP", tuner: "Manic Motorsport" },
      { title: "UK GP Build", desc: "Full GP3 body kit with Eventuri intake and Stage 2 MHD tune.", power: "300 HP", tuner: "MHD" },
      { title: "US JCW Ultimate", desc: "Upgraded turbo, port injection, full E85 setup on a JCW base.", power: "380 HP", tuner: "Custom" }
    ]
  },
  "porsche-911": {
    name: "Porsche 911 (992 Carrera S)",
    category: "Supercars",
    description: "The 3.0L twin-turbo flat-six responds incredibly well to simple ECU calibration.",
    img: "/images/porsche_stock.jpg",
    potential: "God-Tier",
    stock_power: "450 HP / 530 Nm",
    recommended_fuel: "Premium 100 RON only. E85 blend for extreme builds.",
    known_limits: "Stock turbos max out around 650 HP. PDK handles 800+ Nm without issue. The IMS bearing issue from older 911s is completely solved on the 992.",
    tuning_notes: "Porsche engines are precision instruments. Do NOT go to a generic tuner. Only specialists like M-Engineering or Cobb should touch these cars. The twin-turbo flat-six responds dramatically to just an ECU flash — you can gain 100 HP with zero hardware changes. The PDK transmission is virtually indestructible.",
    gallery: [
      { type: "Stock", url: "/images/porsche_stock.jpg" },
      { type: "Tuned", url: "/images/porsche_tuned.jpg" }
    ],
    tuning_stages: [
      { stage: "Stage 1", power: "550 HP / 650 Nm", cost: "₹1,20,000", mods: "M-Engineering ECU Flash." },
      { stage: "Stage 2", power: "600 HP / 700 Nm", cost: "₹4,00,000", mods: "High-flow cats, Custom Tune." }
    ],
    tuner_options: [
      { name: "M-Engineering", style: "Global Porsche experts. Safe and massive gains.", price: "₹1,80,000" },
      { name: "GT Tunerz", style: "Custom Indian mapping for high-end exotics.", price: "₹1,50,000" }
    ],
    indian_builds: [
      { title: "GT3 Hunter", desc: "Stage 2 Carrera S that walks a GT3 on the straights at BIC.", power: "600 HP", tuner: "GT Tunerz" },
      { title: "Mumbai Turbo S Rival", desc: "Stage 1 flash making this Carrera S faster than a stock Turbo.", power: "550 HP", tuner: "M-Engineering" },
      { title: "South India Rally", desc: "Custom suspension with Öhlins TTX, Stage 1 flash. Used for hill climb events.", power: "545 HP", tuner: "Custom" }
    ],
    intl_builds: [
      { title: "1200HP 992 Turbo S", desc: "Built engine, twin ball-bearing turbos, E85. One of the fastest street 911s.", power: "1200 HP", tuner: "ES Motor" },
      { title: "Pikes Peak Record", desc: "Lightweight 992 Carrera built specifically for Pikes Peak hill climb.", power: "650 HP", tuner: "Custom" },
      { title: "Dubai GT3 RS Slayer", desc: "Stage 2 Carrera 4S that embarrasses GT3 RS owners at Dubai Autodrome.", power: "620 HP", tuner: "VRP" }
    ]
  },
  "audi-rs5": {
    name: "Audi RS5 (B9)",
    category: "Supercars",
    description: "2.9L Twin-Turbo V6 developed with Porsche. A monster off the line with Quattro.",
    img: "/images/rs5_stock.jpg",
    potential: "Extreme",
    stock_power: "450 HP / 600 Nm",
    recommended_fuel: "Speed 97 mandatory. E40 blend for Stage 2.",
    known_limits: "Stock turbos max around 600 HP. The Quattro drivetrain handles massive power but front diff can whine above 700 Nm. The ZF8 is robust with a TCU flash.",
    tuning_notes: "The 2.9 TFSI is shared with the Porsche Panamera — it's incredibly overbuilt. A simple ECU flash unlocks 80+ HP. The Quattro system means you can put the power down even in the rain. Always get a TCU tune — the stock ZF8 shifts too slowly for the extra power. The exhaust note from a Sports exhaust + tune is absolutely intoxicating.",
    gallery: [
      { type: "Stock", url: "/images/rs5_stock.jpg" },
      { type: "Tuned", url: "/images/rs5_tuned.jpg" }
    ],
    tuning_stages: [
      { stage: "Stage 1", power: "530 HP / 750 Nm", cost: "₹90,000", mods: "ECU & TCU Remap." },
      { stage: "Stage 2", power: "580 HP / 820 Nm", cost: "₹3,50,000", mods: "Downpipes, Intake, E40 Blend." }
    ],
    tuner_options: [
      { name: "APR India", style: "Incredible launch control mapping and top-end.", price: "₹1,10,000" },
      { name: "Code6 Tuning", style: "Aggressive Stage 2 custom tuning.", price: "₹85,000" }
    ],
    indian_builds: [
      { title: "The Quattro Rocket", desc: "0-100 in 3.1 seconds with Stage 2 and catless downpipes.", power: "580 HP", tuner: "APR India" },
      { title: "Delhi GT Car", desc: "Stage 1 APR with Akrapovic exhaust. Best sounding RS5 in India.", power: "530 HP", tuner: "APR India" },
      { title: "Track Day RS5", desc: "Full KW V3, Brembo GT BBK, Stage 1 tune. Track prepped.", power: "535 HP", tuner: "Code6" }
    ],
    intl_builds: [
      { title: "800HP German RS5", desc: "Upgraded turbos, built internals, E85 fuel system. Autobahn legend.", power: "800 HP", tuner: "JR Motorsport" },
      { title: "US Drag RS5", desc: "10-second quarter mile RS5 running full E85 and upgraded turbos.", power: "720 HP", tuner: "IE" },
      { title: "Middle East RS5", desc: "Stage 2 with full Milltek exhaust and IPE downpipes.", power: "600 HP", tuner: "Custom" }
    ]
  },
  "honda-city-ivtec": {
    name: "Honda City 1.5 i-VTEC",
    category: "The NA Legends",
    description: "Naturally Aspirated engines are harder to tune, but the i-VTEC is legendary for its high-revving nature.",
    img: "/images/city_stock.jpg",
    potential: "Medium",
    stock_power: "119 HP / 145 Nm",
    recommended_fuel: "91 RON sufficient for stock. 95 RON for turbo builds.",
    known_limits: "NA engines have limited power ceiling without forced induction. Stock internals handle up to ~200 HP. The CVT is fragile and should be swapped for manual on serious builds.",
    tuning_notes: "This is a fundamentally different tuning experience compared to turbo cars. You cannot simply 'flash' an NA engine for major gains. Real power requires physical changes: intake, headers, exhaust, and ultimately forced induction. A Hondata ECU is the key to unlocking this engine. The VTEC crossover point can be adjusted for more aggressive cam engagement.",
    gallery: [
      { type: "Stock", url: "/images/city_stock.jpg" },
      { type: "Tuned", url: "/images/city_tuned.jpg" }
    ],
    tuning_stages: [
      { stage: "Stage 1", power: "135 HP / 155 Nm", cost: "₹60,000", mods: "Intake, Full Exhaust, Piggyback." },
      { stage: "Stage 3", power: "220+ HP", cost: "₹3,50,000+", mods: "Custom Turbo Kit." }
    ],
    tuner_options: [
      { name: "RaceDynamics (Piggyback)", style: "Plug and play box to increase fueling safely.", price: "₹25,000" },
      { name: "Custom Dyno Tune", style: "Requires Hondata or standalone ECU. Best for NA builds.", price: "₹60,000" }
    ],
    indian_builds: [
      { title: "VTEC Kicked In", desc: "GT28 turbo kit with Hondata ECU running 5 PSI. Pulls like a freight train.", power: "220 HP", tuner: "Custom" },
      { title: "The Daily Commuter", desc: "Bolt-on intake and exhaust with RaceDynamics piggyback. Subtle but noticeable.", power: "135 HP", tuner: "RaceDynamics" },
      { title: "Honda Touge Build", desc: "Full N/A build with ported head, custom cams, and individual throttle bodies.", power: "165 HP", tuner: "Custom" }
    ],
    intl_builds: [
      { title: "1000HP Civic Type R", desc: "Same L15 engine family on a fully built drag car with massive turbo.", power: "1000 HP", tuner: "PRL Motorsports" },
      { title: "Japanese Time Attack", desc: "NA City/Fit running ITBs, cams, and a Hondata standalone. Revs to 9000 RPM.", power: "180 HP", tuner: "Spoon Sports" },
      { title: "Thai Drag City", desc: "Turbo City from Thailand running 11-second quarters on stock internals.", power: "250 HP", tuner: "Custom" }
    ]
  },
  "hyundai-i20-nline": {
    name: "Hyundai i20 N Line",
    category: "Modern Hot Hatches",
    description: "Hyundai's sporty offering. The 3-cylinder turbo is surprisingly robust.",
    img: "/images/i20_stock.jpg",
    potential: "Medium-High",
    stock_power: "120 HP / 172 Nm",
    recommended_fuel: "95 RON standard. Speed 97 for Stage 2.",
    known_limits: "Stock turbo maxes at around 160 HP. 3-cylinder engines are inherently vibey at high RPMs. The iMT clutchless manual has software limitations for tunes.",
    tuning_notes: "The i20 N Line is a newcomer to the Indian tuning scene. The 1.0 T-GDi engine is still being explored by tuners, but Code6 has cracked it wide open. The key challenge is that the iMT (clutchless manual) has electronic clutch actuation, meaning TCU tunes are tricky. If you have the manual, tuning is much more straightforward.",
    gallery: [
      { type: "Stock", url: "/images/i20_stock.jpg" },
      { type: "Tuned", url: "/images/i20_tuned.jpg" }
    ],
    tuning_stages: [
      { stage: "Stage 1", power: "140 HP / 210 Nm", cost: "₹30,000", mods: "ECU Remap." },
      { stage: "Stage 2", power: "155 HP / 240 Nm", cost: "₹80,000", mods: "Decat downpipe, BMC Intake." }
    ],
    tuner_options: [
      { name: "Code6 Tuning", style: "Pioneers of Hyundai turbo-petrol tuning in India.", price: "₹30,000" },
      { name: "N1 Racing", style: "Custom remap focused on track longevity.", price: "₹35,000" }
    ],
    indian_builds: [
      { title: "The Rally Hatch", desc: "Stage 2 N-Line with Borla exhaust and pops-and-bangs map.", power: "155 HP", tuner: "Code6" },
      { title: "City Sprinter", desc: "Stage 1 with BMC filter. Perfect for cutting through Bangalore traffic.", power: "140 HP", tuner: "Code6" },
      { title: "Weekend Track Toy", desc: "Stage 2 with lowering springs and BBK from i20 N. Handles like a go-kart.", power: "158 HP", tuner: "N1 Racing" }
    ],
    intl_builds: [
      { title: "i20 N Worldwide", desc: "The actual i20 N makes 204 HP from factory — the N-Line is just a taste.", power: "204 HP", tuner: "Hyundai N" },
      { title: "WRC i20 Rally", desc: "Hyundai's WRC car is based on the i20 platform making over 380 HP from a 1.6T.", power: "380 HP", tuner: "Hyundai Motorsport" },
      { title: "European i20 N Cup", desc: "One-make racing series i20 N with roll cage, slicks, and racing ECU.", power: "210 HP", tuner: "Factory Race" }
    ]
  }
};
