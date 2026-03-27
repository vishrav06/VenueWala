import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span>🏛️</span>
              <span>VenueWala</span>
            </Link>
            <p className="footer-tagline">
              India's most trusted platform for discovering and booking wedding & event venues.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram" className="social-link">📸</a>
              <a href="#" aria-label="Facebook" className="social-link">📘</a>
              <a href="#" aria-label="Twitter" className="social-link">🐦</a>
              <a href="#" aria-label="YouTube" className="social-link">▶️</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/explore">All Venues</Link></li>
              <li><Link to="/explore?type=wedding-hall">Wedding Halls</Link></li>
              <li><Link to="/explore?type=farmhouse">Farmhouses</Link></li>
              <li><Link to="/explore?type=resort">Resorts</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Cities</h4>
            <ul>
              <li><Link to="/explore?city=Mumbai">Mumbai</Link></li>
              <li><Link to="/explore?city=Delhi">Delhi</Link></li>
              <li><Link to="/explore?city=Bangalore">Bangalore</Link></li>
              <li><Link to="/explore?city=Jaipur">Jaipur</Link></li>
              <li><Link to="/explore?city=Hyderabad">Hyderabad</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/register">List Your Venue</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 VenueWala. Made with ❤️ in India.</p>
          <p className="footer-note">All bookings are simulated — no real transactions occur.</p>
        </div>
      </div>
    </footer>
  );
}
