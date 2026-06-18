import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Cpu, BookOpen, DollarSign, Globe, Zap, Heart, Users, ChevronRight, ArrowRight } from 'lucide-react'
import { PLATFORMS_DATA } from '../tuningData'

/* ───────── Animated Counter Hook ───────── */
function useCounter(target, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()

          function tick(now) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

/* ───────── Stat Counter Component ───────── */
function StatCounter({ value, suffix, label }) {
  const { count, ref } = useCounter(value)

  return (
    <div ref={ref} style={{
      textAlign: 'center',
      minWidth: '140px'
    }}>
      <span style={{
        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
        fontWeight: 800,
        fontFamily: "'Outfit', sans-serif",
        background: 'linear-gradient(135deg, #ef4444, #f97316)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-1px'
      }}>
        {count}{suffix}
      </span>
      <p style={{
        color: 'var(--text-muted)',
        fontSize: '0.95rem',
        marginTop: '4px',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontWeight: 500
      }}>{label}</p>
    </div>
  )
}

/* ───────── Main Component ───────── */
export default function Home() {
  const [activeTab, setActiveTab] = useState('philosophy')
  const [tabFade, setTabFade] = useState(true)

  const handleTabChange = (key) => {
    setTabFade(false)
    setTimeout(() => {
      setActiveTab(key)
      setTabFade(true)
    }, 200)
  }

  const tabs = {
    philosophy: {
      icon: Heart,
      title: 'The Philosophy',
      content: "Tuning is the pursuit of perfection. It's taking a machine built for the masses and engineering it into an extension of yourself. In India, tuning is not just a hobby; it's a statement against mediocrity."
    },
    performance: {
      icon: Zap,
      title: 'The Performance',
      content: "We don't just add stickers. We extract raw, unadulterated power. From basic Stage 1 ECU remaps that unlock hidden torque, to massive turbo upgrades that push the boundaries of physics."
    },
    community: {
      icon: Users,
      title: 'The Community',
      content: "A brotherhood united by the smell of high-octane fuel and the sound of turbo spool. Discover the tuners, the builders, and the visionaries pushing the Indian car scene forward."
    }
  }

  const navCards = [
    { to: '/platforms', icon: Cpu,        title: 'Explore Platforms', desc: 'Deep-dive into every tunable car in India' },
    { to: '/basics',    icon: BookOpen,   title: 'Learn Tuning',     desc: 'ECU maps, stages, and mod fundamentals' },
    { to: '/tuners',    icon: DollarSign, title: 'Tuners & Costs',   desc: 'Compare tuners, prices, and results' },
    { to: '/intl',      icon: Globe,      title: 'India vs World',   desc: 'How Indian builds stack up globally' }
  ]

  const featuredIds = ['skoda-octavia-vrs', 'bmw-m340i', 'vw-polo-tsi']
  const featured = featuredIds.map(id => ({ id, ...PLATFORMS_DATA[id] }))

  const timeline = [
    {
      color: '#ef4444',
      era: 'The Early Days',
      year: '2000s',
      text: 'Tuning was a niche hobby — free-flow exhausts, K&N filters, piggyback ECUs on NA engines like the Honda City VTEC. Pioneers like Raj Hingorani (Rajs) and RaceDynamics laid the foundation.'
    },
    {
      color: '#3b82f6',
      era: 'The Diesel Boom & VAG Era',
      year: '2010s',
      text: "The real revolution. Turbo-diesels from VW, Skoda & Hyundai responded insanely well to OBD remaps. Pete's Automotive and Code6 Tuning pioneered ECU flashing — a diesel hatchback could suddenly out-run a petrol sedan."
    },
    {
      color: '#10b981',
      era: 'The Modern Turbo-Petrol Era',
      year: '2020s',
      text: 'International heavyweights like APR, Bootmod3 & TVS Engineering arrived. Indian tuners like Wolf Moto and Harmonixx custom-calibrate maps for our 91-95 octane fuel. 600+ HP street cars now cruise Indian roads daily.'
    }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - var(--navbar-h))' }}>

      {/* ─── HERO SECTION ─── */}
      <section style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px 60px',
        textAlign: 'center',
        background: 'radial-gradient(circle at center, #18181b 0%, #09090b 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* ambient glow – red */}
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        {/* ambient glow – blue */}
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <h1
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.05, marginBottom: '20px', zIndex: 1 }}
          className="text-gradient"
        >
          THE ULTIMATE <br />
          <span className="text-gradient-accent">TUNING GUIDE</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
          color: 'var(--text-muted)',
          maxWidth: '680px',
          margin: '0 auto 40px',
          lineHeight: 1.7,
          zIndex: 1
        }}>
          From forging engine internals to extracting massive horsepower on Indian roads.
          Discover platforms, parts, and the true cost of speed.
        </p>

        {/* Animated Stats */}
        <div style={{
          display: 'flex',
          gap: 'clamp(24px, 5vw, 56px)',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '48px',
          zIndex: 1
        }}>
          <StatCounter value={11} suffix="+" label="Platforms" />
          <StatCounter value={8}  suffix="+" label="Tuners" />
          <StatCounter value={100} suffix="+" label="Builds" />
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '20px', zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/platforms" className="btn btn-primary" style={{ fontSize: '1.15rem', padding: '16px 36px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Explore Platforms <ArrowRight size={18} />
          </Link>
          <Link to="/basics" className="btn btn-outline" style={{ fontSize: '1.15rem', padding: '16px 36px' }}>
            Learn Tuning Basics
          </Link>
        </div>
      </section>

      {/* ─── QUICK NAVIGATION CARDS ─── */}
      <section style={{ padding: '80px 20px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
            marginBottom: '12px',
            textAlign: 'center',
            fontFamily: "'Outfit', sans-serif"
          }} className="text-gradient">Jump Right In</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '48px', fontSize: '1.1rem' }}>
            Everything you need, one click away.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px'
          }}>
            {navCards.map(card => {
              const Icon = card.icon
              return (
                <Link
                  key={card.to}
                  to={card.to}
                  className="premium-card"
                  style={{
                    padding: '32px 28px',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(239,68,68,0.12)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = ''
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(239,68,68,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={24} color="var(--accent-red)" />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif", margin: 0 }}>
                    {card.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem', lineHeight: 1.5 }}>
                    {card.desc}
                  </p>
                  <span style={{
                    color: 'var(--accent-red)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: 'auto'
                  }}>
                    Explore <ChevronRight size={16} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PLATFORMS CAROUSEL ─── */}
      <section style={{ padding: '80px 20px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontFamily: "'Outfit', sans-serif", margin: 0 }} className="text-gradient">
                Featured Platforms
              </h2>
              <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '1.05rem' }}>
                The most popular tuning platforms in India right now.
              </p>
            </div>
            <Link to="/platforms" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            paddingBottom: '12px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}>
            {featured.map(car => (
              <Link
                key={car.id}
                to={`/platform/${car.id}`}
                className="premium-card"
                style={{
                  minWidth: '320px',
                  flex: '0 0 auto',
                  textDecoration: 'none',
                  overflow: 'hidden',
                  scrollSnapAlign: 'start',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: '#18181b',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src={car.img}
                    alt={car.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>

                <div style={{ padding: '24px' }}>
                  <h3 style={{
                    fontSize: '1.2rem',
                    color: 'var(--text-primary)',
                    fontFamily: "'Outfit', sans-serif",
                    margin: '0 0 12px'
                  }}>
                    {car.name}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>Stock</span>
                      <p style={{ color: 'var(--text-primary)', fontWeight: 600, margin: '2px 0 0', fontSize: '1rem' }}>{car.stock_power}</p>
                    </div>
                    <div style={{
                      background: car.potential === 'God-Tier'
                        ? 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(249,115,22,0.2))'
                        : car.potential === 'Extreme'
                          ? 'rgba(59,130,246,0.15)'
                          : 'rgba(16,185,129,0.15)',
                      color: car.potential === 'God-Tier'
                        ? '#f97316'
                        : car.potential === 'Extreme'
                          ? '#60a5fa'
                          : '#34d399',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      letterSpacing: '0.5px'
                    }}>
                      {car.potential}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EVOLUTION TIMELINE ─── */}
      <section style={{ padding: '80px 20px', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
            textAlign: 'center',
            marginBottom: '12px',
            fontFamily: "'Outfit', sans-serif"
          }} className="text-gradient">
            The Evolution of Indian Tuning
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '56px', fontSize: '1.05rem' }}>
            Two decades of pushing boundaries.
          </p>

          <div style={{ position: 'relative', paddingLeft: '40px' }}>
            {/* vertical line */}
            <div style={{
              position: 'absolute',
              left: '11px',
              top: '8px',
              bottom: '8px',
              width: '2px',
              background: 'linear-gradient(to bottom, #ef4444, #3b82f6, #10b981)',
              borderRadius: '2px'
            }} />

            {timeline.map((item, i) => (
              <div key={i} style={{
                position: 'relative',
                marginBottom: i < timeline.length - 1 ? '48px' : 0
              }}>
                {/* dot */}
                <div style={{
                  position: 'absolute',
                  left: '-40px',
                  top: '4px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: item.color,
                  boxShadow: `0 0 16px ${item.color}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#09090b',
                  }} />
                </div>

                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: item.color,
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  {item.year}
                </span>
                <h3 style={{
                  fontSize: '1.4rem',
                  color: 'var(--text-primary)',
                  fontFamily: "'Outfit', sans-serif",
                  margin: '0 0 10px'
                }}>
                  {item.era}
                </h3>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '1.05rem',
                  lineHeight: 1.75,
                  margin: 0
                }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY TABS ─── */}
      <section style={{
        padding: '80px 20px',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
            textAlign: 'center',
            marginBottom: '40px',
            fontFamily: "'Outfit', sans-serif"
          }} className="text-gradient">
            What Drives Us
          </h2>

          {/* Tab buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '32px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {Object.keys(tabs).map(key => {
              const TabIcon = tabs[key].icon
              const isActive = activeTab === key
              return (
                <button
                  key={key}
                  className={`btn ${isActive ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handleTabChange(key)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textTransform: 'capitalize',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <TabIcon size={18} />
                  {tabs[key].title}
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          <div
            className="premium-card"
            style={{
              padding: '48px 40px',
              textAlign: 'center',
              opacity: tabFade ? 1 : 0,
              transform: tabFade ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease'
            }}
          >
            {(() => {
              const ActiveIcon = tabs[activeTab].icon
              return (
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'rgba(239,68,68,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <ActiveIcon size={28} color="var(--accent-red)" />
                </div>
              )
            })()}
            <h3 style={{
              fontSize: '1.8rem',
              marginBottom: '16px',
              color: 'var(--text-primary)',
              fontFamily: "'Outfit', sans-serif"
            }}>
              {tabs[activeTab].title}
            </h3>
            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              lineHeight: 1.8,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {tabs[activeTab].content}
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}