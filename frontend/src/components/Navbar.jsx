import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Search, Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from './ThemeProvider'

function useMobile() {
  const [mobile, setMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth <= 768
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setMobile(mq.matches)
    const handler = e => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return mobile
}

function Navbar() {
  const mobile = useMobile()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  // Trigger Cmd+K by simulating keyboard event
  const openCommandPalette = () => {
    const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
    window.dispatchEvent(event);
  }

  return (
    <nav className="glass" style={{
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      padding: mobile ? '16px 20px' : '0 40px',
      minHeight: 'var(--navbar-h)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: mobile ? 'auto' : 'var(--navbar-h)',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 className="text-gradient-accent" style={{
            margin: 0,
            fontSize: mobile ? '20px' : '24px',
            fontFamily: 'var(--font-heading)',
            fontWeight: '800',
            letterSpacing: '1px',
            whiteSpace: 'nowrap',
          }}>
            INDIAN CAR GUIDE
          </h1>
        </div>

        {/* Desktop Links & Actions */}
        {!mobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[
                { to: '/',           label: 'Home'             },
                { to: '/basics',     label: 'Tuning Basics'    },
                { to: '/platforms',  label: 'Platforms'        },
                { to: '/tuners',     label: 'Tuners & Costs'   },
                { to: '/intl',       label: 'Intl vs India'    },
                { to: '/legal',      label: 'Legal Guide'      },
                { to: '/build',      label: '🔧 Plan Your Build' },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: isActive ? 'var(--surface-hover)' : 'transparent',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                  })}
                >
                  {label}
                </NavLink>
              ))}
            </div>

            <div style={{ width: '1px', height: '24px', background: 'var(--border)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={openCommandPalette}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  padding: '6px 12px', borderRadius: '8px', color: 'var(--text-muted)',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <Search size={16} />
                <span style={{ fontSize: '13px', fontFamily: 'var(--font-body)' }}>Search</span>
                <kbd style={{
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  padding: '2px 6px', borderRadius: '4px', fontSize: '11px',
                  fontFamily: 'monospace'
                }}>⌘K</kbd>
              </button>

              <button
                onClick={toggleTheme}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'transparent', border: 'none', color: 'var(--text-primary)',
                  cursor: 'pointer', padding: '8px', borderRadius: '8px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        )}

        {/* Mobile Toggle */}
        {mobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={openCommandPalette}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: '4px' }}
            >
              <Search size={22} />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: '4px' }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Expansion */}
      {mobile && menuOpen && (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '8px',
          paddingTop: '16px', borderTop: '1px solid var(--border)',
          marginTop: '12px'
        }}>
          {[
            { to: '/',           label: 'Home'             },
            { to: '/basics',     label: 'Tuning Basics'    },
            { to: '/platforms',  label: 'Platforms'        },
            { to: '/tuners',     label: 'Tuners & Costs'   },
            { to: '/intl',       label: 'Intl vs India'    },
            { to: '/build',      label: '🔧 Plan Your Build' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                fontWeight: isActive ? '600' : '500',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: isActive ? 'var(--surface-hover)' : 'transparent',
              })}
            >
              {label}
            </NavLink>
          ))}
          
          <div style={{ height: '1px', background: 'var(--border)', margin: '8px 0' }} />
          
          <button
            onClick={() => { toggleTheme(); setMenuOpen(false); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              background: 'transparent', border: 'none', color: 'var(--text-primary)',
              padding: '12px 16px', fontSize: '15px', fontFamily: 'var(--font-body)',
              textAlign: 'left'
            }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
