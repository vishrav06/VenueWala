import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { formatDate } from '../utils/formatters';
import './BookingConfirmation.css';

export default function BookingConfirmation() {
  const location = useLocation();
  const { t } = useLang();
  const navigate = useNavigate();
  const booking = location.state;

  if (!booking) {
    return (
      <div className="container" style={{ paddingTop: 60 }}>
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h3>No booking found</h3>
          <Link to="/explore" className="btn btn-primary">Explore Venues</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="container confirmation-container">
        <div className="confirmation-card animate-scaleIn card">
          {/* Success animation */}
          <div className="conf-success-ring">
            <div className="conf-checkmark">✓</div>
          </div>

          <h1 className="conf-title">{t('confirmation.title')}</h1>
          <p className="conf-subtitle">{t('confirmation.subtitle')}</p>

          <div className="conf-id-banner">
            <span className="conf-id-label">{t('confirmation.id')}</span>
            <span className="conf-id">{booking.id}</span>
          </div>

          <div className="conf-details">
            <div className="conf-row">
              <span>🏛️ {t('confirmation.venue')}</span>
              <strong>{booking.venueName}</strong>
            </div>
            <div className="conf-row">
              <span>📅 {t('confirmation.date')}</span>
              <strong>{formatDate(booking.date)}</strong>
            </div>
            <div className="conf-row">
              <span>👥 {t('confirmation.guests')}</span>
              <strong>{booking.guests} guests</strong>
            </div>
            <div className="conf-row">
              <span>🎉 Event Type</span>
              <strong style={{ textTransform: 'capitalize' }}>{booking.eventType}</strong>
            </div>
            <div className="conf-row">
              <span>👤 Name</span>
              <strong>{booking.name}</strong>
            </div>
          </div>

          <div className="conf-note">
            <p>📩 {t('confirmation.message')}</p>
          </div>

          <div className="conf-actions">
            <Link to="/profile" className="btn btn-primary">
              {t('confirmation.viewBookings')}
            </Link>
            <button className="btn btn-secondary" onClick={() => window.print()}>
              🖨️ {t('confirmation.print')}
            </button>
            <Link to="/" className="btn btn-ghost">
              {t('confirmation.backHome')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
