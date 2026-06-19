import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Cpu, BookOpen, DollarSign, Globe, Zap, Heart, Users, ChevronRight, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
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

      {/* ─── START HERE STEPPER ─── */}
      <section style={{ padding: '60px 20px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '8px', fontFamily: "'Outfit', sans-serif" }}>🗺️ New Here? Start Your Journey</h2>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '40px', fontSize: '1rem' }}>Follow this path from zero to hero. Click each step for a quick overview.</p>
          <StartHereStepper />
        </div>
      </section>

      {/* ─── GLOSSARY (collapsible, moved up) ─── */}
      <section style={{ padding: '60px 20px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <GlossaryAccordion />
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section style={{ padding: '60px 20px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px', fontFamily: "'Outfit', sans-serif" }}>❓ Frequently Asked Questions</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '1rem' }}>Everything a first-time tuner asks — answered honestly.</p>
          <FAQSection />
        </div>
      </section>

    </div>
  )
}

/* ─── START HERE STEPPER ─── */
function StartHereStepper() {
  const [open, setOpen] = useState(null)
  const steps = [
    {
      num: '01', label: 'Understand the Basics', color: '#4ade80', link: '/basics',
      desc: 'Before spending a rupee, know what an ECU is, how turbochargers work, and what Stage 1/2/3 actually means. Start with the Learn Tuning page.',
      actions: ['Read: ECU Tuning (Software)', 'Read: Turbochargers & Boost', 'Read: Cooling & Airflow']
    },
    {
      num: '02', label: 'Pick Your Platform', color: '#60a5fa', link: '/platforms',
      desc: 'Not every car is equally tunable. Browse our platforms guide to see the tuning potential, weak points, and realistic power numbers for your specific car.',
      actions: ['Check your car\'s tuning potential', 'Read the Known Limits section', 'Look at real Indian builds on your platform']
    },
    {
      num: '03', label: 'Set Your Budget', color: '#facc15', link: '/tuners',
      desc: '₹50,000 gets you a Stage 1 remap. ₹2 Lakh gets you Stage 2. ₹5 Lakh+ unlocks serious territory. Our budget presets show exactly what you get at each level.',
      actions: ['Read the ₹50K, ₹2L, and ₹5L+ budget breakdowns', 'Compare hardware costs', 'Understand India\'s import duty on parts']
    },
    {
      num: '04', label: 'Choose a Tuner', color: '#fb923c', link: '/tuners',
      desc: 'Your tuner makes or breaks the build. Use our green/red flag guide to evaluate any shop. Always insist on a dyno baseline pull and post-tune data logs.',
      actions: ['Review top Indian tuners', 'Check the How To Choose a Tuner guide', 'Verify dyno pull + data logs policy']
    },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      {steps.map((s, i) => (
        <div key={i}>
          <div
            className="premium-card"
            style={{ padding: '20px', borderTop: `3px solid ${s.color}`, cursor: 'pointer', transition: 'box-shadow 0.2s' }}
            onClick={() => setOpen(open === i ? null : i)}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 24px ${s.color}20`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <div style={{ fontSize: '0.7rem', color: s.color, fontWeight: 800, letterSpacing: '0.1em', marginBottom: '8px' }}>STEP {s.num}</div>
            <h3 style={{ fontSize: '1rem', margin: '0 0 12px', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>{s.label}</h3>
            {open === i ? <ChevronUp size={16} color={s.color} /> : <ChevronDown size={16} color={s.color} />}
            {open === i && (
              <div style={{ marginTop: '14px', animation: 'fadeIn 0.25s ease' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '14px' }}>{s.desc}</p>
                <ul style={{ paddingLeft: '16px', margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {s.actions.map((a, j) => <li key={j} style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.5 }}>{a}</li>)}
                </ul>
                <Link to={s.link} style={{ fontSize: '0.82rem', color: s.color, fontWeight: 600 }}>Go to this section →</Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── FAQ ─── */
function FAQSection() {
  const [open, setOpen] = useState(null)
  const faqs = [
    {
      q: 'Is car tuning legal in India?',
      a: 'Technically, Section 52 of the Motor Vehicles Act prohibits any modification not in the manufacturer\'s original specification — including ECU tunes. However, an ECU remap is completely invisible and reversible. Most tuners flash maps via OBD port, which leaves no permanent trace. Physical mods (exhausts, lowering) carry more risk. The scene operates in a legal grey zone — thousands of cars are tuned daily.'
    },
    {
      q: 'Will tuning void my car warranty?',
      a: 'Yes, in theory. An authorised service center can use a diagnostic tool to detect that the ECU has been flashed with non-factory software. However, flash tunes from tools like Bootmod3 and MHD can be fully reverted to stock in under 5 minutes. Most enthusiasts revert to stock before any warranty work and flash back afterward.'
    },
    {
      q: 'How much does it cost to get started?',
      a: 'A Stage 1 ECU remap is the best entry point — ranging from ₹25,000 (Code6/Wolf Moto for everyday cars) to ₹60,000 (APR/Harmonixx for premium platforms). This single modification typically adds 20–60+ HP depending on your car, with no hardware required. It\'s the highest value-per-rupee modification in all of tuning.'
    },
    {
      q: 'What is the safest first mod?',
      a: 'A Stage 1 ECU remap from a reputable tuner — full stop. It adds significant power, is completely reversible, requires no mechanical installation, and is invisible to the naked eye. Before the remap: fresh engine oil, new spark plugs, and a clean air filter. Do not tune a car that isn\'t in perfect mechanical health.'
    },
    {
      q: 'What is the difference between a remap and a piggyback?',
      a: 'A remap (flash tune) completely overwrites the factory ECU software via the OBD2 port. It is the gold standard — precise, clean, and reversible. A piggyback (like JB4) is a physical box that intercepts sensor signals to trick the ECU. Piggybacks are cheaper and easier to remove, but are less precise, can confuse the OBD diagnostics, and are limited in how much they can change. Serious builds always use a flash tune.'
    },
    {
      q: 'What\'s the best fuel to use on a tuned car in India?',
      a: 'Speed 97 (95-97 RON) from BPCL/HPCL is widely recommended for Stage 1-tuned cars. For Stage 2+, some tuners build maps specifically around Speed 97. Regular 91 RON is too low for aggressive maps — the ECU will pull timing to protect the engine, negating much of your tune\'s gains. Avoid fuel adulteration by buying from reputable stations.'
    },
    {
      q: 'Can I tune a naturally aspirated (NA) car?',
      a: 'Yes, but gains are much smaller than turbo cars. An NA engine has no boost to increase — so a remap can only optimise fueling and valve timing. Expect 5–15 HP from a remap alone. Real NA power requires physical changes: intake, headers, exhaust, cam upgrades, or ultimately forced induction (turbo/supercharger kit). The Honda City i-VTEC is a prime example of an NA car with a strong turbo kit community.'
    },
    {
      q: 'How do I know if my tune is safe?',
      a: 'Ask your tuner for the data log from your tune session. A safe tune shows: (1) boost at target levels with no overboost spikes, (2) Air-Fuel Ratio (AFR) between 11.5–12.5:1 at full throttle, (3) zero knock events, (4) Intake Air Temps staying below 45°C after the intercooler. If your tuner cannot provide this data, find a different tuner.'
    },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {faqs.map((faq, i) => (
        <div key={i} className="glass" style={{ borderRadius: '10px', overflow: 'hidden' }}>
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', cursor: 'pointer', userSelect: 'none' }}
            onClick={() => setOpen(open === i ? null : i)}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif", fontWeight: 600, paddingRight: '20px' }}>{faq.q}</h4>
            {open === i ? <ChevronUp size={18} color="var(--accent-red)" style={{ flexShrink: 0 }} /> : <ChevronDown size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />}
          </div>
          {open === i && (
            <div style={{ padding: '0 20px 18px', animation: 'fadeIn 0.25s ease' }}>
              <div style={{ height: '1px', background: 'var(--border)', marginBottom: '14px' }} />
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── GLOSSARY ─── */
function GlossarySection() {
  const [search, setSearch] = useState('')
  const terms = [
    { term: 'ECU', def: 'Engine Control Unit — the car\'s main computer. Controls boost, fuel injection, ignition timing, and more.' },
    { term: 'TCU', def: 'Transmission Control Unit — the gearbox computer. Tuning this sharpens shift speed and prevents clutch slip.' },
    { term: 'Stage 1', def: 'A software-only ECU remap with no hardware changes. The entry point for tuning.' },
    { term: 'Stage 2', def: 'ECU remap + hardware upgrades (downpipe, intercooler, intake). Requires physical parts.' },
    { term: 'Stage 3', def: 'Turbo upgrade or engine internals. Serious power levels requiring significant investment.' },
    { term: 'Boost', def: 'The pressure above atmospheric pressure created by a turbocharger. Measured in PSI or Bar.' },
    { term: 'Turbocharger', def: 'A device that uses exhaust gases to compress intake air, forcing more air (and fuel) into the engine.' },
    { term: 'Downpipe', def: 'The exhaust pipe connecting directly to the turbo. Upgrading to a decat dramatically reduces backpressure.' },
    { term: 'Intercooler', def: 'A heat exchanger that cools the hot compressed air from the turbo before it enters the engine.' },
    { term: 'FMIC', def: 'Front-Mount Intercooler — mounted at the front of the car for maximum cooling efficiency.' },
    { term: 'AFR', def: 'Air-Fuel Ratio — the ratio of air to fuel in the combustion mix. 14.7:1 is stoichiometric (ideal efficiency); 11.5–12.5:1 is ideal for max power.' },
    { term: 'Knock / Detonation', def: 'Premature ignition of the fuel-air mixture before the spark plug fires. Can destroy pistons. Caused by low octane fuel or too much timing advance.' },
    { term: 'IAT', def: 'Intake Air Temperature — the temperature of air entering the engine. High IATs = less power and more knock risk.' },
    { term: 'OBD2', def: 'On-Board Diagnostics port (usually under the dashboard). Used to flash ECU tunes, read fault codes, and log data.' },
    { term: 'DTC', def: 'Diagnostic Trouble Code — fault codes stored in the ECU. Clear these before a tune.' },
    { term: 'MAF', def: 'Mass Airflow Sensor — measures how much air is entering the engine. Crucial for correct fueling.' },
    { term: 'BOV / BPV', def: 'Blow-Off Valve / Bypass Valve — releases compressed air when you lift off the throttle to prevent compressor surge.' },
    { term: 'WMI', def: 'Water-Methanol Injection — a system that sprays water + methanol to cool intake temps and effectively raise octane.' },
    { term: 'LSD', def: 'Limited Slip Differential — distributes power between driven wheels to improve traction and corner exit speed.' },
    { term: 'DSG / DCT', def: 'Dual-Clutch automatic Gearbox — used by VW/Skoda (DSG) and others. Fast shifting, tunes well with TCU flash.' },
    { term: 'RON', def: 'Research Octane Number — the fuel quality rating used in India and Europe. India regular = 91 RON. Speed 97 = 97 RON.' },
    { term: 'AKI', def: 'Anti-Knock Index — the US/Canada octane rating. AKI = (RON + MON) / 2. 93 AKI ≈ 98 RON.' },
    { term: 'Dyno', def: 'Dynamometer — a machine that measures your engine\'s power output at the wheels.' },
    { term: 'E-tuning', def: 'Remote tuning via data logs and OBD flasher tools, without visiting the tuner in person.' },
    { term: 'Forged internals', def: 'Stronger pistons and connecting rods made from forged steel/aluminum. Required for Stage 3+ builds.' },
    { term: 'Heat soak', def: 'When the intercooler, intake, or engine bay gets so hot that it can\'t cool the intake air effectively — leading to power loss.' },
  ]
  const filtered = terms.filter(t => t.term.toLowerCase().includes(search.toLowerCase()) || t.def.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <input
        type="text" placeholder="Search terms (e.g. ECU, boost, knock)..."
        value={search} onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none', marginBottom: '20px', boxSizing: 'border-box' }}
        onFocus={e => e.target.style.borderColor = 'var(--accent-red)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
        {filtered.map((t, i) => (
          <div key={i} style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px' }}>
            <div style={{ fontWeight: 700, color: 'var(--accent-red)', fontSize: '0.9rem', marginBottom: '6px', fontFamily: "'Outfit', sans-serif" }}>{t.term}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{t.def}</div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '20px' }}>No terms found for "{search}"</p>}
    </div>
  )
}

/* ─── GLOSSARY ACCORDION WRAPPER ─── */
function GlossaryAccordion() {
  const [open, setOpen] = useState(false)
  return (
    <div className="premium-card" style={{ borderLeft: '4px solid var(--accent-red)', overflow: 'hidden' }}>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 28px', cursor: 'pointer', userSelect: 'none' }}
        onClick={() => setOpen(o => !o)}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: '1.6rem', fontFamily: "'Outfit', sans-serif" }}>📖 Tuning Glossary</h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>26 essential terms — click to expand and search</p>
        </div>
        {open ? <ChevronUp size={24} color="var(--accent-red)" /> : <ChevronDown size={24} color="var(--accent-red)" />}
      </div>
      {open && (
        <div style={{ padding: '0 28px 28px', animation: 'fadeIn 0.3s ease' }}>
          <div style={{ height: '1px', background: 'var(--border)', marginBottom: '20px' }} />
          <GlossarySection />
        </div>
      )}
    </div>
  )
}