import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

function getStrength(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLORS = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'];

export default function Register() {
  const { t } = useLang();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  };

  const strength = getStrength(form.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = t('booking.required');
    if (!form.email.trim()) errs.email = t('booking.required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t('booking.invalidEmail');
    if (!form.password) errs.password = t('booking.required');
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setTimeout(() => {
      login({ name: form.name, email: form.email });
      navigate('/profile');
    }, 600);
  };

  return (
    <div className="auth-page">
      <div className="auth-card card animate-fadeInUp">
        <div className="auth-icon">🎉</div>
        <h1>{t('register.title')}</h1>
        <p className="auth-subtitle">{t('register.subtitle')}</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">{t('register.name')} *</label>
            <input
              type="text"
              className={`form-input ${errors.name ? 'error' : ''}`}
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Priya Sharma"
              autoComplete="name"
            />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">{t('register.email')} *</label>
            <input
              type="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="priya@example.com"
              autoComplete="email"
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">{t('register.password')} *</label>
            <input
              type="password"
              className={`form-input ${errors.password ? 'error' : ''}`}
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              placeholder="Min. 6 characters"
              autoComplete="new-password"
            />
            {errors.password && <p className="form-error">{errors.password}</p>}
            {form.password && (
              <div className="strength-meter">
                <div className="strength-bars">
                  {[1,2,3,4].map((n) => (
                    <div
                      key={n}
                      className="strength-bar"
                      style={{ background: n <= strength ? STRENGTH_COLORS[strength] : 'var(--color-border)' }}
                    />
                  ))}
                </div>
                <span className="strength-label" style={{ color: STRENGTH_COLORS[strength] }}>
                  {STRENGTH_LABELS[strength]}
                </span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">{t('register.confirm')} *</label>
            <input
              type="password"
              className={`form-input ${errors.confirm ? 'error' : ''}`}
              value={form.confirm}
              onChange={(e) => update('confirm', e.target.value)}
              placeholder="Repeat password"
              autoComplete="new-password"
            />
            {errors.confirm && <p className="form-error">{errors.confirm}</p>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? '...' : t('register.submit')}
          </button>
        </form>

        <p className="auth-switch">
          {t('register.hasAccount')} <Link to="/login">{t('register.login')}</Link>
        </p>
      </div>
    </div>
  );
}
