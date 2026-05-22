import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const C = {
  pageBg: '#F4F7FA',
  white: '#FFFFFF',
  navy: '#0A192F',
  red: '#E03A3E',
  muted: '#5A7A9A',
  border: '#D6E4F0',
  inter: "'Inter', system-ui, sans-serif",
  oswald: "'Oswald', sans-serif",
};

const STATES = ['Delhi', 'Maharashtra', 'Karnataka', 'Uttar Pradesh', 'Haryana'];

const RTO_RATES = {
  Delhi: 0.10,
  Maharashtra: 0.11,
  Karnataka: 0.14,
  'Uttar Pradesh': 0.08,
  Haryana: 0.09,
};

const INSURANCE_RATE = 0.035;
const FASTAG_FEE = 1500;

function calculateOnRoad(priceInLakhs, state) {
  const exShowroom = priceInLakhs * 100000;
  const rtoRate = RTO_RATES[state] ?? 0.10;
  const rto = Math.round(exShowroom * rtoRate);
  const insurance = Math.round(exShowroom * INSURANCE_RATE);
  const fastag = FASTAG_FEE;
  const total = exShowroom + rto + insurance + fastag;
  return { exShowroom, rto, insurance, fastag, total };
}

function formatINR(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

const labelStyle = {
  display: 'block',
  fontFamily: C.oswald,
  fontSize: '13px',
  fontWeight: '600',
  color: C.navy,
  marginBottom: '8px',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
};

const selectStyle = {
  width: '100%',
  padding: '12px 14px',
  fontSize: '14px',
  fontFamily: C.inter,
  color: C.navy,
  backgroundColor: C.white,
  border: `1px solid ${C.border}`,
  borderRadius: '8px',
  marginBottom: '20px',
  cursor: 'pointer',
  boxSizing: 'border-box',
};

export default function Calculator() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedState, setSelectedState] = useState('Delhi');

  useEffect(() => {
    axios
      .get('/api/cars')
      .then(res => setCars(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const brands = useMemo(
    () => [...new Set(cars.map(c => c.brand))].sort(),
    [cars],
  );

  const models = useMemo(() => {
    if (!selectedBrand) return [];
    return [...new Set(
      cars.filter(c => c.brand === selectedBrand).map(c => c.model_name),
    )].sort();
  }, [cars, selectedBrand]);

  const variants = useMemo(() => {
    if (!selectedBrand || !selectedModel) return [];
    return cars
      .filter(c => c.brand === selectedBrand && c.model_name === selectedModel)
      .sort((a, b) => (a.ex_showroom_price ?? 0) - (b.ex_showroom_price ?? 0));
  }, [cars, selectedBrand, selectedModel]);

  const selectedCar = useMemo(
    () => variants.find(c => String(c.id) === selectedVariant),
    [variants, selectedVariant],
  );

  const breakdown = selectedCar
    ? calculateOnRoad(selectedCar.ex_showroom_price, selectedState)
    : null;

  function handleBrandChange(e) {
    setSelectedBrand(e.target.value);
    setSelectedModel('');
    setSelectedVariant('');
  }

  function handleModelChange(e) {
    setSelectedModel(e.target.value);
    setSelectedVariant('');
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.pageBg, fontFamily: C.inter, padding: '40px 24px 72px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{ margin: '0 0 8px', fontFamily: C.oswald, fontSize: '32px', color: C.navy, letterSpacing: '0.5px' }}>
          ON-ROAD PRICE CALCULATOR
        </h1>
        <p style={{ margin: '0 0 36px', color: C.muted, fontSize: '15px' }}>
          Estimate your total on-road cost by variant and state.
        </p>

        <div className="calculator-layout">
          {/* Left — inputs */}
          <div className="calculator-panel">
            <div style={{
              backgroundColor: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: '14px',
              padding: '28px 24px',
              boxShadow: '0 2px 12px rgba(10,25,47,0.06)',
            }}>
              <h2 style={{ margin: '0 0 24px', fontFamily: C.oswald, fontSize: '20px', color: C.navy }}>
                Select Your Vehicle
              </h2>

              {loading ? (
                <p style={{ color: C.muted, fontSize: '14px' }}>Loading vehicle data…</p>
              ) : (
                <>
                  <label style={labelStyle} htmlFor="brand-select">Brand</label>
                  <select
                    id="brand-select"
                    value={selectedBrand}
                    onChange={handleBrandChange}
                    style={selectStyle}
                  >
                    <option value="">Choose a brand</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>

                  <label style={labelStyle} htmlFor="model-select">Model</label>
                  <select
                    id="model-select"
                    value={selectedModel}
                    onChange={handleModelChange}
                    disabled={!selectedBrand}
                    style={{ ...selectStyle, opacity: selectedBrand ? 1 : 0.6 }}
                  >
                    <option value="">Choose a model</option>
                    {models.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>

                  <label style={labelStyle} htmlFor="variant-select">Variant</label>
                  <select
                    id="variant-select"
                    value={selectedVariant}
                    onChange={e => setSelectedVariant(e.target.value)}
                    disabled={!selectedModel}
                    style={{ ...selectStyle, marginBottom: 0, opacity: selectedModel ? 1 : 0.6 }}
                  >
                    <option value="">Choose a variant</option>
                    {variants.map(car => (
                      <option key={car.id} value={String(car.id)}>
                        {car.trim_name} — ₹{car.ex_showroom_price} Lakh
                      </option>
                    ))}
                  </select>

                  <label style={{ ...labelStyle, marginTop: '20px' }} htmlFor="state-select">State</label>
                  <select
                    id="state-select"
                    value={selectedState}
                    onChange={e => setSelectedState(e.target.value)}
                    style={{ ...selectStyle, marginBottom: 0 }}
                  >
                    {STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </>
              )}
            </div>
          </div>

          {/* Right — breakdown */}
          <div className="calculator-panel">
            <div style={{
              backgroundColor: C.navy,
              borderRadius: '14px',
              padding: '28px 24px',
              boxShadow: '0 8px 28px rgba(10,25,47,0.2)',
            }}>
              <h2 style={{ margin: '0 0 24px', fontFamily: C.oswald, fontSize: '20px', color: '#fff', letterSpacing: '0.5px' }}>
                PRICE BREAKDOWN
              </h2>

              {!breakdown ? (
                <div style={{ textAlign: 'left', marginTop: '20px' }}>
                  <p style={{ color: '#FFFFFF', marginBottom: '20px', fontSize: '16px', fontWeight: '500' }}>
                    An estimated on-road price typically consists of:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#8892B0', fontSize: '15px' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ color: '#E03A3E', fontWeight: '800' }}>+</span>
                      <span><strong>Ex-Showroom Price:</strong> The base cost of the vehicle from the manufacturer.</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ color: '#E03A3E', fontWeight: '800' }}>+</span>
                      <span><strong>RTO Tax & Registration:</strong> State-dependent road taxes required to register the car.</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ color: '#E03A3E', fontWeight: '800' }}>+</span>
                      <span><strong>Comprehensive Insurance:</strong> Mandatory coverage for the vehicle and third parties.</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ color: '#E03A3E', fontWeight: '800' }}>+</span>
                      <span><strong>FASTag & Handling:</strong> Standard flat fees for toll tags and basic dealer processing.</span>
                    </div>
                  </div>
                  <p style={{ marginTop: '32px', fontSize: '13px', fontStyle: 'italic', color: '#5A7A9A', textAlign: 'center' }}>
                    Select your vehicle details on the left to see the exact numerical breakdown.
                  </p>
                </div>
              ) : (
                <>
                  {[
                    { label: 'Ex-Showroom', value: breakdown.exShowroom },
                    { label: 'RTO Tax', value: breakdown.rto },
                    { label: 'Insurance (est.)', value: breakdown.insurance },
                    { label: 'FASTag / Registration', value: breakdown.fastag },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '14px',
                      }}
                    >
                      <span style={{ color: '#7EB3D8', fontSize: '14px' }}>{label}</span>
                      <span style={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}>
                        {formatINR(value)}
                      </span>
                    </div>
                  ))}

                  <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.15)', margin: '20px 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ color: '#7EB3D8', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                      Total Estimated On-Road Price
                    </span>
                    <span style={{ fontFamily: C.oswald, fontSize: '28px', fontWeight: '700', color: C.red }}>
                      {formatINR(breakdown.total)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <p style={{
          marginTop: '32px',
          padding: '16px 20px',
          backgroundColor: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: '8px',
          color: C.muted,
          fontSize: '13px',
          lineHeight: 1.7,
        }}>
          <strong style={{ color: C.navy }}>Disclaimer:</strong> These figures are estimates only. Actual on-road prices may vary by dealer, discounts, handling charges, TCS, and optional accessories. Always confirm the final quote with your authorized dealership.
        </p>
      </div>
    </div>
  );
}
