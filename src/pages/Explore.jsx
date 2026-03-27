import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useFilter } from '../hooks/useFilter';
import VenueCard from '../components/ui/VenueCard';
import FilterPanel from '../components/ui/FilterPanel';
import venuesData from '../data/venues.json';
import './Explore.css';

const SORT_OPTIONS = [
  { value: 'popular', key: 'explore.sort.popular' },
  { value: 'rating', key: 'explore.sort.rating' },
  { value: 'priceLow', key: 'explore.sort.priceLow' },
  { value: 'priceHigh', key: 'explore.sort.priceHigh' },
];

const PAGE_SIZE = 9;

export default function Explore() {
  const { t } = useLang();
  const [searchParams] = useSearchParams();
  const { filters, filtered, updateFilter, clearFilters } = useFilter(venuesData);

  // Sync URL query params → filters on mount
  useEffect(() => {
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    const city = searchParams.get('city');
    if (search) updateFilter('search', search);
    if (type) updateFilter('types', [type]);
    if (city) updateFilter('city', city);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showCount, setShowCount] = [PAGE_SIZE * Math.ceil(filtered.length / PAGE_SIZE) || PAGE_SIZE, () => {}];
  const displayed = filtered.slice(0, PAGE_SIZE);

  return (
    <div className="explore-page">
      <div className="explore-header">
        <div className="container">
          <h1 className="explore-title">{t('explore.title')}</h1>
          <p className="explore-count">
            <strong>{filtered.length}</strong> {t('explore.results')}
          </p>
        </div>
      </div>

      <div className="container explore-layout">
        {/* Sidebar */}
        <aside className="explore-sidebar">
          <FilterPanel filters={filters} updateFilter={updateFilter} clearFilters={clearFilters} />
        </aside>

        {/* Main */}
        <div className="explore-main">
          {/* Sort bar */}
          <div className="explore-sort-bar">
            <span className="sort-label">{t('explore.sortBy')}:</span>
            <div className="sort-options">
              {SORT_OPTIONS.map(({ value, key }) => (
                <button
                  key={value}
                  className={`sort-btn ${filters.sortBy === value ? 'active' : ''}`}
                  onClick={() => updateFilter('sortBy', value)}
                >
                  {t(key)}
                </button>
              ))}
            </div>
            <select
              className="sort-select form-input"
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
            >
              {SORT_OPTIONS.map(({ value, key }) => (
                <option key={value} value={value}>{t(key)}</option>
              ))}
            </select>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>{t('explore.noResults')}</h3>
              <p>{t('explore.noResults.sub')}</p>
              <button className="btn btn-secondary" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="venues-grid">
                {filtered.map((venue, i) => (
                  <div
                    key={venue.id}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${(i % PAGE_SIZE) * 0.05}s` }}
                  >
                    <VenueCard venue={venue} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
