import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

export default function Login() {
  const { t } = useLang();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.email.trim()) errs.email = t('booking.required');
    if (!form.password.trim()) errs.password = t('booking.required');
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    // Simulate async login
    setTimeout(() => {
      const name = form.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      login({ name, email: form.email });
      navigate('/profile');
    }, 600);
  };

  const handleGuest = () => {
    login({ name: 'Guest User', email: 'guest@venuewala.com' });
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-card card animate-fadeInUp">
        <div className="auth-icon">🏛️</div>
        <h1>{t('login.title')}</h1>
        <p className="auth-subtitle">{t('login.subtitle')}</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">{t('login.email')}</label>
            <input
              type="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">{t('login.password')}</label>
            <input
              type="password"
              className={`form-input ${errors.password ? 'error' : ''}`}
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <div className="auth-forgot">
            <a href="#">{t('login.forgot')}</a>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? '...' : t('login.submit')}
          </button>
        </form>

        <div className="auth-divider"><span>or</span></div>

        <button className="btn btn-secondary" style={{ width: '100%' }} onClick={handleGuest}>
          👤 {t('login.guest')}
        </button>

        <p className="auth-switch">
          {t('login.noAccount')} <Link to="/register">{t('login.register')}</Link>
        </p>
      </div>
    </div>
  );
}
