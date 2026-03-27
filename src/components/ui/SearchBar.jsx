import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import './SearchBar.css';

export default function SearchBar({ defaultValue = '', large = false }) {
  const [value, setValue] = useState(defaultValue);
  const navigate = useNavigate();
  const { t } = useLang();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      navigate(`/explore?search=${encodeURIComponent(value.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <form className={`search-bar ${large ? 'search-bar-large' : ''}`} onSubmit={handleSubmit}>
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder={t('home.hero.search')}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="search-btn btn btn-primary">
        {t('common.search')}
      </button>
    </form>
  );
}
