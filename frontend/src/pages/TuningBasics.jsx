import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, Info, X, CheckCircle, XCircle } from 'lucide-react'

const TOPICS = [
  {
    id: 'software', title: 'ECU Tuning (Software)', emoji: '⚡', difficulty: 'Beginner', color: '#facc15', costBadge: '₹25K–60K',
    img: '/images/hardware_ecu.png',
    content: "Modern cars are controlled by an Engine Control Unit (ECU). A 'Tune' or 'Remap' changes the software parameters — increasing boost, optimising fueling, and advancing ignition timing. It's done via the OBD2 port in under 30 minutes and is completely reversible.",
    subtopics: [
      { name: 'Flash Tune', desc: 'Completely overwrites the factory ECU software via the OBD2 port (Bootmod3, Revo, APR, Cobb). Gold standard — precise, clean, reversible.' },
      { name: 'Piggyback (JB4)', desc: 'A physical box intercepting sensor signals to trick the ECU. Cheaper but less precise. Less suitable for high power builds.' },
      { name: 'TCU Tune', desc: 'Transmission Control Unit remap. Increases DSG/DCT clutch clamping force to handle extra torque. Always pair with ECU tune.' },
      { name: 'OTS vs Custom Map', desc: 'Off-The-Shelf maps work on standard cars without a dyno session. Custom maps are calibrated specifically to your car for maximum safe power.' },
    ],
    indiaTip: 'Always specify your fuel grade to your tuner. A map built for Speed 97 (95 RON) will cause dangerous detonation on regular 91 RON pump petrol. Most Indian tuners offer separate maps for 91 RON and 95/97 RON.',
    mistakes: [
      'Tuning a car with dirty plugs, old oil, or existing fault codes — always do a pre-tune service first.',
      'Not getting a TCU tune alongside the ECU remap on DSG/DCT cars — the clutch will slip and eventually fail (₹80K+ replacement).',
      'Accepting a tune without reviewing the data log — always ask for boost trace, AFR readings, and knock count.',
    ]
  },
  {
    id: 'turbo', title: 'Turbochargers & Boost', emoji: '🌀', difficulty: 'Intermediate', color: '#38bdf8', costBadge: '₹1.5L–4L+ (upgrade)',
    img: '/images/hardware_turbo.png',
    content: 'A turbocharger uses exhaust gas energy to spin a compressor, forcing more air into the engine. More air = more fuel = more power. Understanding boost fundamentals is essential before spending on any hardware upgrade.',
    subtopics: [
      { name: 'Compressor Wheel', desc: 'Sucks in fresh air and compresses it. A bigger wheel moves more air but takes longer to spool (turbo lag).' },
      { name: 'Turbine Wheel', desc: 'Driven by hot exhaust gases. Its size determines how quickly the turbo responds to throttle input.' },
      { name: 'Wastegate', desc: 'Regulates maximum boost pressure by bypassing exhaust gases around the turbine. Controls how much power you make.' },
      { name: 'BOV / BPV', desc: 'Blow-Off Valve / Bypass Valve — releases excess pressure when you lift off throttle, preventing compressor surge.' },
      { name: 'Turbo Lag', desc: 'The delay between pressing throttle and boost building. Smaller turbos spool faster but have a lower power ceiling.' },
      { name: 'Hybrid vs Full Turbo Swap', desc: 'A hybrid turbo uses the stock frame with larger compressor/turbine wheels — bolt-on, quick spool. A full swap (IS38, Pure800) is Stage 3 territory.' },
    ],
    indiaTip: 'Hybrid turbos are the sweet spot for India — they spool quickly for city driving and provide massive gains without big-turbo lag. For a Polo TSI or Virtus GT, a hybrid turbo + FMIC + Stage 2 map is the most popular Indian build achieving 260-280 HP on a daily driver.',
    mistakes: [
      'Going straight to a large turbo without upgrading supporting hardware (FMIC, fuelling, internals first).',
      'Not idling for 60 seconds before hard driving — the turbo needs oil circulating before stress.',
      'Hot-shutting the engine immediately after hard running — idle for 2 minutes to cool turbo bearings.',
    ]
  },
  {
    id: 'cooling', title: 'Cooling & Airflow', emoji: '❄️', difficulty: 'Beginner', color: '#67e8f9', costBadge: '₹35K–1.2L',
    img: '/images/hardware_cooling.png',
    content: 'Compressing air generates extreme heat — up to 150°C out of the turbo. Hot, less-dense air causes knock and power loss. In India\'s 45°C summers, cooling upgrades are not optional; they are survival equipment for a tuned car.',
    subtopics: [
      { name: 'Front-Mount Intercooler (FMIC)', desc: 'Replaces or supplements the stock intercooler. Mounted at the front for maximum airflow. Drops IATs by 20-35°C.' },
      { name: 'Cold Air Intake', desc: 'Replaces the restrictive factory airbox. Draws cooler external air into the engine for better charge density.' },
      { name: 'Water-Meth Injection (WMI)', desc: 'Sprays water + methanol mist into the intake. Acts as a liquid intercooler and raises effective octane by 3-5 RON. India\'s E85 substitute.' },
      { name: 'IAT Sensor', desc: 'Intake Air Temperature sensor. Above ~40°C, the ECU pulls ignition timing to protect the engine — directly cutting power.' },
      { name: 'Oil Cooler', desc: 'Keeps engine oil in the optimal 80-100°C range during hard track use. Essential for Stage 3 builds.' },
    ],
    indiaTip: 'A stock-intercooler Stage 2 Polo TSI can lose 25-30 HP by lap 5 on a track day versus its first cold pull — purely from heat soak. A quality FMIC (₹40-65K Indian-made) is the single best investment for consistent performance year-round. Never skip it in India.',
    mistakes: [
      'Running Stage 2 power on a stock intercooler in Indian summer — power will drop 15-25% by the 3rd hard pull.',
      'Mounting a cold air intake too low — during monsoon, the engine can hydrolock from water ingestion. Keep intakes inside the bay.',
      'Not data-logging IATs during a tune session — if you don\'t know your IATs, you don\'t know if your intercooler is working.',
    ]
  },
  {
    id: 'exhaust', title: 'Exhaust Systems', emoji: '🔥', difficulty: 'Intermediate', color: '#a78bfa', costBadge: '₹18K–1L',
    img: '/images/hardware_exhaust.png',
    content: 'Getting exhaust gases out quickly reduces backpressure, allowing the turbo to spool faster and produce more power. The downpipe (immediately after the turbo) is the single most impactful hardware mod on any turbocharged car.',
    subtopics: [
      { name: 'Decat Downpipe', desc: 'Removes the catalytic converter from the pipe directly after the turbo. Turbo spools 300-500 RPM earlier. Most impactful hardware mod.' },
      { name: 'High-Flow Cat (HFC)', desc: 'Retains a catalytic converter but with dramatically less restriction. Quieter than a decat, still flows significantly better than stock.' },
      { name: 'Cat-Back Exhaust', desc: 'Everything from the cat rearward. Mainly for sound improvement and minor flow gains. Indian brands (Shiftex, Cobra) are excellent value.' },
      { name: 'Resonator Delete', desc: 'Removes the mid-pipe resonator for a louder, more aggressive exhaust note without the full cost of a cat-back.' },
      { name: 'Headers / Manifold', desc: 'On NA engines, tubular headers replace the stock cast iron manifold for better exhaust scavenging and higher-RPM power.' },
    ],
    indiaTip: 'An Indian-fabricated stainless steel downpipe from Wolf Moto or Cobra Motorsport costs ₹18,000-25,000 and performs as well as imported options costing ₹50,000+ after 40-50% customs duty. For sound: Indian catbacks from Shiftex or Cobra are the best value in the market.',
    mistakes: [
      'Installing a decat downpipe without a Stage 2 remap — the ECU throws P0420 (cat efficiency fault) and may enter limp mode.',
      'Buying an imported exhaust without calculating customs duty — total landed cost is often 2-2.5x the listed price.',
      'Fitting a loud exhaust without checking noise limits — 80dB is the legal limit in India, and some states enforce it actively.',
    ]
  },
  {
    id: 'internals', title: 'Forging & Engine Internals', emoji: '🔩', difficulty: 'Advanced', color: '#f87171', costBadge: '₹1.5L–4L+',
    img: '/images/hardware_piston.png',
    content: "When increasing power beyond Stage 2, the factory cast pistons and connecting rods can't withstand extreme cylinder pressures. 'Forging' means replacing them with far stronger components, allowing the engine to safely hold 300–600+ HP.",
    subtopics: [
      { name: 'Forged Pistons', desc: 'Made from extruded aluminium billets. Withstand far higher temperatures and pressures than factory cast pistons. Mandatory for Stage 3+.' },
      { name: 'Connecting Rods', desc: 'The weakest link in most high-power builds. H-beam or I-beam forged rods prevent catastrophic bent or broken rod failures.' },
      { name: 'ARP Head Studs', desc: 'Replace stock head bolts with stronger studs to prevent head gasket failure under extreme boost. ₹35K and absolutely worth it.' },
      { name: 'Engine Blueprinting', desc: 'Precision measurement and machining of all internal clearances to exact specifications. Maximises reliability and efficiency.' },
    ],
    indiaTip: 'Full forged engine builds that cost $5,000 in the USA can be completed for ₹1.5-2.5L in India at top workshops like Harmonixx, Wolf Moto, or Code6. This makes Stage 3 builds genuinely accessible in India compared to any other country.',
    mistakes: [
      'Pushing Stage 3 power on stock internals — you will crack a piston or bend a rod, destroying the engine.',
      'Skipping ARP head studs on a high-boost build — stock bolts stretch under pressure and the head gasket fails.',
      'Using cheap Chinese forged parts — stick to Wiseco (pistons) and Manley or CP Carrillo (rods) for known quality.',
    ]
  },
  {
    id: 'transmission', title: 'Transmission & Drivetrain', emoji: '⚙️', difficulty: 'Advanced', color: '#fb923c', costBadge: '₹40K–2.5L',
    img: '/images/hardware_transmission.png',
    content: "Power is useless if it can't reach the wheels. A 400 HP engine with a stock clutch will burn it out in weeks. Building the drivetrain ensures power translates to motion reliably and safely.",
    subtopics: [
      { name: 'Upgraded Clutch Kit', desc: 'Stronger friction material for manuals, or clutch pack upgrades for DSG/DCT. Essential when torque exceeds the stock clutch rating.' },
      { name: 'Limited Slip Differential (LSD)', desc: 'Distributes power between driven wheels to prevent one-wheel spin. Transforms corner exit and launch traction dramatically.' },
      { name: 'Upgraded CV Axles', desc: 'Prevents driveshaft snap during hard launches at high torque. Often overlooked until it fails at the worst moment.' },
      { name: 'Short Shifter', desc: 'Reduces gear-lever throw for faster manual shifts. Minor improvement but highly satisfying for driver engagement.' },
    ],
    indiaTip: 'The DSG clutch pack is the most common casualty on remapped VW/Skoda cars. ALWAYS get a TCU tune with your ECU remap. Without it, the clutch pack slips under the extra torque and eventually fails — replacement costs ₹80,000+. This is the single most common and preventable tuning mistake in India.',
    mistakes: [
      'Skipping the TCU tune on a DSG car — the clutch will slip and burn out within weeks of hard driving.',
      'Aggressive launches before the drivetrain is properly built — snapped axles and bent half-shafts are expensive and dangerous.',
      'Fitting a mechanical LSD without a proper 4-wheel alignment — it will cause severe understeer if toe/camber aren\'t corrected.',
    ]
  },
  {
    id: 'suspension', title: 'Handling & Suspension', emoji: '🏎️', difficulty: 'Intermediate', color: '#4ade80', costBadge: '₹15K–3L',
    img: '/images/hardware_suspension.png',
    content: 'Speed is not only about straight-line power. A car that corners well is faster on any road. Suspension upgrades reduce body roll, improve grip, and make the car respond precisely to driver inputs.',
    subtopics: [
      { name: 'Lowering Springs', desc: '15-25mm drop. Reduces centre of gravity and slightly stiffens the ride. A great, affordable first handling mod.' },
      { name: 'Coilovers', desc: 'Fully adjustable suspension replacing shock and spring together. Tune ride height and damping. KW V1 / Bilstein B14 offer the best value.' },
      { name: 'Upgraded Sway Bars', desc: 'Thicker anti-roll bars connecting left and right suspension. Massively reduces body roll without affecting ride height or spring rates.' },
      { name: 'Wheel Spacers', desc: 'Moves wheels further out from the hub. Wider track improves stability, but too wide can stress wheel bearings over time.' },
      { name: 'Alignment & Corner Weighting', desc: 'A proper 4-wheel alignment after any suspension change transforms handling. Neglected by most, it\'s actually the most important step.' },
    ],
    indiaTip: 'Do NOT go below 20mm of drop for a daily driver in India. Speed breakers will constantly bottom out a slammed car and damage the suspension. The best single handling upgrade for Indian roads is a thicker rear sway bar — it kills understeer without ruining ground clearance. Set coilover damping softer than European specs.',
    mistakes: [
      'Dropping more than 25mm for daily use — you will scrape every second speed breaker in India and damage the underbody.',
      'Skipping the wheel alignment after any suspension change — the car will wear tyres unevenly and handle poorly.',
      'Installing coilovers at maximum stiffness — the correct Indian-roads setting is usually 30-40% from minimum.',
    ]
  },
  {
    id: 'fuels', title: 'Alternate Fuels & WMI', emoji: '⛽', difficulty: 'Advanced', color: '#e879f9', costBadge: '₹25K–80K (kit)',
    img: '/images/hardware_fuels.png',
    content: "Standard 91/95 octane petrol limits how aggressively an engine can be tuned. Specialist fuels and injection systems allow far more timing advance, higher boost, and significantly more power — at the cost of added system complexity.",
    subtopics: [
      { name: 'E85 (Ethanol)', desc: '85% ethanol blend. ~105 RON octane. Burns far cooler, allowing extreme timing advance. Unavailable at Indian fuel pumps.' },
      { name: 'Flex Fuel Kit', desc: 'An ethanol content sensor that adjusts the ECU map in real-time based on what fuel is in the tank. Popular in the USA and Brazil.' },
      { name: 'Water-Methanol Injection (WMI)', desc: "India's E85 substitute. Sprays water + methanol into the intake. Cools the charge and effectively raises octane by 3-5 RON." },
      { name: 'Port Injection (PI)', desc: 'Adds secondary injectors in the intake manifold for E30/E50 fuelling when primary injectors are at their flow limit.' },
    ],
    indiaTip: 'Since E85 is completely unavailable at Indian petrol stations, WMI (Water-Methanol Injection) is the go-to high-octane substitute. A WMI kit costs ₹25,000-40,000 and can safely add 3-5% power while acting as both an octane booster and liquid intercooler. Use a 50/50 water-methanol mix with 99.9% pure industrial methanol available from chemical suppliers.',
    mistakes: [
      'Running an E85-calibrated map on Indian pump petrol — the engine runs dangerously lean and will detonate.',
      'Using contaminated methanol in WMI — always use 99.9% pure industrial methanol, not windscreen washer fluid.',
      'Installing WMI without a matching ECU tune to take advantage of it — WMI without a specific tune provides zero power benefit.',
    ]
  },
  {
    id: 'braking', title: 'Braking & Wheels', emoji: '🛑', difficulty: 'Intermediate', color: '#f472b6', costBadge: '₹8K–4L',
    img: '/images/hardware_ecu.png',
    content: 'As power increases, so does the need to stop quickly. Stock brakes fade under repeated heavy use. Upgrading braking hardware and fitting the right tyres keeps you safe and confident whether on track or spirited road use.',
    subtopics: [
      { name: 'Performance Brake Pads', desc: 'Higher temperature compounds (EBC Yellowstuff, Hawk HPS, Ferodo DS2500). Dramatically reduces brake fade under hard use. Cheapest upgrade.' },
      { name: 'Braided Brake Lines', desc: 'Steel-braided lines don\'t expand under pressure like rubber hoses. Firmer, more consistent pedal feel for better modulation.' },
      { name: 'Big Brake Kit (BBK)', desc: '6-piston Brembo or AP Racing calipers with 355-380mm rotors. Required for serious track use. Looks incredible through open-spoke alloys.' },
      { name: 'Performance Tyre Compound', desc: 'Michelin PS4S, Bridgestone RE003, Yokohama Advan V105. The single biggest grip upgrade on any car — worth more than any other handling mod.' },
      { name: 'Wheel Weight', desc: 'Lighter alloy wheels reduce unsprung mass. 1kg reduction per wheel equals approximately 5kg of body weight removed in handling response.' },
    ],
    indiaTip: 'Most Indian tyres (MRF, CEAT, Apollo) are optimised for fuel economy, not grip. Switching to a Michelin Pilot Sport 4S or Yokohama Advan V105 transforms the handling without a single mechanical change. This is often the highest value-per-rupee mod available for any Indian tuned car.',
    mistakes: [
      'Using track-spec brake pads for daily driving — cold high-temp pads give terrible stopping power until they reach operating temperature.',
      'Upsizing wheels beyond +2 inches over stock — heavier and larger wheels hurt acceleration, ride quality, and steering feel.',
      'Ignoring tyre age — a performance tyre more than 5 years old is dangerous regardless of remaining tread depth.',
    ]
  },
  {
    id: 'aesthetics', title: 'Aesthetics vs Function', emoji: '🎨', difficulty: 'Beginner', color: '#818cf8', costBadge: '₹5K–5L',
    img: '/images/hardware_ecu.png',
    content: "Not every visual modification improves performance. Understanding which body modifications genuinely help aerodynamics — and which are purely cosmetic — helps you spend wisely and avoid adding weight without purpose.",
    subtopics: [
      { name: 'Front Splitter (Functional)', desc: 'A properly designed splitter at the correct height increases front downforce at speed. Must be mounted at the right angle to generate genuine aerodynamic effect.' },
      { name: 'Rear Spoiler (Functional)', desc: 'A properly angled spoiler adds rear downforce. Most aesthetic wings are not angled correctly and generate no meaningful downforce.' },
      { name: 'Diffuser', desc: 'Manages airflow under the car to generate downforce. Genuine aerodynamic effect requires a flat underbody. Common on race cars, rarely functional on street builds.' },
      { name: 'Carbon Fibre Panels', desc: 'Real weight savings from CF bonnet, roof, and boot lid. Purely cosmetic CF trim pieces add weight, not remove it.' },
      { name: 'Vinyl Wraps', desc: 'Zero performance impact. Excellent for colour changes without permanent paint. Quality wraps last 5-7 years and protect the original paint.' },
    ],
    indiaTip: 'In India, aggressive body kits carry legal risk — any structural modification protruding beyond the original bodywork can be flagged by the RTO during inspection. Prefer cosmetic mods that stay within original body dimensions for any daily-driven build. Wraps, subtle spoilers, and OEM+ styling are the safest approaches.',
    mistakes: [
      'Adding a large rear wing to a FWD car — FWD cars need front downforce, not rear. A big wing can worsen understeer and handling balance.',
      'Buying cheap fibreglass body kits — panel gaps, poor fitment, and fragility make them look worse than stock within a year.',
      'Assuming any aerodynamic part helps at road speeds — below 200 km/h, most aftermarket spoilers generate negligible real-world downforce.',
    ]
  },
  {
    id: 'dyno', title: 'Dyno & Data Logging', emoji: '📊', difficulty: 'Intermediate', color: '#34d399', costBadge: '₹2K–8K per session',
    img: '/images/hardware_ecu.png',
    content: "A dynamometer measures your car's power output at the wheels. Understanding how to read a dyno sheet and interpret data logs is the difference between a blindly-tuned car and a properly calibrated one. Data is your best protection.",
    subtopics: [
      { name: 'Rolling Road Dyno', desc: 'Car sits on rollers; rear wheels drive the measurement system. Common in India. Adds ~5% measurement error vs hub dynos due to tyre slip.' },
      { name: 'Hub Dyno', desc: 'Wheels removed; hub bolted directly to the dyno. Most accurate measurement. Rare in India — mainly at professional race shops.' },
      { name: 'Torque Curve Shape', desc: 'A wide, flat torque curve from low RPM is ideal for street driving. A sharp peak suits track use. Always look at curve shape, not only peak numbers.' },
      { name: 'AFR (Air-Fuel Ratio)', desc: '11.5–12.5:1 at full throttle is the target on petrol. Lean (above 13:1) = knock risk. Rich (below 11:1) = power and efficiency loss.' },
      { name: 'Knock Count', desc: 'Target: zero knock events. Even a single knock event in the log means the tune needs conservative adjustment before further running.' },
      { name: 'Boost Trace', desc: 'Should hit target boost cleanly and hold flat. Spikes or drops indicate boost control issues or boost leaks.' },
    ],
    indiaTip: 'Indian dyno pulls in summer can read 5-8% lower than winter due to hot, less-dense ambient air. Always compare pulls in the same conditions. Ask for back-to-back pulls on a heat-soaked car — a tune that holds power after 5 consecutive pulls is a properly calibrated tune.',
    mistakes: [
      'Trusting only the peak HP number — look at the entire torque curve and complete data log.',
      'Dyno testing on a cold engine — the car must be at full operating temperature before any baseline or tune pull.',
      'Not getting a baseline dyno pull before the tune — you have no reference point for how much power was actually gained.',
    ]
  },
  {
    id: 'obd', title: 'OBD Diagnostics & Logging', emoji: '🔌', difficulty: 'Beginner', color: '#60a5fa', costBadge: '₹1.5K–15K',
    img: '/images/hardware_ecu.png',
    content: "The OBD2 port under your dashboard is the gateway to everything happening inside your car's ECU. With the right tools, you can read live data, log boost and AFR, detect faults before they become expensive, and even flash your own tune.",
    subtopics: [
      { name: 'OBD2 Scanner', desc: 'A basic scanner (₹2,000-5,000) reads and clears fault codes (DTCs). Essential for diagnosing check engine lights before any tune session.' },
      { name: 'Torque Pro App', desc: 'Android app + ELM327 Bluetooth adapter (₹1,500 total). Logs live data: boost pressure, IAT, coolant temp, RPM. Great for on-the-go monitoring.' },
      { name: 'OBDLink MX+', desc: 'Premium OBD adapter (₹7,000) compatible with Bootmod3, MHD, and Cobb Accessport. Faster refresh rate, more accurate readings than budget adapters.' },
      { name: 'Cobb Accessport', desc: 'Standalone tuning device that plugs into the OBD port. Flashes maps, logs data, and displays gauges. Widely used for Subaru, Ford, Mitsubishi platforms.' },
      { name: 'Reading DTCs', desc: 'P codes = Powertrain, B = Body, C = Chassis, U = Network. P0xxx = generic across brands, P1xxx = manufacturer-specific. Always research the exact code before assuming the worst.' },
    ],
    indiaTip: 'In India, a basic ELM327 Bluetooth adapter (₹800-1,500) + Torque Pro Android app (₹500) is an extremely powerful combo. You can monitor boost pressure, intake air temperature, and coolant temperature in real time on your phone. This is how you diagnose heat soak and detect knock — both are common issues for tuned cars in Indian summer conditions.',
    mistakes: [
      'Ignoring a check engine light before a tune session — clear and identify all faults first.',
      'Using cheap Chinese ELM327 adapters for ECU flashing — low-quality adapters can corrupt the ECU firmware. Use quality adapters for flashing only.',
      'Trusting generic OBD AFR readings as precise data — the generic OBD AFR uses a narrow-band sensor estimate, not an accurate wideband reading.',
    ]
  },
  {
    id: 'maintenance', title: 'Post-Tune Maintenance', emoji: '🛠️', difficulty: 'Beginner', color: '#94a3b8', costBadge: '₹5K–15K / service',
    img: '/images/hardware_ecu.png',
    content: "A tune dramatically increases thermal and mechanical stress on every engine component. Maintenance intervals designed for a 100 HP stock car must be shortened significantly on a 200+ HP tuned build. Neglecting this is the most common cause of premature tuned-engine failures.",
    subtopics: [
      { name: 'Engine Oil', desc: 'Change every 5,000-7,500 km on a tuned turbo engine. Use the manufacturer-specified grade (e.g., 5W-40 on VAG turbos). Never exceed 10,000 km on a tune.' },
      { name: 'Spark Plugs', desc: 'Replace every 15,000-20,000 km on a tuned car. Stage 2+: Iridium plugs one heat range colder than stock (NGK or Denso iridium). Critical.' },
      { name: 'Coolant System', desc: 'Check level and condition every 6 months. Flush and replace every 2 years. Tuned engines generate significantly more heat — do not neglect this.' },
      { name: 'Air Filter', desc: 'Inspect every 8,000-10,000 km in India\'s dusty conditions. Performance panel filters (K&N, BMC) can be cleaned and re-oiled. Disposable filters must be replaced.' },
      { name: 'Turbo Oil Feed', desc: 'Inspect feed line for blockage or carbon deposits every 20,000 km. A blocked oil feed destroys turbo bearings within hours.' },
      { name: '1,000 km Post-Tune Check', desc: 'The first oil change after a tune often reveals metal particles as the engine settles into the new power level. Always inspect the oil and filter carefully.' },
    ],
    indiaTip: 'In India\'s dusty conditions, air filters block up significantly faster than European service intervals suggest. Check your air filter every 8,000 km rather than the manufacturer\'s 15,000-20,000 km interval. A clogged air filter on a tuned car noticeably reduces power and can cause rich-running conditions that wash oil off cylinder walls.',
    mistakes: [
      'Using stock engine oil change intervals on a tuned car — a tuned engine pushes oil twice as hard as stock.',
      'Ignoring small oil leaks — tuned engines create higher crankcase pressure, turning small leaks into large ones quickly.',
      'Not doing the 1,000 km post-tune oil change — metal particles from the first hard sessions should be inspected and flushed.',
    ]
  },
]

TOPICS.sort((a, b) => {
  const order = { Beginner: 1, Intermediate: 2, Advanced: 3 }
  return order[a.difficulty] - order[b.difficulty]
})

const FUN_FACTS = [
  'Did you know? A decat downpipe makes your turbo spool almost 500 RPM earlier.',
  'E85 fuel burns so cool that intake manifolds can form ice condensation on them.',
  'A modern Stage 1 flash tune adds up to 80 HP in just 10 minutes via the OBD port.',
  'Water-Methanol injection was originally developed for WWII fighter aircraft to generate emergency boost at altitude.',
  'India\'s 45°C ambient temperatures can cut a stock-intercooler car\'s power by 8-12% on a hot day.',
  'Weight reduction is free horsepower — losing 50kg is roughly equivalent to gaining 10-15 HP.',
  'A proper wheel alignment after suspension changes can improve lap times by 1-2 seconds without any power mods.',
  'The fastest FWD drag cars make over 1,500 HP on four-cylinder engines.',
  'A DSG gearbox can shift gears in under 8 milliseconds — faster than any human reaction time.',
  'An upgraded intercooler on a hot day preserves more power than it gains on a cold one — it prevents heat soak.',
]

const QUIZ = [
  { question: 'What does ECU stand for?', options: ['Engine Control Unit', 'Electronic Car Upgrade', 'Engine Cooling Unit'], correct: 0 },
  { question: 'What is the purpose of a wastegate?', options: ['Cool the engine', 'Regulate boost pressure', 'Filter fuel'], correct: 1 },
  { question: 'What does a decat downpipe remove?', options: ['The turbo', 'The catalytic converter', 'The air filter'], correct: 1 },
  { question: 'What is the ideal AFR at full throttle on petrol?', options: ['14.7:1 (stoich)', '11.5–12.5:1', '16:1 (lean)'], correct: 1 },
  { question: 'What does WMI do in India?', options: ['Replaces the ECU', 'Acts as E85 substitute + liquid intercooler', 'Replaces the turbo'], correct: 1 },
  { question: 'Why must you TCU tune a DSG car?', options: ['For better fuel economy', 'To handle extra torque without clutch slip', 'To improve idle quality'], correct: 1 },
  { question: 'What is heat soak?', options: ['Engine overheating', 'Intercooler losing efficiency from absorbed heat', 'Burning fuel too rich'], correct: 1 },
  { question: 'Which is the most impactful hardware mod on a turbo car?', options: ['Cat-back exhaust', 'Decat downpipe', 'Panel air filter'], correct: 1 },
]

const GLOSSARY = [
  { category: 'Engine', term: 'AFR (Air-Fuel Ratio)', desc: 'The mass ratio of air to solid, liquid, or gaseous fuel present in combustion. Ideal for petrol is ~14.7:1 (stoichiometric), but turbo cars run richer (11.5-12.5:1) under boost for safety.', india: 'Indian 91 RON fuel burns hotter, requiring richer AFRs than UK/US tunes to prevent melt.' },
  { category: 'Engine', term: 'EGT (Exhaust Gas Temp)', desc: 'Temperature of the exhaust gases leaving the cylinder. Dangerously high EGTs can melt turbo impellers and exhaust valves.', india: 'Indian summers push EGTs to the limit. A safe tune monitors EGTs and adds fuel (runs richer) to cool the cylinder.' },
  { category: 'Engine', term: 'Knock (Detonation)', desc: 'When the air-fuel mixture ignites spontaneously before the spark plug fires. It causes massive pressure spikes and can destroy pistons instantly.', india: 'The #1 enemy of tuned cars in India due to poor 91 RON fuel quality. Always log for knock retard.' },
  { category: 'Engine', term: 'IAT (Intake Air Temp)', desc: 'The temperature of the air entering the engine. Hot air is less dense = less oxygen = less power.', india: 'In 45°C ambient, stock intercoolers heat soak instantly. A larger intercooler is required to keep IATs low.' },
  { category: 'Engine', term: 'Timing Advance', desc: 'Igniting the spark plug earlier in the compression stroke. More advance = more power, but heavily increases knock risk.', india: 'Tuners must pull (reduce) timing for Indian 91 RON to prevent engine failure. A 95/97 RON map has more timing advance.' },
  { category: 'Turbo', term: 'Boost & Spool', desc: 'Boost is the pressure created by the turbo (measured in PSI or Bar). Spool is how fast the turbo reaches its target boost.', india: 'Stop-and-go Indian traffic makes fast-spooling hybrid turbos much more enjoyable for daily driving than laggy big turbos.' },
  { category: 'Engine', term: 'Lambda', desc: 'Another way to express AFR. Lambda 1.0 = Stoichiometric. Lambda 0.85 = Rich (safe for boost).', india: 'Most modern ECU logs (like VW/Skoda) use Lambda instead of AFR.' },
  { category: 'Transmission', term: 'DSG / DCT', desc: 'Direct-Shift Gearbox / Dual-Clutch Transmission. Uses two clutches for lightning-fast gear changes.', india: 'Very common on VW/Skoda (DQ200, DQ250). The dry-clutch DQ200 is notoriously fragile and requires strict torque limits in tuning.' },
  { category: 'Software', term: 'Piggyback', desc: 'An external box (like a JB4) that intercepts sensor signals to trick the ECU into making more boost.', india: 'Popular for cars under warranty since they can be physically removed before service, though deep ECU scans can still detect them.' },
  { category: 'Transmission', term: 'TCU', desc: 'Transmission Control Unit. The computer that controls shift points, shift speed, and clutch clamping pressure.', india: 'A TCU tune is mandatory on DQ200/DQ250 gearboxes in India when going Stage 1+ to prevent the clutch from slipping.' },
]

const DIFF_STYLE = {
  Beginner:     { bg: 'rgba(74,222,128,0.14)',  text: '#4ade80', border: 'rgba(74,222,128,0.3)' },
  Intermediate: { bg: 'rgba(250,204,21,0.14)',  text: '#facc15', border: 'rgba(250,204,21,0.3)' },
  Advanced:     { bg: 'rgba(248,113,113,0.14)', text: '#f87171', border: 'rgba(248,113,113,0.3)' },
}

export default function TuningBasics() {
  const [openTopic, setOpenTopic] = useState(null)
  const [filterDiff, setFilterDiff] = useState('All')
  const [glossaryTab, setGlossaryTab] = useState('Engine')
  const [openGlossaryItem, setOpenGlossaryItem] = useState(null)
  const [explored, setExplored] = useState(new Set())
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' && window.innerWidth >= 1024)
  const [fact, setFact] = useState(null)
  const [showFact, setShowFact] = useState(false)
  const [quiz, setQuiz] = useState(null)
  const [selectedAns, setSelectedAns] = useState(null)
  const [quizResult, setQuizResult] = useState(null)
  const openCount = useRef(0)
  const usedQuiz = useRef(new Set())
  const topicRefs = useRef({})

  useEffect(() => {
    const h = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => showRandomFact(), 5000)
    const i = setInterval(() => showRandomFact(), 20000)
    return () => { clearTimeout(t); clearInterval(i) }
  }, [])

  const showRandomFact = () => {
    setFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)])
    setShowFact(true)
    setTimeout(() => setShowFact(false), 7000)
  }

  const triggerQuiz = () => {
    if (usedQuiz.current.size >= QUIZ.length) usedQuiz.current.clear()
    let idx
    do { idx = Math.floor(Math.random() * QUIZ.length) } while (usedQuiz.current.has(idx))
    usedQuiz.current.add(idx)
    setQuiz(QUIZ[idx])
    setSelectedAns(null)
    setQuizResult(null)
  }

  const handleTopicToggle = (id) => {
    const willOpen = openTopic !== id
    setOpenTopic(willOpen ? id : null)
    if (willOpen && !explored.has(id)) {
      setExplored(prev => { const n = new Set(prev); n.add(id); return n })
      openCount.current += 1
      if (openCount.current % 3 === 0) setTimeout(triggerQuiz, 700)
    }
  }

  const scrollTo = (id) => {
    setOpenTopic(id)
    if (!explored.has(id)) {
      setExplored(prev => { const n = new Set(prev); n.add(id); return n })
      openCount.current += 1
      if (openCount.current % 3 === 0) setTimeout(triggerQuiz, 700)
    }
    setTimeout(() => topicRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
  }

  const answerQuiz = (idx) => {
    if (selectedAns !== null) return
    setSelectedAns(idx)
    setQuizResult(idx === quiz.correct ? 'correct' : 'wrong')
    setTimeout(() => { setQuiz(null); setSelectedAns(null); setQuizResult(null) }, 2200)
  }

  const pct = (explored.size / TOPICS.length) * 100

  return (
    <div style={{ maxWidth: '100%', margin: 0 }}>

      {/* HERO */}
      <div style={{ padding: '56px 40px 44px', textAlign: 'center', background: 'linear-gradient(180deg, rgba(239,68,68,0.09) 0%, rgba(59,130,246,0.06) 60%, transparent 100%)', borderBottom: '1px solid var(--border)' }}>
        <h1 className="text-gradient" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>
          The Tuning Encyclopedia
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.65 }}>
          From OBD ports to forged internals — 13 topics, India-specific tips, and a quiz to test your knowledge.
        </p>
      </div>

      {/* PROGRESS TRACKER */}
      <div style={{ padding: '18px 32px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 600, whiteSpace: 'nowrap', fontFamily: "'Outfit', sans-serif" }}>
            {explored.size} / {TOPICS.length} topics explored
          </span>
          <div style={{ flex: 1, minWidth: '100px', height: '7px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: pct === 100 ? 'linear-gradient(90deg,#4ade80,#22d3ee)' : 'linear-gradient(90deg,var(--accent-red),var(--accent-blue))', borderRadius: '99px', transition: 'width 0.5s ease' }} />
          </div>
          {pct === 100 && <span style={{ fontSize: '0.82rem', color: '#4ade80', fontWeight: 600 }}>🎉 All done!</span>}
        </div>
      </div>

      {/* LAYOUT */}
      <div style={{ display: 'flex', maxWidth: '1280px', margin: '0 auto', padding: '28px 20px 60px', gap: '28px' }}>

        {/* SIDEBAR */}
        {isDesktop && (
          <aside style={{ width: '210px', flexShrink: 0, position: 'sticky', top: '72px', alignSelf: 'flex-start', maxHeight: 'calc(100vh - 90px)', overflowY: 'auto' }}>
            <h4 style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', padding: '0 10px' }}>Quick Jump</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {TOPICS.map(t => {
                const active = openTopic === t.id
                const done = explored.has(t.id)
                return (
                  <button key={t.id} onClick={() => scrollTo(t.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '9px 10px', background: active ? 'rgba(255,255,255,0.07)' : 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', borderLeft: active ? '3px solid var(--accent-red)' : '3px solid transparent' }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
                  >
                    <span style={{ fontSize: '1rem', lineHeight: 1 }}>{t.emoji}</span>
                    <span style={{ fontSize: '0.82rem', color: active ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: active ? 600 : 400, lineHeight: 1.3, flex: 1 }}>{t.title}</span>
                    {done && !active && <CheckCircle size={11} color="#4ade80" style={{ flexShrink: 0 }} />}
                  </button>
                )
              })}
            </nav>
          </aside>
        )}

        {/* ACCORDIONS */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', minWidth: 0 }}>
          {/* TABS */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map(tab => (
              <button key={tab} onClick={() => setFilterDiff(tab)}
                style={{
                  padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  background: filterDiff === tab ? 'var(--accent-red)' : 'rgba(255,255,255,0.05)',
                  color: filterDiff === tab ? '#fff' : 'var(--text-muted)',
                  fontWeight: filterDiff === tab ? 600 : 400, fontFamily: "'Outfit', sans-serif"
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {TOPICS.filter(t => filterDiff === 'All' || t.difficulty === filterDiff).map(topic => {
            const isOpen = openTopic === topic.id
            const ds = DIFF_STYLE[topic.difficulty]
            return (
              <div key={topic.id} ref={el => topicRefs.current[topic.id] = el}
                className="premium-card"
                style={{ overflow: 'hidden', borderLeft: `4px solid ${topic.color}`, boxShadow: isOpen ? `0 0 28px ${topic.color}12` : undefined, transition: 'box-shadow 0.3s' }}>

                {/* HEADER */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', cursor: 'pointer', userSelect: 'none' }}
                  onClick={() => handleTopicToggle(topic.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '13px', flex: 1, minWidth: 0 }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: `${topic.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem', flexShrink: 0, border: `1px solid ${topic.color}28` }}>{topic.emoji}</div>
                    <h3 style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', color: 'var(--text-primary)', margin: 0, fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>{topic.title}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexShrink: 0 }}>
                    <span style={{ padding: '3px 8px', fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderRadius: '99px', background: ds.bg, color: ds.text, border: `1px solid ${ds.border}`, whiteSpace: 'nowrap' }}>{topic.difficulty}</span>
                    {topic.costBadge && <span style={{ padding: '3px 8px', fontSize: '0.66rem', fontWeight: 700, borderRadius: '99px', background: 'rgba(255,59,48,0.1)', color: 'var(--accent-red)', border: '1px solid rgba(255,59,48,0.2)', whiteSpace: 'nowrap' }}>{topic.costBadge}</span>}
                    {isOpen ? <ChevronUp size={19} color={topic.color} /> : <ChevronDown size={19} color={topic.color} />}
                  </div>
                </div>

                {/* CONTENT */}
                {isOpen && (
                  <div style={{ padding: '0 20px 22px', animation: 'fadeIn 0.28s ease' }}>
                    <div style={{ height: '1px', background: 'var(--border)', marginBottom: '18px' }} />

                    {/* Image */}
                    {topic.img && (
                      <div style={{ width: '100%', height: '210px', borderRadius: '10px', overflow: 'hidden', marginBottom: '18px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={topic.img} alt={topic.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={e => e.target.style.display = 'none'} />
                      </div>
                    )}

                    {/* Main text */}
                    <p style={{ color: 'var(--text-primary)', fontSize: '1.02rem', lineHeight: 1.72, marginBottom: '22px' }}>{topic.content}</p>

                    {/* Subtopics */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, ), 1fr))', gap: '9px', marginBottom: '18px' }}>
                      {topic.subtopics.map((sub, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '13px 15px', borderRadius: '9px', borderLeft: `3px solid ${topic.color}` }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.055)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                        >
                          <h4 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', marginBottom: '4px', fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>{sub.name}</h4>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.55, margin: 0 }}>{sub.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* India Tip */}
                    {topic.indiaTip && (
                      <div style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.22)', borderRadius: '10px', padding: '14px 17px', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '1.05rem', flexShrink: 0, marginTop: '1px' }}>🇮🇳</span>
                          <div>
                            <div style={{ fontWeight: 700, color: '#f87171', fontSize: '0.77rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>India Tip</div>
                            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{topic.indiaTip}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Common Mistakes */}
                    {topic.mistakes?.length > 0 && (
                      <div style={{ background: 'rgba(250,204,21,0.06)', border: '1px solid rgba(250,204,21,0.18)', borderRadius: '10px', padding: '14px 17px' }}>
                        <div style={{ fontWeight: 700, color: '#facc15', fontSize: '0.77rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '9px' }}>⚠️ Common Mistakes</div>
                        {topic.mistakes.map((m, i) => (
                          <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: i < topic.mistakes.length - 1 ? '7px' : 0 }}>
                            <XCircle size={13} color="#f87171" style={{ flexShrink: 0, marginTop: '3px' }} />
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{m}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}

          {/* GLOSSARY SECTION */}
          <div style={{ marginTop: '30px' }} id="glossary">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif", margin: '0 0 4px' }}>Tuning Glossary</h2>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Confused by tuner jargon? Learn the terms.</p>
              </div>
            </div>
            
            {/* Glossary Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {Array.from(new Set(GLOSSARY.map(g => g.category))).map(cat => (
                <button key={cat} onClick={() => setGlossaryTab(cat)}
                  style={{
                    padding: '6px 14px', borderRadius: '99px', border: '1px solid var(--border)', cursor: 'pointer',
                    background: glossaryTab === cat ? 'var(--accent-blue)' : 'var(--surface)',
                    color: glossaryTab === cat ? '#fff' : 'var(--text-primary)',
                    fontWeight: glossaryTab === cat ? 600 : 400, fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Glossary Dropdowns */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {GLOSSARY.filter(g => g.category === glossaryTab).map((item, idx) => {
                const isOpen = openGlossaryItem === item.term;
                return (
                  <div key={idx} className="glass" style={{ borderRadius: '10px', border: '1px solid var(--border)', overflow: 'hidden' }}>
                    <div 
                      onClick={() => setOpenGlossaryItem(isOpen ? null : item.term)}
                      style={{ padding: '16px 20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: isOpen ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                    >
                      <h4 style={{ color: 'var(--accent-blue)', fontSize: '1.05rem', margin: 0, fontFamily: "'Outfit', sans-serif" }}>{item.term}</h4>
                      {isOpen ? <ChevronUp size={18} color="var(--accent-blue)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                    </div>
                    {isOpen && (
                      <div style={{ padding: '0 20px 20px' }}>
                        <p style={{ color: 'var(--text-primary)', fontSize: '0.88rem', lineHeight: 1.5, margin: '0 0 10px' }}>{item.desc}</p>
                        <div style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.2)', padding: '10px', borderRadius: '6px' }}>
                          <div style={{ fontSize: '0.75rem', color: '#fb923c', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>🇮🇳 India Context</div>
                          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>{item.india}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* FUN FACT TOAST */}
      <div style={{ position: 'fixed', bottom: showFact ? '28px' : '-120px', right: '28px', background: 'rgba(18,18,22,0.97)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent-blue)', borderRadius: '12px', padding: '18px 20px', maxWidth: '340px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', transition: 'bottom 0.5s cubic-bezier(0.4,0,0.2,1)', zIndex: 1000, opacity: showFact ? 1 : 0 }}>
        <button onClick={() => setShowFact(false)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={15} /></button>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <Info color="var(--accent-blue)" size={19} style={{ marginTop: '2px', flexShrink: 0 }} />
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Tuning Fact</h4>
            <p style={{ margin: 0, fontSize: '0.87rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>{fact}</p>
          </div>
        </div>
      </div>

      {/* QUIZ MODAL */}
      {quiz && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(7px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px', animation: 'fadeIn 0.25s ease' }}
          onClick={() => { if (selectedAns === null) setQuiz(null) }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'var(--surface,#18181b)', border: '1px solid var(--border)', borderRadius: '16px', padding: '30px', maxWidth: '460px', width: '100%', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🧠</div>
              <div>
                <h3 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 700 }}>Quick Quiz!</h3>
                <p style={{ margin: 0, fontSize: '0.77rem', color: 'var(--text-muted)' }}>Test your knowledge</p>
              </div>
            </div>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '18px', fontWeight: 500 }}>{quiz.question}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {quiz.options.map((opt, idx) => {
                const isSel = selectedAns === idx
                const isCorr = idx === quiz.correct
                let bg = 'rgba(255,255,255,0.04)', border = 'rgba(255,255,255,0.08)', color = 'var(--text-primary)'
                if (selectedAns !== null) {
                  if (isCorr) { bg = 'rgba(74,222,128,0.14)'; border = 'rgba(74,222,128,0.45)'; color = '#4ade80' }
                  else if (isSel) { bg = 'rgba(248,113,113,0.14)'; border = 'rgba(248,113,113,0.45)'; color = '#f87171' }
                }
                return (
                  <button key={idx} onClick={() => answerQuiz(idx)} disabled={selectedAns !== null}
                    style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '13px 15px', background: bg, border: `1px solid ${border}`, borderRadius: '10px', cursor: selectedAns !== null ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'left', color, fontSize: '0.97rem', fontWeight: isSel ? 600 : 400 }}>
                    <span style={{ width: '27px', height: '27px', borderRadius: '6px', background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700, flexShrink: 0 }}>
                      {selectedAns !== null && isCorr ? <CheckCircle size={15} color="#4ade80" /> : selectedAns !== null && isSel && !isCorr ? <XCircle size={15} color="#f87171" /> : String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </button>
                )
              })}
            </div>
            {quizResult && (
              <div style={{ marginTop: '14px', textAlign: 'center', fontSize: '0.88rem', fontWeight: 600, color: quizResult === 'correct' ? '#4ade80' : '#f87171' }}>
                {quizResult === 'correct' ? 'Correct! 🎉' : 'Not quite — see the highlighted answer.'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
