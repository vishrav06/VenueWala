import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

export default function NotFound() {
  const { t } = useLang();
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', flexDirection: 'column', gap: 16, textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: '6rem', opacity: 0.3 }}>🏛️</div>
      <h1 style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--color-border)' }}>404</h1>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 600 }}>{t('notFound.title')}</h2>
      <p style={{ color: 'var(--color-text-muted)', maxWidth: 360 }}>{t('notFound.sub')}</p>
      <Link to="/" className="btn btn-primary">{t('notFound.back')}</Link>
    </div>
  );
}
