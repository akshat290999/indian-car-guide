import { NavLink } from 'react-router-dom'

const OSWALD = "'Oswald', sans-serif"
const INTER  = "'Inter', system-ui, sans-serif"

function Navbar() {
  return (
    <nav className="navbar">
      {/* Brand wordmark + logo */}
      <div className="navbar-brand">
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

      <div className="navbar-links">
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
      </div>
    </nav>
  )
}

export default Navbar
