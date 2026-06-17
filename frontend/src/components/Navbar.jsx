import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const OSWALD = "'Oswald', sans-serif"
const INTER  = "'Inter', system-ui, sans-serif"

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

  return (
    <nav className="glass" style={{
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: mobile ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: mobile ? 'center' : 'space-between',
      gap: mobile ? '12px' : '0',
      padding: mobile ? '16px' : '0 40px',
      height: mobile ? 'auto' : 'var(--navbar-h)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Brand */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
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

      {/* Links */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: mobile ? '100%' : 'auto',
      }}>
        {[
          { to: '/',           label: 'Home'           },
          { to: '/basics',     label: 'Tuning Basics'  },
          { to: '/platforms',  label: 'Platforms'      },
          { to: '/tuners',     label: 'Tuners & Costs' },
          { to: '/intl',       label: 'Intl vs India'  },
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
              backgroundColor: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            })}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
