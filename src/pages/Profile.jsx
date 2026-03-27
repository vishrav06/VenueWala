import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { formatDate } from '../utils/formatters';
import './Profile.css';

export default function Profile() {
  const { t } = useLang();
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings] = useLocalStorage('venue-bookings', []);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = () => {
    if (editName.trim()) {
      login({ ...user, name: editName.trim() });
    }
    setEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="container profile-container">
        {/* Profile card */}
        <div className="profile-card card">
          <div className="profile-avatar">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          {editing ? (
            <div className="profile-edit-row">
              <input
                className="form-input"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={{ textAlign: 'center', fontWeight: 600 }}
              />
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
                <button className="btn btn-primary btn-sm" onClick={handleSave}>{t('profile.save')}</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>{t('common.cancel')}</button>
              </div>
            </div>
          ) : (
            <h2 className="profile-name">{user?.name}</h2>
          )}
          <p className="profile-email">{user?.email}</p>
          <div className="profile-actions">
            {!editing && (
              <button className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}>
                ✏️ {t('profile.edit')}
              </button>
            )}
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              🚪 {t('profile.logout')}
            </button>
          </div>
        </div>

        {/* Bookings */}
        <div className="profile-bookings">
          <h2 className="section-title">{t('profile.bookings')}</h2>

          {bookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <h3>{t('profile.noBookings')}</h3>
              <p>{t('profile.noBookings.sub')}</p>
            </div>
          ) : (
            <div className="bookings-list">
              {[...bookings].reverse().map((b) => (
                <div key={b.id} className="booking-item card">
                  <div className="booking-item-left">
                    {b.venueImage && (
                      <img src={b.venueImage} alt={b.venueName} className="booking-item-img" />
                    )}
                    <div className="booking-item-info">
                      <h4 className="booking-item-name">{b.venueName}</h4>
                      <p className="booking-item-meta">
                        📅 {formatDate(b.date)} · 👥 {b.guests} guests · 🎉 <span style={{ textTransform: 'capitalize' }}>{b.eventType}</span>
                      </p>
                      <p className="booking-item-meta">👤 {b.name}</p>
                    </div>
                  </div>
                  <div className="booking-item-right">
                    <span className="booking-status">{t('profile.status.confirmed')}</span>
                    <span className="booking-id-small">{b.id}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
