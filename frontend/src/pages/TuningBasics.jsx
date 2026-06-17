import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const TOPICS = [
  {
    id: "software",
    title: "ECU Tuning (Software)",
    img: "/images/hardware_ecu.jpg",
    content: "Modern cars are controlled by an Engine Control Unit (ECU). A 'Tune' or 'Remap' changes the software parameters to increase boost, adjust fueling, and change ignition timing.",
    subtopics: [
      { name: "Flash Tune", desc: "Completely overwrites the factory ECU software via the OBD2 port (e.g., Bootmod3, Revo, APR)." },
      { name: "Piggyback", desc: "A physical box that intercepts signals between the sensors and the ECU to trick it into making more power (e.g., JB4)." },
      { name: "TCU Tune", desc: "Transmission Control Unit tune. Increases clamping pressure on the clutches to handle the extra torque without slipping." }
    ]
  },
  {
    id: "turbo-dynamics",
    title: "Turbochargers & Boost",
    img: "/images/hardware_turbo.jpg",
    content: "A turbocharger forces more air into the engine, allowing it to burn more fuel and make more power. Upgrading the turbo is the key to massive horsepower gains.",
    subtopics: [
      { name: "Compressor Wheel", desc: "Sucks in fresh air and compresses it. Bigger wheels mean more air." },
      { name: "Turbine Wheel", desc: "Driven by exhaust gases to spin the compressor." },
      { name: "Wastegate", desc: "Regulates maximum boost pressure by bypassing exhaust gases." },
      { name: "Blow-Off Valve (BOV)", desc: "Releases excess pressure when you let off the throttle, preventing compressor surge." }
    ]
  },
  {
    id: "cooling",
    title: "Cooling & Airflow",
    img: "/images/hardware_intercooler.jpg",
    content: "Compressing air makes it extremely hot. Hot air is less dense and causes engine knock. Upgrading cooling is mandatory in India.",
    subtopics: [
      { name: "Intercooler", desc: "Cools the hot compressed air from the turbo before it enters the engine." },
      { name: "Cold Air Intake", desc: "Replaces the restrictive factory airbox to allow the turbo to breathe easier." },
      { name: "Water/Meth Injection", desc: "Sprays a fine mist of water and methanol to drastically reduce intake temperatures and increase octane." }
    ]
  },
  {
    id: "exhaust",
    title: "Exhaust Systems",
    img: "/images/hardware_intake.jpg", // Using intake image as placeholder for exhaust downpipe
    content: "Getting exhaust gases out of the engine quickly reduces backpressure, allowing the turbo to spool faster.",
    subtopics: [
      { name: "Downpipe", desc: "The most critical exhaust component. Connects directly to the turbo. Upgrading to a 'Decat' or High-Flow Cat downpipe gives huge gains." },
      { name: "Cat-back Exhaust", desc: "Everything from the catalytic converter to the tailpipes. Mostly for sound and minor flow improvements." },
      { name: "Resonator Delete", desc: "Removes the muffler-like resonator to increase volume without massive cost." }
    ]
  },
  {
    id: "engine-internals",
    title: "Forging & Engine Internals",
    img: "/images/hardware_piston.jpg",
    content: "When increasing power past Stage 2, the stock pistons and connecting rods can bend or break under extreme cylinder pressures. 'Forging' an engine means replacing cast components with much stronger forged steel/aluminum parts.",
    subtopics: [
      { name: "Forged Pistons", desc: "Can withstand higher heat and pressure than stock cast pistons." },
      { name: "Connecting Rods", desc: "The weakest link in many engines. Forged rods prevent the engine from throwing a rod through the block." },
      { name: "Crankshaft", desc: "Usually strong enough from the factory on modern cars, but balanced for high-RPM applications." }
    ]
  }
]

export default function TuningBasics() {
  const [openIntro, setOpenIntro] = useState(false)
  const [openTopic, setOpenTopic] = useState(null)

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '40px', textAlign: 'center' }}>
        Learn To Tune
      </h1>
      
      {/* Introduction Accordion */}
      <div 
        className="premium-card" 
        style={{ marginBottom: '40px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
        onClick={() => setOpenIntro(!openIntro)}
      >
        <div style={{ padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0 }}>The Core Concept: ECU & OBD</h2>
          {openIntro ? <ChevronUp size={24} color="var(--accent-blue)" /> : <ChevronDown size={24} color="var(--accent-blue)" />}
        </div>
        
        {openIntro && (
          <div style={{ padding: '0 30px 30px 30px' }}>
            <div style={{ width: '100%', height: '1px', background: 'var(--border-color)', marginBottom: '20px' }}></div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '16px' }}>
              Before diving into hardware, you must understand how a modern car thinks. Every modern engine is governed by an <strong>ECU (Engine Control Unit)</strong>. This computer controls how much fuel is injected, when the spark plug fires (ignition timing), and how much air the turbocharger forces in (boost pressure). 
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Tuning fundamentally involves rewriting this code. We access the ECU through the <strong>OBD-II (On-Board Diagnostics)</strong> port located under your steering wheel. By flashing a new software map via this port, we can demand more boost and fuel, unlocking power the manufacturer left on the table.
            </p>
          </div>
        )}
      </div>

      {/* Hardware Accordions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {TOPICS.map(topic => {
          const isOpen = openTopic === topic.id;
          
          return (
            <div key={topic.id} className="premium-card" style={{ borderLeft: '4px solid var(--accent-red)', overflow: 'hidden' }}>
              
              {/* Accordion Header */}
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '20px', 
                  cursor: 'pointer' 
                }}
                onClick={() => setOpenTopic(isOpen ? null : topic.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', background: '#fff', flexShrink: 0 }}>
                    <img src={topic.img} alt={topic.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '5px' }} />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0 }}>{topic.title}</h3>
                </div>
                {isOpen ? <ChevronUp size={24} color="var(--accent-red)" /> : <ChevronDown size={24} color="var(--accent-red)" />}
              </div>

              {/* Accordion Content */}
              {isOpen && (
                <div style={{ padding: '0 20px 20px 20px' }}>
                  <div style={{ height: '1px', background: 'var(--border)', marginBottom: '20px' }}></div>
                  
                  {/* Big Image when opened */}
                  <div style={{ height: '300px', background: '#fff', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
                    <img src={topic.img} alt={topic.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '20px' }} />
                  </div>

                  <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    {topic.content}
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                    {topic.subtopics.map((sub, idx) => (
                      <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '8px', borderLeft: '3px solid var(--accent-blue)' }}>
                        <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '8px' }}>{sub.name}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                          {sub.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
