"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SESSION_KEY = "artser.doorIntroPlayed";

export function DoorIntro() {
  const [show, setShow] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    setShow(true);
    const startTimer = setTimeout(() => setAnimating(true), 600);
    const endTimer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 2600);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex">
      {/* Left door */}
      <div
        className={`door-intro-panel door-intro-left flex-1 flex items-center justify-end ${
          animating ? "door-intro-open-left" : ""
        }`}
      >
        <div className="absolute inset-y-0 end-[30%] w-px bg-foreground/5" />
        <div className="absolute inset-y-0 end-[60%] w-px bg-foreground/5" />
      </div>

      {/* Right door */}
      <div
        className={`door-intro-panel door-intro-right flex-1 flex items-center justify-start ${
          animating ? "door-intro-open-right" : ""
        }`}
      >
        <div className="absolute inset-y-0 start-[30%] w-px bg-foreground/5" />
        <div className="absolute inset-y-0 start-[60%] w-px bg-foreground/5" />
      </div>

      {/* Center logo */}
      <div
        className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500 ${
          animating ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src="/logo/ART_SER_logo.png"
          alt="ARTSER"
          width={200}
          height={72}
          priority
          className="h-auto w-auto max-h-16"
        />
      </div>

      {/* Center shadow line */}
      <div
        className={`absolute inset-y-0 left-1/2 z-[5] w-1 -translate-x-1/2 bg-gradient-to-b from-transparent via-foreground/20 to-transparent transition-opacity duration-300 ${
          animating ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
