export function formatINR(amount) {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}K`;
  }
  return `₹${amount}`;
}

export function formatPriceRange(venue) {
  return `${formatINR(venue.price.min)} – ${formatINR(venue.price.max)}`;
}

export function formatDate(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function generateBookingId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'BK-';
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export function typeLabel(type) {
  const map = {
    'wedding-hall': 'Wedding Hall',
    farmhouse: 'Farmhouse',
    guesthouse: 'Guesthouse',
    resort: 'Resort',
    godown: 'Warehouse',
  };
  return map[type] || type;
}
