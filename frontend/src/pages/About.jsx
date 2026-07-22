import React from 'react'

export default function About() {
  return (
    <div className="page-container" style={{ paddingBottom: '80px' }}>
      <div className="page-hero">
        <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '16px' }}>ABOUT US</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-lg)', maxWidth: '600px', margin: '0 auto' }}>
          Demystifying the Indian car tuning scene, one build at a time.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
        <section style={{ marginBottom: '60px' }}>
          <span className="section-label">Our Mission</span>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '24px' }}>Why This Exists</h2>
          <div style={{ color: 'var(--text-primary)', fontSize: 'var(--text-base)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p>
              The Indian car tuning scene is growing rapidly, but reliable information is still hard to find. Forums are fragmented, Instagram is full of vanity metrics, and finding a trustworthy tuner often feels like a gamble.
            </p>
            <p>
              We built <strong>Indian Car Guide</strong> to solve this. Our goal is to provide an objective, centralized knowledge base for platform potential, tuning stages, real-world costs, and verified builds.
            </p>
            <p>
              Whether you are looking to unlock a safe 20 HP from your daily driver or build a 500 HP track weapon, you need to know the facts before you spend your hard-earned money.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '60px' }}>
          <span className="section-label">Editorial Standards</span>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '24px' }}>How We Verify</h2>
          
          <div className="premium-card" style={{ padding: '32px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--accent-red)', marginBottom: '12px' }}>Tuner Vetting</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
              We do not accept paid placements for tuners. A tuner is listed on this site based on community reputation, verifiable dyno results, and long-term reliability of their maps. If a tuner consistently pushes dangerous limits or provides poor after-sales support, they do not make the list.
            </p>
          </div>

          <div className="premium-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--accent-red)', marginBottom: '12px' }}>Build Verification</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
              The builds featured on this site are seeded from well-documented community cars. We prioritize builds that have actual dyno sheets, dragy times, or track lap times over "estimated" crank horsepower figures.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '60px' }}>
          <span className="section-label">The Team</span>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '24px' }}>Contributors</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {['@akshat', '@turbo_guy', '@vag_enthusiast'].map((handle, i) => (
              <div key={i} className="premium-card" style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ 
                  width: '80px', height: '80px', borderRadius: '50%', background: 'var(--surface-hover)', 
                  margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', fontSize: '24px', fontWeight: 'bold'
                }}>
                  {handle[1].toUpperCase()}
                </div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-lg)', marginBottom: '4px' }}>{handle}</h4>
                <span style={{ color: 'var(--accent-red)', fontSize: 'var(--text-sm)' }}>Founding Member</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--surface-alt)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '16px' }}>Got Feedback?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
            Notice incorrect information? Want to submit a comprehensive guide? Let us know.
          </p>
          <button className="primary-button">Contact Us</button>
        </section>
      </div>
    </div>
  )
}
