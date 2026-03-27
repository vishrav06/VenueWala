export default function StarRating({ rating, reviewCount, size = 'sm' }) {
  const full = Math.floor(rating);
  const partial = rating % 1;
  const empty = 5 - Math.ceil(rating);

  return (
    <div className={`star-rating star-rating-${size}`}>
      <div className="stars">
        {Array.from({ length: full }).map((_, i) => (
          <span key={`f${i}`} className="star full">★</span>
        ))}
        {partial > 0 && (
          <span className="star partial" style={{ '--fill': `${partial * 100}%` }}>★</span>
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <span key={`e${i}`} className="star empty">★</span>
        ))}
      </div>
      <span className="rating-text">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="review-count">({reviewCount})</span>
      )}
    </div>
  );
}
