export function filterVenues(venues, filters) {
  let result = [...venues];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.location.city.toLowerCase().includes(q) ||
        v.location.area.toLowerCase().includes(q)
    );
  }

  if (filters.city) {
    result = result.filter(
      (v) => v.location.city.toLowerCase() === filters.city.toLowerCase()
    );
  }

  if (filters.types && filters.types.length > 0) {
    result = result.filter((v) => filters.types.includes(v.type));
  }

  result = result.filter(
    (v) =>
      v.price.min <= filters.budgetMax && v.price.max >= filters.budgetMin
  );

  if (filters.capacityMin) {
    result = result.filter((v) => v.capacity.max >= Number(filters.capacityMin));
  }
  if (filters.capacityMax) {
    result = result.filter((v) => v.capacity.min <= Number(filters.capacityMax));
  }

  if (filters.amenities && filters.amenities.length > 0) {
    result = result.filter((v) =>
      filters.amenities.every((a) => v.amenities[a])
    );
  }

  switch (filters.sortBy) {
    case 'priceLow':
      result.sort((a, b) => a.price.min - b.price.min);
      break;
    case 'priceHigh':
      result.sort((a, b) => b.price.min - a.price.min);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'popular':
    default:
      result.sort((a, b) => b.popularity - a.popularity);
  }

  return result;
}
