import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Zap, Thermometer, Package, Shield, Wrench, MapPin, Car, AlertTriangle } from 'lucide-react'

/* ─── Reusable Accordion ─── */
function Accordion({ title, icon, color = 'var(--accent-red)', children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="premium-card" style={{ borderLeft: `4px solid ${color}`, overflow: 'hidden', marginBottom: '14px' }}>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', cursor: 'pointer', userSelect: 'none' }}
        onClick={() => setOpen(o => !o)}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {icon && <span style={{ color }}>{icon}</span>}
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{title}</h3>
        </div>
        {open ? <ChevronUp size={20} color={color} /> : <ChevronDown size={20} color={color} />}
      </div>
      {open && (
        <div style={{ padding: '0 24px 24px', animation: 'fadeIn 0.3s ease' }}>
          <div style={{ height: '1px', background: 'var(--border)', marginBottom: '20px' }} />
          {children}
        </div>
      )}
    </div>
  )
}

/* ─── Comparison Row ─── */
function CompRow({ label, india, intl, indiaColor = '#f87171', intlColor = '#60a5fa' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '10px', alignItems: 'start' }}>
      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', padding: '10px 0', fontWeight: 600 }}>{label}</div>
      <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.88rem', color: indiaColor, lineHeight: 1.5 }}>{india}</div>
      <div style={{ background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.88rem', color: intlColor, lineHeight: 1.5 }}>{intl}</div>
    </div>
  )
}

/* ─── Info Box ─── */
function InfoBox({ color = '#facc15', emoji, title, children }) {
  return (
    <div style={{ background: `${color}12`, border: `1px solid ${color}30`, borderRadius: '10px', padding: '16px 20px', marginTop: '16px' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        {emoji && <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '2px' }}>{emoji}</span>}
        <div>
          {title && <div style={{ fontWeight: 700, color, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{title}</div>}
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{children}</div>
        </div>
      </div>
    </div>
  )
}

/* ─── Stage Table ─── */
function StageTable({ rows }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
        <thead>
          <tr>
            {['Stage', 'Platform', 'India Gain', 'India Cost', 'Intl Gain', 'Intl Cost', 'Why The Gap'].map(h => (
              <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <td style={{ padding: '12px', fontWeight: 700, color: r.stageColor }}>{r.stage}</td>
              <td style={{ padding: '12px', color: 'var(--text-primary)' }}>{r.platform}</td>
              <td style={{ padding: '12px', color: '#f87171', fontWeight: 600 }}>+{r.indiaGain} HP</td>
              <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{r.indiaCost}</td>
              <td style={{ padding: '12px', color: '#60a5fa', fontWeight: 600 }}>+{r.intlGain} HP</td>
              <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{r.intlCost}</td>
              <td style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>{r.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function IntlVsIndia() {
  const [activeTab, setActiveTab] = useState('india')

  const STAGE_DATA = [
    { stage: 'Stage 1', stageColor: '#60a5fa', platform: 'VW Polo 1.0 TSI', indiaGain: 25, indiaCost: '₹25,000', intlGain: 35, intlCost: '€300', reason: 'India tune retards timing on 95 RON; EU uses 98 RON' },
    { stage: 'Stage 1', stageColor: '#60a5fa', platform: 'Skoda Octavia vRS', indiaGain: 60, indiaCost: '₹45,000', intlGain: 90, intlCost: '€450', reason: 'Fuel octane + heat soak limiting peak boost' },
    { stage: 'Stage 1', stageColor: '#60a5fa', platform: 'BMW M340i (B58)', indiaGain: 65, indiaCost: '₹55,000', intlGain: 100, intlCost: '$650', reason: 'India tunes stay conservative on timing advance' },
    { stage: 'Stage 2', stageColor: '#facc15', platform: 'VW Polo 1.0 TSI', indiaGain: 45, indiaCost: '₹80,000', intlGain: 70, intlCost: '€800', reason: 'Stock turbo near limit; IC upgrade mandatory in India' },
    { stage: 'Stage 2', stageColor: '#facc15', platform: 'Skoda Octavia vRS', indiaGain: 90, indiaCost: '₹1,50,000', intlGain: 150, intlCost: '€1,500', reason: 'EU can use E85 flex fuel; India relies on pump 95' },
    { stage: 'Stage 3', stageColor: '#f87171', platform: 'BMW M340i (B58)', indiaGain: 200, indiaCost: '₹8,00,000+', intlGain: 400, intlCost: '$8,000', reason: 'E85/E30 blend unavailable in India; WMI as substitute' },
  ]

  const buildImages = {
    india: [
      { label: 'Code6 Stage 2 Polo — Mumbai', src: '/images/polo_tuned.png', desc: '155 HP on 95 RON. WMI added for Indian summers. Conservative timing to stay safe.' },
      { label: 'Harmonixx B58 M340i — Delhi', src: '/images/m340i_tuned.png', desc: '460 HP on Bootmod3 Stage 1. Chargepipe upgraded. Runs Speed 97 exclusively.' },
      { label: 'Wolf Moto Abarth — Pune', src: '/images/abarth_tuned.png', desc: '170 HP Stage 1. Stock turbo. 91 RON safe map. Runs daily in peak traffic.' },
    ],
    intl: [
      { label: 'Revo Stage 2+ Polo — UK', src: '/images/polo_stock.png', desc: '230 HP on 98 RON. No WMI needed. 10°C ambient keeps IATs low without intercooler.' },
      { label: 'HJ Motorsport M340i — Germany', src: '/images/m340i_stock.png', desc: '500 HP on catless downpipe and E30 blend. Hits 305 km/h on unrestricted Autobahn.' },
      { label: 'Autotecnica Abarth — UK', src: '/images/abarth_stock.png', desc: '280 HP TD04 swap. Sequential gearbox. Track-only build with full roll cage.' },
    ]
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto' }}>

      {/* ── HERO ── */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
          🇮🇳 India vs 🌍 International
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 16px', lineHeight: 1.7 }}>
          A Stage 1 tune in Germany adds 90 HP. The same tune in India adds 60 HP. A Stage 2 abroad uses E85 ethanol. In India, it uses water-methanol injection as a substitute. Here's the complete story of why the same car is a fundamentally different animal on Indian roads.
        </p>
        <p className="microcopy" style={{ marginBottom: '30px' }}>That 400hp build you saw on YouTube probably lives on 98/100RON and cool weather. We tune for Gurgaon summer traffic and 91RON reality.</p>

        {/* Quick stat pills */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Fuel Octane Gap', value: '~7 RON', color: '#f87171' },
            { label: 'Max Ambient Temp Delta', value: '+30°C', color: '#fb923c' },
            { label: 'Import Duty on Parts', value: '40-50%', color: '#facc15' },
            { label: 'Legal Mods in India', value: '~0', color: '#f87171' },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '99px', padding: '8px 20px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, color: s.color, fontFamily: 'var(--font-heading)' }}>{s.value}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── PHOTO TAB GALLERY ── */}
      <div className="premium-card" style={{ marginBottom: '40px', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px 0', borderBottom: '1px solid var(--border)', display: 'flex', gap: '0' }}>
          <button
            onClick={() => setActiveTab('india')}
            style={{
              padding: '12px 28px', background: 'none', border: 'none', cursor: 'pointer',
              color: activeTab === 'india' ? 'var(--text-primary)' : 'var(--text-muted)',
              fontWeight: activeTab === 'india' ? 700 : 400,
              borderBottom: activeTab === 'india' ? '2px solid var(--accent-red)' : '2px solid transparent',
              marginBottom: '-1px', fontSize: '1rem', transition: 'all 0.2s',
              fontFamily: 'var(--font-heading)'
            }}
          >
            🇮🇳 Indian Builds
          </button>
          <button
            onClick={() => setActiveTab('intl')}
            style={{
              padding: '12px 28px', background: 'none', border: 'none', cursor: 'pointer',
              color: activeTab === 'intl' ? 'var(--text-primary)' : 'var(--text-muted)',
              fontWeight: activeTab === 'intl' ? 700 : 400,
              borderBottom: activeTab === 'intl' ? '2px solid var(--accent-blue)' : '2px solid transparent',
              marginBottom: '-1px', fontSize: '1rem', transition: 'all 0.2s',
              fontFamily: 'var(--font-heading)'
            }}
          >
            🌍 International Builds
          </button>
        </div>
        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, ), 1fr))', gap: '16px', animation: 'fadeIn 0.3s ease' }}>
          {buildImages[activeTab].map((img, i) => (
            <div key={i} style={{ borderRadius: '10px', overflow: 'hidden', background: 'rgba(0,0,0,0.2)' }}>
              <div style={{ height: '180px', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={img.src}
                  alt={img.label}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80' }}
                />
              </div>
              <div style={{ padding: '14px' }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '6px' }}>{img.label}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.55 }}>{img.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ACCORDIONS ── */}

      {/* 1 — Fuel Quality */}
      <Accordion title="1. Fuel Quality — The Root of Everything" icon={<Zap size={18} />} color="#facc15" defaultOpen={true}>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
          Octane rating measures a fuel's resistance to "knocking" — premature detonation that can destroy pistons and connecting rods. Higher octane = the engine can use more aggressive ignition timing = more power extracted from each combustion cycle.
        </p>

        {/* Octane chart */}
        <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', fontSize: '0.9rem' }}>⛽ Pump Fuel Octane by Country (RON)</div>
          {[
            { region: '🇮🇳 India (Regular)', ron: 91, color: '#f87171', width: '67%' },
            { region: '🇮🇳 India (Speed 97)', ron: 97, color: '#fb923c', width: '72%' },
            { region: '🇺🇸 USA (Regular, AKI)', ron: 91, color: '#60a5fa', width: '67%', note: '≈95 RON' },
            { region: '🇺🇸 USA (Premium, AKI)', ron: 93, color: '#60a5fa', width: '69%', note: '≈98 RON' },
            { region: '🇩🇪 Germany (Super)', ron: 95, color: '#4ade80', width: '71%' },
            { region: '🇩🇪 Germany (Super Plus)', ron: 98, color: '#4ade80', width: '74%' },
            { region: '🇬🇧 UK (V-Power)', ron: 99, color: '#a78bfa', width: '75%' },
            { region: '🌍 E85 (Ethanol blend)', ron: 108, color: '#e879f9', width: '82%' },
          ].map(f => (
            <div key={f.region} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{f.region}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: f.color }}>{f.ron} RON{f.note ? ` (${f.note})` : ''}</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: f.width, background: f.color, borderRadius: '99px', transition: 'width 1s ease' }} />
              </div>
            </div>
          ))}
        </div>

        <InfoBox color="#f87171" emoji="🇮🇳" title="India Tuner Workaround">
          Since E85 is unavailable in India, top tuners use <strong>Water-Methanol Injection (WMI)</strong>. A WMI kit sprays a fine mist of water + methanol directly into the intake. This cools the incoming charge (like a liquid intercooler) and increases the effective octane by ~3-5 RON — enough to safely run more aggressive timing maps in India's heat.
        </InfoBox>

        <InfoBox color="#4ade80" emoji="💡" title="Why This Matters">
          Every 1 RON of extra octane allows the tuner to advance ignition timing by roughly 1-2°. More timing advance = better fuel burn = more power. This is why the same ECU flash gains 90 HP in Germany (98 RON) but only 60 HP in India (95 RON) on the same car.
        </InfoBox>
      </Accordion>

      {/* 2 — Stage Comparison Table */}
      <Accordion title="2. Stage-by-Stage Power Gains: India vs International" icon={<Zap size={18} />} color="#60a5fa">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
          This table shows realistic, verified power gains on the same platform tuned in India versus internationally. The gap is significant — due to fuel quality, ambient temperature, and conservative tuning to protect engines on Indian roads.
        </p>
        <StageTable rows={STAGE_DATA} />
        <InfoBox color="#facc15" emoji="⚠️" title="Key Takeaway">
          A well-tuned Stage 2 car in India is roughly equivalent to a Stage 1 car tuned internationally, in terms of absolute power output. However, the Indian tune is often <em>more reliable</em> in the long run because it's built for survival at 45°C ambient, not just peak numbers on a cold dyno.
        </InfoBox>
      </Accordion>

      {/* 3 — Thermal Constraints */}
      <Accordion title="3. Heat: India's Biggest Enemy" icon={<Thermometer size={18} />} color="#fb923c">
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '6px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', padding: '0 0 8px' }}>Metric</div>
            <div style={{ color: '#f87171', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', padding: '0 0 8px', textAlign: 'center' }}>🇮🇳 India</div>
            <div style={{ color: '#60a5fa', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', padding: '0 0 8px', textAlign: 'center' }}>🌍 Europe/UK</div>
          </div>
          <CompRow label="Peak Ambient Temp" india="45°C+ (summer)" intl="15–25°C (summer)" />
          <CompRow label="Under-bonnet Temp" india="80–100°C in traffic" intl="50–65°C typical" />
          <CompRow label="Intake Air Temp (IAT)" india="55–70°C stock IC" intl="25–40°C stock IC" />
          <CompRow label="Heat Soak Risk" india="Extremely high at Stage 2" intl="Low at Stage 2" />
          <CompRow label="IC Upgrade (Stage 1)" india="Recommended" intl="Optional" />
          <CompRow label="IC Upgrade (Stage 2)" india="Mandatory" intl="Recommended" />
          <CompRow label="WMI Required" india="Yes for Stage 2+" intl="Only at Stage 3+" />
        </div>

        <InfoBox color="#fb923c" emoji="🌡️" title="What Heat Soak Actually Does">
          When your Intake Air Temperature (IAT) climbs above ~40°C, the ECU's knock sensor detects the risk of detonation and automatically <strong>pulls timing</strong> (retards ignition). A tuned car making 300 HP on a cold morning can be making just 240 HP by lap 5 of a track day in Indian summer heat. This is called "heat soak" — the single biggest enemy of Indian tuners.
        </InfoBox>

        <InfoBox color="#4ade80" emoji="✅" title="The Indian Solution">
          The best Indian tuning shops build "heat management" into the tune itself. They log IAT vs power on a hot dyno, then reduce boost targets at high IATs. Pair this with a quality front-mount intercooler and a WMI kit, and you can have a reliable, consistent tune year-round in India.
        </InfoBox>
      </Accordion>

      {/* 4 — Parts & Import Duty */}
      <Accordion title="4. Parts Availability & Import Duty" icon={<Package size={18} />} color="#a78bfa">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
          This is arguably the biggest financial barrier to building a serious performance car in India. Import duties, GST, and customs handling fees can add 60-80% on top of the international price of a part.
        </p>

        <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', fontSize: '0.9rem' }}>💸 Import Duty Breakdown (Auto Parts)</div>
          {[
            { tax: 'Basic Customs Duty (BCD)', rate: '7.5–40%', note: 'Varies by HS code. Performance parts ~40%' },
            { tax: 'IGST (GST on imports)', rate: '18%', note: 'Applied on (value + BCD)' },
            { tax: 'Handling & CFS charges', rate: '₹8,000–20,000', note: 'Fixed fees at port of entry' },
            { tax: 'Customs Agent Fee', rate: '₹3,000–8,000', note: 'To clear goods through customs' },
          ].map(t => (
            <div key={t.tax} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', gap: '12px', marginBottom: '10px', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 600 }}>{t.tax}</span>
              <span style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.88rem' }}>{t.rate}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{t.note}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '10px', padding: '20px', marginBottom: '16px' }}>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', fontSize: '0.9rem' }}>🧮 Real Example: VRSF Downpipe (BMW B58)</div>
          {[
            { label: 'USA retail price', value: '$350 (~₹29,000)', color: '#60a5fa' },
            { label: '+ International shipping', value: '$80 (~₹6,600)', color: 'var(--text-muted)' },
            { label: '+ Basic Customs Duty (40%)', value: '₹14,240', color: '#f87171' },
            { label: '+ IGST (18% on ₹35,600+₹14,240)', value: '₹8,972', color: '#f87171' },
            { label: '+ Customs agent + CFS', value: '₹15,000', color: '#f87171' },
            { label: '= Total Landed Cost in India', value: '~₹74,000 (2.5× original!)', color: '#facc15', bold: true },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: r.bold ? 'none' : '1px solid rgba(255,255,255,0.05)', marginTop: r.bold ? '8px' : '0' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{r.label}</span>
              <span style={{ color: r.color, fontWeight: r.bold ? 800 : 500, fontSize: '0.88rem' }}>{r.value}</span>
            </div>
          ))}
        </div>

        <InfoBox color="#4ade80" emoji="🔧" title="Indian Alternative">
          This is why local fabrication has exploded. Shops like Wolf Moto, Cobra Motorsport, and Shiftex fabricate stainless steel downpipes and cat-back exhausts locally for ₹18,000–35,000 — often comparable quality and a fraction of the imported cost.
        </InfoBox>
      </Accordion>

      {/* 5 — Legal */}
      <Accordion title="5. Legal Landscape — The Uncomfortable Truth" icon={<Shield size={18} />} color="#f87171">
        <div style={{ marginBottom: '20px' }}>
          <CompRow label="Engine tuning (ECU remap)" india="Technically illegal — MV Act S.52" intl="Legal with documented record (Germany/UK)" />
          <CompRow label="Exhaust modification" india="Illegal if noise >80 dB" intl="Legal with TÜV/IVA certificate (EU/UK)" />
          <CompRow label="Suspension lowering" india="Illegal (structural change)" intl="Legal with 30mm limit (Germany)" />
          <CompRow label="Turbo upgrade" india="Illegal (engine modification)" intl="Legal with proof of emissions compliance" />
          <CompRow label="Wheel/tyre upsize" india="Up to +1 inch tolerated informally" intl="Legal within load-rating limits" />
          <CompRow label="Roll cage / safety gear" india="Illegal for road use" intl="Track-only legality, clear framework" />
        </div>

        <InfoBox color="#f87171" emoji="⚖️" title="Motor Vehicles Act, Section 52">
          Section 52 of the Motor Vehicles Act 1988 prohibits any alteration to a vehicle that differs from its manufacturer's original specifications. This technically makes <strong>every single performance modification illegal in India</strong> — including ECU tunes, exhausts, lowering springs, and even wheel upsizes. The law is broadly enforced at police checkpoints.
        </InfoBox>

        <InfoBox color="#facc15" emoji="🤫" title="How the Indian Tuning Scene Actually Operates">
          <strong>Flash and revert:</strong> Most ECU tunes can be reverted to stock maps in under 10 minutes via OBD port. Tuned cars are driven with stock maps at checkpoints.<br /><br />
          <strong>Physical mods:</strong> Downpipes, intakes, exhausts are considered "at your risk." The typical enforcement is a fine (₹1,000–5,000) rather than impoundment, unless the car is wildly outside spec.<br /><br />
          <strong>Track days as a loophole:</strong> Performance parts are increasingly justified as "for track use." Events like Madras Motor Race Track (MMRT) and Buddh International Circuit (BIC) have created a grey zone where enthusiasts operate.
        </InfoBox>

        <InfoBox color="#4ade80" emoji="🌍" title="How It Works Abroad">
          <strong>Germany (TÜV):</strong> Any modification can be certified by a TÜV engineer. Once certified, it's legal and your insurance covers it.<br /><br />
          <strong>UK (DVLA/IVA):</strong> Modifications must be declared to insurers. Higher premium, but you're legally covered.<br /><br />
          <strong>USA (CARB / 50-state):</strong> CARB-certified (California Air Resources Board) parts can be used legally even in strict emission states.
        </InfoBox>
      </Accordion>

      {/* 6 — Tuner Quality */}
      <Accordion title="6. Tuner Quality & Dyno Culture" icon={<Wrench size={18} />} color="#4ade80">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
          The quality of your tune is only as good as the tuner doing it. Dyno culture — the practice of measuring power on a rolling road dynamometer — is standard practice abroad but still growing in India.
        </p>
        <CompRow label="Number of dyno facilities" india="~15 cities (Mumbai, Delhi, Blr, Hyd, Pune)" intl="Hundreds across every major city" />
        <CompRow label="Pre-tune baseline pull" india="Often skipped at budget shops" intl="Standard practice" />
        <CompRow label="Post-tune power logs" india="Provided by top shops only" intl="Always provided" />
        <CompRow label="Remote tuning available" india="Code6, Wolf Moto (select platforms)" intl="Widely available globally" />
        <CompRow label="Tuner training" india="Self-taught or EU-trained (rare)" intl="Formal apprenticeships + brand certifications" />
        <CompRow label="E-tuning (OBD logger)" india="Growing — Cobb AP, JB4 compatible" intl="Mainstream" />

        <InfoBox color="#4ade80" emoji="✅" title="Green Flags — Good Tuner">
          Baseline dyno pull before tuning • Before/after power comparison log • Specific fuel octane map (91/95 RON) • Data-logged tune (IAT, boost, AFR) • Clear communication on safe power limits
        </InfoBox>
        <InfoBox color="#f87171" emoji="🚩" title="Red Flags — Avoid">
          No dyno available • Promises "guaranteed X HP" without logging • Doesn't ask about your fuel quality or climate • No data logs provided • Same map for every car of the same model
        </InfoBox>
      </Accordion>

      {/* 7 — Road Conditions */}
      <Accordion title="7. Road Conditions & Suspension Reality" icon={<MapPin size={18} />} color="#e879f9">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
          A suspension tune that works on the smooth autobahn is completely wrong for Indian roads. Coilovers set to German stiffness will crack your subframe on a Mumbai pothole in a week.
        </p>
        <CompRow label="Typical road surface" india="Patchy, potholed, dusty, uneven" intl="Smooth, consistent, maintained" />
        <CompRow label="Speed breakers" india="Ubiquitous, often unmarked" intl="Rare, clearly marked" />
        <CompRow label="Dust & debris ingestion" india="High — cold air intake risky" intl="Low — cold air intake safe" />
        <CompRow label="Ideal spring rate" india="Softer (6-8 kg/mm front)" intl="Stiffer (10-14 kg/mm front)" />
        <CompRow label="Ride height (lowering)" india="15–20mm max for daily" intl="30–40mm on coilovers viable" />
        <CompRow label="Coilover recommendation" india="Bilstein B14 / KW V1 — more forgiving" intl="KW V3 / Öhlins — max performance" />

        <InfoBox color="#e879f9" emoji="🚗" title="The Indian Suspension Setup">
          Most experienced Indian tuners recommend <strong>not going below 20mm of drop</strong> for daily-driven cars on public roads. The focus shifts to sway bars (anti-roll bars) for better handling without losing ground clearance. A thicker rear sway bar massively reduces understeer without touching the springs.
        </InfoBox>
        <InfoBox color="#facc15" emoji="⚠️" title="Intake Warning">
          In India, a fully cold-air intake (that extends into the wheel arch or near the ground) is a <strong>dust and water ingestion risk</strong>. During monsoon season, a low-mounted intake can hydro-lock your engine. Indian tuners typically keep intakes inside the engine bay or use a closed-airbox system.
        </InfoBox>
      </Accordion>

      {/* 8 — Insurance */}
      <Accordion title="8. Insurance Reality" icon={<Car size={18} />} color="#38bdf8">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
          Insurance is the silent killer of the Indian mod scene. Unlike the UK where you can declare modifications and pay a higher premium, Indian insurers have zero framework for modified vehicles.
        </p>
        <CompRow label="Modification declaration" india="No formal process exists" intl="Declare to insurer, premium adjusts" />
        <CompRow label="Claim with mods visible" india="Claim likely rejected" intl="Covered if declared" />
        <CompRow label="Total loss with mods" india="Paid at stock value only" intl="Declared mod value added to payout" />
        <CompRow label="Specialist insurers" india="None available yet" intl="Hagerty, Adrian Flux (UK), State Farm (US)" />
        <CompRow label="Track day cover" india="Standard policies exclude track use" intl="Specialist track day insurance available" />

        <InfoBox color="#f87171" emoji="⚠️" title="The Real Risk">
          In India, if your tuned car is involved in an accident and the insurance assessor notices a non-stock downpipe, intake, or a remap (visible in the ECU log), your insurer can legally reject your claim in its entirety — even for damage completely unrelated to the modification.
        </InfoBox>
        <InfoBox color="#4ade80" emoji="💡" title="How People Manage This">
          <strong>Flash to stock before any repair visit</strong> — Tools like Bootmod3, MHD, and Cobb allow reverting to factory maps in under 5 minutes.<br /><br />
          <strong>Keep physical mods low-key</strong> — An aftermarket downpipe hidden under the car is far less visible than a huge wing or body kit.<br /><br />
          <strong>Third-party liability</strong> — Most people accept the risk on comprehensive cover but ensure third-party liability (mandated by law) is never compromised.
        </InfoBox>
      </Accordion>

    </div>
  )
}
