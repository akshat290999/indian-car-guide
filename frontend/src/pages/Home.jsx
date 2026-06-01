import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// ─── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  pageBg:   '#F4F7FA',
  white:    '#FFFFFF',
  black:    '#000000',
  navy:     '#0A192F',
  blue:     '#0072BB',
  red:      '#E03A3E',
  border:   '#D6E4F0',
  subBg:    '#EBF2FF',
  muted:    '#5A7A9A',
  bodyText: '#2C3E50',
  oswald:   "'Oswald', sans-serif",
  inter:    "'Inter', system-ui, sans-serif",
};

// ─── Brand data ────────────────────────────────────────────────────────────────
const BRANDS = [
  { name: 'Maruti Suzuki', abbr: 'MS', accent: '#005BAC' },
  { name: 'Hyundai',       abbr: 'HY', accent: '#002C6A' },
  { name: 'Tata',          abbr: 'TA', accent: '#1B4FBA' },
  { name: 'Mahindra',      abbr: 'MA', accent: '#E03A3E' },
  { name: 'Skoda',         abbr: 'SK', accent: '#1D7540' },
  { name: 'Toyota',        abbr: 'TY', accent: '#EB0A1E' },
];

// ─── Persona data ──────────────────────────────────────────────────────────────
const PERSONAS = [
  {
    icon: '🏔',
    title: 'Adventure & Off-Road',
    tag: 'SUV · 4WD',
    carType: 'SUV',
    body: 'Built for the wild. Explore rugged body-on-frame SUVs with high ground clearance, tough independent suspensions, and robust 4x4 drivetrains engineered to conquer broken trails and weekend expeditions.',
    accentColor: C.navy,
  },
  {
    icon: '🏙',
    title: 'Urban Commuter',
    tag: 'Hatchback · Crossover',
    carType: 'Hatchback',
    body: 'Zippy, efficient, and effortless to park. Perfect premium hatchbacks and compact crossovers featuring light steering, exceptional fuel economy, and seamless automatic gearboxes optimized for daily gridlock.',
    accentColor: C.blue,
  },
  {
    icon: '🛣',
    title: 'Highway Cruiser',
    tag: 'Crossover · MPV',
    carType: 'MUV',
    body: 'First-class road trips for the entire family. Discover rock-solid mid-size crossovers and luxury MPVs boasting immense road presence, high-speed stability, and effortless torque-heavy engines.',
    accentColor: '#1A7A45',
  },
  {
    icon: '🏁',
    title: 'Enthusiast Sedan',
    tag: 'Sedan · Turbo',
    carType: 'Sedan',
    body: 'For those who genuinely love to drive. Low-slung, aerodynamically sharp sedans featuring stiff, European-tuned handling dynamics, tactile steering feedback, and highly punchy turbo-petrol powertrains.',
    accentColor: C.red,
  },
];

// ─── Stat items ────────────────────────────────────────────────────────────────
const STATS = [
  { value: '60+',  label: 'Variants Tracked'   },
  { value: '6',    label: 'Brands Covered'      },
  { value: '12',   label: 'Models Compared'     },
  { value: '100%', label: 'Unbiased Data'       },
];

// ─── Market pulse card ─────────────────────────────────────────────────────────
function PulseCard({ car, rank }) {
  const rankColors = ['#E03A3E', '#0072BB', '#1A7A45'];
  const rankColor  = rankColors[rank] || C.muted;
  let imageUrl = null;
  if (Array.isArray(car.image_urls) && car.image_urls.length > 0) {
    imageUrl = car.image_urls[0];
  } else if (car.image_urls && typeof car.image_urls === 'object' && Object.keys(car.image_urls).length > 0) {
    imageUrl = Object.values(car.image_urls)[0];
  }

  return (
    <Link to={`/car/${encodeURIComponent(car.model_name)}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          backgroundColor: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: '14px',
          overflow: 'hidden',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          boxShadow: '0 2px 8px rgba(10,25,47,0.07)',
          cursor: 'pointer',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(10,25,47,0.13)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = '0 2px 8px rgba(10,25,47,0.07)'; }}
      >
        {/* Image */}
        <div style={{ position: 'relative' }}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={car.model_name}
              style={{
                width: '100%', height: '190px', objectFit: 'cover', display: 'block',
                transform: car.mirror ? 'scaleX(-1)' : 'none',
                transformOrigin: 'center',
              }}
            />
          ) : (
            <div style={{ width: '100%', height: '190px', backgroundColor: C.subBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '12px', color: C.muted, fontFamily: C.inter }}>No image</span>
            </div>
          )}
          {/* Rank badge */}
          <div style={{
            position: 'absolute', top: '12px', left: '12px',
            width: '34px', height: '34px', borderRadius: '50%',
            backgroundColor: rankColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}>
            <span style={{ color: '#fff', fontFamily: C.oswald, fontWeight: '700', fontSize: '14px' }}>#{rank + 1}</span>
          </div>
        </div>

        <div style={{ padding: '16px 20px 20px' }}>
          {/* Brand chip */}
          <span style={{
            display: 'inline-block', marginBottom: '8px',
            padding: '2px 10px', borderRadius: '20px',
            backgroundColor: C.subBg, color: C.navy,
            fontSize: '10px', fontWeight: '700', fontFamily: C.inter,
            textTransform: 'uppercase', letterSpacing: '0.6px',
          }}>
            {car.brand}
          </span>

          {/* Model name */}
          <h3 style={{ margin: '0 0 12px', fontFamily: C.oswald, fontSize: '22px', fontWeight: '700', color: C.black, letterSpacing: '0.3px' }}>
            {car.model_name}
          </h3>

          {/* Monthly sales badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 14px', borderRadius: '8px',
            backgroundColor: '#F0F7FF', border: `1px solid ${C.border}`,
            marginBottom: '14px',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E', flexShrink: 0 }} />
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontFamily: C.inter, fontWeight: '700', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '1px' }}>
                Avg. Monthly Sales
              </span>
              <span style={{ fontFamily: C.inter, fontSize: '17px', fontWeight: '800', color: rankColor }}>
                {car.monthly_sales != null ? car.monthly_sales.toLocaleString('en-IN') : 'N/A'} units
              </span>
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: C.muted, fontFamily: C.inter }}>
              {car.car_type}
            </span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: C.blue, fontFamily: C.inter }}>
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const [topCars, setTopCars] = useState([]);

  useEffect(() => {
    axios.get('/api/cars')
      .then(res => {
        const byModel = {};
        res.data.forEach(car => {
          if (!byModel[car.model_name] || car.monthly_sales > byModel[car.model_name].monthly_sales) {
            byModel[car.model_name] = car;
          }
        });
        const sorted = Object.values(byModel)
          .sort((a, b) => b.monthly_sales - a.monthly_sales)
          .slice(0, 3);
        setTopCars(sorted);
      })
      .catch(err => console.error("API Fetch Error:", err));
  }, []);

  function goToBrand(brandName) {
    navigate('/search', { state: { brand: brandName } });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.pageBg, fontFamily: C.inter }}>

      {/* ═══ HERO ══════════════════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: C.white, borderBottom: `1px solid ${C.border}` }}>
        <div className="home-hero-inner">
          <div className="home-hero-text">

            {/* Eyebrow */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', backgroundColor: C.subBg, border: `1px solid ${C.border}`, marginBottom: '28px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: C.red }} />
              <span style={{ fontFamily: C.inter, fontSize: '12px', fontWeight: '700', color: C.navy, textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                India's Most Precise Car Database
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              margin: '0 0 22px',
              fontFamily: C.oswald,
              fontSize: 'clamp(38px, 5.5vw, 64px)',
              fontWeight: '700',
              color: C.black,
              lineHeight: 1.05,
              letterSpacing: '0.5px',
            }}>
              Demystifying the<br />Indian Car Market.
            </h1>

            {/* Subtitle */}
            <p style={{ margin: '0 0 36px', fontSize: 'clamp(15px, 1.8vw, 18px)', color: C.bodyText, lineHeight: '1.8', fontFamily: C.inter, maxWidth: '580px' }}>
              Unbiased insights, precise variant filtering, and real-time sales trends.
              Find your perfect match without the exhausting dealership jargon.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link
                to="/search"
                style={{
                  display: 'inline-block', padding: '14px 30px',
                  backgroundColor: C.navy, color: '#fff',
                  fontFamily: C.oswald, fontWeight: '600', fontSize: '15px',
                  letterSpacing: '1.2px', borderRadius: '8px',
                  textDecoration: 'none', transition: 'background 0.15s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.blue; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.navy; }}
              >
                EXPLORE ALL BRANDS →
              </Link>
              <Link
                to="/calculator"
                style={{
                  display: 'inline-block', padding: '13px 28px',
                  backgroundColor: 'transparent', color: C.navy,
                  fontFamily: C.inter, fontWeight: '600', fontSize: '14px',
                  borderRadius: '8px', textDecoration: 'none',
                  border: `2px solid ${C.border}`,
                  transition: 'border-color 0.15s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.blue; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.navy; }}
              >
                On-Road Calculator
              </Link>
            </div>
          </div>

          <div className="home-hero-image">
            <img
              src="https://carorbis.com/wp-content/uploads/2022/03/02Carorbis-Blog_Top-Car-Brands-in-India-699x400.jpg"
              alt="Top Car Brands in India"
              style={{ width: '100%', borderRadius: '12px', boxShadow: '0 12px 32px rgba(10,25,47,0.1)' }}
            />
          </div>
        </div>
      </div>

      {/* ═══ STATS STRIP ═══════════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: C.navy }}>
        <div className="stats-strip-inner">
          {STATS.map(({ value, label }) => (
            <div key={label} className="stat-item">
              <p style={{ margin: '0 0 4px', fontFamily: C.oswald, fontSize: '32px', fontWeight: '700', color: C.red, letterSpacing: '1px' }}>
                {value}
              </p>
              <p style={{ margin: 0, fontFamily: C.inter, fontSize: '12px', fontWeight: '600', color: '#7EB3D8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ INTRO & ABOUT US ═══ */}
      <div style={{ backgroundColor: C.white, padding: '80px 24px' }}>
        <div className="two-col-row" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div>
            <h2 style={{ fontFamily: C.oswald, fontSize: '32px', color: C.navy, marginBottom: '16px' }}>About Our Platform</h2>
            <p style={{ color: C.muted, fontSize: '16px', lineHeight: '1.8' }}>
              The Indian automotive market is flooded with marketing speak and hidden clauses. We built this platform to cut through the noise. Whether you are hunting for a reliable daily commuter or a rugged SUV, you deserve hard facts, precise specs, and honest insights without the dealership pressure.
            </p>
          </div>
          <div>
            <h2 style={{ fontFamily: C.oswald, fontSize: '32px', color: C.navy, marginBottom: '16px' }}>Our Mission</h2>
            <p style={{ color: C.muted, fontSize: '16px', lineHeight: '1.8' }}>
              We aim to democratize car buying. By consolidating precise variant data, historical lineage, and real market sales trends into one clean interface, we empower you to make an investment that perfectly aligns with your lifestyle and budget.
            </p>
          </div>
        </div>
      </div>

      {/* ═══ BROWSE BY BRAND ═══════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: C.white, padding: '72px 24px 64px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ margin: '0 0 8px', fontFamily: C.oswald, fontSize: '28px', fontWeight: '700', color: C.black, letterSpacing: '0.5px' }}>
              BROWSE BY BRAND
            </h2>
            <p style={{ margin: 0, fontSize: '14px', color: C.muted, fontFamily: C.inter }}>
              Jump straight to your preferred manufacturer's full lineup.
            </p>
          </div>

          <div className="brand-grid">
            {BRANDS.map(({ name, abbr, accent }) => (
              <button
                key={name}
                onClick={() => goToBrand(name)}
                style={{
                  backgroundColor: C.pageBg,
                  border: `1px solid ${C.border}`,
                  borderRadius: '12px',
                  padding: '24px 16px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
                  boxShadow: '0 2px 8px rgba(10,25,47,0.05)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(10,25,47,0.13)';
                  e.currentTarget.style.borderColor = accent;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(10,25,47,0.05)';
                  e.currentTarget.style.borderColor = C.border;
                }}
              >
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  backgroundColor: accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: '#fff', fontFamily: C.oswald, fontWeight: '700', fontSize: '15px', letterSpacing: '0.5px' }}>
                    {abbr}
                  </span>
                </div>
                <span style={{ fontFamily: C.inter, fontSize: '13px', fontWeight: '700', color: C.navy, lineHeight: 1.3 }}>
                  {name}
                </span>
                <span style={{ fontFamily: C.inter, fontSize: '11px', fontWeight: '600', color: C.blue }}>
                  Browse →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ WHAT WE OFFER ═══════════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: C.pageBg, padding: '72px 24px 80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="features-grid">
            {[
              { title: 'Data-Driven Insights', desc: 'Real-world sales trends and market footprint data to show you what India is actually buying.', icon: '📊' },
              { title: 'Granular Filtering', desc: 'Sort through hundreds of variants by exact powertrain, gearbox, and feature set.', icon: '⚙️' },
              { title: 'Rich Lineage', desc: 'Understand a car\'s DNA with deep dives into brand history and generational evolution.', icon: '🧬' },
              { title: 'Transparent Pricing', desc: 'Clear ex-showroom figures alongside your preferred variants.', icon: '🏷️' }
            ].map(feature => (
              <div key={feature.title} style={{ padding: '24px', backgroundColor: C.white, borderRadius: '12px', border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{feature.icon}</div>
                <h3 style={{ fontFamily: C.oswald, fontSize: '18px', color: C.navy, marginBottom: '10px' }}>{feature.title}</h3>
                <p style={{ color: C.muted, fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ BODY ══════════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 24px 96px' }}>

        {/* ── MARKET PULSE ────────────────────────────────────────────────── */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: '#E8F8F0', borderRadius: '20px', marginBottom: '16px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
              <span style={{ fontFamily: C.inter, fontSize: '11px', fontWeight: '700', color: '#1A7A45', letterSpacing: '1px' }}>LIVE RANKINGS</span>
            </div>
            <h2 style={{ fontFamily: C.oswald, fontSize: '36px', color: C.navy, marginBottom: '16px', letterSpacing: '0.5px' }}>
              MARKET PULSE
            </h2>
            <p style={{ color: C.muted, fontSize: '15px', lineHeight: '1.7', maxWidth: '650px', margin: '0 auto', fontFamily: C.inter }}>
              India's top-selling cars ranked by average monthly volume. Track the shifting trends of the Indian automotive landscape with real-world sales data. Discover which models are dominating the streets and capturing the market's attention right now.
            </p>
          </div>

          {topCars.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', backgroundColor: C.white, borderRadius: '14px', border: `1px solid ${C.border}` }}>
              <p style={{ margin: 0, color: C.muted, fontFamily: C.inter, fontSize: '15px' }}>Loading market data…</p>
            </div>
          ) : (
            <>
              <div className="pulse-grid">
                {topCars.map((car, i) => (
                  <PulseCard key={car.id} car={car} rank={i} />
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <Link to="/search" style={{ display: 'inline-block', padding: '14px 28px', backgroundColor: '#0A192F', color: '#FFFFFF', fontSize: '15px', fontWeight: '600', textDecoration: 'none', borderRadius: '8px', transition: 'background-color 0.2s' }}>
                  View All Models →
                </Link>
              </div>
            </>
          )}
        </section>

        {/* ── WHO IS THIS FOR ─────────────────────────────────────────────── */}
        <section>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ margin: '0 0 8px', fontFamily: C.oswald, fontSize: '28px', fontWeight: '700', color: C.black, letterSpacing: '0.5px' }}>
              FIND YOUR DRIVING STYLE
            </h2>
            <p style={{ margin: 0, fontSize: '14px', color: C.muted, fontFamily: C.inter }}>
              Every road demands a different machine. Which one are you?
            </p>
          </div>

          <div className="persona-grid">
            {PERSONAS.map(({ icon, title, tag, carType, body, accentColor }) => (
              <Link key={title} to={`/search?type=${carType}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  style={{
                    backgroundColor: C.white,
                    border: `1px solid ${C.border}`,
                    borderRadius: '14px',
                    padding: '28px 24px',
                    height: '100%',
                    boxSizing: 'border-box',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    boxShadow: '0 2px 8px rgba(10,25,47,0.05)',
                    cursor: 'pointer',
                    borderTop: `4px solid ${accentColor}`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(10,25,47,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = '0 2px 8px rgba(10,25,47,0.05)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ fontSize: '28px', lineHeight: 1 }}>{icon}</span>
                    <span style={{
                      padding: '3px 10px', borderRadius: '20px',
                      backgroundColor: C.subBg, color: accentColor,
                      fontSize: '10px', fontWeight: '700', fontFamily: C.inter,
                      textTransform: 'uppercase', letterSpacing: '0.6px',
                      border: `1px solid ${C.border}`,
                    }}>
                      {tag}
                    </span>
                  </div>
                  <h3 style={{ margin: '0 0 12px', fontFamily: C.oswald, fontSize: '20px', fontWeight: '700', color: C.black, letterSpacing: '0.3px' }}>
                    {title}
                  </h3>
                  <p style={{ margin: '0 0 20px', fontSize: '13.5px', color: C.bodyText, lineHeight: '1.8', fontFamily: C.inter }}>
                    {body}
                  </p>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: accentColor, fontFamily: C.inter }}>
                    Explore {title} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {/* ═══ FOOTER ════════════════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: C.navy, borderTop: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px', display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: '0 0 4px', fontFamily: C.oswald, fontSize: '16px', fontWeight: '700', color: '#fff', letterSpacing: '1.2px' }}>
              INDIAN CAR GUIDE
            </p>
            <p style={{ margin: 0, fontFamily: C.inter, fontSize: '12px', color: '#7EB3D8' }}>
              Precise data. Zero bias. Built for real buyers.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[{ label: 'Browse', to: '/search' }, { label: 'Calculator', to: '/calculator' }].map(({ label, to }) => (
              <Link key={to} to={to} style={{ fontFamily: C.inter, fontSize: '13px', fontWeight: '600', color: '#7EB3D8', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}