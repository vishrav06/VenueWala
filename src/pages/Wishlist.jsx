import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useWishlist } from '../hooks/useWishlist';
import VenueCard from '../components/ui/VenueCard';
import venuesData from '../data/venues.json';
import './Wishlist.css';

export default function Wishlist() {
  const { t } = useLang();
  const { wishlist, removeFromWishlist } = useWishlist();
  const venues = wishlist.map((id) => venuesData.find((v) => v.id === id)).filter(Boolean);

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <div className="container">
          <h1>{t('wishlist.title')}</h1>
          <p className="wishlist-count">
            {venues.length > 0 ? `${venues.length} saved venue${venues.length !== 1 ? 's' : ''}` : ''}
          </p>
        </div>
      </div>

      <div className="container wishlist-content">
        {venues.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">♡</div>
            <h3>{t('wishlist.empty')}</h3>
            <p>{t('wishlist.empty.sub')}</p>
            <Link to="/explore" className="btn btn-primary">{t('wishlist.explore')}</Link>
          </div>
        ) : (
          <div className="venues-grid">
            {venues.map((venue) => (
              <div key={venue.id} className="wishlist-venue-wrap animate-fadeInUp">
                <VenueCard venue={venue} />
                <button
                  className="btn btn-danger btn-sm wishlist-remove-btn"
                  onClick={() => removeFromWishlist(venue.id)}
                >
                  🗑️ {t('wishlist.remove')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
