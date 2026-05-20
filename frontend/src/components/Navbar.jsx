import { NavLink } from 'react-router-dom'

const OSWALD = "'Oswald', sans-serif"
const INTER  = "'Inter', system-ui, sans-serif"

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#0A192F',
      padding: '0 28px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      height: '56px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
    }}>
      {/* Brand wordmark + logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '24px', flexShrink: 0 }}>
        <img
          src="https://carorbis.com/wp-content/uploads/2022/03/02Carorbis-Blog_Top-Car-Brands-in-India-699x400.jpg"
          alt="Company Logo"
          style={{ height: '40px', width: 'auto', borderRadius: '4px' }}
        />
        <h1 style={{
          margin: 0,
          fontSize: '24px',
          fontFamily: OSWALD,
          fontWeight: '700',
          letterSpacing: '1.5px',
          color: '#fff',
        }}>
          INDIAN CAR GUIDE
        </h1>
      </div>

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
          })}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Navbar
