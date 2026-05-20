import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const C = {
  pageBg:  '#F4F7FA',
  cardBg:  '#FFFFFF',
  navy:    '#0A192F',
  blue:    '#0072BB',
  red:     '#E03A3E',
  border:  '#D6E4F0',
  muted:   '#5A7A9A',
  chipBg:  '#EBF2FF',
  oswald:  "'Oswald', sans-serif",
  inter:   "'Inter', system-ui, sans-serif",
};

export default function BrandSearch() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get('type');
  const initialBrand = location.state?.brand || 'All';

  const [cars, setCars]               = useState([]);
  const [selectedBrand, setSelected] = useState(initialBrand);

  useEffect(() => {
    axios.get('/api/cars')
      .then(res => setCars(res.data))
      .catch(err => console.error(err));
  }, []);

  // Brand list derived from data so it stays in sync automatically
  const brands = ['All', ...Array.from(new Set(cars.map(c => c.brand))).sort()];

  const byBrand   = selectedBrand === 'All' ? cars : cars.filter(c => c.brand === selectedBrand);
  const filtered  = typeFilter
    ? byBrand.filter(c => c.car_type === typeFilter)
    : byBrand;
  const sorted    = [...filtered].sort((a, b) => (a.model_name || '').localeCompare(b.model_name || ''));
  const grouped   = sorted.reduce((acc, car) => {
    (acc[car.model_name || 'Unknown'] = acc[car.model_name || 'Unknown'] || []).push(car);
    return acc;
  }, {});
  const entries   = Object.entries(grouped);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.pageBg, fontFamily: C.inter, padding: '36px 24px 72px' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

        {/* ── Page header ─────────────────────────────────────────────────── */}
        <h1 style={{ margin: '0 0 4px', fontFamily: C.oswald, fontSize: '30px', fontWeight: '700', color: C.navy, letterSpacing: '1px' }}>
          BROWSE VEHICLES
        </h1>
        <p style={{ margin: '0 0 28px', color: C.muted, fontSize: '14px' }}>
          {entries.length} model{entries.length !== 1 ? 's' : ''}
          {typeFilter ? ` · ${typeFilter}` : ''}
          &nbsp;·&nbsp; click a card to explore all variants
        </p>

        {/* ── Brand filter pills ───────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
          {brands.map(brand => {
            const active = brand === selectedBrand;
            return (
              <button key={brand} onClick={() => setSelected(brand)} style={{
                padding: '8px 22px',
                borderRadius: '24px',
                border: `2px solid ${active ? C.red : C.border}`,
                backgroundColor: active ? C.navy : C.cardBg,
                color: active ? '#fff' : C.navy,
                fontFamily: C.inter,
                fontWeight: active ? '700' : '500',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}>
                {brand}
              </button>
            );
          })}
        </div>

        {/* ── Cards grid ──────────────────────────────────────────────────── */}
        {entries.length === 0 ? (
          <p style={{ color: C.muted, textAlign: 'center', marginTop: '60px', fontSize: '15px' }}>
            No models found{typeFilter ? ` for ${typeFilter}` : ''}{selectedBrand !== 'All' ? ` from ${selectedBrand}` : ''}.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(284px, 1fr))', gap: '22px' }}>
            {entries.map(([modelName, variants]) => {
              const prices     = variants.map(v => v.ex_showroom_price).filter(Boolean);
              const minP       = Math.min(...prices);
              const maxP       = Math.max(...prices);
              const first      = variants[0];
              const numSeries  = new Set(variants.map(v => v.series)).size;
              const imageUrl   = first.image_urls?.[0];

              return (
                <Link key={modelName} to={`/car/${encodeURIComponent(modelName)}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div
                    style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.15s ease, box-shadow 0.15s ease', boxShadow: '0 2px 8px rgba(10,25,47,0.06)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(10,25,47,0.13)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = '0 2px 8px rgba(10,25,47,0.06)'; }}
                  >
                    {/* Car image */}
                    {imageUrl ? (
                      <img src={imageUrl} alt={modelName} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block', backgroundColor: '#E8EEF5' }} />
                    ) : (
                      <div style={{ width: '100%', height: '180px', backgroundColor: '#EBF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '12px', color: C.muted }}>No image</span>
                      </div>
                    )}

                    <div style={{ padding: '16px 18px 20px' }}>
                      {/* Brand + type */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: '20px', backgroundColor: C.chipBg, color: C.navy, fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                          {first.brand}
                        </span>
                        <span style={{ fontSize: '11px', color: C.muted }}>{first.car_type}</span>
                      </div>

                      {/* Model name */}
                      <h2 style={{ margin: '0 0 14px', fontFamily: C.oswald, fontSize: '22px', fontWeight: '700', color: '#000000', letterSpacing: '0.4px', lineHeight: 1.15 }}>
                        {modelName}
                      </h2>

                      <div style={{ height: '1px', backgroundColor: C.border, marginBottom: '13px' }} />

                      {/* Price */}
                      <p style={{ margin: '0 0 2px', fontSize: '10px', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                        Ex-Showroom
                      </p>
                      <p style={{ margin: '0 0 14px', fontSize: '19px', fontWeight: '800', color: C.red }}>
                        {minP === maxP ? `₹${minP} Lakh` : `₹${minP} – ₹${maxP} Lakh`}
                      </p>

                      {/* Footer */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', color: C.muted }}>
                          {numSeries} series &nbsp;·&nbsp; {variants.length} variants
                        </span>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: C.blue }}>
                          Explore →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
