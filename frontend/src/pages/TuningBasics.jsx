import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Info, X } from 'lucide-react'

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
  },
  {
    id: "transmission",
    title: "Transmission & Drivetrain",
    img: "/images/hardware_piston.jpg", // Placeholder
    content: "Power is useless if it can't reach the wheels. Building the drivetrain ensures you don't burn up your clutch or snap your axles under heavy load.",
    subtopics: [
      { name: "Upgraded Clutch Pack", desc: "For DSG/DCT automatics and manual gearboxes. Stronger friction plates prevent the clutch from slipping." },
      { name: "Limited Slip Differential (LSD)", desc: "Distributes power evenly between the driving wheels to drastically improve corner exit speed and launch traction." },
      { name: "Upgraded Axles", desc: "Prevents the driveshafts from snapping during hard launches on sticky tires." }
    ]
  },
  {
    id: "handling",
    title: "Handling & Dynamics",
    img: "/images/hardware_intercooler.jpg", // Placeholder
    content: "Speed isn't just about straight lines. Upgrading your suspension and chassis makes the car corner flatter and respond quicker.",
    subtopics: [
      { name: "Lowering Springs", desc: "Drops the ride height for a better center of gravity and slightly stiffer ride. A great entry-level mod." },
      { name: "Coilovers", desc: "Fully adjustable suspension systems replacing the shock and spring. Allows tuning of ride height, damping, and rebound." },
      { name: "Sway Bars (Anti-Roll Bars)", desc: "Thicker bars connect the left and right sides of the suspension, massively reducing body roll during cornering." }
    ]
  },
  {
    id: "fuels",
    title: "Alternate Fuels (E85/Meth)",
    img: "/images/hardware_ecu.jpg", // Placeholder
    content: "Standard 91/95 octane petrol limits how much boost you can run. Switching to specialized fuels acts like a chemical intercooler.",
    subtopics: [
      { name: "E85 (Ethanol)", desc: "A blend of 85% ethanol and 15% petrol. It burns much cooler and has a massive octane rating (105+), allowing for aggressive timing." },
      { name: "Flex Fuel Kits", desc: "A sensor that reads the exact ethanol content in your fuel line and automatically adjusts your engine map on the fly." },
      { name: "Port Injection (PI)", desc: "Adding secondary fuel injectors directly into the intake manifold because standard injectors can't flow enough fuel for full E85 setups." }
    ]
  }
]

const FUN_FACTS = [
  "Did you know? The Bugatti Veyron has 10 radiators just to manage engine cooling!",
  "A 'Decat' downpipe will make your turbo spool almost 500 RPM earlier.",
  "E85 fuel burns so cool that intake manifolds can literally form ice condensation on them.",
  "A modern Stage 1 flash tune can add up to 80 horsepower in just 10 minutes via the OBD port.",
  "The world's fastest FWD drag cars push over 1500+ HP on four-cylinder engines.",
  "Weight reduction is free horsepower. Losing 50kg is roughly equivalent to gaining 10-15hp.",
  "Water-Methanol injection was actually invented for World War II fighter planes to generate extra boost at high altitudes.",
  "An upgraded intercooler won't strictly 'add' horsepower on a cold day, but it 'saves' horsepower on a hot day by preventing heat soak."
]

export default function TuningBasics() {
  const [openIntro, setOpenIntro] = useState(false)
  const [openTopic, setOpenTopic] = useState(null)
  
  // Fun Facts Toast State
  const [fact, setFact] = useState(null)
  const [showFact, setShowFact] = useState(false)

  useEffect(() => {
    // Initial delay before first fact
    const initialTimer = setTimeout(() => {
      displayRandomFact()
    }, 5000)

    // Recurring interval for subsequent facts
    const interval = setInterval(() => {
      displayRandomFact()
    }, 20000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [])

  const displayRandomFact = () => {
    const randomFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]
    setFact(randomFact)
    setShowFact(true)
    
    // Auto-hide the fact after 7 seconds
    setTimeout(() => {
      setShowFact(false)
    }, 7000)
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
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
                <div style={{ padding: '0 20px 20px 20px', animation: 'fadeIn 0.3s ease' }}>
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

      {/* Fun Fact Toast Popup */}
      <div 
        style={{
          position: 'fixed',
          bottom: showFact ? '30px' : '-100px',
          right: '30px',
          background: 'rgba(20, 20, 20, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border)',
          borderLeft: '4px solid var(--accent-blue)',
          borderRadius: '12px',
          padding: '20px',
          maxWidth: '350px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1000,
          opacity: showFact ? 1 : 0,
        }}
      >
        <button 
          onClick={() => setShowFact(false)}
          style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={16} />
        </button>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <Info color="var(--accent-blue)" size={20} style={{ marginTop: '2px', flexShrink: 0 }} />
          <div>
            <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem', color: 'var(--text-primary)' }}>Tuning Fact</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              {fact}
            </p>
          </div>
        </div>
      </div>
      
    </div>
  )
}
