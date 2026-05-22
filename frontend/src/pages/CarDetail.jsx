import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

// ─── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  pageBg:   '#F4F7FA',
  heroBg:   '#FFFFFF',
  cardBg:   '#FFFFFF',
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

// ─── Color name → CSS hex ──────────────────────────────────────────────────────
const COLOR_HEX = {
  'Atlas White':'#F5F5F5',      'Everest White':'#F5F5F5',    'Candy White':'#FAFAFA',
  'Calgary White':'#F9F9F9',    'Polar White':'#F8F8FF',       'Arctic White':'#F0F0F0',
  'Abyss Black':'#0A0A0A',      'Midnight Black':'#0D0D0D',    'Oberon Black':'#1A1A1A',
  'Napoli Black':'#1C1C1C',     'Carbon Steel':'#3D4348',      'Starry Night':'#1B2A4A',
  'Deep Grey':'#5D6D7E',        'Pebble Grey':'#95A5A6',       'Magma Grey':'#5C5C5C',
  'Titan Grey':'#7A7A7A',       'Splendid Silver':'#BFC9CA',   'Brilliant Silver':'#BDC3C7',
  'Fiery Red':'#E03A3E',        'Red Rage':'#CC0000',           'Flame Red':'#D22B2B',
  'Coral Red':'#E74C3C',        'Sizzling Red':'#CC2211',      'Tornado Red':'#C0392B',
  'Electric Blue':'#1F78D4',    'Exuberant Blue':'#154360',    'Fearless Purple':'#8E44AD',
  'Lucent Orange':'#E67E22',    'Aquamarine':'#7FFFD4',        'Deep Forest':'#228B22',
};
const WHITE_RE = /white|candy|calgary|polar|arctic/i;
function colorHex(name) { return COLOR_HEX[name] || '#C0C0C0'; }

// ─── Fuel badge styles ────────────────────────────────────────────────────────
const FUEL_BADGE = {
  Petrol: { bg:'#FFF0F0', color:'#C0392B', border:'#F5C6C6' },
  Diesel: { bg:'#EBF2FF', color:'#1A5276', border:'#90CAF9' },
};
function fuelStyle(f) { return FUEL_BADGE[f] || { bg:'#F5F5F5', color:'#555', border:'#DDD' }; }

// ─── Scroll helper ─────────────
function jumpTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 56 - 48 - 16;
  window.scrollTo({ top, behavior: 'smooth' });
}

// ─── Chip toggle button ───────────────────────────────────────────────────────
function Chip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '7px 18px', borderRadius: '20px', cursor: 'pointer',
      border: `2px solid ${active ? C.red : C.border}`,
      backgroundColor: active ? C.navy : C.cardBg,
      color: active ? '#fff' : C.navy,
      fontFamily: C.inter, fontWeight: active ? '700' : '500',
      fontSize: '13px', transition: 'all 0.15s ease',
    }}>
      {label}
    </button>
  );
}

// ─── Inline on-road estimator ─────────────────────────────────────────────────
function calculateCompactOnRoad(exShowroomLakhs, stateName) {
  const basePrice = exShowroomLakhs * 100000;
  const rates = { 'Delhi': 0.10, 'Maharashtra': 0.11, 'Karnataka': 0.14, 'Uttar Pradesh': 0.08, 'Haryana': 0.09 };
  const rto = basePrice * (rates[stateName] || 0.10);
  const insurance = basePrice * 0.035;
  const total = basePrice + rto + insurance + 1500;
  return Math.round(total).toLocaleString('en-IN');
}

// ─── Single variant row ───────────────────────────────────────────────────────
function VariantRow({ v, isLast }) {
  const fb = fuelStyle(v.fuel_type);
  const [expanded, setExpanded]     = useState(false);
  const [calcState, setCalcState]   = useState('Delhi');

  return (
    <div style={{
      padding:'14px 0',
      borderBottom: isLast ? 'none' : `1px solid ${C.border}`,
    }}>
      <div className="variant-row-inner">
        <div className="variant-name-section">
          <p style={{ margin:'0 0 7px', fontFamily:C.inter, fontSize:'14px', fontWeight:'600', color:C.black }}>
            {v.trim_name}
          </p>
          <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
            <span style={{ padding:'2px 9px', borderRadius:'20px', fontSize:'11px', fontWeight:'600', fontFamily:C.inter, backgroundColor:fb.bg, color:fb.color, border:`1px solid ${fb.border}` }}>
              {v.fuel_type}
            </span>
            <span style={{ padding:'2px 9px', borderRadius:'20px', fontSize:'11px', fontWeight:'600', fontFamily:C.inter, backgroundColor:'#F0EBF8', color:'#5B2C8D', border:'1px solid #D7BEF5' }}>
              {v.gearbox_type}
            </span>
            <span style={{ padding:'2px 9px', borderRadius:'20px', fontSize:'11px', fontWeight:'600', fontFamily:C.inter, backgroundColor:'#E8F8F0', color:'#1A7A45', border:'1px solid #A3D9BE' }}>
              {v.power != null ? `${v.power} BHP` : 'N/A'}
            </span>
          </div>
        </div>
        <div className="variant-price-section">
          <div style={{ textAlign:'right' }}>
            <span style={{ display:'block', fontSize:'10px', color:C.muted, fontFamily:C.inter, marginBottom:'2px' }}>Ex-Showroom</span>
            <span style={{ fontSize:'18px', fontWeight:'800', color:C.red, fontFamily:C.inter }}>
              {v.ex_showroom_price != null ? `₹${v.ex_showroom_price} L` : 'N/A'}
            </span>
          </div>
          <button
            onClick={() => setExpanded(x => !x)}
            style={{ padding:'8px 16px', backgroundColor: expanded ? C.red : C.navy, color:'#fff', border:'none', borderRadius:'8px', fontSize:'12px', fontWeight:'700', cursor:'pointer', whiteSpace:'nowrap', fontFamily:C.inter, transition:'background 0.15s ease' }}
          >
            {expanded ? 'Hide' : 'View Offers'}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="variant-expanded-row" style={{ borderTop:`1px dashed ${C.border}` }}>
          <span style={{ fontSize:'13px', fontFamily:C.inter, color:C.muted }}>Select State:</span>
          <select
            value={calcState}
            onChange={(e) => setCalcState(e.target.value)}
            style={{ padding:'6px 10px', borderRadius:'4px', border:`1px solid ${C.border}`, fontFamily:C.inter, fontSize:'13px', outline:'none', cursor:'pointer', backgroundColor:'#fff' }}
          >
            <option value="Delhi">Delhi</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Haryana">Haryana</option>
          </select>
          <span style={{ fontSize:'14px', fontFamily:C.inter, color:C.navy, marginLeft:'8px' }}>
            On road price = <strong style={{ fontSize:'16px', color:C.red, fontWeight:'800' }}>
              ₹{v.ex_showroom_price != null ? calculateCompactOnRoad(v.ex_showroom_price, calcState) : 'N/A'}
            </strong>
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Series block ─────────────────────────────────────────────────────────────
function SeriesBlock({ name, variants }) {
  const ps = variants.map(v => v.ex_showroom_price).filter(p => p != null);
  const lo = ps.length ? Math.min(...ps) : null;
  const hi = ps.length ? Math.max(...ps) : null;
  return (
    <div style={{ backgroundColor:C.cardBg, border:`1px solid ${C.border}`, borderRadius:'12px', marginBottom:'16px', overflow:'hidden' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 22px', backgroundColor:C.subBg, borderBottom:`1px solid ${C.border}` }}>
        <span style={{ fontFamily:C.oswald, fontSize:'15px', fontWeight:'600', color:C.navy, letterSpacing:'0.8px' }}>
          {name.toUpperCase()} SERIES
        </span>
        <span style={{ fontFamily:C.inter, fontSize:'13px', fontWeight:'700', color:C.red }}>
          {lo == null ? 'Price N/A' : lo === hi ? `₹${lo} L` : `₹${lo} – ₹${hi} L`}
          <span style={{ color:C.muted, fontWeight:'400', marginLeft:'8px' }}>
            {variants.length} variant{variants.length !== 1 ? 's' : ''}
          </span>
        </span>
      </div>
      <div style={{ padding:'0 22px' }}>
        {variants.map((v,i) => <VariantRow key={v.id} v={v} isLast={i === variants.length-1} />)}
      </div>
    </div>
  );
}

// ─── Spec pill ────────────────────────────────────────────────────────────────
function SpecPill({ label, value }) {
  return (
    <div className="spec-pill" style={{ backgroundColor:C.cardBg, border:`1px solid ${C.border}`, borderRadius:'10px', padding:'16px 20px' }}>
      <p style={{ margin:'0 0 5px', fontSize:'10px', fontFamily:C.inter, fontWeight:'700', color:C.muted, textTransform:'uppercase', letterSpacing:'1px' }}>{label}</p>
      <p style={{ margin:0, fontSize:'15px', fontFamily:C.inter, fontWeight:'700', color:C.navy }}>{value ?? 'N/A'}</p>
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHead({ children }) {
  return (
    <h2 style={{ margin:'0 0 20px', fontFamily:C.oswald, fontSize:'22px', fontWeight:'700', color:C.black, letterSpacing:'1px' }}>
      {children}
    </h2>
  );
}

export default function CarDetail() {
  const { modelName }   = useParams();
  const decodedModel    = decodeURIComponent(modelName);

  const [variants, setVariants]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [powertrain, setPowertrain]       = useState('All');
  const [transmission, setTransmission]   = useState('All');
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeTab, setActiveTab]         = useState('variants');

  useEffect(() => {
    // Using same absolute CloudFront URL as Home.jsx — avoids relative URL
    // routing issues when served from S3/CloudFront
    axios.get('https://d1m68rrd1mp2k5.cloudfront.net/api/cars')
      .then(res => {
        const matched = res.data.filter(c => c.model_name.toLowerCase() === decodedModel.toLowerCase());
        setVariants(matched);
        if (matched[0]?.colors?.length) setSelectedColor(matched[0].colors[0]);
        setLoading(false);
      })
      .catch(() => { setError('Could not reach the backend.'); setLoading(false); });
  }, [decodedModel]);

  const msgStyle = { padding:'80px', textAlign:'center', fontFamily:C.inter };
  if (loading) return <div style={{ ...msgStyle, color:C.muted }}>Loading…</div>;
  if (error)   return <div style={{ ...msgStyle, color:'#c62828' }}>{error}</div>;
  if (!variants.length) return (
    <div style={msgStyle}>
      <p style={{ color:C.muted }}>No data found for "{decodedModel}".</p>
      <Link to="/search" style={{ color:C.red, fontWeight:'700' }}>← Back to Browse</Link>
    </div>
  );

  const first       = variants[0];
  const prices      = variants.map(v => v.ex_showroom_price).filter(p => p != null);
  const minP        = prices.length ? Math.min(...prices) : null;
  const maxP        = prices.length ? Math.max(...prices) : null;
  const powers      = variants.map(v => v.power).filter(p => p != null);
  const minPow      = powers.length ? Math.min(...powers) : null;
  const maxPow      = powers.length ? Math.max(...powers) : null;
  const fuelTypes   = [...new Set(variants.map(v => v.fuel_type).filter(Boolean))].join(' / ');
  const gearTypes   = [...new Set(variants.map(v => v.gearbox_type).filter(Boolean))].join(' / ');
  const imageUrl    = first.image_urls?.[0];
  const colors      = first.colors || [];

  const filtered = variants.filter(v => {
    const ptOk = powertrain   === 'All' || v.fuel_type    === powertrain;
    const txOk = transmission === 'All' || v.gearbox_type === transmission;
    return ptOk && txOk;
  });
  const seriesMap = filtered.reduce((acc, v) => {
    (acc[v.series] = acc[v.series] || []).push(v);
    return acc;
  }, {});

  const NAV_ITEMS = [
    { id:'variants',      label:'VARIANTS'      },
    { id:'specs',         label:'SPECS'         },
    { id:'brand-history', label:'BRAND HISTORY' },
    { id:'reviews',       label:'REVIEWS'       },
  ];

  return (
    <div style={{ minHeight:'100vh', backgroundColor:C.pageBg, fontFamily:C.inter }}>
      <div style={{ backgroundColor:C.heroBg, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:'1000px', margin:'0 auto', padding:'36px 24px 40px' }}>
          <div className="car-hero-row">
            <div className="car-info-panel">
              <Link to="/search" style={{ display:'inline-block', marginBottom:'20px', fontSize:'13px', fontWeight:'600', color:C.muted, textDecoration:'none' }}>
                ← Back to Browse
              </Link>
              <div style={{ display:'flex', gap:'8px', marginBottom:'12px', flexWrap:'wrap' }}>
                <span style={{ padding:'4px 14px', borderRadius:'20px', backgroundColor:C.subBg, color:C.navy, fontSize:'11px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.8px' }}>
                  {first.brand}
                </span>
                <span style={{ padding:'4px 12px', borderRadius:'20px', backgroundColor:C.blue, color:'#fff', fontSize:'11px', fontWeight:'600' }}>
                  {first.car_type}
                </span>
              </div>
              <h1 style={{ margin:'0 0 14px', fontFamily:C.oswald, fontSize:'clamp(34px,5vw,50px)', fontWeight:'700', color:C.black, lineHeight:1.05, letterSpacing:'0.5px' }}>
                {decodedModel}
              </h1>
              {first.lineage_history && (
                <p style={{ margin:'0 0 16px', fontSize:'14px', color:C.bodyText, lineHeight:'1.8', fontFamily:C.inter }}>
                  {first.lineage_history}
                </p>
              )}
              {first.monthly_sales != null && (
                <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'8px 16px', borderRadius:'8px', backgroundColor:'#F0F7FF', border:`1px solid ${C.border}`, marginBottom:'22px' }}>
                  <div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#22C55E', flexShrink:0 }} />
                  <span style={{ fontSize:'13px', fontWeight:'600', color:C.navy, fontFamily:C.inter }}>
                    Avg. Monthly Volume: <strong style={{ color:C.blue }}>{first.monthly_sales.toLocaleString('en-IN')} units</strong>
                  </span>
                </div>
              )}
              <div style={{ display:'flex', alignItems:'center', gap:'18px', flexWrap:'wrap', marginBottom:'26px' }}>
                <div>
                  <p style={{ margin:'0 0 3px', fontSize:'11px', color:C.muted, textTransform:'uppercase', letterSpacing:'0.8px', fontFamily:C.inter }}>
                    Ex-Showroom Range
                  </p>
                  <p style={{ margin:0, fontFamily:C.inter, fontSize:'clamp(22px,3vw,30px)', fontWeight:'900', color:C.red }}>
                    {minP == null ? 'Price N/A' : minP === maxP ? `₹${minP} Lakh` : `₹${minP} – ₹${maxP} Lakh`}
                  </p>
                </div>
              </div>
              {colors.length > 0 && (
                <div>
                  <p style={{ margin:'0 0 10px', fontSize:'11px', fontFamily:C.inter, fontWeight:'700', color:C.muted, textTransform:'uppercase', letterSpacing:'1px' }}>
                    Available Colors
                  </p>
                  <div style={{ display:'flex', gap:'10px', alignItems:'center', flexWrap:'wrap' }}>
                    {colors.map(name => {
                      const css     = colorHex(name);
                      const isLight = WHITE_RE.test(name);
                      const active  = selectedColor === name;
                      return (
                        <button
                          key={name} title={name} onClick={() => setSelectedColor(name)}
                          style={{
                            width:'30px', height:'30px', borderRadius:'50%', cursor:'pointer',
                            backgroundColor: css,
                            border: isLight ? `2px solid ${C.border}` : '2px solid transparent',
                            boxShadow: active ? `0 0 0 3px #fff, 0 0 0 5px ${C.red}` : '0 1px 4px rgba(0,0,0,0.2)',
                            transition:'box-shadow 0.15s ease', flexShrink:0,
                          }}
                        />
                      );
                    })}
                    {selectedColor && (
                      <span style={{ fontSize:'13px', color:C.muted, fontFamily:C.inter }}>{selectedColor}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="car-image-panel">
              {imageUrl ? (
                <img
                  src={imageUrl} alt={decodedModel}
                  style={{ width:'100%', height:'300px', objectFit:'cover', borderRadius:'14px', boxShadow:'0 8px 32px rgba(10,25,47,0.12)', display:'block' }}
                />
              ) : (
                <div style={{ width:'100%', height:'300px', borderRadius:'14px', backgroundColor:C.subBg, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize:'13px', color:C.muted }}>No image available</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="car-subnav-sticky" style={{ backgroundColor:'#fff', borderBottom:`2px solid ${C.border}`, boxShadow:'0 2px 8px rgba(10,25,47,0.07)' }}>
        <div style={{ maxWidth:'1000px', margin:'0 auto', padding:'0 24px', display:'flex', overflowX:'auto' }}>
          {NAV_ITEMS.map(({ id, label }) => {
            const active = activeTab === id;
            return (
              <button key={id} onClick={() => { setActiveTab(id); jumpTo(id); }} style={{
                padding:'14px 20px', border:'none', cursor:'pointer', flexShrink:0,
                borderBottom: active ? `3px solid ${C.red}` : '3px solid transparent',
                backgroundColor:'transparent',
                fontFamily:C.oswald, fontSize:'13px', fontWeight:'600',
                letterSpacing:'1.2px', color: active ? C.red : C.muted,
                transition:'color 0.15s ease', marginBottom:'-2px',
              }}>
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ maxWidth:'1000px', margin:'0 auto', padding:'36px 24px 80px' }}>
        <div id="variants" style={{ scrollMarginTop:'120px' }}>
          <SectionHead>VARIANTS &amp; PRICES</SectionHead>
          <div style={{ backgroundColor:C.cardBg, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'18px 22px', marginBottom:'24px', display:'flex', flexDirection:'column', gap:'14px' }}>
            <div style={{ display:'flex', gap:'8px', alignItems:'center', flexWrap:'wrap' }}>
              <span style={{ fontSize:'10px', fontFamily:C.inter, fontWeight:'700', color:C.muted, textTransform:'uppercase', letterSpacing:'1px', minWidth:'80px' }}>Powertrain</span>
              {['All','Petrol','Diesel','Hybrid'].map(pt => (
                <Chip key={pt} label={pt} active={powertrain === pt} onClick={() => setPowertrain(pt)} />
              ))}
            </div>
            <div style={{ display:'flex', gap:'8px', alignItems:'center', flexWrap:'wrap' }}>
              <span style={{ fontSize:'10px', fontFamily:C.inter, fontWeight:'700', color:C.muted, textTransform:'uppercase', letterSpacing:'1px', minWidth:'80px' }}>Gearbox</span>
              {['All','Manual','Automatic'].map(tx => (
                <Chip key={tx} label={tx} active={transmission === tx} onClick={() => setTransmission(tx)} />
              ))}
            </div>
          </div>
          {Object.keys(seriesMap).length === 0 ? (
            <div style={{ backgroundColor:C.cardBg, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'48px', textAlign:'center' }}>
              <p style={{ margin:'0 0 14px', fontSize:'15px', color:C.muted, fontFamily:C.inter }}>No matching variants found.</p>
              <button
                onClick={() => { setPowertrain('All'); setTransmission('All'); }}
                style={{ padding:'9px 22px', backgroundColor:C.navy, color:'#fff', border:'none', borderRadius:'8px', fontSize:'13px', fontWeight:'600', cursor:'pointer', fontFamily:C.inter }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            Object.entries(seriesMap).map(([sName, svars]) => (
              <SeriesBlock key={sName} name={sName} variants={svars} />
            ))
          )}
        </div>
        <div id="specs" style={{ scrollMarginTop:'120px', marginTop:'52px' }}>
          <SectionHead>QUICK SPECS</SectionHead>
          <div className="spec-pills">
            <SpecPill label="Power"          value={minPow == null ? 'N/A' : minPow === maxPow ? `${minPow} BHP` : `${minPow}–${maxPow} BHP`} />
            <SpecPill label="Fuel"           value={fuelTypes || 'N/A'} />
            <SpecPill label="Transmission"   value={gearTypes || 'N/A'} />
            <SpecPill label="Body Type"      value={first.car_type} />
            <SpecPill label="Brand"          value={first.brand} />
            <SpecPill label="Total Variants" value={`${variants.length} options`} />
          </div>
          {first.monthly_sales != null && (
            <div style={{ padding:'20px 24px', backgroundColor:C.cardBg, border:`1px solid ${C.border}`, borderRadius:'12px' }}>
              <p style={{ margin:'0 0 6px', fontSize:'11px', fontFamily:C.inter, fontWeight:'700', color:C.muted, textTransform:'uppercase', letterSpacing:'1px' }}>Market Footprint</p>
              <p style={{ margin:0, fontSize:'16px', fontFamily:C.inter, fontWeight:'700', color:C.navy }}>
                Average Monthly Volume: <span style={{ color:C.blue }}>{first.monthly_sales.toLocaleString('en-IN')} units</span>
              </p>
            </div>
          )}
        </div>
        <div id="brand-history" style={{ scrollMarginTop:'120px', marginTop:'52px' }}>
          <SectionHead>BRAND HISTORY</SectionHead>
          <div style={{ backgroundColor:C.cardBg, border:`1px solid ${C.border}`, borderRadius:'12px', overflow:'hidden' }}>
            <div style={{ padding:'16px 24px', backgroundColor:C.subBg, borderBottom:`1px solid ${C.border}`, display:'flex', alignItems:'center', gap:'12px' }}>
              <div style={{ width:'36px', height:'36px', borderRadius:'8px', backgroundColor:C.navy, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <span style={{ color:'#fff', fontSize:'16px', fontWeight:'700', fontFamily:C.oswald }}>
                  {first.brand.charAt(0)}
                </span>
              </div>
              <span style={{ fontFamily:C.oswald, fontSize:'16px', fontWeight:'600', color:C.navy, letterSpacing:'0.5px' }}>
                ABOUT {first.brand.toUpperCase()}
              </span>
            </div>
            <div style={{ padding:'24px' }}>
              {first.brand_history ? (
                <p style={{ margin:0, fontSize:'15px', color:C.bodyText, lineHeight:'1.85', fontFamily:C.inter }}>
                  {first.brand_history}
                </p>
              ) : (
                <p style={{ margin:0, fontSize:'14px', color:C.muted, fontFamily:C.inter, fontStyle:'italic' }}>
                  Brand history not available.
                </p>
              )}
            </div>
          </div>
        </div>
        <div id="reviews" style={{ scrollMarginTop:'120px', marginTop:'52px' }}>
          <SectionHead>EXPERT REVIEWS</SectionHead>
          <div style={{ backgroundColor:C.cardBg, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'52px', textAlign:'center' }}>
            <div style={{ width:'52px', height:'52px', borderRadius:'50%', backgroundColor:C.subBg, margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:'22px' }}>★</span>
            </div>
            <p style={{ margin:'0 0 8px', fontFamily:C.oswald, fontSize:'18px', fontWeight:'600', color:C.navy }}>REVIEWS COMING SOON</p>
            <p style={{ margin:0, fontSize:'13px', color:C.muted, fontFamily:C.inter }}>
              Expert drive impressions and owner ratings for the {decodedModel} are on the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}