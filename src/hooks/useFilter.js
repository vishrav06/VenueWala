import { useState, useMemo } from 'react';
import { filterVenues } from '../utils/filterVenues';

const defaultFilters = {
  search: '',
  types: [],
  budgetMin: 0,
  budgetMax: 500000,
  capacityMin: '',
  capacityMax: '',
  amenities: [],
  city: '',
  sortBy: 'popular',
};

export function useFilter(venues) {
  const [filters, setFilters] = useState(defaultFilters);

  const filtered = useMemo(() => filterVenues(venues, filters), [venues, filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters(defaultFilters);

  return { filters, filtered, updateFilter, clearFilters };
}
