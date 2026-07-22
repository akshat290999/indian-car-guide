import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PLATFORMS_DATA } from '../tuningData'
import { Search, ChevronDown, Check, X, GitCompare } from 'lucide-react'

const DIFFICULTY = {
  'High': { label: 'Moderate', color: 'var(--status-yellow)', value: 2 },
  'Very High': { label: 'Expert', color: 'var(--status-orange)', value: 3 },
  'Extreme': { label: 'Expert+', color: 'var(--status-red)', value: 4 },
  'God-Tier': { label: 'God-Tier', color: 'var(--status-purple)', value: 5 },
  'Medium': { label: 'Easy', color: 'var(--status-green)', value: 1 },
  'Medium-High': { label: 'Moderate', color: 'var(--status-yellow)', value: 2 },
}

const POTENTIAL_PCT = {
  'Medium': 35,
  'High': 55,
  'Medium-High': 50,
  'Very High': 75,
  'Extreme': 88,
  'God-Tier': 100,
}

const TAGS = {
  'vw-polo-tsi': { tag: '🏆 Most Popular', tagColor: 'var(--status-yellow)' },
  'skoda-octavia-vrs': { tag: '🔥 Best Value', tagColor: 'var(--status-red)' },
  'bmw-m340i': { tag: '👑 God-Tier', tagColor: 'var(--status-purple)' },
  'fiat-abarth-punto': { tag: '🇮🇳 India Icon', tagColor: 'var(--status-orange)' },
  'hyundai-i20-nline': { tag: '⭐ Rising Star', tagColor: 'var(--status-green)' },
  'porsche-911': { tag: '🏎️ Supercar', tagColor: 'var(--status-purple)' },
}

const mapCategory = (cat) => {
  if (cat.includes('VAG Turbo') || cat.includes('Hot Hatches')) return 'Hot Hatch'
  if (cat.includes('Premium')) return 'Premium'
  if (cat.includes('Supercar')) return 'Supercar'
  if (cat.includes('Classic')) return 'Classic'
  if (cat.includes('NA Legend')) return 'NA'
  if (cat.includes('Sedan')) return 'Sedan'
  return cat
}

export default function Platforms() {
  const [filterCat, setFilterCat] = useState('All')
  const [filterDiff, setFilterDiff] = useState('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('Popularity') // Popularity, HP Potential, Alphabetical
  const [compareList, setCompareList] = useState([])

  const platforms = Object.entries(PLATFORMS_DATA).map(([id, data]) => ({ id, ...data, mappedCat: mapCategory(data.category) }))
  
  const categories = ['All', 'Hot Hatch', 'Sedan', 'Premium', 'Supercar', 'Classic', 'NA']

  const filtered = useMemo(() => {
    let result = platforms.filter(p => {
      const matchCat = filterCat === 'All' || p.mappedCat === filterCat
      const matchDiff = filterDiff === 'All' || (DIFFICULTY[p.potential]?.label === filterDiff)
      const q = search.toLowerCase()
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      return matchCat && matchDiff && matchSearch
    })

    if (sortBy === 'HP Potential') {
      result.sort((a, b) => (POTENTIAL_PCT[b.potential] || 0) - (POTENTIAL_PCT[a.potential] || 0))
    } else if (sortBy === 'Alphabetical') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      // Popularity based on predefined TAGS weighting + fallback
      result.sort((a, b) => {
        const scoreA = TAGS[a.id] ? 10 : 0
        const scoreB = TAGS[b.id] ? 10 : 0
        if (scoreA !== scoreB) return scoreB - scoreA
        return (POTENTIAL_PCT[b.potential] || 0) - (POTENTIAL_PCT[a.potential] || 0)
      })
    }
    return result
  }, [filterCat, filterDiff, search, sortBy, platforms])

  const toggleCompare = (e, id) => {
    e.preventDefault()
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(c => c !== id))
    } else if (compareList.length < 2) {
      setCompareList([...compareList, id])
    }
  }

  const compareData = compareList.map(id => platforms.find(p => p.id === id))

  return (
    <div className="page-container" style={{ paddingBottom: compareList.length > 0 ? '300px' : '80px' }}>
      
      <div className="page-hero">
        <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '16px' }}>TUNING PLATFORMS</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-lg)', maxWidth: '600px', margin: '0 auto' }}>
          Explore India's most popular tuning platforms — stages, costs, tuner options, and potential.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* Sticky Filter Bar */}
        <div className="filter-bar" style={{ position: 'sticky', top: '70px', zIndex: 40, marginBottom: '40px', borderRadius: '12px' }}>
          
          <div style={{ display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap', alignItems: 'center' }}>
            
            <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search cars..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ 
                  width: '100%', padding: '10px 16px 10px 42px', 
                  background: 'var(--surface)', border: '1px solid var(--border)', 
                  borderRadius: '99px', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', flexWrap: 'nowrap' }} className="hide-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCat(cat)}
                  className="chip"
                  style={{
                    background: filterCat === cat ? 'var(--text-primary)' : 'var(--surface)',
                    color: filterCat === cat ? 'var(--bg)' : 'var(--text-muted)',
                    border: '1px solid',
                    borderColor: filterCat === cat ? 'var(--text-primary)' : 'var(--border)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 8px' }}></div>

            <select value={filterDiff} onChange={e => setFilterDiff(e.target.value)} className="sort-select" style={{ minWidth: '130px' }}>
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Expert">Expert</option>
            </select>

            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select" style={{ minWidth: '140px' }}>
              <option value="Popularity">Sort: Popularity</option>
              <option value="HP Potential">Sort: Potential</option>
              <option value="Alphabetical">Sort: Name (A-Z)</option>
            </select>

          </div>
        </div>

        {/* Results count */}
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
          Showing {filtered.length} platforms
        </p>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {filtered.map(platform => {
            const diff = DIFFICULTY[platform.potential] || { label: 'Moderate', color: 'var(--status-yellow)' }
            const tag = TAGS[platform.id]
            const isComparing = compareList.includes(platform.id)

            return (
              <Link
                key={platform.id}
                to={`/platform/${platform.id}`}
                className="premium-card glow-on-hover"
                style={{ display: 'flex', flexDirection: 'column', color: 'inherit', position: 'relative', overflow: 'hidden', border: isComparing ? '2px solid var(--accent-blue)' : '1px solid var(--border)' }}
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
                <div style={{ height: '180px', overflow: 'hidden', background: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                  <img
                    src={platform.img}
                    alt={platform.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}
                    loading="lazy"
                    onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80' }}
                  />
                </div>

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{platform.mappedCat}</div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{platform.name}</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '20px', flex: 1, fontSize: '0.9rem', lineHeight: 1.5 }}>{platform.description}</p>

                  {/* HP Potential bar */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Stock: {platform.stock_power?.split('/')[0]?.trim()}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--status-green)', fontWeight: 700 }}>{platform.potential} Potential</span>
                    </div>
                    <div className="hp-bar-track">
                      <div className="hp-bar-fill" style={{ width: `${POTENTIAL_PCT[platform.potential] || 50}%`, background: 'var(--status-green)' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--accent-red)', fontWeight: 600 }}>View Guide →</span>
                    <button 
                      onClick={(e) => toggleCompare(e, platform.id)}
                      className="btn btn-outline" 
                      style={{ padding: '6px 12px', fontSize: '0.8rem', borderColor: isComparing ? 'var(--accent-blue)' : 'var(--border)', color: isComparing ? 'var(--accent-blue)' : 'var(--text-primary)' }}
                    >
                      {isComparing ? 'Pinned' : '+ Compare'}
                    </button>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <h3 style={{ color: 'var(--text-primary)' }}>No platforms found</h3>
            <p>Try adjusting your search or filter.</p>
          </div>
        )}
      </div>

      {/* ── COMPARE DRAWER ── */}
      {compareList.length > 0 && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
          background: 'var(--surface)', borderTop: '1px solid var(--border)',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.5)', padding: '20px',
          animation: 'slideUp 0.3s ease-out'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GitCompare size={20} color="var(--accent-blue)" /> Compare Platforms
              </h3>
              <button onClick={() => setCompareList([])} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
              {compareData.map((p, i) => (
                <div key={i} style={{ flex: 1, minWidth: '300px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', position: 'relative' }}>
                  <button onClick={(e) => toggleCompare(e, p.id)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <X size={16} />
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <img src={p.img} alt={p.name} style={{ width: '80px', height: '50px', objectFit: 'contain' }} />
                    <div>
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{p.name}</h4>
                      <span className="chip" style={{ fontSize: '0.7rem' }}>{p.mappedCat}</span>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem' }}>
                    <div>
                      <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>Stock Power</div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{p.stock_power}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>Tuning Potential</div>
                      <div style={{ color: 'var(--status-green)', fontWeight: '600' }}>{p.potential}</div>
                    </div>
                  </div>
                </div>
              ))}

              {compareList.length === 1 && (
                <div style={{ flex: 1, minWidth: '300px', background: 'var(--surface-hover)', border: '1px dashed var(--border)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Select another platform to compare
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}} />
    </div>
  )
}
