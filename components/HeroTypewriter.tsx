"use client";

import { useState, useEffect, useRef } from "react";

interface Greeting {
  text: string;
  dir: "ltr" | "rtl";
}

const GREETINGS: Greeting[] = [
  { text: "Welcome to ARTSER", dir: "ltr" },
  { text: "Benvenuti in Artigiano Serramenti", dir: "ltr" },
  { text: "مرحبًا بكم في آرت سر", dir: "rtl" },
  { text: "آرٹ سر میں خوش آمدید", dir: "rtl" },
];

const TYPE_SPEED = 60;
const DELETE_SPEED = 35;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 400;

export default function HeroTypewriter() {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fullText = GREETINGS[greetingIndex].text;

    const tick = () => {
      if (!isDeleting) {
        if (displayedText.length < fullText.length) {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
          timeoutRef.current = setTimeout(tick, TYPE_SPEED);
        } else {
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, PAUSE_AFTER_TYPE);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(fullText.slice(0, displayedText.length - 1));
          timeoutRef.current = setTimeout(tick, DELETE_SPEED);
        } else {
          setIsDeleting(false);
          setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
          timeoutRef.current = setTimeout(tick, PAUSE_AFTER_DELETE);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayedText, isDeleting, greetingIndex]);

  return (
    <h1
      dir={GREETINGS[greetingIndex].dir}
      className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl min-h-[1.2em]"
    >
      <span className="hero-gradient-text">{displayedText}</span>
      <span className="hero-cursor animate-blink">|</span>
    </h1>
  );
}
