export const PLATFORMS_DATA = {
  "vw-polo-tsi": {
    name: "VW Polo 1.0/1.2 TSI",
    category: "The VAG Turbo Legends",
    description: "The definitive hot hatch of India. A massive aftermarket ecosystem exists making this the perfect starter project.",
    img: "/images/polo_stock.png",
    potential: "High",
    stock_power: "110 HP / 175 Nm",
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
    owner_builds: [
      { title: "The Ultimate Street Sleeper", desc: "A 1.0 TSI manual pushing 155 HP on a Stage 2+ tune by Code6, featuring a full Cobra exhaust.", img: "https://www.tuningblog.eu/wp-content/uploads/2021/04/VW-Polo-GTI-AW-Tuning-Slammed-Barracuda-Dragoon-4.jpg" }
    ]
  },
  "skoda-octavia-vrs": {
    name: "Skoda Octavia vRS (Mk3/Mk4)",
    category: "The VAG Turbo Legends",
    description: "The EA888 engine is legendary. With just a tune, it competes with sports cars double its price.",
    img: "/images/octavia_stock.png",
    potential: "Extreme",
    stock_power: "230 HP / 350 Nm",
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
    owner_builds: [
      { title: "The 400HP Daily Driver", desc: "Running an IS38 turbo with Revo software, achieving a 0-100 km/h in 4.1 seconds.", img: "https://www.tuningblog.eu/wp-content/uploads/2020/12/Skoda-Octavia-RS-Tuning-Performance-Project-5.jpg" }
    ]
  },
  "vw-virtus-gt": {
    name: "VW Virtus / Skoda Slavia 1.5 TSI",
    category: "The VAG Turbo Legends",
    description: "The new kings of the C-segment. The 1.5 EVO engine has massive headroom thanks to an excellent chassis.",
    img: "/images/virtus_stock.png",
    potential: "Very High",
    stock_power: "150 HP / 250 Nm",
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
    owner_builds: [
      { title: "The Slavia vRS Project", desc: "A Stage 2 Slavia running a custom map by Wolf Moto, lowered on Cobra springs.", img: "https://www.team-bhp.com/forum/attachments/modifications-accessories/2345591d1660378033-volkswagen-virtus-gets-lowered-18-inch-alloys-img_20220812_213600.jpg" }
    ]
  },
  "bmw-m340i": {
    name: "BMW M340i (xDrive)",
    category: "Premium Performance",
    description: "The B58 is the modern 2JZ. It is famously over-engineered and can handle massive power on stock internals.",
    img: "/images/m340i_stock.png",
    potential: "God-Tier",
    stock_power: "374 HP / 500 Nm",
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
    owner_builds: [
      { title: "The Supercar Slayer", desc: "Running a Pure800 turbo and custom E50 tune, 10-second quarter mile.", img: "https://www.tuningblog.eu/wp-content/uploads/2021/04/BMW-M340i-G20-Tuning-MANHART-MH3-400d-5.jpg" }
    ]
  },
  "mercedes-amg-c43": {
    name: "Mercedes-AMG C43",
    category: "Premium Performance",
    description: "AMG's entry-level beast. The M276 responds incredibly well to increased boost.",
    img: "/images/c43_stock.png",
    potential: "Very High",
    stock_power: "390 HP / 520 Nm",
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
    owner_builds: [
      { title: "The Autobahn Express", desc: "Stage 2 C43 producing violent exhaust crackles and 0-100kmph in 3.8s.", img: "https://mbworld.org/forums/attachments/c450-c43-amg/381504d1502462375-my-c43-amg-build-thread-2.jpg" }
    ]
  },
  "fiat-abarth-punto": {
    name: "Fiat Abarth Punto",
    category: "The Classics",
    description: "The original Indian hot hatch. A 1.4 T-Jet engine that loves to be pushed.",
    img: "/images/abarth_stock.png",
    potential: "High",
    stock_power: "145 HP / 212 Nm",
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
    owner_builds: [
      { title: "The Scorpion King", desc: "TD04 Turbo upgraded Abarth pushing 240HP at the wheels.", img: "https://www.tuningblog.eu/wp-content/uploads/2019/12/Fiat-Abarth-Punto-Evo-Widebody-Tuning-1.jpg" }
    ]
  },
  "mini-cooper-s": {
    name: "Mini Cooper S (F56)",
    category: "Premium Performance",
    description: "Go-kart handling meets BMW's B48 engine. Huge tuning potential.",
    img: "/images/mini_stock.png",
    potential: "Extreme",
    stock_power: "192 HP / 280 Nm",
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
    owner_builds: [
      { title: "JCW Killer", desc: "Stage 2 Cooper S that runs faster times than a factory JCW.", img: "https://upload.wikimedia.org/wikipedia/commons/f/ff/MINI_John_Cooper_Works_GP_%2849842524796%29.jpg" }
    ]
  },
  "porsche-911": {
    name: "Porsche 911 (992 Carrera S)",
    category: "Supercars",
    description: "The 3.0L twin-turbo flat-six responds incredibly well to simple ECU calibration.",
    img: "/images/porsche_stock.jpg",
    potential: "God-Tier",
    stock_power: "450 HP / 530 Nm",
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
    owner_builds: [
      { title: "GT3 Hunter", desc: "A Stage 2 Carrera S that walks away from a GT3 on the straights.", img: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Porsche_911_GT3_RS_%28992%29_1X7A6841.jpg" }
    ]
  },
  "audi-rs5": {
    name: "Audi RS5 (B9)",
    category: "Supercars",
    description: "2.9L Twin-Turbo V6 developed with Porsche. A monster off the line with Quattro.",
    img: "/images/rs5_stock.jpg",
    potential: "Extreme",
    stock_power: "450 HP / 600 Nm",
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
    owner_builds: [
      { title: "The Quattro Rocket", desc: "0-100 in 3.1 seconds with just a Stage 2 tune and downpipes.", img: "https://upload.wikimedia.org/wikipedia/commons/6/69/Audi_RS_5_DTM_2019_%28Mike_Rockenfeller%29.jpg" }
    ]
  },
  "honda-city-ivtec": {
    name: "Honda City 1.5 i-VTEC",
    category: "The NA Legends",
    description: "Naturally Aspirated engines are harder to tune, but the i-VTEC is legendary for its high-revving nature.",
    img: "/images/city_stock.jpg",
    potential: "Medium",
    stock_power: "119 HP / 145 Nm",
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
    owner_builds: [
      { title: "VTEC Kicked In", desc: "Globally inspired turbo-city build running a GT28 turbo.", img: "https://www.team-bhp.com/forum/attachments/modifications-accessories/2043641d1597463554-tastefully-modified-cars-india-1.jpg" }
    ]
  },
  "hyundai-i20-nline": {
    name: "Hyundai i20 N Line",
    category: "Modern Hot Hatches",
    description: "Hyundai's sporty offering. The 3-cylinder turbo is surprisingly robust.",
    img: "/images/i20_stock.jpg",
    potential: "Medium-High",
    stock_power: "120 HP / 172 Nm",
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
    owner_builds: [
      { title: "The Rally Hatch", desc: "Stage 2 N-Line with a Borla exhaust and pops.", img: "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/ExtraImages/20211124041708_Hyundai_i20_N_Line_WRC_1.jpg" }
    ]
  }
};
