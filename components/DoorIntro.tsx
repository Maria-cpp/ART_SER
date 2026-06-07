"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function DoorIntro() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Start in "showing" on home so the doors cover content immediately (no flash)
  const [phase, setPhase] = useState<"idle" | "showing" | "animating" | "done">(
    isHome ? "showing" : "idle"
  );
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    if (!isHome) {
      setPhase("idle");
      return;
    }

    // Ensure doors are shown (for client-side navigations back to home)
    setPhase("showing");

    const t1 = setTimeout(() => setPhase("animating"), 600);
    const t2 = setTimeout(() => setPhase("done"), 2600);
    timersRef.current = [t1, t2];

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [isHome]);

  if (phase === "idle" || phase === "done") return null;

  const isAnimating = phase === "animating";

  return (
    <div className="fixed inset-0 z-[9999] flex">
      {/* Left door */}
      <div
        className={`door-intro-panel door-intro-left flex-1 flex items-center justify-end border-e-2 border-accent/40 ${
          isAnimating ? "door-intro-open-left" : ""
        }`}
      >
        {/* Frosted glass texture lines */}
        <div className="absolute inset-y-0 end-[30%] w-px bg-white/10" />
        <div className="absolute inset-y-0 end-[60%] w-px bg-white/10" />
        {/* Handle — right edge of left door */}
        <div className="absolute end-6 top-1/2 -translate-y-1/2 z-10">
          <div className="w-2 h-20 rounded-full bg-accent/60 backdrop-blur-sm shadow-lg border border-accent/30" />
        </div>
      </div>

      {/* Right door */}
      <div
        className={`door-intro-panel door-intro-right flex-1 flex items-center justify-start border-s-2 border-accent/40 ${
          isAnimating ? "door-intro-open-right" : ""
        }`}
      >
        {/* Frosted glass texture lines */}
        <div className="absolute inset-y-0 start-[30%] w-px bg-white/10" />
        <div className="absolute inset-y-0 start-[60%] w-px bg-white/10" />
        {/* Handle — left edge of right door */}
        <div className="absolute start-6 top-1/2 -translate-y-1/2 z-10">
          <div className="w-2 h-20 rounded-full bg-accent/60 backdrop-blur-sm shadow-lg border border-accent/30" />
        </div>
      </div>

      {/* Center shadow line */}
      <div
        className={`absolute inset-y-0 left-1/2 z-[5] w-1 -translate-x-1/2 bg-gradient-to-b from-transparent via-foreground/20 to-transparent transition-opacity duration-300 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
