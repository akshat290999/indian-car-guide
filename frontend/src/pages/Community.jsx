import React from 'react'

export default function Community() {
  const groups = [
    { title: 'Indian Car Tuning', platform: 'Reddit', desc: 'The largest subreddit for Indian car enthusiasts.', link: '#', users: '15k+' },
    { title: 'VAG India', platform: 'WhatsApp', desc: 'Strictly for VW/Skoda owners. Fast-paced technical discussions.', link: '#', users: '500+' },
    { title: 'B58 India Club', platform: 'WhatsApp', desc: 'BMW 6-cylinder owners group. Track days and dyno runs.', link: '#', users: '120+' },
    { title: 'T-Jet Owners', platform: 'Telegram', desc: 'Fiat Abarth and Linea T-Jet specific troubleshooting and mods.', link: '#', users: '800+' },
  ]

  const meetups = [
    { name: 'Sunday Morning Run', city: 'Mumbai', location: 'Bandra Reclamation', date: 'Every Sunday, 7:00 AM' },
    { name: 'Nandi Hills Drive', city: 'Bangalore', location: 'Devanahalli Toll', date: 'First Sunday of Month, 6:00 AM' },
    { name: 'Cars & Coffee NCR', city: 'Delhi', location: 'Cyber Hub, Gurgaon', date: 'Check Instagram for dates' },
  ]

  return (
    <div className="page-container" style={{ paddingBottom: '80px' }}>
      <div className="page-hero">
        <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '16px' }}>COMMUNITY</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-lg)', maxWidth: '600px', margin: '0 auto' }}>
          Find your people. Join the conversation.
        </p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '60px auto', padding: '0 20px' }}>
        
        <section style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <span className="section-label">Groups & Forums</span>
              <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>Join the Chat</h2>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {groups.map((group, i) => (
              <a key={i} href={group.link} className="premium-card" style={{ padding: '24px', textDecoration: 'none', display: 'block' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: 'var(--text-xs)', background: 'var(--surface-hover)', padding: '4px 8px', borderRadius: '4px', color: 'var(--text-muted)' }}>
                    {group.platform}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-red)', fontWeight: '600' }}>
                    {group.users} Members
                  </span>
                </div>
                <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--text-primary)', marginBottom: '8px' }}>{group.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.5 }}>
                  {group.desc}
                </p>
              </a>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '60px' }}>
          <span className="section-label">Events</span>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '24px' }}>Upcoming Meetups</h2>
          
          <div className="premium-card" style={{ overflow: 'hidden' }}>
            <table className="table-styled">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>City</th>
                  <th>Location</th>
                  <th>Time / Date</th>
                </tr>
              </thead>
              <tbody>
                {meetups.map((meetup, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: '500' }}>{meetup.name}</td>
                    <td><span className="chip" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>{meetup.city}</span></td>
                    <td style={{ color: 'var(--text-muted)' }}>{meetup.location}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{meetup.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="premium-card" style={{ padding: '40px', borderLeft: '4px solid var(--accent-red)', background: 'var(--surface-alt)' }}>
          <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--text-primary)', marginBottom: '12px' }}>Code of Conduct</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
            The Indian tuning community is small but passionate. We expect all members to treat each other with respect. Keep discussions technical and objective. Avoid tuner wars, street racing glorification, and unsafe driving practices.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Remember: A fast car doesn't make you a good driver. Take it to the track.
          </p>
        </section>

      </div>
    </div>
  )
}
