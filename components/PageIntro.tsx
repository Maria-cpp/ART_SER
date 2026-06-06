"use client";

import { useState, useEffect } from "react";

export type PageIntroVariant =
  | "windows"
  | "doors"
  | "sliding-folding"
  | "facades"
  | "conservatories"
  | "smart-buildings";

interface PageIntroProps {
  variant: PageIntroVariant;
  children: React.ReactNode;
}

const SESSION_PREFIX = "artser.pageIntro.";

export function PageIntro({ variant, children }: PageIntroProps) {
  const [show, setShow] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const key = SESSION_PREFIX + variant;
    if (sessionStorage.getItem(key)) return;
    setShow(true);
    const startTimer = setTimeout(() => setAnimating(true), 400);
    const endTimer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(key, "1");
    }, 2400);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [variant]);

  return (
    <>
      {show && (
        <div className={`page-intro-overlay ${animating ? "page-intro-animating" : ""}`}>
          <PageIntroContent variant={variant} animating={animating} />
        </div>
      )}
      {children}
    </>
  );
}

function PageIntroContent({ variant, animating }: { variant: PageIntroVariant; animating: boolean }) {
  switch (variant) {
    case "windows":
      return <WindowsIntroContent animating={animating} />;
    case "doors":
      return <DoorsIntroContent animating={animating} />;
    case "sliding-folding":
      return <SlidingFoldingIntroContent animating={animating} />;
    case "facades":
      return <FacadesIntroContent animating={animating} />;
    case "conservatories":
      return <ConservatoriesIntroContent animating={animating} />;
    case "smart-buildings":
      return <SmartBuildingsIntroContent animating={animating} />;
  }
}

/* ---- Windows: glass panes swing open ---- */
function WindowsIntroContent({ animating }: { animating: boolean }) {
  return (
    <div className="page-intro-center">
      <div className="pi-window-frame">
        <div className={`pi-window-pane pi-window-pane-left ${animating ? "pi-window-open-left" : ""}`}>
          <div className="pi-window-glass" />
          <div className="pi-window-handle-left" />
        </div>
        <div className={`pi-window-pane pi-window-pane-right ${animating ? "pi-window-open-right" : ""}`}>
          <div className="pi-window-glass" />
          <div className="pi-window-handle-right" />
        </div>
        <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-foreground/20" />
      </div>
    </div>
  );
}

/* ---- Doors: double doors slide apart ---- */
function DoorsIntroContent({ animating }: { animating: boolean }) {
  return (
    <div className="page-intro-center">
      <div className="pi-doors-frame">
        <div className={`pi-door-panel pi-door-left ${animating ? "pi-door-open-left" : ""}`}>
          <div className="pi-door-inset" />
          <div className="pi-door-handle-left" />
        </div>
        <div className={`pi-door-panel pi-door-right ${animating ? "pi-door-open-right" : ""}`}>
          <div className="pi-door-inset" />
          <div className="pi-door-handle-right" />
        </div>
      </div>
    </div>
  );
}

/* ---- Sliding & Folding: accordion panels ---- */
function SlidingFoldingIntroContent({ animating }: { animating: boolean }) {
  return (
    <div className="page-intro-center">
      <div className="pi-accordion-frame">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`pi-accordion-panel ${animating ? "pi-accordion-fold" : ""}`}
            style={{ animationDelay: animating ? `${i * 120}ms` : "0ms" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---- Facades: grid panels drop in ---- */
function FacadesIntroContent({ animating }: { animating: boolean }) {
  const panels = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="page-intro-center">
      <div className="pi-facade-grid">
        {panels.map((i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const delay = (row * 4 + col) * 80;
          return (
            <div
              key={i}
              className={`pi-facade-panel ${animating ? "pi-facade-drop" : ""}`}
              style={{ animationDelay: `${delay}ms` }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ---- Conservatories: glass frame from corners ---- */
function ConservatoriesIntroContent({ animating }: { animating: boolean }) {
  return (
    <div className="page-intro-center">
      <div className="pi-conservatory-frame">
        <div className={`pi-conservatory-roof ${animating ? "pi-conservatory-assemble" : ""}`} />
        <div className={`pi-conservatory-left ${animating ? "pi-conservatory-assemble" : ""}`} style={{ animationDelay: "150ms" }} />
        <div className={`pi-conservatory-right ${animating ? "pi-conservatory-assemble" : ""}`} style={{ animationDelay: "150ms" }} />
        <div className={`pi-conservatory-base ${animating ? "pi-conservatory-assemble" : ""}`} style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

/* ---- Smart Buildings: rising buildings ---- */
function SmartBuildingsIntroContent({ animating }: { animating: boolean }) {
  return (
    <div className="page-intro-center">
      <div className="pi-buildings-row">
        <div className={`pi-building pi-building-short ${animating ? "pi-building-rise" : ""}`} style={{ animationDelay: "0ms" }}>
          <div className="pi-building-windows">
            {[0, 1, 2, 3].map((i) => <div key={i} className="pi-building-window" />)}
          </div>
        </div>
        <div className={`pi-building pi-building-medium ${animating ? "pi-building-rise" : ""}`} style={{ animationDelay: "200ms" }}>
          <div className="pi-building-windows">
            {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="pi-building-window" />)}
          </div>
        </div>
        <div className={`pi-building pi-building-tall ${animating ? "pi-building-rise" : ""}`} style={{ animationDelay: "400ms" }}>
          <div className="pi-building-windows">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <div key={i} className="pi-building-window" />)}
          </div>
        </div>
      </div>
    </div>
  );
}
