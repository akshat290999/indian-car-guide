import React, { useState } from 'react'
import { ChevronDown, ChevronUp, BookOpen, Wrench, ShieldAlert, Thermometer, Gauge, Box, FileText, IndianRupee } from 'lucide-react'

export default function Guides() {
  const [openGuide, setOpenGuide] = useState(null)

  const toggleGuide = (id) => {
    setOpenGuide(openGuide === id ? null : id)
  }

  const guideCategories = [
    { id: '101', icon: <BookOpen size={24} />, title: 'Tuning 101', desc: 'The absolute basics of how engine tuning works.' },
    { id: 'ecu', icon: <Box size={24} />, title: 'ECU vs Piggyback', desc: 'Understanding the different ways to change your engine map.' },
    { id: 'hardware', icon: <Wrench size={24} />, title: 'Stage Hardware', desc: 'What parts are actually required for Stage 1, 2, and 3.' },
    { id: 'fuel', icon: <Thermometer size={24} />, title: 'Fuel & Octane', desc: 'Why Indian fuel quality matters more than you think.' },
    { id: 'dyno', icon: <Gauge size={24} />, title: 'Dyno Reading', desc: 'How to read a dyno graph and spot fake numbers.' },
    { id: 'legal', icon: <ShieldAlert size={24} />, title: 'Legal & Insurance', desc: 'Navigating the grey area of car modifications in India.' },
    { id: 'buying', icon: <IndianRupee size={24} />, title: 'Buying Modified', desc: 'What to look for when buying a pre-tuned car.' },
    { id: 'logs', icon: <FileText size={24} />, title: 'Datalogging', desc: 'How to log your car to ensure it is running safely.' },
  ]

  const fullArticles = [
    {
      id: '101',
      title: 'Tuning 101: The Absolute Basics',
      content: (
        <div style={{ color: 'var(--text-primary)', lineHeight: 1.7, fontSize: '1rem' }}>
          <p style={{ marginBottom: '16px' }}>Engine tuning, at its core, is simply altering the software that controls your engine to produce more power. The factory software (the ECU map) is designed with massive safety margins to account for terrible fuel, missed service intervals, and extreme climates.</p>
          <p style={{ marginBottom: '16px' }}>Tuners reduce these margins to extract the power the engine is actually capable of producing. In a turbocharged car, this is primarily achieved by increasing the requested boost pressure from the turbo, and adding the corresponding amount of fuel to maintain a safe Air/Fuel Ratio (AFR).</p>
          <h4 style={{ color: 'var(--text-primary)', marginTop: '24px', marginBottom: '12px' }}>The Holy Trinity of Tuning:</h4>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '8px' }}><strong>Air:</strong> How much boost the turbo produces.</li>
            <li style={{ marginBottom: '8px' }}><strong>Fuel:</strong> How much fuel is injected to match the air.</li>
            <li style={{ marginBottom: '8px' }}><strong>Spark/Ignition:</strong> Exactly when the spark plug fires relative to the piston position.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'fuel',
      title: 'Fuel & Octane in India',
      content: (
        <div style={{ color: 'var(--text-primary)', lineHeight: 1.7, fontSize: '1rem' }}>
          <p style={{ marginBottom: '16px' }}>The biggest limiting factor for tuning in India isn't the hardware, it's the fuel. Most regular petrol bunks dispense 91 RON fuel. High performance engines and aggressive tunes require 95 RON or 97/99 RON (like XP95, Speed 97, or Power99).</p>
          <h4 style={{ color: 'var(--text-primary)', marginTop: '24px', marginBottom: '12px' }}>What happens if you run bad fuel?</h4>
          <p style={{ marginBottom: '16px' }}>If you put 91 RON fuel in a car tuned for 95 RON, the fuel will detonate prematurely under high pressure (called "knock"). The ECU detects this and immediately pulls ignition timing to save the engine. Your car will feel extremely sluggish and jerky.</p>
          <div style={{ padding: '16px', background: 'rgba(230,57,70,0.1)', borderLeft: '4px solid var(--accent-red)', marginBottom: '16px' }}>
            <strong>Pro Tip:</strong> Never get a "97 Octane Map" if you plan to travel outside major cities. A 95 Octane map is the safest bet for India, as XP95 is widely available on highways now.
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="page-container" style={{ paddingBottom: '80px' }}>
      <div className="page-hero">
        <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '16px' }}>GUIDES & KNOWLEDGE</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-lg)', maxWidth: '600px', margin: '0 auto' }}>
          Learn before you burn. Comprehensive guides to modifying cars in India.
        </p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '60px auto', padding: '0 20px' }}>
        
        {/* Featured Guide */}
        <section style={{ marginBottom: '60px' }}>
          <span className="section-label">Featured</span>
          <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '32px', background: 'linear-gradient(to bottom right, var(--surface-alt), var(--surface))', borderLeft: '4px solid var(--accent-red)' }}>
            <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>The Stage System Explained</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '800px' }}>
              What does "Stage 2" actually mean? Discover the universal hardware requirements for each tuning stage, what order you should buy parts in, and when you need to upgrade your clutch or cooling system.
            </p>
            <button className="primary-button" style={{ alignSelf: 'flex-start', padding: '10px 24px', fontSize: '0.9rem' }}>Read Full Guide</button>
          </div>
        </section>

        {/* Categories Grid */}
        <section style={{ marginBottom: '60px' }}>
          <span className="section-label">Browse Topics</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginTop: '16px' }}>
            {guideCategories.map((cat) => (
              <div key={cat.id} className="guide-tile" style={{ padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => toggleGuide(cat.id)}>
                <div style={{ color: 'var(--accent-red)', marginBottom: '16px' }}>
                  {cat.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '8px' }}>{cat.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Inline Article Viewer (Accordion) */}
        {openGuide && fullArticles.find(a => a.id === openGuide) && (
          <section id="article-view" style={{ marginBottom: '60px', animation: 'fadeIn 0.3s ease' }}>
            {fullArticles.filter(a => a.id === openGuide).map(article => (
              <div key={article.id} className="premium-card" style={{ padding: '40px', background: 'var(--surface-alt)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '24px' }}>
                  <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{article.title}</h2>
                  <button onClick={() => setOpenGuide(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ChevronUp size={20} /> Close
                  </button>
                </div>
                {article.content}
              </div>
            ))}
          </section>
        )}

      </div>
    </div>
  )
}
