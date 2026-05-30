"use client";

import { useState } from "react";

interface MarqueeCarouselProps {
  images: string[];
  label?: string;
  speed?: number;
}

export function MarqueeCarousel({ images, label, speed = 30 }: MarqueeCarouselProps) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (images.length === 0) return null;

  const doubled = [...images, ...images];

  return (
    <>
      <div>
        {label && (
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            {label}
          </h3>
        )}
        <div className="marquee-container rounded-xl">
          <div
            className="marquee-track"
            style={{ animationDuration: `${speed}s` }}
          >
            {doubled.map((src, idx) => (
              <div
                key={`${src}-${idx}`}
                className="marquee-item flex-shrink-0 px-1.5"
                onMouseEnter={() => setLightbox(src)}
                onMouseLeave={() => setLightbox(null)}
              >
                <div className="h-44 w-64 overflow-hidden rounded-lg sm:h-52 sm:w-72 cursor-pointer">
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox overlay */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-h-[85vh] max-w-[90vw]">
            <img
              src={lightbox}
              alt=""
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
