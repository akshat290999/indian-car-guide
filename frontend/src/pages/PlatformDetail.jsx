import { useParams, Link, useNavigate } from 'react-router-dom'
import { PLATFORMS_DATA } from '../tuningData'
import { useState } from 'react'

export default function PlatformDetail() {
  const { id } = useParams()
  const data = PLATFORMS_DATA[id]
  const navigate = useNavigate()

  const [activeImage, setActiveImage] = useState(0)

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

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <Link to="/platforms" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '30px' }}>
        ← Back to Platforms
      </Link>

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

      {/* Stages */}
      <h2 style={{ fontSize: '2rem', marginBottom: '30px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>Tuning Stages</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '60px' }}>
        {data.tuning_stages.map((stage, idx) => (
          <div key={idx} className="premium-card" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--accent-blue)' }}>{stage.stage}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--text-primary)' }}>
              <span><strong>{stage.power}</strong></span>
              <span style={{ color: 'var(--text-muted)' }}>{stage.cost}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{stage.mods}</p>
          </div>
        ))}
      </div>

      {/* Tuner Options */}
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

      {/* Owner Builds */}
      {data.owner_builds && data.owner_builds.length > 0 && (
        <>
          <h2 style={{ fontSize: '2rem', marginBottom: '30px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>Notable Indian Builds</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {data.owner_builds.map((build, idx) => (
              <div key={idx} className="premium-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <img 
                  src={build.img} 
                  alt={build.title} 
                  style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{build.title}</h3>
                  <p style={{ color: 'var(--text-muted)' }}>{build.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  )
}
