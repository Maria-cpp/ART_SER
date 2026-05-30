"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/**
 * Typewriter-style logo: shows letters one by one A → R → T → S → E → R
 * then shows the full ART_SER_logo, pauses, and restarts.
 */

const LETTERS = ["/A.png", "/R.png", "/T.png", "/S.png", "/E.png", "/R.png"];
const FULL_LOGO = "/ART_SER_logo.png";
const LETTER_SIZE = 40;
const TYPE_DELAY = 500;       // ms between each letter appearing
const FULL_LOGO_DELAY = 600;  // ms after last letter before showing full logo
const PAUSE_DURATION = 5000;  // 5 seconds pause on full logo before restart

export default function AnimatedLogo() {
  const [visibleCount, setVisibleCount] = useState(0); // how many letters shown
  const [showFull, setShowFull] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (showFull) {
      // Pause on full logo, then restart
      timerRef.current = setTimeout(() => {
        setShowFull(false);
        setVisibleCount(0);
      }, PAUSE_DURATION);
    } else if (visibleCount < LETTERS.length) {
      // Type next letter
      timerRef.current = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, visibleCount === 0 ? 300 : TYPE_DELAY);
    } else {
      // All letters shown, switch to full logo
      timerRef.current = setTimeout(() => {
        setShowFull(true);
      }, FULL_LOGO_DELAY);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visibleCount, showFull]);

  if (showFull) {
    return (
      <div className="flex items-center" style={{ height: LETTER_SIZE }}>
        <Image
          src={FULL_LOGO}
          alt="ARTSER"
          width={LETTER_SIZE * 3.5}
          height={LETTER_SIZE}
          className="object-contain transition-opacity duration-500"
          style={{ height: LETTER_SIZE, opacity: 1 }}
          priority
        />
      </div>
    );
  }

  return (
    <div className="flex items-center" style={{ height: LETTER_SIZE }}>
      {LETTERS.slice(0, visibleCount).map((src, i) => (
        <span key={`${src}-${i}`} className="inline-flex" style={{
          marginLeft: i === 3 ? 6 : i > 0 ? -10 : 0,
          animation: "letterPop 0.3s ease-out",
        }}>
          <Image
            src={src}
            alt={src.replace("/", "").replace(".png", "")}
            width={LETTER_SIZE}
            height={LETTER_SIZE}
            className="object-contain"
            style={{ width: LETTER_SIZE, height: LETTER_SIZE }}
            priority
          />
        </span>
      ))}
      <style jsx>{`
        @keyframes letterPop {
          0% { opacity: 0; transform: scale(0.5) translateY(4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
