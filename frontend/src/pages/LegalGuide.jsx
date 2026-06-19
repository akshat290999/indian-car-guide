import { ShieldAlert, AlertTriangle, FileText, CheckCircle, XCircle, Info } from 'lucide-react'

export default function LegalGuide() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '10px', fontFamily: "'Outfit', sans-serif" }}>Legal & Insurance Guide</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '50px', fontSize: '1.1rem', lineHeight: 1.6 }}>
        Navigating the complex world of the RTO, traffic police, and insurance companies as an Indian car enthusiast. 
        What's legal, what's a grey area, and what will get your car impounded.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldAlert color="#ef4444" size={24} />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>The RTO Reality</h2>
          </div>
          <div className="glass" style={{ padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--text-primary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '20px' }}>
              Under Section 52 of the Motor Vehicles Act, <strong>any modification that alters the specifications mentioned in the Registration Certificate (RC) is technically illegal.</strong> 
              This is a blanket rule that makes almost all tuning illegal on paper. However, enforcement focuses heavily on visible and audible modifications.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'rgba(239,68,68,0.05)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.1)' }}>
                <h3 style={{ color: '#ef4444', margin: '0 0 16px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <XCircle size={18} /> High Risk (Cops / Impound)
                </h3>
                <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem' }}>
                  <li><strong>Loud Exhausts:</strong> Decat downpipes with straight pipes. Any exhaust exceeding 80dB is an immediate target.</li>
                  <li><strong>Excessive Tints:</strong> Sun films below 70% VLT (front/rear) and 50% (sides) are illegal.</li>
                  <li><strong>Aggressive Body Kits:</strong> Widebody kits or massive wings altering the vehicle's original dimensions.</li>
                  <li><strong>Different Paint Colors:</strong> Changing the car's color without endorsing it on the RC.</li>
                  <li><strong>Oversized Wheels:</strong> Wheels protruding significantly past the fenders.</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(74,222,128,0.05)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(74,222,128,0.1)' }}>
                <h3 style={{ color: '#4ade80', margin: '0 0 16px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={18} /> Low Risk (Invisible / Ignored)
                </h3>
                <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem' }}>
                  <li><strong>ECU Remaps:</strong> Invisible to physical inspection and standard RTO systems.</li>
                  <li><strong>Upgraded Intercoolers:</strong> Technically an alteration, but rarely identified unless neon-colored.</li>
                  <li><strong>Performance Tyres:</strong> As long as they fit within the wheel arches.</li>
                  <li><strong>Suspension:</strong> Mild lowering springs or coilovers are almost never flagged unless the car is aggressively "slammed".</li>
                  <li><strong>Intakes / Drop-in Filters:</strong> Inside the engine bay, out of sight.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(56,189,248,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText color="#38bdf8" size={24} />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>Insurance & Warranty</h2>
          </div>
          <div className="glass" style={{ padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '16px', borderRadius: '8px', background: 'var(--surface)' }}>
                <h4 style={{ margin: '0 0 8px', color: '#38bdf8', fontSize: '1.1rem' }}>Warranty Voids</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  An ECU flash or tuning box will void your powertrain warranty. Dealerships (especially VW, Skoda, and BMW) can detect flashes even if flashed back to stock, due to the flash counter on the ECU. Do not expect warranty coverage on an engine or gearbox failure if the car is tuned.
                </p>
              </div>
              <div style={{ padding: '16px', borderRadius: '8px', background: 'var(--surface)' }}>
                <h4 style={{ margin: '0 0 8px', color: '#facc15', fontSize: '1.1rem' }}>Accident Claims</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  If you are in a major accident, insurance surveyors assess the vehicle. If they spot unapproved performance modifications (like a big turbo or decat exhaust), they can theoretically reject the claim on the grounds that the vehicle specifications were illegally altered, making the policy void.
                </p>
              </div>
              <div style={{ padding: '16px', borderRadius: '8px', background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.2)' }}>
                <h4 style={{ margin: '0 0 8px', color: '#fb923c', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertTriangle size={18} /> The "Return to Stock" Strategy</h4>
                <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Many Indian enthusiasts keep their stock downpipes and intakes. Before a major warranty claim or comprehensive service, they physically reinstall the stock parts and flash the ECU back to stock. While not foolproof against deep diagnostics, it avoids immediate flagging by visual inspection.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(167,139,250,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Info color="#a78bfa" size={24} />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>PUC Checks (Pollution Under Control)</h2>
          </div>
          <div className="glass" style={{ padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--text-primary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '20px' }}>
              A tuned car can absolutely pass a PUC test, but hardware changes make it tricky.
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem' }}>
              <li><strong>Stage 1 (Software Only):</strong> Will pass the PUC easily. At idle, the car runs a stoichiometric 14.7:1 AFR just like stock.</li>
              <li><strong>Decat Downpipe:</strong> Will likely fail the PUC test because the catalytic converter is missing. Unburnt hydrocarbons will be too high.</li>
              <li><strong>High-Flow Cat:</strong> Can usually pass a PUC test if the cat is warmed up properly before the test.</li>
              <li><strong>Diesel Smoke:</strong> Aggressive diesel tunes (especially with a DPF delete) will fail the opacity test due to heavy soot. Keep diesel tunes smokeless.</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  )
}
