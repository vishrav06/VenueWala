import { useState } from 'react';
import { useWishlist } from '../../hooks/useWishlist';
import './WishlistButton.css';

export default function WishlistButton({ venueId }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [animating, setAnimating] = useState(false);

  const inWishlist = isInWishlist(venueId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);
    if (inWishlist) {
      removeFromWishlist(venueId);
    } else {
      addToWishlist(venueId);
    }
  };

  return (
    <button
      className={`wishlist-btn-ui ${inWishlist ? 'saved' : ''} ${animating ? 'beat' : ''}`}
      onClick={handleClick}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      title={inWishlist ? 'Saved' : 'Save to wishlist'}
    >
      {inWishlist ? '♥' : '♡'}
    </button>
  );
}
