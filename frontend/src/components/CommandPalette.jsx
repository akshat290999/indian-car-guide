import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Moon, Sun, Monitor, FileText, Settings, Wrench, ChevronRight } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { PLATFORMS_DATA } from '../tuningData'

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Build searchable items
  const items = [
    { id: 'h', name: 'Home', icon: <Monitor size={16} />, action: () => navigate('/') },
    { id: 'b', name: 'Tuning Basics', icon: <FileText size={16} />, action: () => navigate('/basics') },
    { id: 'l', name: 'Legal Guide', icon: <FileText size={16} />, action: () => navigate('/legal') },
    { id: 'p', name: 'Plan Your Build', icon: <Wrench size={16} />, action: () => navigate('/build') },
    { id: 't', name: `Toggle ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />, action: () => { toggleTheme(); setIsOpen(false) } },
    ...Object.values(PLATFORMS_DATA).map(car => ({
      id: `car-${car.id}`,
      name: `View ${car.name}`,
      icon: <ChevronRight size={16} />,
      action: () => navigate(`/platform/${car.id}`)
    }))
  ]

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleExecute = () => {
    if (filteredItems.length > 0) {
      filteredItems[selectedIndex].action()
      setIsOpen(false)
    }
  }

  const handleModalKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev + 1) % filteredItems.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      handleExecute()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          paddingTop: '15vh',
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              width: '100%', maxWidth: '600px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative',
              zIndex: 1
            }}
            onKeyDown={handleModalKeyDown}
          >
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <Search size={20} color="var(--text-muted)" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search pages, platforms, or actions..."
                style={{
                  width: '100%', background: 'transparent', border: 'none', color: 'var(--text-primary)',
                  fontSize: '1.1rem', outline: 'none', marginLeft: '12px', fontFamily: 'var(--font-body)'
                }}
              />
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: '4px' }}>ESC</div>
            </div>

            <div style={{ maxHeight: '350px', overflowY: 'auto', padding: '8px' }}>
              {filteredItems.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>No results found.</div>
              ) : (
                filteredItems.map((item, index) => {
                  const isActive = index === selectedIndex
                  return (
                    <div
                      key={item.id}
                      onClick={() => { item.action(); setIsOpen(false); }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px 16px', borderRadius: '8px', cursor: 'pointer',
                        background: isActive ? 'var(--accent-blue)' : 'transparent',
                        color: isActive ? '#fff' : 'var(--text-primary)',
                      }}
                    >
                      <div style={{ color: isActive ? '#fff' : 'var(--text-muted)' }}>{item.icon}</div>
                      <span style={{ fontSize: '0.95rem' }}>{item.name}</span>
                    </div>
                  )
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
