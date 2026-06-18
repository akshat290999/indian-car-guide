import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useLocation } from 'react-router-dom'

export default function TunersAndCosts() {
  const [openTuner, setOpenTuner] = useState(null)
  const [openCost, setOpenCost] = useState(null)
  
  const location = useLocation()
  const tunerRefs = useRef({})

  const tuners = [
    {
      id: "code6",
      name: "Code6 Tuning",
      website: "https://code6.in",
      desc: "One of India's largest tuning networks. Great for Stage 1/2 maps on everyday cars and diesel tuning.",
      platforms: "VAG, Hyundai/Kia, Mahindra, Tata",
      estimatedCost: "₹25,000 - ₹35,000 (Stage 1) | ₹80,000+ (Stage 2 with hardware)"
    },
    {
      id: "wolf",
      name: "Wolf Moto Performance",
      website: "https://wolfmoto.com",
      desc: "Specialists in custom ECU maps. Very popular in the Indian enthusiast community for reliable, safe power. Known for their incredible Fiat and VAG tuning.",
      platforms: "VAG, Fiat, Ford, Maruti Suzuki",
      estimatedCost: "₹25,000 - ₹30,000 (Stage 1)"
    },
    {
      id: "gttunerz",
      name: "GT Tunerz / APR India",
      website: "https://gttunerz.com",
      desc: "High-end European car specialists in Delhi. Official dealers for APR, taking EA888 engines to extreme limits.",
      platforms: "Audi, Porsche, VW/Skoda",
      estimatedCost: "₹45,000 - ₹60,000 (Premium APR Stage 1) | ₹1,50,000+ (Stage 2)"
    },
    {
      id: "petes",
      name: "Pete's Automotive",
      website: "https://petes.in",
      desc: "The pioneers of tuning in India. Decades of experience in making fast cars even faster safely. They brought Revo and Custom Code to India.",
      platforms: "VAG, BMW, Mercedes",
      estimatedCost: "₹40,000+ (Stage 1)"
    },
    {
      id: "harmonixx",
      name: "Harmonixx Tuning",
      website: "https://harmonixxtuning.com",
      desc: "Known for pushing limits, especially on the BMW B58 platform and custom turbo setups. They provide custom dyno calibrations.",
      platforms: "BMW, Mercedes, Custom Builds",
      estimatedCost: "₹50,000 - ₹85,000 (Custom Calibration)"
    },
    {
      id: "bootmod3",
      name: "Bootmod3",
      website: "https://www.protuningfreaks.com/",
      desc: "Cloud-based tuning platform. Extremely popular for BMWs (B48/B58). Allows you to flash off-the-shelf (OTS) maps via your phone.",
      platforms: "BMW, Mini",
      estimatedCost: "₹50,000 - ₹60,000"
    },
    {
      id: "mhd",
      name: "MHD Tuning",
      website: "https://mhdtuning.com/",
      desc: "A flasher app for BMWs. Very well known for their precise exhaust burble controls and incredibly smooth power delivery.",
      platforms: "BMW",
      estimatedCost: "₹45,000 - ₹55,000"
    },
    {
      id: "renntech",
      name: "Renntech",
      website: "https://www.renntechmercedes.com/",
      desc: "Globally renowned Mercedes-Benz and AMG tuning specialist. Premium maps designed for maximum performance without sacrificing luxury.",
      platforms: "Mercedes-AMG",
      estimatedCost: "₹1,20,000+"
    }
  ]

  useEffect(() => {
    if (location.state && location.state.targetTuner) {
      const targetId = location.state.targetTuner
      setOpenTuner(targetId)
      
      // Add a slight delay to allow rendering before scrolling
      setTimeout(() => {
        if (tunerRefs.current[targetId]) {
          const y = tunerRefs.current[targetId].getBoundingClientRect().top + window.scrollY - 100
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location])

  const hardwareCosts = [
    {
      id: "downpipe",
      item: "Performance Downpipe (Decat/High-Flow)",
      price: "₹18,000 - ₹50,000+",
      desc: "Mandatory for Stage 2. Helps the turbo spool faster and reduces heat."
    },
    {
      id: "intake",
      item: "Air Intake System",
      price: "₹15,000 - ₹60,000+",
      desc: "More air = more power. Costs vary wildly (e.g., simple BMC filter vs full Eventuri carbon intake)."
    },
    {
      id: "intercooler",
      item: "Upgraded Intercooler",
      price: "₹40,000 - ₹1,20,000",
      desc: "Essential for Indian summers to prevent heat soak on track days or heavy pulls."
    },
    {
      id: "forged",
      item: "Forged Engine Internals",
      price: "₹1,50,000 - ₹4,00,000+",
      desc: "Pistons and rods. Necessary for Stage 3 builds pushing massive boost beyond factory limits."
    }
  ]

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Tuners & General Costs</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '1.1rem' }}>
        Who to trust with your car, and how much it takes to build a monster.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        
        {/* Tuners Section */}
        <section>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>Top Indian Tuners</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {tuners.map((tuner) => (
              <div 
                key={tuner.id} 
                ref={el => tunerRefs.current[tuner.id] = el}
                className="premium-card" 
                style={{ 
                  borderLeft: openTuner === tuner.id ? '4px solid var(--accent-red)' : '4px solid var(--accent-blue)', 
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <div 
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', cursor: 'pointer' }}
                  onClick={() => setOpenTuner(openTuner === tuner.id ? null : tuner.id)}
                >
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0 }}>{tuner.name}</h3>
                  {openTuner === tuner.id ? <ChevronUp size={24} color="var(--accent-red)" /> : <ChevronDown size={24} color="var(--accent-blue)" />}
                </div>
                
                {openTuner === tuner.id && (
                  <div style={{ padding: '0 20px 20px 20px', animation: 'fadeIn 0.3s ease' }}>
                    <div style={{ height: '1px', background: 'var(--border)', marginBottom: '15px' }}></div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '16px', lineHeight: '1.6' }}>{tuner.desc}</p>
                    
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '15px' }}>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', background: 'rgba(255,255,255,0.05)', padding: '10px 16px', borderRadius: '6px' }}>
                        <strong style={{ color: 'var(--accent-blue)' }}>Specialties:</strong> {tuner.platforms}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', background: 'rgba(255,255,255,0.05)', padding: '10px 16px', borderRadius: '6px' }}>
                        <strong style={{ color: 'var(--accent-red)' }}>Estimated Cost:</strong> {tuner.estimatedCost}
                      </div>
                    </div>
                    <a href={tuner.website} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'inline-block' }}>Visit Site</a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Hardware Costs Section */}
        <section>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>General Hardware Costs</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {hardwareCosts.map((cost) => (
              <div key={cost.id} className="glass" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                <div 
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', cursor: 'pointer' }}
                  onClick={() => setOpenCost(openCost === cost.id ? null : cost.id)}
                >
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>{cost.item}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-red)', margin: 0 }}>{cost.price}</h4>
                    {openCost === cost.id ? <ChevronUp size={24} color="var(--text-muted)" /> : <ChevronDown size={24} color="var(--text-muted)" />}
                  </div>
                </div>
                
                {openCost === cost.id && (
                  <div style={{ padding: '0 20px 20px 20px', animation: 'fadeIn 0.3s ease' }}>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1rem' }}>{cost.desc}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

