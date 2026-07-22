import React, { useState, useEffect, useRef, useMemo } from 'react'
import { ChevronDown, ChevronUp, CheckCircle, XCircle, Search, MapPin, Wrench, Globe } from 'lucide-react'
import { useLocation } from 'react-router-dom'

export default function TunersAndCosts() {
  const [openTuner, setOpenTuner] = useState(null)
  const [openBudget, setOpenBudget] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCity, setFilterCity] = useState('All')
  const [filterSpec, setFilterSpec] = useState('All')
  const [filterDyno, setFilterDyno] = useState(false)
  const [filterRemote, setFilterRemote] = useState(false)

  const location = useLocation()
  const tunerRefs = useRef({})

  const tuners = [
    {
      id: 'code6',
      name: 'Code6 Tuning',
      website: 'https://code6.in',
      location: 'Pan-India (Delhi, Mumbai, Bangalore, Hyderabad)',
      desc: "One of India's largest tuning networks. Code6 pioneered Hyundai/Kia turbo-petrol tuning in India and has an extensive VAG and diesel background. Their OBD-based remaps are widely accessible.",
      platforms: 'VAG, Hyundai/Kia, Mahindra, Tata, Ford',
      estimatedCost: '₹25,000–35,000 (Stage 1) | ₹80,000+ (Stage 2 with hardware)',
      turnaround: '1–2 days',
      dynoPull: true,
      remoteTune: true,
      reputation: 'Best network coverage in India. Consistent, reliable Stage 1/2 maps. Aggressive torque delivery style.',
      priceBand: '₹₹'
    },
    {
      id: 'wolf',
      name: 'Wolf Moto Performance',
      website: 'https://wolfmoto.com',
      location: 'Pune (primary), Mumbai',
      desc: 'Specialists in custom ECU maps. Very popular in the Indian enthusiast community for reliable, safe power. Widely regarded as the best Fiat and VAG tuner in India. Known for premium quality and conservative-but-powerful maps.',
      platforms: 'VAG, Fiat, Ford, Maruti Suzuki',
      estimatedCost: '₹25,000–30,000 (Stage 1)',
      turnaround: '1 day',
      dynoPull: true,
      remoteTune: false,
      reputation: 'The gold standard for Fiat T-Jet and VAG tuning in Pune. Every map is custom dyno-calibrated. Trusted by the community for 10+ years.',
      priceBand: '₹₹'
    },
    {
      id: 'gttunerz',
      name: 'GT Tunerz / APR India',
      website: 'https://gttunerz.com',
      location: 'Delhi NCR',
      desc: 'High-end European car specialists in Delhi. Official APR dealers — one of the world\'s most respected tuning brands. Best choice for Audi, Porsche, and high-end VW group vehicles pushing extreme power levels.',
      platforms: 'Audi, Porsche, VW/Skoda (EA888)',
      estimatedCost: '₹45,000–60,000 (APR Stage 1) | ₹1,50,000+ (Stage 2)',
      turnaround: '1–3 days',
      dynoPull: true,
      remoteTune: false,
      reputation: 'The only official APR dealer in India. Exceptional for EA888 engines. Premium service, premium price — worth every rupee on the right platform.',
      priceBand: '₹₹₹'
    },
    {
      id: 'petes',
      name: "Pete's Automotive",
      website: 'https://petes.in',
      location: 'Mumbai',
      desc: "The original pioneers of performance tuning in India. Decades of experience making fast cars faster. They brought Revo Stage software and custom calibration culture to India before anyone else. A historic name in the Indian enthusiast community.",
      platforms: 'VAG, BMW, Mercedes',
      estimatedCost: '₹40,000+ (Stage 1)',
      turnaround: '1–2 days',
      dynoPull: true,
      remoteTune: false,
      reputation: "The OGs. Founded the Indian tuning culture. Best for VAG and BMW. Extremely trustworthy — they will tell you if a mod isn't worth it for your car.",
      priceBand: '₹₹₹'
    },
    {
      id: 'harmonixx',
      name: 'Harmonixx Tuning',
      website: 'https://harmonixxtuning.com',
      location: 'Delhi NCR',
      desc: 'Known for pushing limits safely, especially on the BMW B58 platform and custom turbo builds. Harmonixx provides full custom dyno calibrations tailored specifically for Indian fuel and climate conditions. The go-to shop for 500+ HP BMW builds in India.',
      platforms: 'BMW, Mercedes, Custom Builds',
      estimatedCost: '₹50,000–85,000 (Custom Calibration)',
      turnaround: '2–4 days',
      dynoPull: true,
      remoteTune: true,
      reputation: "The best BMW tuner in North India. Their custom B58 maps are legendary in the community. No shortcuts — full data logging on every build.",
      priceBand: '₹₹₹'
    },
    {
      id: 'bootmod3',
      name: 'Bootmod3 (Self-Flash)',
      website: 'https://www.protuningfreaks.com/',
      location: 'Remote / Self-Service (OBD Port)',
      desc: 'Cloud-based tuning platform. Extremely popular for BMWs (B48/B58/N55/S55). Allows you to flash Off-The-Shelf (OTS) or custom maps via your phone using a WiFi OBD adapter. Maps can be instantly reverted to stock — perfect for India\'s legal grey area.',
      platforms: 'BMW, Mini (B48, B58, N55, S55, B57)',
      estimatedCost: '₹50,000–60,000 (license + OTS map)',
      turnaround: 'Immediate (self-flash)',
      dynoPull: false,
      remoteTune: true,
      reputation: 'Best self-flash ecosystem for BMW. OTS maps are thoroughly tested. For custom tunes, pair with a Harmonixx or local calibrator for India-specific adjustments.',
      priceBand: '₹₹'
    },
    {
      id: 'mhd',
      name: 'MHD Tuning (Self-Flash)',
      website: 'https://mhdtuning.com/',
      location: 'Remote / Self-Service (OBD Port)',
      desc: 'A WiFi OBD flasher app for BMWs. Excellent exhaust burble controls, live data logging, and incredibly smooth power delivery. The MHD community is massive worldwide, with hundreds of tested stage maps available.',
      platforms: 'BMW (B48, B58, N20, N55, S55)',
      estimatedCost: '₹45,000–55,000',
      turnaround: 'Immediate (self-flash)',
      dynoPull: false,
      remoteTune: true,
      reputation: 'Best self-tune UX for BMW. The burble/crackle maps are unmatched. Great community with extensive India-specific map feedback in forums.',
      priceBand: '₹₹'
    },
    {
      id: 'renntech',
      name: 'Renntech',
      website: 'https://www.renntechmercedes.com/',
      location: 'USA (remote support for India)',
      desc: "Globally renowned Mercedes-Benz and AMG tuning specialist based in Florida, USA. Premium maps designed for maximum performance without sacrificing luxury. Available in India through authorised partners and remote OBD flashing.",
      platforms: 'Mercedes-AMG (all models)',
      estimatedCost: '₹1,20,000+',
      turnaround: '3–7 days (remote process)',
      dynoPull: false,
      remoteTune: true,
      reputation: "World-class AMG calibration. The only choice for C43, E63, GT owners who want the best. Remote flashing available — they mail you the tool.",
      priceBand: '₹₹₹'
    },
  ]

  const hardwareCosts = [
    { id: 'remap', item: 'Stage 1 ECU Remap', price: '₹25,000–60,000', category: 'Software', desc: 'The first and most impactful mod. Unlocks hidden power by optimising boost, fuel, and ignition timing via the OBD port. No physical parts required.', when: 'First mod — before any hardware change.' },
    { id: 'tcu', item: 'TCU (Gearbox) Tune', price: '₹15,000–25,000', category: 'Software', desc: 'For DSG/DCT automatic gearboxes. Increases clamping pressure to handle extra torque, sharpens shift speed, enables launch control. Essential when remapping auto cars.', when: 'Immediately with ECU remap if you have a DSG/DCT.' },
    { id: 'intake', item: 'Performance Air Intake', price: '₹8,000–60,000', category: 'Stage 1 Hardware', desc: 'Replaces the restrictive factory airbox. Range: from a simple panel filter (BMC/K&N, ₹8K) to a full carbon fibre closed-box system (Eventuri, ₹60K+).', when: 'Stage 1 hardware. Mild gains alone; works best with a remap.' },
    { id: 'chargepipe', item: 'Charge Pipe (Aluminium)', price: '₹12,000–25,000', category: 'Stage 1 Hardware', desc: 'Replaces the weak OEM plastic/rubber charge pipes that can split or pop under higher boost. Critical for BMW B48/B58 engines before Stage 1 remap.', when: 'Before or with Stage 1 remap on BMW/Mini.' },
    { id: 'bov', item: 'Blow-Off / Diverter Valve', price: '₹6,000–20,000', category: 'Stage 1 Hardware', desc: 'Prevents compressor surge when you lift off throttle. The "psssh" sound. Stock diverter valves can flutter or stick at high boost — upgraded units are more reliable.', when: 'Optional at Stage 1. More important at Stage 2+.' },
    { id: 'downpipe', item: 'Performance Downpipe (Decat/HFC)', price: '₹18,000–70,000', category: 'Stage 2 Hardware', desc: 'The single most important hardware mod for turbo cars. Removes or replaces the catalytic converter with a high-flow unit, dramatically reducing backpressure and allowing the turbo to spool 300–500 RPM earlier.', when: 'Stage 2 — mandatory for meaningful power gains.' },
    { id: 'intercooler', item: 'Upgraded Front-Mount Intercooler', price: '₹35,000–1,20,000', category: 'Stage 2 Hardware', desc: 'Cools compressed air from the turbo before it enters the engine. In Indian summers, this is not optional at Stage 2. A quality FMIC (Front Mount IC) drops Intake Air Temps by 20–35°C and is the single best investment for consistent power.', when: 'Mandatory at Stage 2 in India. Recommended even at Stage 1.' },
    { id: 'wmi', item: 'Water-Methanol Injection Kit', price: '₹25,000–60,000', category: 'Stage 2 Hardware', desc: 'Sprays a fine mist of water + methanol into the intake. Drops IATs dramatically and raises effective octane by 3–5 RON — a liquid intercooler. The Indian substitute for E85 ethanol.', when: 'Stage 2+ in India, especially in hot climates.' },
    { id: 'catback', item: 'Cat-Back Exhaust System', price: '₹20,000–1,00,000', category: 'Stage 2 Hardware', desc: 'Everything from the catalytic converter rearward — mid-pipe, resonator, and rear muffler. Improves exhaust flow and sound. Local Indian brands (Cobra, Shiftex) offer excellent value. Akrapovic, Armytrix for premium.', when: 'Stage 1–2. Mainly for sound improvement and minor flow gains.' },
    { id: 'clutch', item: 'Upgraded Clutch Kit', price: '₹40,000–1,50,000', category: 'Stage 2 Drivetrain', desc: 'Stronger friction material for manual gearboxes or clutch pack upgrades for DSG/DCT automatics. Essential when torque output exceeds the stock clutch rating.', when: 'When you start experiencing clutch slip under hard acceleration.' },
    { id: 'lsd', item: 'Limited Slip Differential (LSD)', price: '₹60,000–2,50,000', category: 'Stage 2 Drivetrain', desc: 'Distributes power evenly between driving wheels during corners. Transforms handling and launch traction. A mechanical LSD is a massive upgrade over the open diff fitted to most Indian performance cars.', when: 'Stage 2+ for track use or spirited driving. Transforms corner exit speed.' },
    { id: 'coilovers', item: 'Coilover Suspension Kit', price: '₹60,000–3,00,000', category: 'Suspension', desc: 'Fully adjustable suspension replacing the stock shock absorber and spring. Allows tuning of ride height, damping, and rebound. For Indian roads: KW V1 or Bilstein B14 offer the best balance of performance and daily comfort.', when: 'After power mods. Best bang-for-buck handling upgrade.' },
    { id: 'swaybars', item: 'Upgraded Sway Bars (Anti-Roll Bars)', price: '₹15,000–45,000', category: 'Suspension', desc: 'Connects left and right suspension and reduces body roll. Significantly improves cornering flatness. Much cheaper than coilovers and a great first handling mod.', when: 'Before coilovers if budget-limited. Works amazingly well with stock suspension.' },
    { id: 'bbk', item: 'Big Brake Kit (BBK)', price: '₹80,000–4,00,000', category: 'Braking', desc: 'Larger rotors (340mm+) and multi-piston calipers. Dramatically improves stopping distance and eliminates brake fade on track. Brembo, AP Racing, and Stoptech are top brands. Required for any serious track build.', when: 'When you notice brake fade on the track or after significant power mods.' },
    { id: 'internals', item: 'Forged Engine Internals (Pistons + Rods)', price: '₹1,50,000–4,00,000', category: 'Stage 3 Engine', desc: 'Forged pistons and connecting rods replace the weaker cast stock parts. Essential when pushing beyond Stage 2 power levels where cylinder pressures can bend or break stock components. Usually done as a complete engine rebuild.', when: 'Stage 3 only. Do not go beyond your stock internals\' power ceiling.' },
  ]

  const budgets = [
    {
      id: 'budget50',
      label: '₹50,000 Budget',
      subtitle: 'The "Feel It" Build',
      color: '#4ade80',
      what: [
        { item: 'Stage 1 ECU Remap', cost: '₹25,000–30,000', gain: '+20–60 HP (platform dependent)' },
        { item: 'Panel Air Filter (BMC/K&N)', cost: '₹6,000–10,000', gain: 'Marginally better throttle response' },
        { item: 'Spark Plug Upgrade', cost: '₹3,000–8,000', gain: 'Better combustion efficiency' },
      ],
      result: 'You will feel the car transform — sharper throttle, more mid-range pull, better fuel economy on part throttle. The single best value spend in tuning.',
      suitable: 'Any daily-driven turbo car: Polo TSI, i20 N Line, Virtus GT, City',
    },
    {
      id: 'budget2l',
      label: '₹2,00,000 Budget',
      subtitle: 'Stage 2 — Serious Territory',
      color: '#facc15',
      what: [
        { item: 'Stage 2 ECU + TCU Remap', cost: '₹35,000–50,000', gain: 'Full software unlock' },
        { item: 'Performance Downpipe (Decat)', cost: '₹20,000–40,000', gain: '+15–30 HP, faster spool' },
        { item: 'Front-Mount Intercooler', cost: '₹40,000–70,000', gain: 'Consistent power in Indian heat' },
        { item: 'Cat-Back Exhaust', cost: '₹25,000–50,000', gain: 'Sound + flow improvement' },
        { item: 'Performance Intake', cost: '₹10,000–25,000', gain: 'Slightly more air, better sound' },
      ],
      result: 'This is a fully transformed car. You will have 30–100+ HP over stock depending on platform. The car will be noticeably faster than most stock sports cars on the road.',
      suitable: 'Polo TSI, Octavia vRS, Virtus GT, Abarth Punto — the most rewarding budget for Indian platforms.',
    },
    {
      id: 'budget5l',
      label: '₹5,00,000+ Budget',
      subtitle: 'The "Monster" Build',
      color: '#f87171',
      what: [
        { item: 'Stage 2/3 Custom Dyno Tune', cost: '₹60,000–1,20,000', gain: 'Custom-calibrated map' },
        { item: 'Turbo Upgrade / Hybrid Turbo', cost: '₹1,50,000–4,00,000', gain: '+80–200 HP ceiling increase' },
        { item: 'Forged Internals (if needed)', cost: '₹1,50,000–4,00,000', gain: 'Reliable survival at extreme power' },
        { item: 'Full Exhaust System', cost: '₹40,000–1,00,000', gain: 'Sound, flow, power' },
        { item: 'Water-Meth Injection', cost: '₹30,000–60,000', gain: 'Liquid octane booster' },
        { item: 'Upgraded Clutch / DSG tune', cost: '₹50,000–1,50,000', gain: 'Power delivery to road' },
        { item: 'Coilovers + Sway Bars', cost: '₹80,000–2,00,000', gain: 'Handle the extra power' },
      ],
      result: 'This is a supercar-hunting, track-day weapon. You are now in 300–500+ HP territory. Requires serious commitment, a trusted tuner, and ideally a track-only setup.',
      suitable: 'M340i, Octavia vRS, Abarth (with TD04), Polo (with IS12 hybrid turbo)',
    },
  ]

  const choosingTips = {
    green: [
      'Has a dyno and provides baseline + post-tune pulls',
      'Asks about your fuel type, daily usage, and climate before mapping',
      'Shows you the actual ECU data logs (boost trace, AFR, knock count)',
      'Gives you a fuel-specific map (91 RON / 95 RON / Speed 97)',
      'Explains safe power limits for your platform',
      'Has customer reviews with dyno sheets as proof',
      'Offers a warranty or recall policy if the map causes issues',
    ],
    red: [
      'Claims a fixed "guaranteed HP" number without seeing your car',
      'Uses the same map for every car of the same model regardless of condition',
      'Has no dyno — relies on "feel" or "road test" only',
      'Doesn\'t ask about your fuel quality or climate',
      'Promises Stage 2 power with Stage 1 hardware',
      'Cannot show you before/after logs from previous customers',
      'No physical address or workshop — "remote only" with no accountability',
    ],
  }

  // Filter Logic
  const filteredTuners = useMemo(() => {
    return tuners.filter(t => {
      const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.platforms.toLowerCase().includes(searchQuery.toLowerCase())
      if (!matchSearch) return false

      if (filterCity !== 'All') {
        if (filterCity === 'Remote' && !t.location.toLowerCase().includes('remote')) return false
        if (filterCity !== 'Remote' && !t.location.toLowerCase().includes(filterCity.toLowerCase())) return false
      }
      if (filterSpec !== 'All') {
        if (!t.platforms.toLowerCase().includes(filterSpec.toLowerCase())) return false
      }
      if (filterDyno && !t.dynoPull) return false
      if (filterRemote && !t.remoteTune) return false
      return true
    })
  }, [searchQuery, filterCity, filterSpec, filterDyno, filterRemote, tuners])

  useEffect(() => {
    if (location.state && location.state.targetTuner) {
      const targetId = location.state.targetTuner
      setOpenTuner(targetId)
      setTimeout(() => {
        if (tunerRefs.current[targetId]) {
          const y = tunerRefs.current[targetId].getBoundingClientRect().top + window.scrollY - 100
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location])

  return (
    <div className="page-container" style={{ paddingBottom: '80px' }}>
      
      <div className="page-hero">
        <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '16px' }}>TUNERS & COSTS</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-lg)', maxWidth: '600px', margin: '0 auto' }}>
          Who to trust, what to spend, and how to build your dream machine on an Indian budget.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '80px' }}>

        {/* ── TUNERS SECTION ── */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <span className="section-label">The Network</span>
              <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>Top Indian Tuners</h2>
            </div>
          </div>

          <div className="filter-bar" style={{ borderRadius: '12px', marginBottom: '32px' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Search tuners or platforms..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  width: '100%', padding: '10px 16px 10px 42px', 
                  background: 'var(--surface)', border: '1px solid var(--border)', 
                  borderRadius: '99px', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none'
                }}
              />
            </div>
            
            <select value={filterCity} onChange={e=>setFilterCity(e.target.value)} className="sort-select">
              <option value="All">All Cities</option>
              <option value="Delhi">Delhi NCR</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Remote">Remote</option>
            </select>
            
            <select value={filterSpec} onChange={e=>setFilterSpec(e.target.value)} className="sort-select">
              <option value="All">All Platforms</option>
              <option value="VAG">VAG</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Hyundai">Hyundai</option>
            </select>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '0.9rem', marginLeft: '12px' }}>
              <input type="checkbox" checked={filterDyno} onChange={e=>setFilterDyno(e.target.checked)} style={{ accentColor: 'var(--red)' }} />
              Dyno Available
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
              <input type="checkbox" checked={filterRemote} onChange={e=>setFilterRemote(e.target.checked)} style={{ accentColor: 'var(--red)' }} />
              Remote Tune
            </label>
          </div>

          {filteredTuners.length === 0 ? (
            <div className="empty-state">
              <h3 style={{ color: 'var(--text-primary)' }}>No tuners match criteria.</h3>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
              {filteredTuners.map(tuner => (
                <div 
                  key={tuner.id} 
                  ref={el => tunerRefs.current[tuner.id] = el}
                  className="premium-card" 
                  style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                        {tuner.name[0]}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{tuner.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          <MapPin size={14} /> {tuner.location.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: '1rem', color: 'var(--status-green)', fontWeight: 'bold' }}>{tuner.priceBand}</span>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px', flex: '1' }}>
                    "{tuner.reputation}"
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {tuner.platforms.split(',').map((p, i) => (
                      <span key={i} style={{ padding: '4px 8px', background: 'var(--surface-hover)', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {p.trim()}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {tuner.dynoPull && <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14} color="var(--status-green)" /> Dyno</span>}
                      {tuner.remoteTune && <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={14} color="var(--accent-blue)" /> Remote</span>}
                    </div>
                    <a href={tuner.website} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-red)', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none' }}>Visit Site →</a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── BUDGET PRESETS ── */}
        <section>
          <span className="section-label">Cost Breakdown</span>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '24px' }}>Budget Presets</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {budgets.map(b => {
              const isOpen = openBudget === b.id
              return (
                <div key={b.id} className="premium-card" style={{ borderLeft: `4px solid ${b.color}`, overflow: 'hidden' }}>
                  <div 
                    onClick={() => setOpenBudget(isOpen ? null : b.id)}
                    style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: isOpen ? 'var(--surface-hover)' : 'transparent', transition: 'background 0.2s' }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{b.label}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{b.subtitle}</p>
                    </div>
                    {isOpen ? <ChevronUp size={24} color="var(--text-muted)" /> : <ChevronDown size={24} color="var(--text-muted)" />}
                  </div>
                  
                  {isOpen && (
                    <div style={{ padding: '0 24px 24px', animation: 'fadeIn 0.3s ease' }}>
                      <div style={{ background: 'var(--surface-hover)', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Best For:</strong> <span style={{ color: 'var(--text-muted)' }}>{b.suitable}</span>
                      </div>
                      
                      <table className="table-styled" style={{ marginBottom: '20px' }}>
                        <thead>
                          <tr>
                            <th>Modification</th>
                            <th>Cost Estimate</th>
                            <th>Expected Gain</th>
                          </tr>
                        </thead>
                        <tbody>
                          {b.what.map((item, i) => (
                            <tr key={i}>
                              <td style={{ fontWeight: '500' }}>{item.item}</td>
                              <td style={{ color: 'var(--text-muted)' }}>{item.cost}</td>
                              <td style={{ color: 'var(--text-muted)' }}>{item.gain}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      <p style={{ color: 'var(--text-primary)', lineHeight: 1.6, borderLeft: `2px solid ${b.color}`, paddingLeft: '16px' }}>
                        {b.result}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* ── HARDWARE COSTS TABLE ── */}
        <section>
          <span className="section-label">A La Carte</span>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '24px' }}>Hardware Pricing Guide</h2>
          
          <div className="premium-card" style={{ overflow: 'hidden' }}>
            <table className="table-styled">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Category</th>
                  <th>Estimated Price</th>
                  <th>When to upgrade?</th>
                </tr>
              </thead>
              <tbody>
                {hardwareCosts.map((hw, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ fontWeight: '500', color: 'var(--text-primary)', marginBottom: '4px' }}>{hw.item}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '300px' }}>{hw.desc}</div>
                    </td>
                    <td><span className="chip" style={{ fontSize: '0.75rem', padding: '4px 8px' }}>{hw.category}</span></td>
                    <td style={{ color: 'var(--status-green)', fontWeight: '600' }}>{hw.price}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '200px' }}>{hw.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── TRUST & DISCLAIMER ── */}
        <section style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div className="premium-card" style={{ flex: '1', minWidth: '300px', padding: '32px', borderTop: '4px solid var(--status-green)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={20} color="var(--status-green)" /> Green Flags
            </h3>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {choosingTips.green.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>

          <div className="premium-card" style={{ flex: '1', minWidth: '300px', padding: '32px', borderTop: '4px solid var(--status-red)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <XCircle size={20} color="var(--status-red)" /> Red Flags
            </h3>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {choosingTips.red.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>
        </section>

      </div>
    </div>
  )
}
