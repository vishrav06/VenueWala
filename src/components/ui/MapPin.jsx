import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPriceRange } from '../../utils/formatters';
import './MapPin.css';

export default function MapPin({ venue, x, y, isHighlighted, onHover }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`map-pin-wrap ${isHighlighted ? 'highlighted' : ''}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => { setOpen(true); onHover?.(venue.id); }}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="map-pin-marker">
        <div className="pin-dot" />
      </div>

      {open && (
        <div className="map-pin-popup animate-fadeIn">
          <img src={venue.images[0]} alt={venue.name} className="popup-img" />
          <div className="popup-body">
            <h4 className="popup-name">{venue.name}</h4>
            <p className="popup-location">📍 {venue.location.area}</p>
            <p className="popup-price">{formatPriceRange(venue)}/day</p>
            <Link
              to={`/venue/${venue.id}`}
              className="btn btn-primary btn-sm popup-btn"
              onClick={(e) => e.stopPropagation()}
            >
              View Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
