import { Link } from 'react-router-dom'
import { PLATFORMS_DATA } from '../tuningData'
import { useState } from 'react'

export default function Platforms() {
  const [filter, setFilter] = useState('All')
  
  const platforms = Object.entries(PLATFORMS_DATA).map(([id, data]) => ({
    id,
    ...data
  }))

  const categories = ['All', ...new Set(platforms.map(p => p.category))]

  const filteredPlatforms = filter === 'All' 
    ? platforms 
    : platforms.filter(p => p.category === filter)

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '10px' }}>Tuning Platforms</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '1.2rem' }}>
        Select a platform to view its tuning potential, common mods, and build examples.
      </p>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '30px'
      }}>
        {filteredPlatforms.map(platform => (
          <Link key={platform.id} to={`/platform/${platform.id}`} className="premium-card" style={{ display: 'flex', flexDirection: 'column', color: 'inherit' }}>
            <img 
              src={platform.img} 
              alt={platform.name} 
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: 'var(--text-primary)' }}>{platform.name}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', flex: 1 }}>{platform.description}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: 'auto' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Stock: <strong style={{ color: 'var(--text-primary)' }}>{platform.stock_power}</strong></span>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-red)' }}>Potential: <strong>{platform.potential}</strong></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
