import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import './Contact.css';

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = t('booking.required');
    if (!form.email.trim()) errs.email = t('booking.required');
    if (!form.message.trim()) errs.message = t('booking.required');
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSent(true);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>{t('contact.title')}</h1>
          <p>We'd love to hear from you. Send us a message and we'll get back to you soon!</p>
        </div>
      </div>

      <div className="container contact-layout">
        {/* Form */}
        <div className="contact-form-wrap card">
          {sent ? (
            <div className="contact-success">
              <div style={{ fontSize: '3rem' }}>✅</div>
              <h3>{t('contact.success')}</h3>
              <button className="btn btn-secondary" onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label">{t('contact.name')} *</label>
                <input type="text" className={`form-input ${errors.name ? 'error' : ''}`} value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">{t('contact.email')} *</label>
                <input type="email" className={`form-input ${errors.email ? 'error' : ''}`} value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">{t('contact.message')} *</label>
                <textarea className={`form-input ${errors.message ? 'error' : ''}`} rows={6} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="How can we help you?" style={{ resize: 'vertical' }} />
                {errors.message && <p className="form-error">{errors.message}</p>}
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                {t('contact.submit')}
              </button>
            </form>
          )}
        </div>

        {/* Info */}
        <div className="contact-info">
          <div className="contact-info-item card">
            <span className="contact-info-icon">📍</span>
            <div>
              <h4>Address</h4>
              <p>102, Startup Hub, BKC, Mumbai 400051</p>
            </div>
          </div>
          <div className="contact-info-item card">
            <span className="contact-info-icon">📞</span>
            <div>
              <h4>Phone</h4>
              <p>+91 98765 43210</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Mon–Sat 9AM–6PM IST</p>
            </div>
          </div>
          <div className="contact-info-item card">
            <span className="contact-info-icon">✉️</span>
            <div>
              <h4>Email</h4>
              <p>hello@venuewala.com</p>
              <p>support@venuewala.com</p>
            </div>
          </div>
          <div className="contact-info-item card">
            <span className="contact-info-icon">🕐</span>
            <div>
              <h4>Response Time</h4>
              <p>We usually respond within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
