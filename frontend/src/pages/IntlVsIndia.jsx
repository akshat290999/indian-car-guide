import React from 'react'

export default function IntlVsIndia() {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '10px' }}>Global vs. Indian Tuning</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '1.2rem' }}>
        Why a 600HP build in Europe is vastly different from a 600HP build in India.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        <div className="premium-card" style={{ padding: '30px' }}>
          <h2 style={{ color: 'var(--accent-red)', marginBottom: '16px' }}>1. Fuel Quality (Octane Ratings)</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            <strong>International:</strong> 93 AKI (98 RON) or even E85 (85% Ethanol) is available at regular pump stations. This allows tuners to advance ignition timing aggressively without engine knock. <br /><br />
            <strong>India:</strong> Regular pump gas is 91 RON. XP95 (95 RON) is becoming common, but XP100 (100 RON) is exceedingly rare and expensive (~₹160/L). Indian tunes must be extremely conservative with timing to prevent catastrophic detonation on bad fuel.
          </p>
        </div>

        <div className="premium-card" style={{ padding: '30px' }}>
          <h2 style={{ color: 'var(--accent-blue)', marginBottom: '16px' }}>2. Thermal Constraints & Climate</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            <strong>International:</strong> Cooler ambient temperatures (10°C - 20°C) mean denser air and less heat soak. <br /><br />
            <strong>India:</strong> Summers reach 45°C+. This massive heat forces engines to pull timing to protect themselves. Upgraded intercoolers and Water-Meth Injection (WMI) are not optional for Stage 2+ builds in India; they are mandatory for survival.
          </p>
        </div>

        <div className="premium-card" style={{ padding: '30px' }}>
          <h2 style={{ color: '#f59e0b', marginBottom: '16px' }}>3. Hardware Availability & Import Taxes</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            <strong>International:</strong> Parts are available next-day. <br /><br />
            <strong>India:</strong> Heavy import duties (up to 40-50%) on performance parts (turbos, exhausts, forged internals) make building cars astronomically expensive. A ₹2 Lakh turbo kit in the US costs ₹3.5 Lakhs by the time it clears Indian customs.
          </p>
        </div>

        <div className="premium-card" style={{ padding: '30px' }}>
          <h2 style={{ color: '#10b981', marginBottom: '16px' }}>4. Legal & RTO Restrictions</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            <strong>International:</strong> Clear legal frameworks for modifications (e.g., TUV certification in Germany, CARB legality in California). <br /><br />
            <strong>India:</strong> Under the Motor Vehicles Act, almost ALL performance modifications are technically illegal. Engine swaps, loud exhausts, and even structural changes (lowering) can lead to the vehicle being impounded. The tuning scene exists largely in a legal grey area.
          </p>
        </div>

      </div>
    </div>
  )
}
