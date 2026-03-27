import { useLang } from '../../context/LanguageContext';
import { formatINR } from '../../utils/formatters';
import './FilterPanel.css';

const VENUE_TYPES = [
  { value: 'wedding-hall', key: 'filter.type.weddingHall' },
  { value: 'farmhouse', key: 'filter.type.farmhouse' },
  { value: 'guesthouse', key: 'filter.type.guesthouse' },
  { value: 'resort', key: 'filter.type.resort' },
  { value: 'godown', key: 'filter.type.godown' },
];

const AMENITIES = [
  { value: 'ac', key: 'filter.ac', icon: '❄️' },
  { value: 'parking', key: 'filter.parking', icon: '🚗' },
  { value: 'catering', key: 'filter.catering', icon: '🍽️' },
  { value: 'wifi', key: 'filter.wifi', icon: '📶' },
  { value: 'decoration', key: 'filter.decoration', icon: '🎊' },
];

const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Jaipur', 'Hyderabad'];

export default function FilterPanel({ filters, updateFilter, clearFilters }) {
  const { t } = useLang();

  const toggleType = (type) => {
    const current = filters.types;
    updateFilter(
      'types',
      current.includes(type) ? current.filter((t) => t !== type) : [...current, type]
    );
  };

  const toggleAmenity = (amenity) => {
    const current = filters.amenities;
    updateFilter(
      'amenities',
      current.includes(amenity) ? current.filter((a) => a !== amenity) : [...current, amenity]
    );
  };

  const hasFilters =
    filters.types.length > 0 ||
    filters.amenities.length > 0 ||
    filters.search ||
    filters.city ||
    filters.budgetMin > 0 ||
    filters.budgetMax < 500000 ||
    filters.capacityMin ||
    filters.capacityMax;

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>{t('filter.title')}</h3>
        {hasFilters && (
          <button className="btn btn-ghost btn-sm clear-btn" onClick={clearFilters}>
            ✕ {t('filter.clear')}
          </button>
        )}
      </div>

      {/* City */}
      <div className="filter-section">
        <label className="filter-label">{t('filter.city')}</label>
        <select
          className="form-input"
          value={filters.city}
          onChange={(e) => updateFilter('city', e.target.value)}
        >
          <option value="">{t('map.allCities')}</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Budget */}
      <div className="filter-section">
        <label className="filter-label">
          {t('filter.budget')}: <strong>{formatINR(filters.budgetMin)} – {formatINR(filters.budgetMax)}</strong>
        </label>
        <div className="range-slider-wrap">
          <input
            type="range"
            className="range-input range-min"
            min={0}
            max={500000}
            step={5000}
            value={filters.budgetMin}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val < filters.budgetMax) updateFilter('budgetMin', val);
            }}
          />
          <input
            type="range"
            className="range-input range-max"
            min={0}
            max={500000}
            step={5000}
            value={filters.budgetMax}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val > filters.budgetMin) updateFilter('budgetMax', val);
            }}
          />
          <div className="range-track">
            <div
              className="range-fill"
              style={{
                left: `${(filters.budgetMin / 500000) * 100}%`,
                right: `${100 - (filters.budgetMax / 500000) * 100}%`,
              }}
            />
          </div>
        </div>
        <div className="range-labels">
          <span>₹0</span>
          <span>₹5L</span>
        </div>
      </div>

      {/* Capacity */}
      <div className="filter-section">
        <label className="filter-label">{t('filter.capacity')}</label>
        <div className="capacity-inputs">
          <input
            type="number"
            className="form-input"
            placeholder={t('filter.capacityMin')}
            value={filters.capacityMin}
            min={0}
            onChange={(e) => updateFilter('capacityMin', e.target.value)}
          />
          <span>–</span>
          <input
            type="number"
            className="form-input"
            placeholder={t('filter.capacityMax')}
            value={filters.capacityMax}
            min={0}
            onChange={(e) => updateFilter('capacityMax', e.target.value)}
          />
        </div>
      </div>

      {/* Venue Type */}
      <div className="filter-section">
        <label className="filter-label">{t('filter.type')}</label>
        <div className="checkbox-group">
          {VENUE_TYPES.map(({ value, key }) => (
            <label key={value} className="checkbox-item">
              <input
                type="checkbox"
                checked={filters.types.includes(value)}
                onChange={() => toggleType(value)}
              />
              <span className="checkbox-label">{t(key)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="filter-section">
        <label className="filter-label">{t('filter.amenities')}</label>
        <div className="checkbox-group">
          {AMENITIES.map(({ value, key, icon }) => (
            <label key={value} className="checkbox-item">
              <input
                type="checkbox"
                checked={filters.amenities.includes(value)}
                onChange={() => toggleAmenity(value)}
              />
              <span className="checkbox-label">{icon} {t(key)}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
