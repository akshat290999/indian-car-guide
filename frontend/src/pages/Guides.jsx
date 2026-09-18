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
      id: 'ecu',
      title: 'ECU vs Piggyback',
      content: (
        <div style={{ color: 'var(--text-primary)', lineHeight: 1.7, fontSize: '1rem' }}>
          <p style={{ marginBottom: '16px' }}>When you want to increase your engine's power, you have two main options to alter its mapping: an ECU Remap (Flash) or a Piggyback Tuning Box.</p>
          <h4 style={{ color: 'var(--text-primary)', marginTop: '24px', marginBottom: '12px' }}>ECU Remap (Flash Tune)</h4>
          <p style={{ marginBottom: '16px' }}>A flash tune completely overwrites the factory engine control unit software via the OBD2 port. It is the gold standard of tuning. Because it natively alters the parameters inside the engine's brain, it can safely and smoothly control boost, fueling, timing, and torque limiters.</p>
          <h4 style={{ color: 'var(--text-primary)', marginTop: '24px', marginBottom: '12px' }}>Piggyback Box (e.g. JB4, RaceChip)</h4>
          <p style={{ marginBottom: '16px' }}>A piggyback is a physical box that plugs into your engine's sensors. Instead of rewriting the ECU, it intercepts the sensor signals and "tricks" the ECU into producing more boost. While they are easier to remove and resell, they offer less precise control than a flash tune.</p>
        </div>
      )
    },
    {
      id: 'hardware',
      title: 'Stage Hardware Requirements',
      content: (
        <div style={{ color: 'var(--text-primary)', lineHeight: 1.7, fontSize: '1rem' }}>
          <p style={{ marginBottom: '16px' }}>While tuning stages are not officially standardized, they generally follow these hardware requirements:</p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '8px' }}><strong>Stage 1:</strong> Software only. No hardware required.</li>
            <li style={{ marginBottom: '8px' }}><strong>Stage 2:</strong> Upgraded Downpipe (Decat or High-Flow Cat) and a High-Flow Intake. A Front-Mount Intercooler (FMIC) is highly recommended in India's hot climate.</li>
            <li style={{ marginBottom: '8px' }}><strong>Stage 3:</strong> Upgraded Turbocharger (Hybrid or Big Turbo), fueling upgrades (HPFP, LPFP), and often forged engine internals.</li>
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
    },
    {
      id: 'dyno',
      title: 'Reading a Dyno Graph',
      content: (
        <div style={{ color: 'var(--text-primary)', lineHeight: 1.7, fontSize: '1rem' }}>
          <p style={{ marginBottom: '16px' }}>A dynamometer (dyno) measures the power output of your vehicle. However, not all dyno figures are created equal.</p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '8px' }}><strong>WHP vs Crank HP:</strong> Manufacturers advertise Crank HP (engine power). A dyno measures Wheel HP (WHP), which is lower due to drivetrain loss (usually 10-15%).</li>
            <li style={{ marginBottom: '8px' }}><strong>The Curve Matters:</strong> Peak horsepower is just a number. A good tune provides a wide, smooth torque curve across the entire RPM range, rather than a spiky curve that drops off quickly.</li>
            <li style={{ marginBottom: '8px' }}><strong>Correction Factors:</strong> Be wary of dyno sheets using SAE or uncorrected numbers in hot weather to inflate results. Always look for the delta (the difference between the baseline run and the tuned run on the exact same dyno).</li>
          </ul>
        </div>
      )
    },
    {
      id: 'legal',
      title: 'Legal & Insurance',
      content: (
        <div style={{ color: 'var(--text-primary)', lineHeight: 1.7, fontSize: '1rem' }}>
          <p style={{ marginBottom: '16px' }}>Under Section 52 of the Indian Motor Vehicles Act, modifying a vehicle to deviate from the manufacturer's original specifications is illegal. However, the scene operates in a massive grey area.</p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '8px' }}><strong>ECU Tunes:</strong> These are software-based and invisible to physical inspections. They are widely considered the "safest" mod legally.</li>
            <li style={{ marginBottom: '8px' }}><strong>Exhausts:</strong> Loud exhausts are the most heavily penalized modification by traffic police across Indian states.</li>
            <li style={{ marginBottom: '8px' }}><strong>Insurance:</strong> If you are involved in a major accident and the insurance surveyor discovers an aftermarket downpipe or piggyback box, your claim will likely be rejected. Flash tunes are rarely detected by standard insurance surveyors.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'buying',
      title: 'Buying Modified Cars',
      content: (
        <div style={{ color: 'var(--text-primary)', lineHeight: 1.7, fontSize: '1rem' }}>
          <p style={{ marginBottom: '16px' }}>Buying a pre-tuned car can save you lakhs of rupees in parts, but it carries significant risk.</p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '8px' }}><strong>Who tuned it?</strong> Only buy cars tuned by reputable, known tuners in the community. Ask for the dyno sheets and logs.</li>
            <li style={{ marginBottom: '8px' }}><strong>Service History:</strong> Tuned cars require oil changes every 5,000 to 7,000 km, not the factory 15,000 km. Verify the service records.</li>
            <li style={{ marginBottom: '8px' }}><strong>Compression Test:</strong> Always get a compression test done on the engine cylinders before buying a heavily modified Stage 2 or Stage 3 car.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'logs',
      title: 'Datalogging 101',
      content: (
        <div style={{ color: 'var(--text-primary)', lineHeight: 1.7, fontSize: '1rem' }}>
          <p style={{ marginBottom: '16px' }}>Datalogging is the process of recording the engine's sensor data during a wide-open throttle (WOT) pull. It is the only way to know if your tune is safe.</p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '8px' }}><strong>Ignition Timing Retard (Knock):</strong> The ECU will pull timing if it detects knock. You want to see zeroes across all cylinders. Consistent negative numbers mean the tune is too aggressive for the fuel.</li>
            <li style={{ marginBottom: '8px' }}><strong>AFR (Air/Fuel Ratio):</strong> On a turbo car, you generally want to see AFRs drop into the mid-to-low 11s or 12s under full boost to keep the cylinders cool.</li>
            <li style={{ marginBottom: '8px' }}><strong>IAT (Intake Air Temp):</strong> If your IATs climb rapidly during a pull, your intercooler is heat-soaking and you are losing power.</li>
          </ul>
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
