import { Link, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import SearchBar from '../components/ui/SearchBar';
import VenueCard from '../components/ui/VenueCard';
import venuesData from '../data/venues.json';
import './Home.css';

const TESTIMONIALS = [
  { name: 'Priya & Rahul', event: 'Wedding', rating: 5, text: 'VenueWala helped us find our dream venue in just 2 days. The filters made it so easy to narrow down exactly what we needed!', avatar: 'P' },
  { name: 'Anjali Sharma', event: 'Birthday Party', rating: 5, text: "Booked through VenueWala for my parents' 50th anniversary. The wishlist feature was super helpful when comparing multiple venues.", avatar: 'A' },
  { name: 'Vikram & Sunita', event: 'Reception', rating: 4, text: 'Great platform! Found a beautiful farmhouse for our reception that was completely within our budget. Highly recommend!', avatar: 'V' },
];

const TYPE_CHIPS = [
  { type: 'wedding-hall', label: '🏛️ Wedding Halls' },
  { type: 'farmhouse', label: '🌿 Farmhouses' },
  { type: 'resort', label: '🏖️ Resorts' },
  { type: 'guesthouse', label: '🏡 Guesthouses' },
  { type: 'godown', label: '🏭 Warehouses' },
];

export default function Home() {
  const { t } = useLang();
  const navigate = useNavigate();
  const featured = venuesData.filter((v) => v.featured);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="container hero-content">
          <div className="hero-text animate-fadeInUp">
            <span className="hero-tag">✨ India's #1 Venue Discovery Platform</span>
            <h1 className="hero-title">{t('home.hero.title')}</h1>
            <p className="hero-subtitle">{t('home.hero.subtitle')}</p>
            <div className="hero-search">
              <SearchBar large />
            </div>
            <div className="hero-chips">
              {TYPE_CHIPS.map(({ type, label }) => (
                <button
                  key={type}
                  className="hero-chip"
                  onClick={() => navigate(`/explore?type=${type}`)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">{t('home.stats.venues')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">20+</span>
            <span className="stat-label">{t('home.stats.cities')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">{t('home.stats.events')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4.8 ⭐</span>
            <span className="stat-label">Average Rating</span>
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">{t('home.featured')}</h2>
              <p className="section-subtitle">Hand-picked venues for an unforgettable celebration</p>
            </div>
            <Link to="/explore" className="btn btn-secondary">
              View All →
            </Link>
          </div>
          <div className="venues-grid">
            {featured.map((venue, i) => (
              <div key={venue.id} style={{ animationDelay: `${i * 0.08}s` }}>
                <VenueCard venue={venue} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>{t('home.howItWorks')}</h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>Three simple steps to your perfect venue</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">🔍</div>
              <div className="step-number">01</div>
              <h3>{t('home.step1.title')}</h3>
              <p>{t('home.step1.desc')}</p>
            </div>
            <div className="step-connector">→</div>
            <div className="step-card">
              <div className="step-icon">❤️</div>
              <div className="step-number">02</div>
              <h3>{t('home.step2.title')}</h3>
              <p>{t('home.step2.desc')}</p>
            </div>
            <div className="step-connector">→</div>
            <div className="step-card">
              <div className="step-icon">✅</div>
              <div className="step-number">03</div>
              <h3>{t('home.step3.title')}</h3>
              <p>{t('home.step3.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Happy Couples 💕</h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>Real stories from real celebrations</p>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((item, i) => (
              <div key={i} className="testimonial-card card">
                <div className="testimonial-stars">
                  {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                </div>
                <p className="testimonial-text">"{item.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{item.avatar}</div>
                  <div>
                    <div className="testimonial-name">{item.name}</div>
                    <div className="testimonial-event">{item.event}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-section">
        <div className="container cta-inner">
          <h2>Ready to find your dream venue?</h2>
          <p>Join thousands of couples who found their perfect celebration space on VenueWala</p>
          <div className="cta-buttons">
            <Link to="/explore" className="btn btn-primary btn-lg">Explore Venues</Link>
            <Link to="/wishlist" className="btn btn-secondary btn-lg">My Wishlist</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
