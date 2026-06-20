import { Link } from 'react-router-dom'
import { PLATFORMS_DATA } from '../tuningData'
import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'

const DIFFICULTY = {
  'High': { label: 'Moderate', color: 'var(--status-yellow)' },
  'Very High': { label: 'Expert', color: 'var(--status-orange)' },
  'Extreme': { label: 'Expert+', color: 'var(--status-red)' },
  'God-Tier': { label: 'God-Tier', color: 'var(--status-purple)' },
  'Medium': { label: 'Easy', color: 'var(--status-green)' },
  'Medium-High': { label: 'Moderate', color: 'var(--status-yellow)' },
}

const TAGS = {
  'vw-polo-tsi': { tag: '🏆 Most Popular', tagColor: 'var(--status-yellow)' },
  'skoda-octavia-vrs': { tag: '🔥 Best Value', tagColor: 'var(--status-red)' },
  'bmw-m340i': { tag: '👑 God-Tier Platform', tagColor: 'var(--status-purple)' },
  'fiat-abarth-punto': { tag: '🇮🇳 India Icon', tagColor: 'var(--status-orange)' },
  'hyundai-i20-nline': { tag: '⭐ Rising Star', tagColor: 'var(--status-green)' },
  'porsche-911': { tag: '🏎️ Supercar', tagColor: 'var(--status-purple)' },
}

export default function Platforms() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const platforms = Object.entries(PLATFORMS_DATA).map(([id, data]) => ({ id, ...data }))
  const categories = ['All', ...new Set(platforms.map(p => p.category))]

  const filtered = useMemo(() => {
    return platforms.filter(p => {
      const matchCat = filter === 'All' || p.category === filter
      const q = search.toLowerCase()
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [filter, search])

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '10px', fontFamily: 'var(--font-heading)' }}>Tuning Platforms</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '12px', fontSize: '1.1rem' }}>
        Select a platform to explore its full tuning potential — stages, costs, tuner options, and real builds.
      </p>
      <p className="microcopy" style={{ marginBottom: '32px' }}>Every car listed here has been tuned by at least one reputable shop in India. No guesswork.</p>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '20px', maxWidth: '480px' }}>
        <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder="Search platforms, categories..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '12px 16px 12px 40px', background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)',
            fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
            transition: 'border-color 0.2s'
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent-red)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      </div>

      {/* Category Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilter(cat)}
            style={{ fontSize: '0.85rem', padding: '8px 18px' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
        Showing {filtered.length} platform{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '24px' }}>
        {filtered.map(platform => {
          const diff = DIFFICULTY[platform.potential] || { label: 'Moderate', color: '#facc15', bg: 'rgba(250,204,21,0.12)' }
          const tag = TAGS[platform.id]

          return (
            <Link
              key={platform.id}
              to={`/platform/${platform.id}`}
              className={`premium-card ${platform.category === 'The VAG Turbo Legends' ? 'card-stripe-blue' : platform.category === 'Premium Performance' ? 'card-stripe-red' : platform.category === 'The Classics' ? 'card-stripe-yellow' : platform.category === 'Modern Hot Hatches' ? 'card-stripe-green' : platform.category === 'The NA Legends' ? 'card-stripe-purple' : ''}`}
              style={{ display: 'flex', flexDirection: 'column', color: 'inherit', transition: 'transform 0.2s, box-shadow 0.2s', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
            >
              {/* Tag badge */}
              {tag && (
                <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '99px', padding: '4px 12px', fontSize: '0.75rem', fontWeight: 700, color: tag.tagColor }}>
                  {tag.tag}
                </div>
              )}

              {/* Difficulty badge */}
              <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 2, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '99px', padding: '4px 10px', fontSize: '0.7rem', fontWeight: 700, color: diff.color }}>
                {diff.label}
              </div>

              {/* Car image */}
              <div style={{ height: '150px', overflow: 'hidden', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={platform.img}
                  alt={platform.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }}
                  onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80' }}
                />
              </div>

              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{platform.category}</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{platform.name}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px', flex: 1, fontSize: '0.88rem', lineHeight: 1.55 }}>{platform.description}</p>

                {/* HP Arrow */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', background: 'var(--surface-hover)', borderRadius: '8px', padding: '10px 12px' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>{platform.stock_power.split('/')[0].trim()}</span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-red))' }} />
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-red)' }}>▶</span>
                  </div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--accent-red)', fontWeight: 700 }}>{platform.potential} Potential</span>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', fontWeight: 500 }}>View Full Tuning Guide →</div>
              </div>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>No platforms found</h3>
          <p>Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  )
}
