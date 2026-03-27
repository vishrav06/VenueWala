import { useLang } from '../context/LanguageContext';
import './About.css';

const VALUES = [
  { icon: '🤝', title: 'Trust', desc: 'Every venue is verified by our team. What you see is what you get.' },
  { icon: '💡', title: 'Transparency', desc: 'No hidden fees, no surprises. Clear pricing from the start.' },
  { icon: '❤️', title: 'Passion', desc: 'We understand how special your celebration is. We treat it that way.' },
  { icon: '🚀', title: 'Innovation', desc: 'We build tools that make venue discovery effortless and delightful.' },
];

export default function About() {
  const { t } = useLang();
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <span className="hero-tag">Our Story</span>
          <h1>{t('about.title')}</h1>
          <p>We started VenueWala because finding the perfect wedding venue in India was frustratingly hard. We built the platform we wished existed.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container about-mission-grid">
          <div>
            <h2 className="section-title">{t('about.mission')}</h2>
            <p className="about-text">
              Our mission is to make every Indian celebration legendary by connecting couples with venues that match their vision, budget, and heart. We believe that finding a venue should be as joyful as the celebration itself.
            </p>
            <p className="about-text" style={{ marginTop: 16 }}>
              Founded in 2024, VenueWala has helped thousands of families across 20+ cities in India plan unforgettable weddings, receptions, birthday parties, and corporate events. Our platform lists 500+ handpicked venues, from grand palace banquet halls to intimate garden farmhouses.
            </p>
          </div>
          <div className="about-stats-grid">
            <div className="about-stat">
              <span className="about-stat-number">500+</span>
              <span className="about-stat-label">Venues</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">20+</span>
              <span className="about-stat-label">Cities</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">10K+</span>
              <span className="about-stat-label">Events</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">4.8★</span>
              <span className="about-stat-label">Avg Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section about-values-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Our Values</h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>What drives everything we build</p>
          <div className="values-grid">
            {VALUES.map(({ icon, title, desc }) => (
              <div key={title} className="value-card card">
                <div className="value-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>{t('about.team')}</h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>The person behind VenueWala</p>
          <div className="founder-card card">
            <div className="founder-photo-wrap">
              <img src="/vishrav.png" alt="Vishrav Asthana" className="founder-photo" />
            </div>
            <div className="founder-info">
              <h3 className="founder-name">Vishrav Asthana</h3>
              <p className="founder-role">Founder & CEO</p>
              <p className="founder-bio">I like exploring how ideas turn into real systems, and I'm always experimenting, learning, and improving along the way. From working with circuits to developing full-stack applications, I enjoy the process as much as the outcome. Outside of that, I'm constantly looking for ways to grow, take on new challenges, and create something meaningful.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
