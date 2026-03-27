import { useLang } from '../../context/LanguageContext';
import { formatDate } from '../../utils/formatters';
import './BookingModal.css';

export default function BookingModal({ booking, onClose }) {
  const { t } = useLang();

  return (
    <div className="overlay" onClick={onClose}>
      <div className="booking-modal animate-fadeInUp" onClick={(e) => e.stopPropagation()}>
        <div className="modal-success-icon">✅</div>
        <h2>{t('confirmation.title')}</h2>
        <p className="modal-subtitle">{t('confirmation.subtitle')}</p>

        <div className="modal-details">
          <div className="modal-row">
            <span>{t('confirmation.id')}</span>
            <strong className="booking-id">{booking.id}</strong>
          </div>
          <div className="modal-row">
            <span>{t('confirmation.venue')}</span>
            <strong>{booking.venueName}</strong>
          </div>
          <div className="modal-row">
            <span>{t('confirmation.date')}</span>
            <strong>{formatDate(booking.date)}</strong>
          </div>
          <div className="modal-row">
            <span>{t('confirmation.guests')}</span>
            <strong>{booking.guests}</strong>
          </div>
        </div>

        <p className="modal-note">{t('confirmation.message')}</p>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onClose}>
            {t('confirmation.viewBookings')}
          </button>
        </div>
      </div>
    </div>
  );
}
