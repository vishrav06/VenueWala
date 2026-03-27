import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useLang } from '../../context/LanguageContext';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-icon">🏛️</span>
          <span className="logo-text">VenueWala</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/explore" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            {t('nav.explore')}
          </NavLink>
        </nav>

        {/* Right side actions */}
        <div className="navbar-actions">
          {/* Language Toggle */}
          <button className="icon-btn lang-btn" onClick={toggleLang} title="Toggle language">
            <span>{lang === 'en' ? '🇮🇳 हि' : '🇬🇧 EN'}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button className="icon-btn" onClick={toggleTheme} title="Toggle theme" aria-label="Toggle dark mode">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="icon-btn wishlist-btn" title={t('nav.wishlist')}>
            <span>♡</span>
            {wishlist.length > 0 && (
              <span className="wishlist-badge">{wishlist.length}</span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="user-avatar" title={t('nav.profile')}>
                {user.name?.[0]?.toUpperCase() || 'U'}
              </Link>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              {t('nav.login')}
            </Link>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu animate-fadeInUp">
          <NavLink to="/" end onClick={() => setMenuOpen(false)} className="mobile-link">{t('nav.home')}</NavLink>
          <NavLink to="/explore" onClick={() => setMenuOpen(false)} className="mobile-link">{t('nav.explore')}</NavLink>
          <NavLink to="/wishlist" onClick={() => setMenuOpen(false)} className="mobile-link">
            {t('nav.wishlist')} {wishlist.length > 0 && `(${wishlist.length})`}
          </NavLink>
          <div className="mobile-divider" />
          {user ? (
            <>
              <NavLink to="/profile" onClick={() => setMenuOpen(false)} className="mobile-link">{t('nav.profile')}</NavLink>
              <button onClick={handleLogout} className="mobile-link mobile-logout">{t('nav.logout')}</button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setMenuOpen(false)} className="mobile-link">{t('nav.login')}</NavLink>
              <NavLink to="/register" onClick={() => setMenuOpen(false)} className="mobile-link">{t('nav.register')}</NavLink>
            </>
          )}
          <div className="mobile-toggles">
            <button onClick={toggleLang} className="mobile-toggle-btn">
              {lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
            </button>
            <button onClick={toggleTheme} className="mobile-toggle-btn">
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
