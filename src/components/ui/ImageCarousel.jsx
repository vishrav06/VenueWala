import { useState, useEffect, useRef } from 'react';
import './ImageCarousel.css';

export default function ImageCarousel({ images, alt }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 4000);
  };

  const stopTimer = () => clearInterval(timerRef.current);

  useEffect(() => {
    if (images.length > 1) startTimer();
    return stopTimer;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const go = (dir) => {
    stopTimer();
    setCurrent((c) => (c + dir + images.length) % images.length);
    startTimer();
  };

  const goTo = (i) => {
    stopTimer();
    setCurrent(i);
    startTimer();
  };

  return (
    <div
      className="carousel"
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, i) => (
          <div key={i} className="carousel-slide">
            <img src={src} alt={`${alt} ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button className="carousel-btn prev" onClick={() => go(-1)} aria-label="Previous">‹</button>
          <button className="carousel-btn next" onClick={() => go(1)} aria-label="Next">›</button>

          <div className="carousel-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === current ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="carousel-counter">{current + 1} / {images.length}</div>
        </>
      )}
    </div>
  );
}
