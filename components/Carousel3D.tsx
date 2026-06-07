"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Carousel3DProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
}

export function Carousel3D({ images, autoPlay = true, interval = 4000 }: Carousel3DProps) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const touchStartX = useRef(0);
  const count = images.length;

  const next = useCallback(() => setCurrent((p) => (p + 1) % count), [count]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + count) % count), [count]);

  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next, count]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    const isRtl = document.documentElement.dir === "rtl";
    if (Math.abs(diff) > 50) {
      if ((diff > 0 && !isRtl) || (diff < 0 && isRtl)) next();
      else prev();
    }
  };

  if (count === 0) return null;

  const angle = 360 / count;
  const radius = count <= 3 ? 220 : count <= 5 ? 280 : 320;

  return (
    <div
      className="carousel-3d-wrapper"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="carousel-3d-track"
        style={{
          transform: `rotateY(${-current * angle}deg)`,
        }}
      >
        {images.map((src, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={src}
              className={`carousel-3d-item ${isActive ? "carousel-3d-item-active" : ""} ${isActive && hovered ? "carousel-3d-item-hovered" : ""}`}
              style={{
                transform: `rotateY(${idx * angle}deg) translateZ(${radius}px)${isActive && hovered ? " scale(1.6)" : ""}`,
              }}
              onMouseEnter={() => isActive && setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover rounded-xl"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <button
            onClick={prev}
            className="carousel-3d-btn carousel-3d-btn-start"
            aria-label="Previous"
          >
            <svg className="h-5 w-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="carousel-3d-btn carousel-3d-btn-end"
            aria-label="Next"
          >
            <svg className="h-5 w-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {count > 1 && (
        <div className="carousel-3d-dots">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`carousel-3d-dot ${idx === current ? "carousel-3d-dot-active" : ""}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
