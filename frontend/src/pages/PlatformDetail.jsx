import { useParams, Link, useNavigate } from 'react-router-dom'
import { PLATFORMS_DATA } from '../tuningData'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Fuel, AlertTriangle, Wrench, Flag, Globe, CheckCircle, IndianRupee, BarChart2, Car } from 'lucide-react'

export default function PlatformDetail() {
  const { id } = useParams()
  const data = PLATFORMS_DATA[id]
  const navigate = useNavigate()

  const [activeImage, setActiveImage] = useState(0)
  const [openSection, setOpenSection] = useState(null)

  if (!data) return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-primary)' }}>Platform not found</div>

  const getTunerId = (name) => {
    const n = name.toLowerCase()
    if (n.includes('bootmod3')) return 'bootmod3'
    if (n.includes('mhd')) return 'mhd'
    if (n.includes('apr')) return 'gttunerz'
    if (n.includes('harmonixx')) return 'harmonixx'
    if (n.includes('wolf')) return 'wolf'
    if (n.includes('code6')) return 'code6'
    if (n.includes('renntech')) return 'renntech'
    if (n.includes('pete')) return 'petes'
    return 'code6' // fallback
  }

  const handleTunerClick = (name) => {
    navigate('/tuners', { state: { targetTuner: getTunerId(name) } })
  }

  const toggleSection = (key) => {
    setOpenSection(openSection === key ? null : key)
  }

  // Accordion section component
  const AccordionSection = ({ sectionKey, icon, title, children }) => {
    const isOpen = openSection === sectionKey
    return (
      <div className="premium-card" style={{ borderLeft: '4px solid var(--accent-red)', overflow: 'hidden', marginBottom: '12px' }}>
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', cursor: 'pointer', transition: 'background 0.2s' }}
          onClick={() => toggleSection(sectionKey)}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {icon}
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>{title}</h3>
          </div>
          {isOpen ? <ChevronUp size={20} color="var(--accent-red)" /> : <ChevronDown size={20} color="var(--accent-red)" />}
        </div>
        {isOpen && (
          <div style={{ padding: '0 20px 20px 20px', animation: 'fadeIn 0.3s ease' }}>
            {children}
          </div>
        )}
      </div>
    )
  }

  // Build card - compact with small thumbnail area
  const BuildCard = ({ build, flag }) => (
    <div className="premium-card" style={{
      padding: '16px',
      display: 'flex',
      gap: '14px',
      alignItems: 'flex-start',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'default'
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)' }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      {/* Small icon/badge area instead of photo */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '10px', flexShrink: 0,
        background: 'linear-gradient(135deg, var(--accent-red), #ff6b6b)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.4rem'
      }}>
        {flag}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '8px' }}>
          <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{build.title}</h4>
          <span style={{
            padding: '2px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700',
            background: 'rgba(255,59,48,0.15)', color: 'var(--accent-red)', whiteSpace: 'nowrap'
          }}>
            {build.power}
          </span>
        </div>
        <p style={{ margin: '0 0 6px', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
          {build.desc}
        </p>
        <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)' }}>Tuned by {build.tuner}</span>
      </div>
    </div>
  )

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>

      <Link to="/platforms" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '30px' }}>
        ← Back to Platforms
      </Link>

      {/* Hero section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', marginBottom: '60px' }}>

        {/* Gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="premium-card" style={{ height: '400px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.1)' }}>
            <img
              src={data.gallery[activeImage].url}
              alt={`${data.name} - ${data.gallery[activeImage].type}`}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '10px' }}>
            {data.gallery.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(idx)}
                style={{
                  width: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  cursor: 'pointer',
                  opacity: activeImage === idx ? 1 : 0.5,
                  transition: 'all 0.2s',
                  alignItems: 'center'
                }}
              >
                <div style={{
                  width: '100%',
                  height: '80px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: activeImage === idx ? '2px solid var(--accent-red)' : '2px solid transparent',
                  boxShadow: activeImage === idx ? '0 0 15px rgba(255,59,48,0.3)' : 'none'
                }}>
                  <img
                    src={img.url}
                    alt={img.type}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', background: 'rgba(0,0,0,0.1)' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: activeImage === idx ? '600' : '400',
                  color: activeImage === idx ? 'var(--text-primary)' : 'var(--text-muted)'
                }}>
                  {img.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.8rem', color: 'var(--text-muted)', alignSelf: 'flex-start', marginBottom: '16px' }}>
            {data.category}
          </div>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px', lineHeight: '1.1' }}>{data.name}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px' }}>{data.description}</p>

          <div className="glass" style={{ padding: '24px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>Stock Power</p>
              <h3 style={{ fontSize: '1.4rem' }}>{data.stock_power}</h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>Tuning Potential</p>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--accent-red)' }}>{data.potential}</h3>
            </div>
          </div>
        </div>

      </div>

      {/* ─── Engine Intel Section (Accordions) ─── */}
      <h2 style={{ fontSize: '2rem', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        Engine Intel
      </h2>

      {data.recommended_fuel && (
        <AccordionSection sectionKey="fuel" icon={<Fuel size={18} color="var(--accent-blue)" />} title="Recommended Fuel">
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', margin: 0 }}>{data.recommended_fuel}</p>
        </AccordionSection>
      )}

      {data.known_limits && (
        <AccordionSection sectionKey="limits" icon={<AlertTriangle size={18} color="#f59e0b" />} title="Known Limits & Weak Points">
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', margin: 0 }}>{data.known_limits}</p>
        </AccordionSection>
      )}

      {data.tuning_notes && (
        <AccordionSection sectionKey="notes" icon={<Wrench size={18} color="var(--accent-red)" />} title="Expert Tuning Notes">
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', margin: 0 }}>{data.tuning_notes}</p>
        </AccordionSection>
      )}

      {/* India Ownership Reality */}
      <AccordionSection sectionKey="india" icon={<Car size={18} color="#fb923c" />} title="🇮🇳 India Ownership Reality">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { label: 'Insurance', detail: 'Any modification technically voids standard car insurance in India. Best practice: keep ECU maps reversible (flash to stock before any repair visit). Avoid visible structural changes.' },
            { label: 'Service Center', detail: 'Authorised service centers (e.g., VW, BMW, Hyundai dealers) will flag modifications and void warranty. Most tuned cars are maintained at trusted independent workshops.' },
            { label: 'Fuel Cost on a Tune', detail: 'A Stage 1 tune on 95 RON fuel adds roughly ₹3–8/km in extra fuel cost at aggressive driving. At highway cruise, fuel economy actually improves by 5–10% due to better combustion efficiency.' },
            { label: 'RTO & Police Checks', detail: 'ECU tunes are invisible to RTO. Physical mods (exhaust, lowering, wheels) are the actual risk. A flash-revertible tune is the safest approach legally in India.' },
            { label: 'Resale Value', detail: 'A well-tuned car with a clean exterior and stock-looking engine bay holds resale value well among enthusiasts. Avoid obvious mods that scare off mainstream buyers.' },
          ].map(item => (
            <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '12px', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <span style={{ fontWeight: 700, color: '#fb923c', fontSize: '0.9rem' }}>{item.label}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.detail}</span>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* Pre-Tune Checklist */}
      <AccordionSection sectionKey="checklist" icon={<CheckCircle size={18} color="#4ade80" />} title="✅ Pre-Tune Checklist">
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.95rem', lineHeight: 1.6 }}>Complete this checklist before booking your tune. A tuner should refuse to remap a car that isn't in good mechanical health.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
          {[
            { item: 'Fresh engine oil (within 3,000 km)', priority: 'Critical' },
            { item: 'Spark plugs at correct gap & within service interval', priority: 'Critical' },
            { item: 'No active fault codes (clear DTC logs)', priority: 'Critical' },
            { item: 'Coolant level full, no leaks', priority: 'Critical' },
            { item: 'Air filter clean or replaced', priority: 'Important' },
            { item: 'No boost leaks (check intercooler hoses)', priority: 'Important' },
            { item: 'Fuel injectors clean (no misfire)', priority: 'Important' },
            { item: 'MAF sensor clean and reading correctly', priority: 'Important' },
            { item: 'Gearbox oil fresh (auto/DSG especially)', priority: 'Recommended' },
            { item: 'Charge pipe / boost pipes intact (no cracks)', priority: 'Recommended' },
          ].map(c => (
            <div key={c.item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <CheckCircle size={14} color={c.priority === 'Critical' ? '#f87171' : c.priority === 'Important' ? '#facc15' : '#4ade80'} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>{c.item}</div>
                <div style={{ fontSize: '0.75rem', color: c.priority === 'Critical' ? '#f87171' : c.priority === 'Important' ? '#facc15' : '#4ade80', marginTop: '3px' }}>{c.priority}</div>
              </div>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* Common Failure Points */}
      <AccordionSection sectionKey="failures" icon={<AlertTriangle size={18} color="#f87171" />} title="⚠️ Common Failure Points by Stage">
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.95rem', lineHeight: 1.6 }}>As power increases, different components become the weak link. Know what breaks before it breaks.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { stage: 'Stage 1', fails: 'Clutch pack (DSG) slips above rated torque. Charge pipe cracks under boost. Stock BOV flutters.', fix: 'TCU tune + charge pipe upgrade + Forge BOV' },
            { stage: 'Stage 2', fails: 'Stock intercooler heat-soaks in Indian summers. Stock turbo inlet restricts airflow. OEM downpipe creates back pressure.', fix: 'FMIC + performance intake + decat downpipe + WMI' },
            { stage: 'Stage 3+', fails: 'Connecting rods bend or snap. Pistons crack from detonation. Clutch/axles cannot handle extreme torque.', fix: 'Forged internals + built transmission + upgraded axles' },
            { stage: 'All Stages', fails: 'Dirty fuel in India causes knock sensor to pull timing. Heat soak degrades power consistency.', fix: 'Always use Speed 97. WMI for hot days. Baseline your tune in heat, not just cold mornings.' },
          ].map(f => (
            <div key={f.stage} style={{ padding: '14px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 700, color: f.stage === 'Stage 1' ? '#60a5fa' : f.stage === 'Stage 2' ? '#facc15' : f.stage === 'Stage 3+' ? '#f87171' : '#a78bfa', fontSize: '0.9rem' }}>{f.stage}</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#f87171', marginBottom: '6px' }}>⚠️ {f.fails}</div>
              <div style={{ fontSize: '0.85rem', color: '#4ade80' }}>✅ Fix: {f.fix}</div>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* Dyno Numbers */}
      <AccordionSection sectionKey="dyno" icon={<BarChart2 size={18} color="var(--accent-blue)" />} title="📊 Reading Dyno Numbers">
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.95rem', lineHeight: 1.6 }}>Indian dyno pulls have quirks. Here's how to interpret your power numbers correctly.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '18px' }}>
          {[
            { label: 'Crank HP vs Wheel HP', detail: 'Indian dynos typically measure at the wheel (WHP). Subtract ~12–18% for drivetrain losses to get crank HP. A 300 WHP car is ~350 crank HP.' },
            { label: 'Dyno Correction Factor', detail: 'Indian summers (high temp, lower density air) can make the same car read 5–8% less power than a winter pull. Always compare pulls in similar conditions.' },
            { label: 'Rolling Road vs Hub Dyno', detail: 'Hub dynos (wheels off, direct bolt-on) are more accurate. Rolling road dynos add tyre slip error. Most Indian shops use rolling roads — add ~5% for tyre loss.' },
            { label: 'What a Good Tune Looks Like', detail: 'A smooth, linear torque curve with no sudden dips. Power should climb steadily from ~2,000 RPM and hold flat through the rev range. Any sharp drops indicate lean AFR or knock.' },
          ].map(d => (
            <div key={d.label} style={{ padding: '14px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 700, color: 'var(--accent-blue)', fontSize: '0.85rem', marginBottom: '8px' }}>{d.label}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{d.detail}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '8px', padding: '14px 18px' }}>
          <div style={{ fontWeight: 700, color: 'var(--accent-blue)', fontSize: '0.85rem', marginBottom: '6px' }}>💡 Pro Tip</div>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Always ask your tuner for a <strong>data log</strong> — not just the dyno graph. The log should show boost pressure, AFR (Air-Fuel Ratio), IAT (Intake Air Temp), and knock count on every pull. A good tune has 0 knock events and AFR between 11.5–12.5:1 at peak power.</p>
        </div>
      </AccordionSection>

      <div style={{ marginBottom: '60px' }} />

      {/* ─── Stages ─── */}
      <h2 style={{ fontSize: '2rem', marginBottom: '30px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>Tuning Stages</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '60px' }}>
        {data.tuning_stages.map((stage, idx) => (
          <div key={idx} className="premium-card" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: idx === 0 ? 'var(--accent-blue)' : idx === 1 ? '#f59e0b' : 'var(--accent-red)' }}>{stage.stage}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--text-primary)' }}>
              <span><strong>{stage.power}</strong></span>
              <span style={{ color: 'var(--text-muted)' }}>{stage.cost}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{stage.mods}</p>
          </div>
        ))}
      </div>

      {/* ─── Tuner Options ─── */}
      {data.tuner_options && data.tuner_options.length > 0 && (
        <>
          <h2 style={{ fontSize: '2rem', marginBottom: '30px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>Tuner Options & Characteristics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '60px' }}>
            {data.tuner_options.map((tuner, idx) => (
              <div
                key={idx}
                className="premium-card tuner-card-hover"
                style={{ padding: '30px', borderLeft: '4px solid var(--accent-red)', cursor: 'pointer', transition: 'all 0.2s ease' }}
                onClick={() => handleTunerClick(tuner.name)}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>{tuner.name}</h3>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{tuner.price}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '10px' }}>{tuner.style}</p>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  View Tuner Details →
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ─── Community Builds ─── */}
      <h2 style={{ fontSize: '2rem', marginBottom: '30px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        Community Builds
      </h2>

      {/* Indian Builds */}
      {data.indian_builds && data.indian_builds.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Flag size={18} color="var(--accent-red)" />
            <h3 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-primary)' }}>
              Indian Builds
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '400', marginLeft: '10px' }}>🇮🇳</span>
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '14px' }}>
            {data.indian_builds.map((build, idx) => (
              <BuildCard key={idx} build={build} flag="🇮🇳" />
            ))}
          </div>
        </div>
      )}

      {/* International Builds */}
      {data.intl_builds && data.intl_builds.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Globe size={18} color="var(--accent-blue)" />
            <h3 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-primary)' }}>
              International Builds
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '400', marginLeft: '10px' }}>🌍</span>
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '14px' }}>
            {data.intl_builds.map((build, idx) => (
              <BuildCard key={idx} build={build} flag="🌍" />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
