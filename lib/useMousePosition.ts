"use client";

import { useEffect, useState } from "react";

interface NormalizedMouse {
  /** -1 (left) to 1 (right) */
  x: number;
  /** -1 (top) to 1 (bottom) */
  y: number;
}

/**
 * Returns normalized mouse coordinates relative to the viewport.
 * Updates at most every 16ms (60fps) via requestAnimationFrame.
 */
export function useMousePosition(): NormalizedMouse {
  const [pos, setPos] = useState<NormalizedMouse>({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number;
    let latestX = 0;
    let latestY = 0;
    let ticking = false;

    function onMove(e: MouseEvent) {
      latestX = (e.clientX / window.innerWidth) * 2 - 1;
      latestY = (e.clientY / window.innerHeight) * 2 - 1;

      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          setPos({ x: latestX, y: latestY });
          ticking = false;
        });
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return pos;
}
