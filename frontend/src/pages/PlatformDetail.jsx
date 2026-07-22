import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { PLATFORMS_DATA } from '../tuningData'
import { ChevronDown, ChevronUp, Fuel, AlertTriangle, Wrench, Flag, Globe, CheckCircle, Car, Settings, HelpCircle, Activity, DollarSign } from 'lucide-react'

export default function PlatformDetail() {
  const { id } = useParams()
  const data = PLATFORMS_DATA[id]
  const navigate = useNavigate()

  const [activeImage, setActiveImage] = useState(0)
  const [openAccordion, setOpenAccordion] = useState(null)
  const [calcStage, setCalcStage] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')

  const sectionRefs = {
    overview: useRef(null),
    stages: useRef(null),
    calculator: useRef(null),
    tuners: useRef(null),
    faq: useRef(null),
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200
      let currentTab = 'overview'
      for (const [key, ref] of Object.entries(sectionRefs)) {
        if (ref.current && ref.current.offsetTop <= scrollPos) {
          currentTab = key
        }
      }
      if (activeTab !== currentTab) {
        setActiveTab(currentTab)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeTab])

  const scrollTo = (id) => {
    setActiveTab(id)
    if (sectionRefs[id].current) {
      const y = sectionRefs[id].current.getBoundingClientRect().top + window.scrollY - 140
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (!data) return <div className="empty-state"><h3>Platform not found</h3></div>

  const toggleAccordion = (key) => setOpenAccordion(openAccordion === key ? null : key)

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
    return 'code6'
  }

  const Accordion = ({ id, icon: Icon, title, children }) => {
    const isOpen = openAccordion === id
    return (
      <div className="premium-card" style={{ marginBottom: '16px', overflow: 'hidden' }}>
        <div 
          onClick={() => toggleAccordion(id)}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', cursor: 'pointer', background: isOpen ? 'var(--surface-hover)' : 'transparent', transition: 'background 0.2s' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Icon size={20} color="var(--accent-red)" />
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-heading)' }}>{title}</h3>
          </div>
          {isOpen ? <ChevronUp size={20} color="var(--text-muted)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
        </div>
        {isOpen && (
          <div style={{ padding: '0 20px 20px', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {children}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="page-container" style={{ paddingBottom: '100px' }}>
      
      {/* ── HEADER (Split Layout) ── */}
      <div className="page-hero" style={{ padding: '60px 20px', textAlign: 'left' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link to="/platforms" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '24px', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← Back to Platforms
          </Link>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
            {/* Left: Image */}
            <div style={{ position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, var(--surface-hover) 0%, transparent 70%)', zIndex: 0 }}></div>
              <img src={data.gallery[activeImage].url} alt={data.name} style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 1, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }} />
              
              <div style={{ position: 'absolute', bottom: '-20px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '12px', zIndex: 2 }}>
                {data.gallery.map((img, idx) => (
                  <div key={idx} onClick={() => setActiveImage(idx)} style={{ width: '60px', height: '40px', borderRadius: '6px', overflow: 'hidden', border: activeImage === idx ? '2px solid var(--accent-red)' : '2px solid var(--border)', cursor: 'pointer', opacity: activeImage === idx ? 1 : 0.5 }}>
                    <img src={img.url} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Stats */}
            <div>
              <span className="chip" style={{ marginBottom: '16px' }}>{data.category}</span>
              <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.1 }}>{data.name}</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '32px', lineHeight: 1.5 }}>{data.description}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="premium-card" style={{ padding: '20px', borderLeft: '3px solid var(--accent-blue)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '8px' }}>Stock Power</div>
                  <div style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>{data.stock_power?.split('/')[0]}</div>
                </div>
                <div className="premium-card" style={{ padding: '20px', borderLeft: '3px solid var(--status-green)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '8px' }}>Tuning Potential</div>
                  <div style={{ fontSize: '1.5rem', color: 'var(--status-green)', fontWeight: 'bold' }}>{data.potential}</div>
                </div>
                <div className="premium-card" style={{ padding: '20px', borderLeft: '3px solid var(--status-orange)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '8px' }}>Drive</div>
                  <div style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: '600' }}>FWD / AWD / RWD</div>
                </div>
                <div className="premium-card" style={{ padding: '20px', borderLeft: '3px solid var(--status-yellow)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '8px' }}>Reliability</div>
                  <div style={{ display: 'flex', gap: '2px', color: 'var(--status-yellow)', fontSize: '1.2rem' }}>
                    {[...Array(5)].map((_, i) => <span key={i} style={{ opacity: i < (data.potential_rating || 4) ? 1 : 0.2 }}>★</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* ── STICKY TABS ── */}
        <div className="sticky-tabs" style={{ 
          position: 'sticky', top: '70px', zIndex: 40, 
          display: 'flex', gap: '8px', overflowX: 'auto', padding: '16px', 
          background: 'var(--bg)', borderBottom: '1px solid var(--border)', marginBottom: '40px'
        }}>
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'stages', label: 'Stages', icon: Settings },
            { id: 'calculator', label: 'Calculator', icon: DollarSign },
            { id: 'tuners', label: 'Tuners', icon: Wrench },
            { id: 'faq', label: 'FAQ', icon: HelpCircle },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className="chip"
              style={{
                background: activeTab === tab.id ? 'var(--text-primary)' : 'var(--surface)',
                color: activeTab === tab.id ? 'var(--bg)' : 'var(--text-muted)',
                border: '1px solid', borderColor: activeTab === tab.id ? 'var(--text-primary)' : 'var(--border)',
                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.9rem'
              }}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        <section ref={sectionRefs.overview} style={{ scrollMarginTop: '160px', marginBottom: '80px' }}>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '24px' }}>Overview & Engine Intel</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div className="premium-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Fuel size={20} color="var(--accent-blue)" /> Fuel Requirements</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{data.recommended_fuel || '95 RON minimum. 97+ RON recommended for Stage 2 and above.'}</p>
            </div>
            
            <div className="premium-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertTriangle size={20} color="var(--status-yellow)" /> Known Limits</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{data.known_limits || 'Platform specific limits apply. Ensure proper maintenance before tuning.'}</p>
            </div>

            {data.do_not_exceed && (
              <div className="premium-card" style={{ padding: '24px', border: '1px dashed var(--status-red)', background: 'rgba(239, 68, 68, 0.05)' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--status-red)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>🛑 Do Not Exceed</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{data.do_not_exceed}</p>
              </div>
            )}
          </div>
        </section>

        {/* ── STAGES ── */}
        <section ref={sectionRefs.stages} style={{ scrollMarginTop: '160px', marginBottom: '80px' }}>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '24px' }}>Tuning Stages</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.tuning_stages?.map((stage, idx) => (
              <Accordion key={idx} id={`stage-${idx}`} icon={Settings} title={`${stage.stage} — ${stage.power}`}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', alignItems: 'flex-start' }}>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px' }}>Required Mods:</strong>
                    <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{stage.mods}</p>
                  </div>
                  <div style={{ background: 'var(--bg)', padding: '12px 20px', borderRadius: '8px', border: '1px solid var(--border)', textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Estimated Cost</div>
                    <div style={{ fontSize: '1.2rem', color: 'var(--status-green)', fontWeight: 'bold' }}>{stage.cost}</div>
                  </div>
                </div>
              </Accordion>
            ))}
          </div>
        </section>

        {/* ── BUILD CALCULATOR ── */}
        <section ref={sectionRefs.calculator} style={{ scrollMarginTop: '160px', marginBottom: '80px' }}>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '24px' }}>Build Cost Calculator</h2>
          
          <div className="premium-card" style={{ padding: '32px', display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '20px' }}>Select Target Stage</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.tuning_stages?.map((stage, idx) => (
                  <label key={idx} style={{ 
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', 
                    borderRadius: '8px', border: '1px solid', 
                    borderColor: calcStage === idx ? 'var(--accent-red)' : 'var(--border)',
                    background: calcStage === idx ? 'var(--surface-hover)' : 'var(--surface)',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}>
                    <input type="radio" name="calcStage" checked={calcStage === idx} onChange={() => setCalcStage(idx)} style={{ accentColor: 'var(--accent-red)' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{stage.stage}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{stage.power}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Estimated Investment</div>
                <div style={{ fontSize: '3rem', color: 'var(--status-green)', fontWeight: 'bold', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>
                  {data.tuning_stages?.[calcStage]?.cost || '₹0'}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Includes estimated hardware and software costs. Labour and local taxes may vary.
                </p>
                <Link to="/tuners" className="btn btn-primary" style={{ marginTop: '24px', width: '100%', display: 'block', textAlign: 'center' }}>
                  Find Tuners for this Stage →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── TUNERS ── */}
        <section ref={sectionRefs.tuners} style={{ scrollMarginTop: '160px', marginBottom: '80px' }}>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '24px' }}>Recommended Tuners</h2>
          {data.tuner_options && data.tuner_options.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {data.tuner_options.map((tuner, idx) => (
                <div key={idx} onClick={() => handleTunerClick(tuner.name)} className="premium-card glow-on-hover" style={{ padding: '24px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{tuner.name}</h3>
                    <span style={{ color: 'var(--status-green)', fontSize: '0.9rem', fontWeight: 'bold' }}>{tuner.price}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px' }}>{tuner.style}</p>
                  <span style={{ color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: '600' }}>View Tuner Profile →</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="premium-card" style={{ padding: '24px' }}>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>No specific tuner recommendations available for this platform yet. Check our general Tuners directory.</p>
            </div>
          )}
        </section>

        {/* ── FAQ ── */}
        <section ref={sectionRefs.faq} style={{ scrollMarginTop: '160px' }}>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '24px' }}>FAQ & Ownership Reality</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Accordion id="faq-1" icon={Flag} title="🇮🇳 Indian Ownership Reality">
              <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><strong>Insurance:</strong> Modifications technically void standard car insurance. Keep ECU maps reversible.</li>
                <li><strong>Service Centers:</strong> Authorised service centers will flag modifications and void warranty. Build a relationship with a trusted independent garage.</li>
                <li><strong>Fuel Costs:</strong> Stage 1 on 95 RON adds roughly ₹3–8/km in extra fuel cost at aggressive driving. Highway cruise economy may actually improve by 5–10%.</li>
              </ul>
            </Accordion>
            <Accordion id="faq-2" icon={CheckCircle} title="✅ Pre-Tune Checklist">
              <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>Fresh engine oil (within 3,000 km)</li>
                <li>Spark plugs at correct gap & within service interval</li>
                <li>No active fault codes (clear DTC logs)</li>
                <li>Coolant level full, no leaks</li>
                <li>No boost leaks (check intercooler hoses)</li>
              </ul>
            </Accordion>
            <Accordion id="faq-3" icon={AlertTriangle} title="⚠️ Common Failure Points">
              <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><strong>Stage 1:</strong> Stock BOV flutters, charge pipes may crack under boost.</li>
                <li><strong>Stage 2:</strong> Intercooler heat-soaks in Indian summers. Downpipe creates backpressure.</li>
                <li><strong>All Stages:</strong> Poor fuel quality causes knock. Always use 95+ RON (Speed 97 / XP95).</li>
              </ul>
            </Accordion>
          </div>
        </section>

      </div>
    </div>
  )
}
