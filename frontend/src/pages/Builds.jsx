import React, { useState, useMemo } from 'react'
import { PLATFORMS_DATA } from '../tuningData'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'

export default function Builds() {
  const [filterStage, setFilterStage] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Aggregate all indian_builds from PLATFORMS_DATA
  const allBuilds = useMemo(() => {
    let builds = []
    Object.keys(PLATFORMS_DATA).forEach(platformId => {
      const platform = PLATFORMS_DATA[platformId]
      if (platform.indian_builds) {
        platform.indian_builds.forEach(build => {
          builds.push({
            ...build,
            platformId,
            platformName: platform.name,
            platformImg: platform.img
          })
        })
      }
    })
    return builds
  }, [])

  const filteredBuilds = useMemo(() => {
    return allBuilds.filter(b => {
      const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            b.platformName.toLowerCase().includes(searchQuery.toLowerCase())
      
      const stageLower = b.desc.toLowerCase()
      const matchesStage = filterStage === 'All' 
        ? true 
        : (filterStage === 'Stage 1' && stageLower.includes('stage 1')) ||
          (filterStage === 'Stage 2' && stageLower.includes('stage 2')) ||
          (filterStage === 'Stage 3' && stageLower.includes('stage 3'))

      return matchesSearch && matchesStage
    })
  }, [allBuilds, filterStage, searchQuery])

  return (
    <div className="page-container" style={{ paddingBottom: '80px' }}>
      <div className="page-hero">
        <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '16px' }}>REAL BUILDS</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-lg)', maxWidth: '600px', margin: '0 auto' }}>
          Discover what actual owners are doing with their cars in India. No theory, just dyno-proven results.
        </p>
      </div>

      <div className="filter-bar">
        <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Search builds or platforms..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', padding: '10px 16px 10px 42px', 
              background: 'var(--surface)', border: '1px solid var(--border)', 
              borderRadius: '99px', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Stage 1', 'Stage 2', 'Stage 3'].map(stage => (
            <button 
              key={stage}
              className={`chip ${filterStage === stage ? 'chip-active' : ''}`}
              onClick={() => setFilterStage(stage)}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        
        {filteredBuilds.length === 0 ? (
          <div className="empty-state">
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>No builds found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredBuilds.map((build, i) => (
              <div key={i} className="build-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                  <img src={build.platformImg} alt={build.platformName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                    <span style={{ background: 'var(--accent-red)', color: 'white', padding: '4px 10px', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '4px' }}>
                      {build.power}
                    </span>
                  </div>
                </div>
                <div style={{ padding: '20px', flex: '1', display: 'flex', flexDirection: 'column' }}>
                  <Link to={`/platform/${build.platformId}`} style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', marginBottom: '4px', display: 'block' }}>
                    {build.platformName}
                  </Link>
                  <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--text-primary)', marginBottom: '12px' }}>{build.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px', flex: '1' }}>
                    {build.desc}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tuner: <strong style={{ color: 'var(--text-primary)' }}>{build.tuner}</strong></span>
                    <Link to={`/platform/${build.platformId}`} style={{ color: 'var(--accent-red)', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none' }}>
                      View Platform →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <section className="premium-card" style={{ margin: '60px auto 0', padding: '40px', textAlign: 'center', maxWidth: '800px', background: 'var(--surface-alt)' }}>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '16px' }}>Want your car featured?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            We are always looking for well-documented builds to add to our database. If you have dyno sheets or track times, we want to hear from you.
          </p>
          <button className="primary-button">Submit Your Build</button>
        </section>

      </div>
    </div>
  )
}
