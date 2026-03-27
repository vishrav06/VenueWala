import { useParams, Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import ImageCarousel from '../components/ui/ImageCarousel';
import StarRating from '../components/ui/StarRating';
import WishlistButton from '../components/ui/WishlistButton';
import AvailabilityCalendar from '../components/ui/AvailabilityCalendar';
import VenueCard from '../components/ui/VenueCard';
import venuesData from '../data/venues.json';
import { formatPriceRange, typeLabel } from '../utils/formatters';
import './VenueDetails.css';

const AMENITY_MAP = [
  { key: 'ac', icon: '❄️', label: 'venue.ac' },
  { key: 'parking', icon: '🚗', label: 'venue.parking' },
  { key: 'catering', icon: '🍽️', label: 'venue.catering' },
  { key: 'wifi', icon: '📶', label: 'venue.wifi' },
  { key: 'decoration', icon: '🎊', label: 'venue.decoration' },
  { key: 'audioVisual', icon: '🎵', label: 'venue.av' },
  { key: 'bridalSuite', icon: '👰', label: 'venue.bridal' },
];

export default function VenueDetails() {
  const { id } = useParams();
  const { t } = useLang();
  const venue = venuesData.find((v) => v.id === id);

  if (!venue) {
    return (
      <div className="container" style={{ paddingTop: 60 }}>
        <div className="empty-state">
          <div className="empty-state-icon">😕</div>
          <h3>Venue not found</h3>
          <Link to="/explore" className="btn btn-primary">Explore Venues</Link>
        </div>
      </div>
    );
  }

  const similar = venuesData.filter((v) => v.id !== id && (v.type === venue.type || v.location.city === venue.location.city)).slice(0, 3);

  return (
    <div className="venue-details">
      <div className="container">
        <div className="vd-breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/explore">Explore</Link>
          <span>›</span>
          <span>{venue.name}</span>
        </div>

        <div className="vd-layout">
          {/* Left: main content */}
          <div className="vd-main">
            {/* Carousel */}
            <ImageCarousel images={venue.images} alt={venue.name} />

            {/* Header */}
            <div className="vd-header">
              <div className="vd-header-left">
                <div className="vd-badges">
                  <span className="badge badge-type">{typeLabel(venue.type)}</span>
                  {venue.tags.includes('trending') && <span className="badge badge-trending">🔥 Trending</span>}
                </div>
                <h1 className="vd-name">{venue.name}</h1>
                <p className="vd-location">📍 {venue.location.address}</p>
                <div className="vd-rating-row">
                  <StarRating rating={venue.rating} reviewCount={venue.reviewCount} size="md" />
                  <span className="vd-popularity">🔥 {venue.popularity}% popularity</span>
                </div>
              </div>
              <WishlistButton venueId={venue.id} />
            </div>

            {/* Info grid */}
            <div className="vd-info-grid">
              <div className="vd-info-card">
                <span className="info-icon">💰</span>
                <div>
                  <div className="info-value">{formatPriceRange(venue)}</div>
                  <div className="info-label">{t('venue.price')} / {t('venue.perDay')}</div>
                </div>
              </div>
              <div className="vd-info-card">
                <span className="info-icon">👥</span>
                <div>
                  <div className="info-value">{venue.capacity.min} – {venue.capacity.max}</div>
                  <div className="info-label">{t('venue.capacity')} ({t('venue.guests')})</div>
                </div>
              </div>
              <div className="vd-info-card">
                <span className="info-icon">📍</span>
                <div>
                  <div className="info-value">{venue.location.city}</div>
                  <div className="info-label">{t('venue.location')}</div>
                </div>
              </div>
              <div className="vd-info-card">
                <span className="info-icon">🏛️</span>
                <div>
                  <div className="info-value">{typeLabel(venue.type)}</div>
                  <div className="info-label">{t('venue.type')}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <section className="vd-section">
              <h2>{t('venue.description')}</h2>
              <p className="vd-desc">{venue.description}</p>
            </section>

            {/* Amenities */}
            <section className="vd-section">
              <h2>{t('venue.amenities')}</h2>
              <div className="vd-amenities">
                {AMENITY_MAP.map(({ key, icon, label }) => (
                  <div key={key} className={`amenity-card ${venue.amenities[key] ? 'has' : 'no'}`}>
                    <span className="amenity-icon">{icon}</span>
                    <span className="amenity-name">{t(label)}</span>
                    <span className="amenity-status">{venue.amenities[key] ? '✓' : '✗'}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Availability */}
            <section className="vd-section">
              <h2>{t('venue.availability')}</h2>
              <AvailabilityCalendar
                bookedDates={venue.availability.bookedDates}
                blackoutDates={venue.availability.blackoutDates}
              />
            </section>

            {/* Contact */}
            <section className="vd-section">
              <h2>{t('venue.contact')}</h2>
              <div className="vd-contact">
                <a href={`tel:${venue.contact.phone}`} className="contact-item">
                  <span>📞</span> {venue.contact.phone}
                </a>
                <a href={`mailto:${venue.contact.email}`} className="contact-item">
                  <span>✉️</span> {venue.contact.email}
                </a>
              </div>
            </section>
          </div>

          {/* Sticky sidebar */}
          <aside className="vd-sidebar">
            <div className="vd-booking-card card">
              <div className="booking-price">{formatPriceRange(venue)}</div>
              <div className="booking-price-label">/{t('venue.perDay')}</div>
              <div className="booking-meta">
                <div>👥 {venue.capacity.min}–{venue.capacity.max} {t('venue.guests')}</div>
                <div>📍 {venue.location.city}</div>
              </div>
              <Link to={`/booking/${venue.id}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
                {t('venue.bookNow')}
              </Link>
              <div className="booking-note">Free cancellation · No booking fees</div>
            </div>
          </aside>
        </div>

        {/* Similar venues */}
        {similar.length > 0 && (
          <section className="section vd-similar">
            <h2 className="section-title">{t('venue.similar')}</h2>
            <div className="venues-grid">
              {similar.map((v) => <VenueCard key={v.id} venue={v} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
