import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, Info, X, CheckCircle, XCircle } from 'lucide-react'

const TOPICS = [
  {
    id: "software",
    title: "ECU Tuning (Software)",
    emoji: "⚡",
    difficulty: "Beginner",
    color: "#facc15",
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
    emoji: "🌀",
    difficulty: "Intermediate",
    color: "#38bdf8",
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
    emoji: "❄️",
    difficulty: "Beginner",
    color: "#67e8f9",
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
    emoji: "💨",
    difficulty: "Intermediate",
    color: "#a78bfa",
    img: "/images/hardware_intake.jpg",
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
    emoji: "🔩",
    difficulty: "Advanced",
    color: "#f87171",
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
    emoji: "⚙️",
    difficulty: "Advanced",
    color: "#fb923c",
    img: "/images/hardware_piston.jpg",
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
    emoji: "🏎️",
    difficulty: "Intermediate",
    color: "#4ade80",
    img: "/images/hardware_intercooler.jpg",
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
    emoji: "⛽",
    difficulty: "Advanced",
    color: "#e879f9",
    img: "/images/hardware_ecu.jpg",
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

const QUIZ_QUESTIONS = [
  {
    question: "What does ECU stand for?",
    options: ["Engine Control Unit", "Electronic Car Upgrade", "Engine Cooling Unit"],
    correct: 0
  },
  {
    question: "What is the purpose of a wastegate?",
    options: ["Cool the engine", "Regulate boost pressure", "Filter fuel"],
    correct: 1
  },
  {
    question: "What does a 'Decat' downpipe remove?",
    options: ["The turbo", "The catalytic converter", "The air filter"],
    correct: 1
  },
  {
    question: "Why is E85 preferred for high-power builds?",
    options: ["It's cheaper", "Higher octane & cooler burn", "Better fuel economy"],
    correct: 1
  },
  {
    question: "What does an intercooler do?",
    options: ["Increases exhaust flow", "Cools compressed intake air", "Lubricates the turbo"],
    correct: 1
  }
]

const DIFFICULTY_COLORS = {
  Beginner: { bg: 'rgba(74, 222, 128, 0.15)', text: '#4ade80', border: 'rgba(74, 222, 128, 0.3)' },
  Intermediate: { bg: 'rgba(250, 204, 21, 0.15)', text: '#facc15', border: 'rgba(250, 204, 21, 0.3)' },
  Advanced: { bg: 'rgba(248, 113, 113, 0.15)', text: '#f87171', border: 'rgba(248, 113, 113, 0.3)' }
}

export default function TuningBasics() {
  const [openTopic, setOpenTopic] = useState(null)
  const [exploredTopics, setExploredTopics] = useState(new Set())
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)

  // Fun Facts Toast State
  const [fact, setFact] = useState(null)
  const [showFact, setShowFact] = useState(false)

  // Quiz Modal State
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [quizResult, setQuizResult] = useState(null) // 'correct' | 'wrong'
  const openCountRef = useRef(0)
  const usedQuizIndices = useRef(new Set())

  const topicRefs = useRef({})

  // Responsive listener
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fun Facts Toast — preserved exactly
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      displayRandomFact()
    }, 5000)

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

    setTimeout(() => {
      setShowFact(false)
    }, 7000)
  }

  const handleTopicToggle = (topicId) => {
    const willOpen = openTopic !== topicId
    setOpenTopic(willOpen ? topicId : null)

    if (willOpen && !exploredTopics.has(topicId)) {
      setExploredTopics(prev => {
        const next = new Set(prev)
        next.add(topicId)
        return next
      })
      openCountRef.current += 1

      // Trigger quiz every 3rd new topic opened
      if (openCountRef.current > 0 && openCountRef.current % 3 === 0) {
        setTimeout(() => triggerQuiz(), 600)
      }
    }
  }

  const triggerQuiz = () => {
    // Pick a random unused question, or reset if all used
    if (usedQuizIndices.current.size >= QUIZ_QUESTIONS.length) {
      usedQuizIndices.current.clear()
    }
    let idx
    do {
      idx = Math.floor(Math.random() * QUIZ_QUESTIONS.length)
    } while (usedQuizIndices.current.has(idx))
    usedQuizIndices.current.add(idx)

    setCurrentQuiz(QUIZ_QUESTIONS[idx])
    setSelectedAnswer(null)
    setQuizResult(null)
    setShowQuiz(true)
  }

  const handleQuizAnswer = (optionIdx) => {
    if (selectedAnswer !== null) return // prevent double-click
    setSelectedAnswer(optionIdx)
    setQuizResult(optionIdx === currentQuiz.correct ? 'correct' : 'wrong')

    setTimeout(() => {
      setShowQuiz(false)
      setSelectedAnswer(null)
      setQuizResult(null)
      setCurrentQuiz(null)
    }, 2000)
  }

  const scrollToTopic = (topicId) => {
    setOpenTopic(topicId)
    if (!exploredTopics.has(topicId)) {
      setExploredTopics(prev => {
        const next = new Set(prev)
        next.add(topicId)
        return next
      })
      openCountRef.current += 1
      if (openCountRef.current > 0 && openCountRef.current % 3 === 0) {
        setTimeout(() => triggerQuiz(), 600)
      }
    }
    setTimeout(() => {
      topicRefs.current[topicId]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  const progressPercent = (exploredTopics.size / TOPICS.length) * 100

  return (
    <div style={{ padding: '0', maxWidth: '100%', margin: '0 auto', position: 'relative' }}>

      {/* ──────────── HERO BANNER ──────────── */}
      <div style={{
        padding: '60px 40px 50px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(239,68,68,0.08) 0%, rgba(59,130,246,0.06) 50%, transparent 100%)',
        borderBottom: '1px solid var(--border)',
        marginBottom: '0',
      }}>
        <h1
          className="text-gradient"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}
        >
          The Tuning Encyclopedia
        </h1>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          From OBD ports to forged internals — master the science of speed.
        </p>
      </div>

      {/* ──────────── PROGRESS TRACKER ──────────── */}
      <div style={{
        padding: '20px 40px',
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
        }}>
          <span style={{
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            fontFamily: "'Outfit', sans-serif",
          }}>
            {exploredTopics.size} of {TOPICS.length} topics explored
          </span>
          <div style={{
            flex: 1,
            minWidth: '120px',
            height: '8px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '99px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: progressPercent === 100
                ? 'linear-gradient(90deg, #4ade80, #22d3ee)'
                : 'linear-gradient(90deg, var(--accent-red), var(--accent-blue))',
              borderRadius: '99px',
              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }} />
          </div>
          {progressPercent === 100 && (
            <span style={{
              fontSize: '0.85rem',
              color: '#4ade80',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              <CheckCircle size={14} /> All done!
            </span>
          )}
        </div>
      </div>

      {/* ──────────── MAIN LAYOUT (Sidebar + Content) ──────────── */}
      <div style={{
        display: 'flex',
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '30px 20px 60px',
        gap: '30px',
      }}>

        {/* ──── SIDEBAR (Desktop Only) ──── */}
        {isDesktop && (
          <aside style={{
            width: '220px',
            flexShrink: 0,
            position: 'sticky',
            top: '80px',
            alignSelf: 'flex-start',
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto',
          }}>
            <h4 style={{
              fontFamily: "'Outfit', sans-serif",
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '12px',
              padding: '0 12px',
            }}>
              Quick Jump
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {TOPICS.map(topic => {
                const isActive = openTopic === topic.id
                const isExplored = exploredTopics.has(topic.id)
                return (
                  <button
                    key={topic.id}
                    onClick={() => scrollToTopic(topic.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.2s',
                      borderLeft: isActive ? '3px solid var(--accent-red)' : '3px solid transparent',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                  >
                    <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{topic.emoji}</span>
                    <span style={{
                      fontSize: '0.85rem',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                      fontWeight: isActive ? 600 : 400,
                      lineHeight: 1.3,
                    }}>
                      {topic.title}
                    </span>
                    {isExplored && !isActive && (
                      <CheckCircle size={12} color="#4ade80" style={{ marginLeft: 'auto', flexShrink: 0 }} />
                    )}
                  </button>
                )
              })}
            </nav>
          </aside>
        )}

        {/* ──── ACCORDIONS COLUMN ──── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0 }}>
          {TOPICS.map(topic => {
            const isOpen = openTopic === topic.id
            const diffStyle = DIFFICULTY_COLORS[topic.difficulty]

            return (
              <div
                key={topic.id}
                ref={el => (topicRefs.current[topic.id] = el)}
                className="premium-card"
                style={{
                  overflow: 'hidden',
                  borderLeft: `4px solid ${topic.color}`,
                  transition: 'box-shadow 0.3s',
                  boxShadow: isOpen ? `0 0 30px ${topic.color}15` : undefined,
                }}
              >
                {/* Accordion Header */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '18px 20px',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  onClick={() => handleTopicToggle(topic.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                    {/* Emoji Icon */}
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: `${topic.color}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.4rem',
                      flexShrink: 0,
                      border: `1px solid ${topic.color}30`,
                    }}>
                      {topic.emoji}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <h3 style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                        color: 'var(--text-primary)',
                        margin: 0,
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {topic.title}
                      </h3>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                    {/* Difficulty Badge */}
                    <span style={{
                      padding: '4px 10px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderRadius: '99px',
                      background: diffStyle.bg,
                      color: diffStyle.text,
                      border: `1px solid ${diffStyle.border}`,
                      whiteSpace: 'nowrap',
                    }}>
                      {topic.difficulty}
                    </span>
                    {isOpen
                      ? <ChevronUp size={20} color={topic.color} />
                      : <ChevronDown size={20} color={topic.color} />
                    }
                  </div>
                </div>

                {/* Accordion Content */}
                {isOpen && (
                  <div style={{
                    padding: '0 20px 24px 20px',
                    animation: 'fadeIn 0.3s ease',
                  }}>
                    <div style={{
                      height: '1px',
                      background: 'var(--border)',
                      marginBottom: '20px',
                    }} />

                    {/* Content Text */}
                    <p style={{
                      color: 'var(--text-primary)',
                      fontSize: '1.05rem',
                      lineHeight: 1.7,
                      marginBottom: '24px',
                    }}>
                      {topic.content}
                    </p>

                    {/* Subtopics Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '12px',
                    }}>
                      {topic.subtopics.map((sub, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: 'rgba(255,255,255,0.03)',
                            padding: '16px',
                            borderRadius: '10px',
                            borderLeft: `3px solid ${topic.color}`,
                            transition: 'background 0.2s, transform 0.2s',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                            e.currentTarget.style.transform = 'translateY(-1px)'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                            e.currentTarget.style.transform = 'translateY(0)'
                          }}
                        >
                          <h4 style={{
                            color: 'var(--text-primary)',
                            fontSize: '1rem',
                            marginBottom: '6px',
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 600,
                          }}>
                            {sub.name}
                          </h4>
                          <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.9rem',
                            lineHeight: 1.5,
                            margin: 0,
                          }}>
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

      {/* ──────────── FUN FACT TOAST (preserved exactly) ──────────── */}
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

      {/* ──────────── QUIZ MODAL ──────────── */}
      {showQuiz && currentQuiz && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '20px',
            animation: 'fadeIn 0.25s ease',
          }}
          onClick={() => {
            if (selectedAnswer === null) {
              setShowQuiz(false)
              setCurrentQuiz(null)
            }
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--surface, #18181b)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
            }}
          >
            {/* Quiz Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '24px',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(59,130,246,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
              }}>
                🧠
              </div>
              <div>
                <h3 style={{
                  margin: 0,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '1.15rem',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                }}>
                  Quick Quiz!
                </h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Test your knowledge
                </p>
              </div>
            </div>

            {/* Question */}
            <p style={{
              color: 'var(--text-primary)',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              marginBottom: '20px',
              fontWeight: 500,
            }}>
              {currentQuiz.question}
            </p>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentQuiz.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx
                const isCorrectOption = idx === currentQuiz.correct
                let optBg = 'rgba(255,255,255,0.04)'
                let optBorder = 'rgba(255,255,255,0.08)'
                let optColor = 'var(--text-primary)'

                if (selectedAnswer !== null) {
                  if (isCorrectOption) {
                    optBg = 'rgba(74, 222, 128, 0.15)'
                    optBorder = 'rgba(74, 222, 128, 0.5)'
                    optColor = '#4ade80'
                  } else if (isSelected && !isCorrectOption) {
                    optBg = 'rgba(248, 113, 113, 0.15)'
                    optBorder = 'rgba(248, 113, 113, 0.5)'
                    optColor = '#f87171'
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(idx)}
                    disabled={selectedAnswer !== null}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 16px',
                      background: optBg,
                      border: `1px solid ${optBorder}`,
                      borderRadius: '10px',
                      cursor: selectedAnswer !== null ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      color: optColor,
                      fontSize: '1rem',
                      fontWeight: isSelected ? 600 : 400,
                    }}
                    onMouseEnter={e => {
                      if (selectedAnswer === null) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (selectedAnswer === null) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                      }
                    }}
                  >
                    <span style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: selectedAnswer !== null && isCorrectOption
                        ? 'rgba(74,222,128,0.2)'
                        : selectedAnswer !== null && isSelected && !isCorrectOption
                          ? 'rgba(248,113,113,0.2)'
                          : 'rgba(255,255,255,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}>
                      {selectedAnswer !== null && isCorrectOption
                        ? <CheckCircle size={16} color="#4ade80" />
                        : selectedAnswer !== null && isSelected && !isCorrectOption
                          ? <XCircle size={16} color="#f87171" />
                          : String.fromCharCode(65 + idx)
                      }
                    </span>
                    {opt}
                  </button>
                )
              })}
            </div>

            {/* Result Feedback */}
            {quizResult && (
              <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                borderRadius: '10px',
                background: quizResult === 'correct' ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)',
                border: `1px solid ${quizResult === 'correct' ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                animation: 'fadeIn 0.3s ease',
              }}>
                {quizResult === 'correct'
                  ? <CheckCircle size={18} color="#4ade80" />
                  : <XCircle size={18} color="#f87171" />
                }
                <span style={{
                  color: quizResult === 'correct' ? '#4ade80' : '#f87171',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}>
                  {quizResult === 'correct' ? 'Correct! Nice one 🎉' : 'Not quite — check the highlighted answer.'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
