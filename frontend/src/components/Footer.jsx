import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {/* Brand col */}
        <div>
          <span className="footer-logo">Indian Car Guide</span>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.7, maxWidth: '320px', marginBottom: '20px' }}>
            India's most honest resource for car tuning — covering platforms, stages, costs, and real-world builds from the Indian community.
          </p>
          {/* Social icons */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { label: 'Instagram', href: '#', icon: '📸' },
              { label: 'YouTube', href: '#', icon: '▶️' },
              { label: 'Discord', href: '#', icon: '💬' },
            ].map(s => (
              <a key={s.label} href={s.href} title={s.label} style={{ fontSize: '1.2rem', opacity: 0.5, transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <div className="footer-col-title">Navigate</div>
          {[
            { to: '/',          label: 'Home'            },
            { to: '/platforms', label: 'Platforms'       },
            { to: '/basics',    label: 'Tuning Basics'   },
            { to: '/tuners',    label: 'Tuners & Costs'  },
            { to: '/intl',      label: 'India vs World'  },
            { to: '/build',     label: 'Build Planner'   },
            { to: '/legal',     label: 'Legal Guide'     },
          ].map(link => (
            <Link key={link.to} to={link.to} className="footer-link">{link.label}</Link>
          ))}
        </div>

        {/* Disclaimer */}
        <div>
          <div className="footer-col-title">Important</div>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.35)' }}>
            Tuning may void your manufacturer warranty. Some modifications may not comply with Indian Motor Vehicles Act regulations. This site is for educational purposes only — consult a qualified tuner before modifying your vehicle.
          </p>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.25)', marginTop: '12px' }}>
            All power figures are approximate, based on community data and dyno logs. Results will vary by vehicle condition, fuel quality, and tuner.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} Indian Car Guide. Built for enthusiasts, by enthusiasts.</span>
        <span>Not affiliated with any manufacturer or tuning shop.</span>
      </div>
    </footer>
  )
}
