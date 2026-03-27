import { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useLocalStorage('venue-wishlist', []);

  const addToWishlist = (id) => {
    setWishlist((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((v) => v !== id));
  };

  const isInWishlist = (id) => wishlist.includes(id);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
