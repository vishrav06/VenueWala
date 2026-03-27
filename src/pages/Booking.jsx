import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import BookingModal from '../components/ui/BookingModal';
import venuesData from '../data/venues.json';
import { formatPriceRange, generateBookingId } from '../utils/formatters';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './Booking.css';

const EVENT_TYPES = [
  { value: 'wedding', key: 'booking.eventType.wedding' },
  { value: 'reception', key: 'booking.eventType.reception' },
  { value: 'sangeet', key: 'booking.eventType.sangeet' },
  { value: 'corporate', key: 'booking.eventType.corporate' },
  { value: 'birthday', key: 'booking.eventType.birthday' },
];

const today = new Date().toISOString().split('T')[0];

export default function Booking() {
  const { id } = useParams();
  const { t } = useLang();
  const navigate = useNavigate();
  const venue = venuesData.find((v) => v.id === id);
  const [bookings, setBookings] = useLocalStorage('venue-bookings', []);
  const [showModal, setShowModal] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', guests: '', eventType: 'wedding', requests: '',
  });
  const [errors, setErrors] = useState({});

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

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t('booking.required');
    if (!form.email.trim()) e.email = t('booking.required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t('booking.invalidEmail');
    if (!form.phone.trim()) e.phone = t('booking.required');
    else if (!/^[+\d\s\-()]{7,15}$/.test(form.phone)) e.phone = t('booking.invalidPhone');
    if (!form.date) e.date = t('booking.required');
    if (!form.guests) e.guests = t('booking.required');
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const booking = {
      id: generateBookingId(),
      venueId: venue.id,
      venueName: venue.name,
      venueImage: venue.images[0],
      date: form.date,
      guests: Number(form.guests),
      eventType: form.eventType,
      name: form.name,
      email: form.email,
      phone: form.phone,
      requests: form.requests,
      timestamp: Date.now(),
      status: 'confirmed',
    };
    setBookings((prev) => [...prev, booking]);
    setConfirmedBooking(booking);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/confirmation', { state: confirmedBooking });
  };

  return (
    <div className="booking-page">
      {showModal && confirmedBooking && (
        <BookingModal booking={confirmedBooking} onClose={handleModalClose} />
      )}

      <div className="container booking-container">
        {/* Left: form */}
        <div className="booking-form-wrap">
          <div className="booking-form-header">
            <Link to={`/venue/${venue.id}`} className="back-link">← Back to venue</Link>
            <h1>{t('booking.title')}</h1>
            <p className="booking-venue-name">{venue.name} · {venue.location.city}</p>
          </div>

          <form className="booking-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t('booking.name')} *</label>
                <input
                  type="text"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Rahul Sharma"
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">{t('booking.email')} *</label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="rahul@example.com"
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t('booking.phone')} *</label>
                <input
                  type="tel"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">{t('booking.eventType')}</label>
                <select
                  className="form-input"
                  value={form.eventType}
                  onChange={(e) => update('eventType', e.target.value)}
                >
                  {EVENT_TYPES.map(({ value, key }) => (
                    <option key={value} value={value}>{t(key)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t('booking.date')} *</label>
                <input
                  type="date"
                  className={`form-input ${errors.date ? 'error' : ''}`}
                  value={form.date}
                  min={today}
                  onChange={(e) => update('date', e.target.value)}
                />
                {errors.date && <p className="form-error">{errors.date}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">{t('booking.guests')} *</label>
                <input
                  type="number"
                  className={`form-input ${errors.guests ? 'error' : ''}`}
                  value={form.guests}
                  min={venue.capacity.min}
                  max={venue.capacity.max}
                  onChange={(e) => update('guests', e.target.value)}
                  placeholder={`${venue.capacity.min}–${venue.capacity.max}`}
                />
                {errors.guests && <p className="form-error">{errors.guests}</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t('booking.requests')}</label>
              <textarea
                className="form-input"
                rows={4}
                value={form.requests}
                onChange={(e) => update('requests', e.target.value)}
                placeholder={t('booking.requests.placeholder')}
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              {t('booking.submit')}
            </button>
          </form>
        </div>

        {/* Right: summary */}
        <aside className="booking-summary-card card">
          <h3>{t('booking.summary')}</h3>
          <img src={venue.images[0]} alt={venue.name} className="summary-img" />
          <h4 className="summary-name">{venue.name}</h4>
          <p className="summary-location">📍 {venue.location.area}, {venue.location.city}</p>
          <div className="summary-meta">
            <div className="summary-row">
              <span>💰 Price</span>
              <strong>{formatPriceRange(venue)}/day</strong>
            </div>
            <div className="summary-row">
              <span>👥 Capacity</span>
              <strong>{venue.capacity.min}–{venue.capacity.max} guests</strong>
            </div>
          </div>
          <div className="summary-amenities">
            {venue.amenities.ac && <span className="amenity-chip">❄️ AC</span>}
            {venue.amenities.parking && <span className="amenity-chip">🚗 Parking</span>}
            {venue.amenities.catering && <span className="amenity-chip">🍽️ Catering</span>}
          </div>
        </aside>
      </div>
    </div>
  );
}
