import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import WishlistButton from './WishlistButton';
import { formatPriceRange, typeLabel } from '../../utils/formatters';
import { useLang } from '../../context/LanguageContext';
import './VenueCard.css';

export default function VenueCard({ venue }) {
  const { t } = useLang();

  return (
    <Link to={`/venue/${venue.id}`} className="venue-card card animate-fadeInUp">
      <div className="venue-card-img-wrap">
        <img
          src={venue.images[0]}
          alt={venue.name}
          className="venue-card-img"
          loading="lazy"
        />
        <div className="venue-card-badges">
          <span className="badge badge-type">{typeLabel(venue.type)}</span>
          {venue.tags.includes('trending') && (
            <span className="badge badge-trending">🔥 {t('common.trending')}</span>
          )}
        </div>
        <div className="venue-card-wishlist">
          <WishlistButton venueId={venue.id} />
        </div>
      </div>

      <div className="venue-card-body">
        <div className="venue-card-top">
          <h3 className="venue-card-name">{venue.name}</h3>
          <StarRating rating={venue.rating} reviewCount={venue.reviewCount} />
        </div>

        <p className="venue-card-location">
          📍 {venue.location.area}, {venue.location.city}
        </p>

        <div className="venue-card-meta">
          <div className="meta-item">
            <span className="meta-icon">💰</span>
            <span className="meta-value">{formatPriceRange(venue)}</span>
            <span className="meta-label">/{t('venue.perDay')}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">👥</span>
            <span className="meta-value">{venue.capacity.min}–{venue.capacity.max}</span>
            <span className="meta-label"> {t('venue.guests')}</span>
          </div>
        </div>

        <div className="venue-card-amenities">
          {venue.amenities.ac && <span className="amenity-chip">❄️ AC</span>}
          {venue.amenities.parking && <span className="amenity-chip">🚗 {t('filter.parking')}</span>}
          {venue.amenities.catering && <span className="amenity-chip">🍽️ {t('filter.catering')}</span>}
          {venue.amenities.wifi && <span className="amenity-chip">📶 WiFi</span>}
        </div>
      </div>
    </Link>
  );
}
