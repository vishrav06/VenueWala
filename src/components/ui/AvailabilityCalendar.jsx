import { useState } from 'react';
import { useLang } from '../../context/LanguageContext';
import './AvailabilityCalendar.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function toISO(year, month, day) {
  return `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}

export default function AvailabilityCalendar({ bookedDates = [], blackoutDates = [] }) {
  const { t } = useLang();
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getStatus = (day) => {
    if (!day) return 'empty';
    const iso = toISO(year, month, day);
    const todayISO = toISO(today.getFullYear(), today.getMonth(), today.getDate());
    if (iso < todayISO) return 'past';
    if (blackoutDates.includes(iso)) return 'blackout';
    if (bookedDates.includes(iso)) return 'booked';
    return 'available';
  };

  const handleSelect = (day) => {
    if (!day) return;
    const status = getStatus(day);
    if (status === 'available') {
      const iso = toISO(year, month, day);
      setSelected(iso === selected ? null : iso);
    }
  };

  return (
    <div className="availability-calendar">
      <div className="cal-header">
        <button className="cal-nav" onClick={prevMonth} aria-label="Previous month">‹</button>
        <h4 className="cal-title">{MONTHS[month]} {year}</h4>
        <button className="cal-nav" onClick={nextMonth} aria-label="Next month">›</button>
      </div>

      <div className="cal-grid">
        {DAYS.map((d) => (
          <div key={d} className="cal-day-name">{d}</div>
        ))}
        {cells.map((day, i) => {
          const status = getStatus(day);
          const iso = day ? toISO(year, month, day) : null;
          const isToday = iso === toISO(today.getFullYear(), today.getMonth(), today.getDate());
          const isSelected = iso === selected;
          return (
            <div
              key={i}
              className={`cal-cell cal-${status} ${isToday ? 'cal-today' : ''} ${isSelected ? 'cal-selected' : ''}`}
              onClick={() => handleSelect(day)}
              title={
                status === 'booked' ? t('venue.booked') :
                status === 'available' ? t('venue.available') : ''
              }
            >
              {day || ''}
              {isToday && <span className="cal-today-dot" />}
            </div>
          );
        })}
      </div>

      <div className="cal-legend">
        <span className="legend-item"><span className="legend-dot dot-available" /> {t('venue.available')}</span>
        <span className="legend-item"><span className="legend-dot dot-booked" /> {t('venue.booked')}</span>
        {selected && (
          <span className="cal-selected-date">Selected: {selected}</span>
        )}
      </div>
    </div>
  );
}
