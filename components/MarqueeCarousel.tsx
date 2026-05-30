"use client";

interface MarqueeCarouselProps {
  images: string[];
  label?: string;
  speed?: number;
}

export function MarqueeCarousel({ images, label, speed = 30 }: MarqueeCarouselProps) {
  if (images.length === 0) return null;

  // Duplicate images to create seamless loop
  const doubled = [...images, ...images];

  return (
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
              className="flex-shrink-0 px-1.5"
            >
              <div className="h-44 w-64 overflow-hidden rounded-lg sm:h-52 sm:w-72">
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
  );
}
