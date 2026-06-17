import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('philosophy')

  const tabs = {
    philosophy: {
      title: "The Philosophy",
      content: "Tuning is the pursuit of perfection. It's taking a machine built for the masses and engineering it into an extension of yourself. In India, tuning is not just a hobby; it's a statement against mediocrity."
    },
    performance: {
      title: "The Performance",
      content: "We don't just add stickers. We extract raw, unadulterated power. From basic Stage 1 ECU remaps that unlock hidden torque, to massive turbo upgrades that push the boundaries of physics."
    },
    community: {
      title: "The Community",
      content: "A brotherhood united by the smell of high-octane fuel and the sound of turbo spool. Discover the tuners, the builders, and the visionaries pushing the Indian car scene forward."
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - var(--navbar-h))' }}>
      
      {/* Hero Section */}
      <section style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        textAlign: 'center',
        background: 'radial-gradient(circle at center, #18181b 0%, #09090b 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>

        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: '1.1', marginBottom: '20px', zIndex: 1 }} className="text-gradient">
          THE ULTIMATE <br/>
          <span className="text-gradient-accent">TUNING GUIDE</span>
        </h1>
        <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 40px', zIndex: 1 }}>
          From forging engine internals to extracting massive horsepower on Indian roads. Discover platforms, parts, and the true cost of speed.
        </p>

        <div style={{ display: 'flex', gap: '20px', zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/platforms" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '16px 32px' }}>
            Explore Platforms
          </Link>
          <Link to="/basics" className="btn btn-outline" style={{ fontSize: '1.2rem', padding: '16px 32px' }}>
            Learn Tuning Basics
          </Link>
        </div>
      </section>

      {/* History of Tuning in India */}
      <section style={{ padding: '80px 20px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '24px', color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>The Evolution of Indian Tuning</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--accent-red)', marginBottom: '12px' }}>The Early Days (2000s)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                In the early 2000s, tuning in India was a niche hobby restricted to naturally aspirated petrol engines like the Honda City VTEC and the Maruti Suzuki Baleno (sedan). Modifications were largely mechanical—free-flow exhausts by pioneers like Raj Hingorani (Rajs) and Automech, K&N conical air filters, and basic port-and-polish jobs. Piggyback ECUs like the RaceDynamics boxes started appearing to alter fueling mechanically.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--accent-blue)', marginBottom: '12px' }}>The Diesel Boom & The VAG Era (2010s)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                The real tuning revolution started with the introduction of the Volkswagen Polo 1.2/1.6 TDI, Skoda Laura, and the Hyundai Verna CRDi. Turbo-diesels responded incredibly well to basic ECU remaps. Tuners like <strong>Pete’s Automotive</strong> (bringing in Custom Code and later Revo) and <strong>Code6 Tuning</strong> pioneered the art of OBD flashing in India. Suddenly, a mundane diesel hatchback could out-accelerate a D-segment petrol sedan with just a software update.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#10b981', marginBottom: '12px' }}>The Modern Turbo-Petrol Era (2020s)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                Today, the scene is dominated by advanced turbo-petrols: the Skoda Octavia vRS, BMW M340i, and VW Virtus GT. International heavyweights like APR, Bootmod3, and TVS Engineering have official presences in India. Indian tuners like <strong>Wolf Moto</strong> and <strong>Harmonixx</strong> now custom-calibrate maps specifically designed to safely extract maximum power out of our low-quality 91-95 octane pump gas, utilizing Water-Meth Injection and Ethanol blends. We now have 600+ HP street cars daily driven on Indian roads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section style={{ padding: '80px 20px', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {Object.keys(tabs).map(key => (
              <button
                key={key}
                className={`btn ${activeTab === key ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveTab(key)}
                style={{ textTransform: 'capitalize' }}
              >
                {tabs[key].title}
              </button>
            ))}
          </div>

          <div className="premium-card" style={{ padding: '40px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>{tabs[activeTab].title}</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
              {tabs[activeTab].content}
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}