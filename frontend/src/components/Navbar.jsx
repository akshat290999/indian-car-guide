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
    <nav style={{
      backgroundColor: '#0A192F',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: mobile ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: mobile ? 'center' : 'flex-start',
      gap: mobile ? '8px' : '4px',
      padding: mobile ? '12px 16px' : '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
    }}>

      {/* Brand */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginRight: mobile ? 0 : '24px',
        flexShrink: mobile ? 1 : 0,
        justifyContent: 'center',
      }}>
        <img
          src="https://carorbis.com/wp-content/uploads/2022/03/02Carorbis-Blog_Top-Car-Brands-in-India-699x400.jpg"
          alt="Company Logo"
          style={{ height: '40px', width: 'auto', borderRadius: '4px', flexShrink: 0 }}
        />
        <h1 style={{
          margin: 0,
          fontSize: mobile ? '20px' : '24px',
          fontFamily: OSWALD,
          fontWeight: '700',
          letterSpacing: '1.5px',
          color: '#fff',
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
        gap: '4px',
        width: mobile ? '100%' : 'auto',
      }}>
        {[
          { to: '/',           label: 'HOME'           },
          { to: '/search',     label: 'BROWSE'         },
          { to: '/calculator', label: 'COST CALCULATOR' },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              textDecoration: 'none',
              fontFamily: INTER,
              fontSize: '13px',
              fontWeight: isActive ? '700' : '500',
              color: isActive ? '#E03A3E' : '#7EB3D8',
              padding: '6px 14px',
              borderRadius: '6px',
              backgroundColor: isActive ? 'rgba(224,58,62,0.10)' : 'transparent',
              transition: 'all 0.15s ease',
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
