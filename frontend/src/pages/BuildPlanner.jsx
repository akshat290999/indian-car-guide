import { useState, useMemo } from 'react'
import { PLATFORMS_DATA } from '../tuningData'
import { CheckCircle, Circle, ChevronRight, Zap, DollarSign, Gauge, ArrowRight, RefreshCw } from 'lucide-react'

/* ─── Mod Catalog ─── Each mod has: id, name, category, stage, cost (INR), hpGain (%), nmGain (%), compatible (array of platform IDs or 'all'), note */
const MOD_CATALOG = [
  // ── SOFTWARE ──
  { id: 'ecu_s1',     name: 'ECU Stage 1 Remap',         category: 'Software',     stage: 1, cost: 30000,  hpPct: 0.22,  nmPct: 0.28,  compatible: 'all',       note: 'Best first mod. Via OBD port, reversible.' },
  { id: 'tcu',        name: 'TCU Tune (DSG/DCT)',          category: 'Software',     stage: 1, cost: 18000,  hpPct: 0,     nmPct: 0,     compatible: ['vw-polo-tsi','skoda-octavia-vrs','vw-virtus-gt','bmw-m340i','mini-cooper-s'],  note: 'Essential for auto/DSG gearboxes to handle extra torque.' },
  { id: 'ecu_s2',     name: 'ECU Stage 2 Remap',          category: 'Software',     stage: 2, cost: 15000,  hpPct: 0.10,  nmPct: 0.12,  compatible: 'all',       note: 'Upgrade from Stage 1 map to utilise hardware mods.' },
  { id: 'launch',     name: 'Launch Control Map',          category: 'Software',     stage: 2, cost: 8000,   hpPct: 0,     nmPct: 0,     compatible: 'all',       note: 'Allows flat-foot launches at optimal RPM.' },
  { id: 'crackle',    name: 'Crackle / Pop Map',           category: 'Software',     stage: 1, cost: 5000,   hpPct: 0,     nmPct: 0,     compatible: 'all',       note: 'Exhaust pops on overrun. Pure theatre, zero power gain.' },
  // ── INTAKE / BREATHING ──
  { id: 'panel_filt', name: 'Performance Panel Filter',    category: 'Intake',       stage: 1, cost: 8000,   hpPct: 0.02,  nmPct: 0.01,  compatible: 'all',       note: 'Drop-in upgrade. Minimal gains alone, good with a remap.' },
  { id: 'intake',     name: 'Full Performance Intake',     category: 'Intake',       stage: 2, cost: 25000,  hpPct: 0.04,  nmPct: 0.03,  compatible: 'all',       note: 'Cold air box / induction kit for better flow and sound.' },
  { id: 'chargepipe', name: 'Aluminium Charge Pipe',       category: 'Intake',       stage: 1, cost: 18000,  hpPct: 0.01,  nmPct: 0.01,  compatible: ['bmw-m340i','mini-cooper-s'],  note: 'Replaces plastic OEM pipe that splits under boost. Critical on B48/B58.' },
  { id: 'bov',        name: 'Forge Blow-Off Valve',        category: 'Intake',       stage: 2, cost: 12000,  hpPct: 0,     nmPct: 0,     compatible: 'all',       note: 'Prevents compressor surge. Better reliability at high boost.' },
  // ── EXHAUST ──
  { id: 'downpipe',   name: 'Decat Downpipe',              category: 'Exhaust',      stage: 2, cost: 30000,  hpPct: 0.12,  nmPct: 0.10,  compatible: 'all',       note: 'Most impactful hardware mod. Turbo spools 300-500 RPM earlier.' },
  { id: 'catback',    name: 'Cat-Back Exhaust',            category: 'Exhaust',      stage: 1, cost: 35000,  hpPct: 0.03,  nmPct: 0.02,  compatible: 'all',       note: 'Mainly for sound. Minor flow improvement.' },
  { id: 'res_delete', name: 'Resonator Delete',            category: 'Exhaust',      stage: 1, cost: 8000,   hpPct: 0.01,  nmPct: 0.01,  compatible: 'all',       note: 'Removes mid-pipe resonator. Louder, more aggressive tone.' },
  // ── COOLING ──
  { id: 'fmic',       name: 'Front-Mount Intercooler',     category: 'Cooling',      stage: 2, cost: 65000,  hpPct: 0.08,  nmPct: 0.06,  compatible: 'all',       note: 'Mandatory in India. Prevents heat soak in 45°C summers.' },
  { id: 'wmi',        name: 'Water-Methanol Injection',    category: 'Cooling',      stage: 2, cost: 40000,  hpPct: 0.06,  nmPct: 0.05,  compatible: 'all',       note: 'Liquid intercooler + octane booster. India\'s E85 substitute.' },
  { id: 'oil_cooler', name: 'Oil Cooler Kit',              category: 'Cooling',      stage: 2, cost: 22000,  hpPct: 0,     nmPct: 0,     compatible: 'all',       note: 'Keeps engine oil temp in check during hard use or track days.' },
  // ── TURBO / POWER ──
  { id: 'hybrid_turbo',name: 'Hybrid Turbo Upgrade',      category: 'Forced Induction', stage: 3, cost: 150000, hpPct: 0.25, nmPct: 0.22, compatible: ['vw-polo-tsi','fiat-abarth-punto','skoda-octavia-vrs','vw-virtus-gt'], note: 'Modified stock frame turbo. Bolt-on gains with larger compressor.' },
  { id: 'big_turbo',  name: 'Full Turbo Upgrade',         category: 'Forced Induction', stage: 3, cost: 300000, hpPct: 0.50, nmPct: 0.45, compatible: ['bmw-m340i','skoda-octavia-vrs','mercedes-amg-c43','porsche-911','audi-rs5'], note: 'Pure800/IS38/IS470 etc. Stage 3 territory. Needs built engine.' },
  { id: 'port_inj',   name: 'Port Injection Kit',         category: 'Forced Induction', stage: 3, cost: 80000,  hpPct: 0.06, nmPct: 0.04, compatible: ['bmw-m340i','mini-cooper-s'], note: 'Secondary injectors for E30/E50 fuelling on B48/B58.' },
  // ── ENGINE INTERNALS ──
  { id: 'spark_plugs', name: 'Iridium Spark Plugs',       category: 'Engine',       stage: 1, cost: 8000,   hpPct: 0.01,  nmPct: 0.01,  compatible: 'all',       note: 'Better ignition efficiency. Mandatory before any remap.' },
  { id: 'forged',     name: 'Forged Pistons + Rods',      category: 'Engine',       stage: 3, cost: 250000, hpPct: 0,     nmPct: 0,     compatible: 'all',       note: 'Structural upgrade. Doesn\'t add power — allows you to safely hold more.' },
  { id: 'head_studs', name: 'ARP Head Studs',             category: 'Engine',       stage: 3, cost: 35000,  hpPct: 0,     nmPct: 0,     compatible: 'all',       note: 'Prevents head gasket failure under extreme boost.' },
  // ── DRIVETRAIN ──
  { id: 'clutch',     name: 'Upgraded Clutch Kit',        category: 'Drivetrain',   stage: 2, cost: 65000,  hpPct: 0,     nmPct: 0,     compatible: ['vw-polo-tsi','fiat-abarth-punto','honda-city-ivtec','hyundai-i20-nline'], note: 'Required when torque exceeds stock clutch rating.' },
  { id: 'lsd',        name: 'Limited Slip Differential',  category: 'Drivetrain',   stage: 2, cost: 120000, hpPct: 0,     nmPct: 0,     compatible: 'all',       note: 'Transforms corner exit traction and launch performance.' },
  { id: 'axles',      name: 'Upgraded CV Axles',          category: 'Drivetrain',   stage: 3, cost: 45000,  hpPct: 0,     nmPct: 0,     compatible: 'all',       note: 'Prevents driveshaft snap under extreme torque.' },
  // ── SUSPENSION ──
  { id: 'sway_bars',  name: 'Upgraded Sway Bars',         category: 'Suspension',   stage: 1, cost: 22000,  hpPct: 0,     nmPct: 0,     compatible: 'all',       note: 'Reduces body roll massively. Cheapest handling upgrade.' },
  { id: 'lowering_springs', name: 'Lowering Springs',     category: 'Suspension',   stage: 1, cost: 18000,  hpPct: 0,     nmPct: 0,     compatible: 'all',       note: '20mm drop. Better CoG, stiffer ride. Great for Indian roads.' },
  { id: 'coilovers',  name: 'Coilover Kit (KW V1/Bilstein)', category: 'Suspension', stage: 2, cost: 100000, hpPct: 0,    nmPct: 0,     compatible: 'all',       note: 'Fully adjustable. Best balance for Indian roads.' },
  { id: 'coilovers_hi', name: 'Premium Coilovers (KW V3/Öhlins)', category: 'Suspension', stage: 3, cost: 250000, hpPct: 0, nmPct: 0, compatible: 'all', note: 'Track-level damping control. For serious performance builds.' },
  // ── BRAKING ──
  { id: 'brake_pads', name: 'Performance Brake Pads',     category: 'Braking',      stage: 1, cost: 12000,  hpPct: 0,     nmPct: 0,     compatible: 'all',       note: 'Higher temp threshold. Reduces brake fade on track.' },
  { id: 'bbk',        name: 'Big Brake Kit (Brembo)',     category: 'Braking',      stage: 3, cost: 200000, hpPct: 0,     nmPct: 0,     compatible: 'all',       note: 'Required for serious track use. 6-piston, 380mm+ rotors.' },
  { id: 'braided_lines', name: 'Stainless Braided Brake Lines', category: 'Braking', stage: 1, cost: 8000,  hpPct: 0,     nmPct: 0,     compatible: 'all',       note: 'Firmer pedal feel. Better modulation.' },
]

const CATEGORIES = ['Software', 'Intake', 'Exhaust', 'Cooling', 'Forced Induction', 'Engine', 'Drivetrain', 'Suspension', 'Braking']

const CAT_COLORS = {
  Software: '#facc15', Intake: '#38bdf8', Exhaust: '#a78bfa', Cooling: '#67e8f9',
  'Forced Induction': '#f87171', Engine: '#fb923c', Drivetrain: '#fb923c',
  Suspension: '#4ade80', Braking: '#f472b6'
}

const CAT_EMOJI = {
  Software: '⚡', Intake: '💨', Exhaust: '🔥', Cooling: '❄️',
  'Forced Induction': '🌀', Engine: '🔩', Drivetrain: '⚙️',
  Suspension: '🏎️', Braking: '🛑'
}

function formatINR(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`
  return `₹${n}`
}

export default function BuildPlanner() {
  const [selectedPlatform, setSelectedPlatform] = useState('')
  const [selectedMods, setSelectedMods] = useState(new Set())
  const [openCat, setOpenCat] = useState('Software')

  const platforms = Object.entries(PLATFORMS_DATA).map(([id, d]) => ({ id, ...d }))
  const platform = platforms.find(p => p.id === selectedPlatform)

  // Parse stock HP and NM from string like "374 HP / 500 Nm"
  const parseStock = (str) => {
    if (!str) return { hp: 0, nm: 0 }
    const hp = parseInt(str.match(/(\d+)\s*HP/)?.[1] || 0)
    const nm = parseInt(str.match(/(\d+)\s*Nm/)?.[1] || 0)
    return { hp, nm }
  }
  const stock = parseStock(platform?.stock_power)

  // Filter mods compatible with selected platform
  const compatibleMods = useMemo(() => {
    if (!selectedPlatform) return MOD_CATALOG
    return MOD_CATALOG.filter(m => m.compatible === 'all' || m.compatible.includes(selectedPlatform))
  }, [selectedPlatform])

  // Calculate build stats
  const buildStats = useMemo(() => {
    if (!platform) return null
    let totalCost = 0
    let hpMultiplier = 1
    let nmMultiplier = 1
    selectedMods.forEach(id => {
      const mod = MOD_CATALOG.find(m => m.id === id)
      if (!mod) return
      totalCost += mod.cost
      hpMultiplier += mod.hpPct
      nmMultiplier += mod.nmPct
    })
    const tuneHP = Math.round(stock.hp * hpMultiplier)
    const tuneNM = Math.round(stock.nm * nmMultiplier)
    const hpGain = tuneHP - stock.hp
    const nmGain = tuneNM - stock.nm
    // Stage estimation
    let stage = 'Stock'
    if (selectedMods.has('ecu_s1') || selectedMods.has('ecu_s2')) {
      const hasSoftOnly = !selectedMods.has('downpipe') && !selectedMods.has('fmic') && !selectedMods.has('intake')
      const hasHW = selectedMods.has('downpipe') || selectedMods.has('fmic')
      const hasS3 = selectedMods.has('big_turbo') || selectedMods.has('hybrid_turbo') || selectedMods.has('forged')
      stage = hasS3 ? 'Stage 3+' : hasHW ? 'Stage 2' : 'Stage 1'
    } else if (selectedMods.size > 0) {
      stage = 'Hardware Only'
    }
    return { tuneHP, tuneNM, hpGain, nmGain, totalCost, stage }
  }, [selectedMods, platform, stock])

  const toggleMod = (id) => {
    setSelectedMods(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const stageColor = (s) => {
    if (s === 'Stage 1') return '#60a5fa'
    if (s === 'Stage 2') return '#facc15'
    if (s === 'Stage 3+') return '#f87171'
    if (s === 'Hardware Only') return '#a78bfa'
    return 'var(--text-muted)'
  }

  const barWidth = (val, max) => `${Math.min((val / max) * 100, 100)}%`

  return (
    <div style={{ minHeight: 'calc(100vh - var(--navbar-h))', display: 'flex', flexDirection: 'column' }}>

      {/* ── HERO ── */}
      <div style={{
        padding: '48px 20px 36px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(239,68,68,0.07) 0%, transparent 100%)',
        borderBottom: '1px solid var(--border)'
      }}>
        <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '12px', fontFamily: "'Outfit', sans-serif" }}>
          🔧 Plan Your Build
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Select your car, add modifications, and watch your build come to life — with real power and cost estimates.
        </p>
      </div>

      {/* ── PLATFORM SELECT ── */}
      {!selectedPlatform ? (
        <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', fontFamily: "'Outfit', sans-serif", textAlign: 'center' }}>Step 1 — Choose Your Platform</h2>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '32px', fontSize: '0.95rem' }}>Pick the car you want to build. All power estimates are based on verified Indian tuning data.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
            {platforms.map(p => (
              <div
                key={p.id}
                className="premium-card"
                style={{ cursor: 'pointer', transition: 'all 0.2s', overflow: 'hidden' }}
                onClick={() => setSelectedPlatform(p.id)}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ height: '140px', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80' }} />
                </div>
                <div style={{ padding: '14px' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{p.category}</div>
                  <h3 style={{ margin: '0 0 6px', fontSize: '0.98rem', fontFamily: "'Outfit', sans-serif", color: 'var(--text-primary)' }}>{p.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Stock: <strong style={{ color: 'var(--text-primary)' }}>{p.stock_power}</strong></span>
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--accent-red)', fontWeight: 600 }}>Select this car →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ── BUILDER VIEW ── */
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '0', minHeight: 'calc(100vh - 160px)', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>

          {/* LEFT — Mod Selector */}
          <div style={{ padding: '28px 24px', borderRight: '1px solid var(--border)', overflowY: 'auto' }}>

            {/* Back + Platform Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <button
                onClick={() => { setSelectedPlatform(''); setSelectedMods(new Set()) }}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                ← Change Car
              </button>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.3rem', fontFamily: "'Outfit', sans-serif", color: 'var(--text-primary)' }}>{platform?.name}</h2>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Stock: {platform?.stock_power}</span>
              </div>
              {selectedMods.size > 0 && (
                <button
                  onClick={() => setSelectedMods(new Set())}
                  style={{ marginLeft: 'auto', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <RefreshCw size={13} /> Reset Build
                </button>
              )}
            </div>

            {/* Mod Categories */}
            {CATEGORIES.map(cat => {
              const catMods = compatibleMods.filter(m => m.category === cat)
              if (catMods.length === 0) return null
              const isOpen = openCat === cat
              const selectedInCat = catMods.filter(m => selectedMods.has(m.id)).length
              return (
                <div key={cat} style={{ marginBottom: '8px', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div
                    onClick={() => setOpenCat(isOpen ? null : cat)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', cursor: 'pointer', background: isOpen ? 'rgba(255,255,255,0.03)' : 'transparent', userSelect: 'none' }}
                    onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                    onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'transparent' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.1rem' }}>{CAT_EMOJI[cat]}</span>
                      <span style={{ fontWeight: 600, color: isOpen ? CAT_COLORS[cat] : 'var(--text-primary)', fontSize: '0.95rem', fontFamily: "'Outfit', sans-serif" }}>{cat}</span>
                      {selectedInCat > 0 && (
                        <span style={{ background: CAT_COLORS[cat] + '20', color: CAT_COLORS[cat], fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '99px', border: `1px solid ${CAT_COLORS[cat]}40` }}>{selectedInCat} selected</span>
                      )}
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{isOpen ? '−' : '+'}</span>
                  </div>
                  {isOpen && (
                    <div style={{ padding: '4px 12px 12px' }}>
                      {catMods.map(mod => {
                        const isSelected = selectedMods.has(mod.id)
                        return (
                          <div
                            key={mod.id}
                            onClick={() => toggleMod(mod.id)}
                            style={{
                              display: 'flex', gap: '12px', alignItems: 'flex-start',
                              padding: '12px 14px', borderRadius: '8px', cursor: 'pointer',
                              marginBottom: '6px',
                              background: isSelected ? `${CAT_COLORS[cat]}10` : 'rgba(255,255,255,0.02)',
                              border: isSelected ? `1px solid ${CAT_COLORS[cat]}40` : '1px solid rgba(255,255,255,0.05)',
                              transition: 'all 0.15s'
                            }}
                            onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                            onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                          >
                            {isSelected
                              ? <CheckCircle size={18} color={CAT_COLORS[cat]} style={{ flexShrink: 0, marginTop: '1px' }} />
                              : <Circle size={18} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: '1px' }} />}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{ fontWeight: isSelected ? 600 : 400, color: isSelected ? CAT_COLORS[cat] : 'var(--text-primary)', fontSize: '0.9rem' }}>{mod.name}</span>
                                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                                  {mod.hpPct > 0 && <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: 600, background: 'rgba(74,222,128,0.1)', padding: '2px 7px', borderRadius: '99px' }}>+{Math.round(mod.hpPct * 100)}% HP</span>}
                                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-red)', fontWeight: 600, background: 'rgba(239,68,68,0.1)', padding: '2px 7px', borderRadius: '99px' }}>{formatINR(mod.cost)}</span>
                                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 7px', borderRadius: '99px' }}>Stage {mod.stage}</span>
                                </div>
                              </div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>{mod.note}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* RIGHT — Build Summary (sticky) */}
          <div style={{ padding: '28px 20px', position: 'sticky', top: '0', alignSelf: 'start', maxHeight: 'calc(100vh - var(--navbar-h))', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '1.1rem', fontFamily: "'Outfit', sans-serif", marginBottom: '20px', color: 'var(--text-primary)' }}>📋 Your Build Summary</h3>

            {/* Car image */}
            <div style={{ height: '160px', borderRadius: '10px', overflow: 'hidden', background: 'rgba(0,0,0,0.2)', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={platform?.img} alt={platform?.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80' }} />
            </div>

            {/* Stage Badge */}
            {buildStats && (
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <span style={{ background: stageColor(buildStats.stage) + '20', color: stageColor(buildStats.stage), border: `1px solid ${stageColor(buildStats.stage)}50`, borderRadius: '99px', padding: '6px 20px', fontWeight: 800, fontSize: '1rem', fontFamily: "'Outfit', sans-serif" }}>
                  {buildStats.stage}
                </span>
              </div>
            )}

            {/* Power Stats */}
            {buildStats ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                {/* HP */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estimated HP</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f87171' }}>{stock.hp} → <span style={{ color: '#4ade80' }}>{buildStats.tuneHP} HP</span></span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: barWidth(buildStats.tuneHP, Math.round(stock.hp * 2)), background: 'linear-gradient(90deg, #ef4444, #4ade80)', borderRadius: '99px', transition: 'width 0.5s ease' }} />
                  </div>
                  {buildStats.hpGain > 0 && <div style={{ fontSize: '0.78rem', color: '#4ade80', marginTop: '4px' }}>+{buildStats.hpGain} HP over stock</div>}
                </div>
                {/* NM */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estimated Torque</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f87171' }}>{stock.nm} → <span style={{ color: '#4ade80' }}>{buildStats.tuneNM} Nm</span></span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: barWidth(buildStats.tuneNM, Math.round(stock.nm * 2)), background: 'linear-gradient(90deg, #3b82f6, #4ade80)', borderRadius: '99px', transition: 'width 0.5s ease' }} />
                  </div>
                  {buildStats.nmGain > 0 && <div style={{ fontSize: '0.78rem', color: '#4ade80', marginTop: '4px' }}>+{buildStats.nmGain} Nm over stock</div>}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Select a car and mods to see live estimates</div>
            )}

            {/* Cost */}
            {buildStats && selectedMods.size > 0 && (
              <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Build Cost</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-red)', fontFamily: "'Outfit', sans-serif" }}>{formatINR(buildStats.totalCost)}</span>
                </div>
                {/* Mod list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto' }}>
                  {[...selectedMods].map(id => {
                    const mod = MOD_CATALOG.find(m => m.id === id)
                    if (!mod) return null
                    return (
                      <div key={id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--text-muted)', flex: 1, paddingRight: '8px' }}>{mod.name}</span>
                        <span style={{ color: 'var(--accent-red)', fontWeight: 600, whiteSpace: 'nowrap' }}>{formatINR(mod.cost)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Tip box */}
            {buildStats && buildStats.stage !== 'Stock' && (
              <div style={{ background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.2)', borderRadius: '8px', padding: '12px 14px', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <strong style={{ color: '#facc15' }}>💡 Build Tip: </strong>
                {buildStats.stage === 'Stage 1' && 'Great start! Stage 1 is the most reliable and reversible mod. Consider adding Speed 97 fuel to maximise your tune.'}
                {buildStats.stage === 'Stage 2' && 'Stage 2 is where it gets serious. Make sure your intercooler is upgraded — it\'s mandatory in Indian heat.'}
                {buildStats.stage === 'Stage 3+' && 'Stage 3 territory. You need forged internals and a trusted tuner for a custom dyno calibration. Not for daily use without proper planning.'}
                {buildStats.stage === 'Hardware Only' && 'You have hardware mods but no ECU remap. Add a Stage 1 remap to unlock the full potential of your parts.'}
              </div>
            )}

            {/* Empty state */}
            {selectedMods.size === 0 && platform && (
              <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔧</div>
                Select mods from the left panel to start building your {platform.name}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
