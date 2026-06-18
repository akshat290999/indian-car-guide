import { useParams, Link, useNavigate } from 'react-router-dom'
import { PLATFORMS_DATA } from '../tuningData'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Fuel, AlertTriangle, Wrench, Flag, Globe } from 'lucide-react'

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
          <div className="premium-card" style={{ height: '400px', overflow: 'hidden' }}>
            <img
              src={data.gallery[activeImage].url}
              alt={`${data.name} - ${data.gallery[activeImage].type}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {data.gallery.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(idx)}
                style={{
                  flex: 1,
                  height: '80px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: activeImage === idx ? '2px solid var(--accent-red)' : '2px solid transparent',
                  opacity: activeImage === idx ? 1 : 0.5,
                  transition: 'all 0.2s'
                }}
              >
                <img
                  src={img.url}
                  alt={img.type}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80';
                  }}
                />
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
