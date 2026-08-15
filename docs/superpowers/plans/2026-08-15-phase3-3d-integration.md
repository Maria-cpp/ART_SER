# Phase 3: 3D & Animation Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the old Construction3DBackground with a modern React Three Fiber + GSAP ScrollTrigger architecture, adding interactive 3D aluminium/window scenes to the Hero and Material sections, a scroll-driven "From Profile to Architecture" experience, and robust WebGL fallback — all using procedural geometry that can later be swapped for GLB models.

**Architecture:** All 3D scenes live under `components/3d/` as independent R3F components wrapped in a shared `Scene.tsx` Canvas with Suspense + error boundary + WebGL detection. GSAP ScrollTrigger orchestrates scroll-driven camera movement, object transformation, and text reveals from the DOM side — Three.js only handles rendering. Each 3D scene is lazy-loaded via `next/dynamic` and only mounts when its section scrolls into view. Mobile/reduced-motion users get static image fallbacks.

**Tech Stack:** React Three Fiber, @react-three/drei, GSAP + ScrollTrigger, Three.js (procedural geometry), next/dynamic lazy loading

---

### Task 1: Install 3D & Animation Dependencies
**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install @react-three/fiber, @react-three/drei, and gsap**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
npm install @react-three/fiber @react-three/drei gsap
```

- [ ] **Step 2: Verify installation succeeded**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
node -e "require('@react-three/fiber'); require('@react-three/drei'); require('gsap'); console.log('All packages installed successfully');"
```

---

### Task 2: Create WebGL Detection Utility
**Files:**
- Create: `lib/webgl.ts`

- [ ] **Step 1: Create the WebGL detection and device capability utility**

```typescript
// lib/webgl.ts
"use client";

export type GPUTier = "high" | "medium" | "low" | "none";

export function detectWebGL(): { supported: boolean; tier: GPUTier } {
  if (typeof window === "undefined") {
    return { supported: false, tier: "none" };
  }

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
      return { supported: false, tier: "none" };
    }

    const glCtx = gl as WebGLRenderingContext;
    const debugInfo = glCtx.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo
      ? glCtx.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : "";
    const rendererLower = (renderer as string).toLowerCase();

    // Detect low-end / software renderers
    const isSoftware =
      rendererLower.includes("swiftshader") ||
      rendererLower.includes("llvmpipe") ||
      rendererLower.includes("software") ||
      rendererLower.includes("microsoft basic");

    if (isSoftware) {
      return { supported: true, tier: "low" };
    }

    // Detect mobile
    const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);
    const isTablet = /ipad|android(?!.*mobile)/i.test(navigator.userAgent);

    if (isMobile && !isTablet) {
      return { supported: true, tier: "low" };
    }

    if (isTablet) {
      return { supported: true, tier: "medium" };
    }

    return { supported: true, tier: "high" };
  } catch {
    return { supported: false, tier: "none" };
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
```

---

### Task 3: Create WebGL Fallback Component
**Files:**
- Create: `components/3d/WebGLFallback.tsx`

- [ ] **Step 1: Create the fallback component shown when WebGL is unavailable or on low-end devices**

```tsx
// components/3d/WebGLFallback.tsx
"use client";

interface WebGLFallbackProps {
  /** Static image to show as fallback */
  imageSrc?: string;
  /** Alt text for the image */
  imageAlt?: string;
  /** Additional CSS classes */
  className?: string;
  /** Children to render over the fallback */
  children?: React.ReactNode;
}

export function WebGLFallback({
  imageSrc,
  imageAlt = "Architectural aluminium systems",
  className = "",
  children,
}: WebGLFallbackProps) {
  return (
    <div
      className={`relative flex items-center justify-center bg-background overflow-hidden ${className}`}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
      ) : (
        /* Procedural CSS fallback — dark gradient with subtle architectural lines */
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B0B0B] via-[#141414] to-[#0B0B0B]" />
          {/* Horizontal architectural lines */}
          <div className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(181,138,98,0.3) 59px, rgba(181,138,98,0.3) 60px)",
            }}
          />
          {/* Vertical architectural lines */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(184,184,184,0.2) 119px, rgba(184,184,184,0.2) 120px)",
            }}
          />
        </div>
      )}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
```

---

### Task 4: Create Shared 3D Scene Wrapper
**Files:**
- Create: `components/3d/Scene.tsx`

- [ ] **Step 1: Create the shared Canvas wrapper with Suspense, error boundary, WebGL detection, and responsive DPR**

```tsx
// components/3d/Scene.tsx
"use client";

import { Suspense, useEffect, useState, Component, type ReactNode, type ErrorInfo } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { detectWebGL, prefersReducedMotion, type GPUTier } from "@/lib/webgl";
import { WebGLFallback } from "./WebGLFallback";

/* ── Error Boundary ─────────────────────────────────────────── */

interface EBProps {
  fallback: ReactNode;
  children: ReactNode;
}
interface EBState {
  hasError: boolean;
}

class SceneErrorBoundary extends Component<EBProps, EBState> {
  constructor(props: EBProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): EBState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[Scene3D] Render error:", error, info);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/* ── Loading Spinner ────────────────────────────────────────── */

function SceneLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#B58A62] border-t-transparent" />
        <span className="text-xs tracking-widest uppercase text-[#B8B8B8]">Loading</span>
      </div>
    </div>
  );
}

/* ── Scene Props ────────────────────────────────────────────── */

interface SceneProps {
  children: ReactNode;
  className?: string;
  fallbackImage?: string;
  fallbackContent?: ReactNode;
  /** Camera FOV — default 45 */
  fov?: number;
  /** Camera position — default [0, 0, 5] */
  cameraPosition?: [number, number, number];
  /** Whether to show on mobile (low tier). Default false → fallback on mobile */
  allowMobile?: boolean;
}

export function Scene({
  children,
  className = "",
  fallbackImage,
  fallbackContent,
  fov = 45,
  cameraPosition = [0, 0, 5],
  allowMobile = false,
}: SceneProps) {
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState<{ supported: boolean; tier: GPUTier } | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWebgl(detectWebGL());
    setReducedMotion(prefersReducedMotion());
  }, []);

  if (!mounted) {
    return (
      <div className={`relative ${className}`}>
        <SceneLoader />
      </div>
    );
  }

  // Fallback conditions: no WebGL, reduced motion, or low-end device (unless allowMobile)
  const shouldFallback =
    !webgl?.supported ||
    webgl.tier === "none" ||
    reducedMotion ||
    (!allowMobile && webgl.tier === "low");

  if (shouldFallback) {
    return (
      <WebGLFallback imageSrc={fallbackImage} className={className}>
        {fallbackContent}
      </WebGLFallback>
    );
  }

  const dpr: [number, number] = webgl.tier === "high" ? [1, 2] : [1, 1.5];

  const fallbackNode = (
    <WebGLFallback imageSrc={fallbackImage} className={className}>
      {fallbackContent}
    </WebGLFallback>
  );

  return (
    <div className={`relative ${className}`}>
      <SceneErrorBoundary fallback={fallbackNode}>
        <Suspense fallback={<SceneLoader />}>
          <Canvas
            dpr={dpr}
            camera={{ fov, position: cameraPosition, near: 0.1, far: 200 }}
            gl={{
              antialias: webgl.tier === "high",
              alpha: true,
              powerPreference: webgl.tier === "high" ? "high-performance" : "default",
            }}
            style={{ position: "absolute", inset: 0 }}
          >
            {children}
            <Preload all />
          </Canvas>
        </Suspense>
      </SceneErrorBoundary>
    </div>
  );
}
```

---

### Task 5: Create Aluminium Material Utilities
**Files:**
- Create: `components/3d/materials.ts`

- [ ] **Step 1: Create shared material factory functions for consistent aluminium/glass/rubber look across all 3D scenes**

```typescript
// components/3d/materials.ts
import * as THREE from "three";

/** Brushed aluminium — dark metallic */
export function createAluminiumMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color("#8A8A8A"),
    metalness: 0.85,
    roughness: 0.35,
  });
}

/** Dark anodized aluminium — for frames */
export function createDarkAluminiumMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color("#3A3A3A"),
    metalness: 0.9,
    roughness: 0.25,
  });
}

/** Architectural glass — semi-transparent with reflections */
export function createGlassMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#88AACC"),
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.85,
    thickness: 0.02,
    transparent: true,
    opacity: 0.4,
    envMapIntensity: 1.5,
  });
}

/** Thermal break — dark polyamide */
export function createThermalBreakMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1A1A1A"),
    metalness: 0.0,
    roughness: 0.9,
  });
}

/** Rubber gasket — black EPDM */
export function createGasketMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color("#111111"),
    metalness: 0.0,
    roughness: 0.95,
  });
}

/** Bronze accent — matches ARTSER brand accent #B58A62 */
export function createAccentMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color("#B58A62"),
    metalness: 0.7,
    roughness: 0.3,
    emissive: new THREE.Color("#B58A62"),
    emissiveIntensity: 0.05,
  });
}
```

---

### Task 6: Create Procedural Aluminium Profile Component
**Files:**
- Create: `components/3d/AluminiumProfile.tsx`

- [ ] **Step 1: Create the explodable aluminium window profile using procedural geometry (BoxGeometry, CylinderGeometry)**

This component builds a cross-section of an aluminium window profile with 5 parts that can be exploded apart via the `explode` prop (0-1 range).

```tsx
// components/3d/AluminiumProfile.tsx
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AluminiumProfileProps {
  /** 0 = assembled, 1 = fully exploded */
  explode?: number;
  /** Rotation speed (rad/frame). 0 = no auto-rotate */
  rotationSpeed?: number;
  /** Overall scale */
  scale?: number;
}

/**
 * Procedural aluminium window profile cross-section.
 * 5 explodable parts: outer frame, thermal break, inner frame, glass panel, gasket.
 * Can be replaced later with `useGLTF("/models/profile.glb")`.
 */
export function AluminiumProfile({
  explode = 0,
  rotationSpeed = 0,
  scale = 1,
}: AluminiumProfileProps) {
  const groupRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    return {
      aluminium: new THREE.MeshStandardMaterial({
        color: "#8A8A8A",
        metalness: 0.85,
        roughness: 0.35,
      }),
      darkAluminium: new THREE.MeshStandardMaterial({
        color: "#3A3A3A",
        metalness: 0.9,
        roughness: 0.25,
      }),
      thermalBreak: new THREE.MeshStandardMaterial({
        color: "#1A1A1A",
        metalness: 0.0,
        roughness: 0.9,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: "#88AACC",
        metalness: 0.0,
        roughness: 0.05,
        transparent: true,
        opacity: 0.35,
        envMapIntensity: 1.5,
      }),
      gasket: new THREE.MeshStandardMaterial({
        color: "#111111",
        metalness: 0.0,
        roughness: 0.95,
      }),
    };
  }, []);

  useFrame(() => {
    if (groupRef.current && rotationSpeed) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  // Explode offsets: each part moves outward
  const e = explode;

  return (
    <group ref={groupRef} scale={scale}>
      {/* Outer aluminium frame */}
      <group position={[0, e * 1.2, 0]}>
        {/* Top rail */}
        <mesh material={materials.aluminium} position={[0, 1.0, 0]}>
          <boxGeometry args={[2.4, 0.15, 0.6]} />
        </mesh>
        {/* Bottom rail */}
        <mesh material={materials.aluminium} position={[0, -1.0, 0]}>
          <boxGeometry args={[2.4, 0.15, 0.6]} />
        </mesh>
        {/* Left stile */}
        <mesh material={materials.aluminium} position={[-1.12, 0, 0]}>
          <boxGeometry args={[0.15, 2.15, 0.6]} />
        </mesh>
        {/* Right stile */}
        <mesh material={materials.aluminium} position={[1.12, 0, 0]}>
          <boxGeometry args={[0.15, 2.15, 0.6]} />
        </mesh>
      </group>

      {/* Thermal break strip */}
      <group position={[0, e * 0.5, e * 0.3]}>
        <mesh material={materials.thermalBreak} position={[0, 1.0, 0]}>
          <boxGeometry args={[2.0, 0.06, 0.15]} />
        </mesh>
        <mesh material={materials.thermalBreak} position={[0, -1.0, 0]}>
          <boxGeometry args={[2.0, 0.06, 0.15]} />
        </mesh>
        <mesh material={materials.thermalBreak} position={[-1.0, 0, 0]}>
          <boxGeometry args={[0.06, 2.0, 0.15]} />
        </mesh>
        <mesh material={materials.thermalBreak} position={[1.0, 0, 0]}>
          <boxGeometry args={[0.06, 2.0, 0.15]} />
        </mesh>
      </group>

      {/* Inner aluminium frame */}
      <group position={[0, -e * 1.2, 0]}>
        <mesh material={materials.darkAluminium} position={[0, 0.85, 0]}>
          <boxGeometry args={[1.8, 0.12, 0.4]} />
        </mesh>
        <mesh material={materials.darkAluminium} position={[0, -0.85, 0]}>
          <boxGeometry args={[1.8, 0.12, 0.4]} />
        </mesh>
        <mesh material={materials.darkAluminium} position={[-0.84, 0, 0]}>
          <boxGeometry args={[0.12, 1.82, 0.4]} />
        </mesh>
        <mesh material={materials.darkAluminium} position={[0.84, 0, 0]}>
          <boxGeometry args={[0.12, 1.82, 0.4]} />
        </mesh>
      </group>

      {/* Glass panel */}
      <group position={[0, 0, e * -1.5]}>
        <mesh material={materials.glass}>
          <boxGeometry args={[1.5, 1.5, 0.04]} />
        </mesh>
      </group>

      {/* Gaskets (4 thin strips around glass) */}
      <group position={[0, 0, e * -0.8]}>
        <mesh material={materials.gasket} position={[0, 0.78, 0]}>
          <boxGeometry args={[1.6, 0.04, 0.08]} />
        </mesh>
        <mesh material={materials.gasket} position={[0, -0.78, 0]}>
          <boxGeometry args={[1.6, 0.04, 0.08]} />
        </mesh>
        <mesh material={materials.gasket} position={[-0.78, 0, 0]}>
          <boxGeometry args={[0.04, 1.6, 0.08]} />
        </mesh>
        <mesh material={materials.gasket} position={[0.78, 0, 0]}>
          <boxGeometry args={[0.04, 1.6, 0.08]} />
        </mesh>
      </group>
    </group>
  );
}
```

---

### Task 7: Create Window System 3D Component
**Files:**
- Create: `components/3d/WindowSystem.tsx`

- [ ] **Step 1: Create the full window assembly — a larger scale window with frame, glass, handle, and mullions**

```tsx
// components/3d/WindowSystem.tsx
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WindowSystemProps {
  /** 0 = assembled, 1 = components separated */
  explode?: number;
  /** Mouse-driven rotation offset [x, y] in radians */
  mouseOffset?: [number, number];
  scale?: number;
}

/**
 * Procedural architectural window system.
 * Dual-pane window with frame, mullion, glass, and handle.
 * Can be replaced with useGLTF("/models/window.glb").
 */
export function WindowSystem({
  explode = 0,
  mouseOffset = [0, 0],
  scale = 1,
}: WindowSystemProps) {
  const groupRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => ({
    frame: new THREE.MeshStandardMaterial({
      color: "#2C2C2C",
      metalness: 0.9,
      roughness: 0.2,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: "#6699BB",
      metalness: 0.0,
      roughness: 0.05,
      transparent: true,
      opacity: 0.3,
      envMapIntensity: 2.0,
    }),
    handle: new THREE.MeshStandardMaterial({
      color: "#B58A62",
      metalness: 0.8,
      roughness: 0.2,
    }),
    gasket: new THREE.MeshStandardMaterial({
      color: "#0A0A0A",
      roughness: 0.95,
    }),
  }), []);

  useFrame(() => {
    if (!groupRef.current) return;
    // Smooth mouse follow
    groupRef.current.rotation.y += (mouseOffset[0] * 0.3 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (mouseOffset[1] * 0.15 - groupRef.current.rotation.x) * 0.05;
  });

  const e = explode;
  const W = 3; // total width
  const H = 4; // total height
  const D = 0.12; // frame depth
  const T = 0.12; // frame thickness

  return (
    <group ref={groupRef} scale={scale}>
      {/* Outer frame */}
      <group position={[0, 0, e * 0.8]}>
        {/* Top */}
        <mesh material={materials.frame} position={[0, H / 2, 0]}>
          <boxGeometry args={[W + T * 2, T, D]} />
        </mesh>
        {/* Bottom */}
        <mesh material={materials.frame} position={[0, -H / 2, 0]}>
          <boxGeometry args={[W + T * 2, T, D]} />
        </mesh>
        {/* Left */}
        <mesh material={materials.frame} position={[-W / 2 - T / 2, 0, 0]}>
          <boxGeometry args={[T, H, D]} />
        </mesh>
        {/* Right */}
        <mesh material={materials.frame} position={[W / 2 + T / 2, 0, 0]}>
          <boxGeometry args={[T, H, D]} />
        </mesh>
        {/* Center mullion */}
        <mesh material={materials.frame} position={[0, 0, 0]}>
          <boxGeometry args={[T * 0.8, H, D]} />
        </mesh>
      </group>

      {/* Left glass pane */}
      <group position={[-W / 4 - T * 0.2, 0, -e * 0.5]}>
        <mesh material={materials.glass}>
          <boxGeometry args={[W / 2 - T * 0.5, H - T * 2, 0.02]} />
        </mesh>
      </group>

      {/* Right glass pane */}
      <group position={[W / 4 + T * 0.2, 0, -e * 0.5]}>
        <mesh material={materials.glass}>
          <boxGeometry args={[W / 2 - T * 0.5, H - T * 2, 0.02]} />
        </mesh>
      </group>

      {/* Gasket strips — around left pane */}
      <group position={[-W / 4 - T * 0.2, 0, e * 0.3]}>
        <mesh material={materials.gasket} position={[0, (H - T * 2) / 2, 0]}>
          <boxGeometry args={[W / 2 - T * 0.3, 0.03, 0.06]} />
        </mesh>
        <mesh material={materials.gasket} position={[0, -(H - T * 2) / 2, 0]}>
          <boxGeometry args={[W / 2 - T * 0.3, 0.03, 0.06]} />
        </mesh>
      </group>

      {/* Handle — right pane, bronze accent */}
      <group position={[T * 0.6, 0, D / 2 + 0.02 + e * 1.2]}>
        {/* Handle base */}
        <mesh material={materials.handle} position={[0, 0, 0.02]}>
          <boxGeometry args={[0.06, 0.18, 0.04]} />
        </mesh>
        {/* Handle lever */}
        <mesh material={materials.handle} position={[0, 0.12, 0.04]}>
          <boxGeometry args={[0.04, 0.12, 0.04]} />
        </mesh>
        {/* Handle grip */}
        <mesh material={materials.handle} position={[0, 0.18, 0.04]}>
          <cylinderGeometry args={[0.025, 0.025, 0.06, 8]} />
        </mesh>
      </group>
    </group>
  );
}
```

---

### Task 8: Create GSAP ScrollTrigger Hook
**Files:**
- Create: `lib/useGSAPScroll.ts`

- [ ] **Step 1: Create a reusable hook that registers GSAP ScrollTrigger and provides scroll-progress values for 3D scenes**

```typescript
// lib/useGSAPScroll.ts
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook that tracks scroll progress within a DOM element using GSAP ScrollTrigger.
 * Returns a ref to attach to the container and a progress value (0-1).
 *
 * @param start - ScrollTrigger start position, default "top bottom"
 * @param end - ScrollTrigger end position, default "bottom top"
 */
export function useGSAPScroll(
  start: string = "top bottom",
  end: string = "bottom top"
): { containerRef: React.RefObject<HTMLDivElement | null>; progress: number } {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;

    async function init() {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const trigger = ScrollTrigger.create({
        trigger: el,
        start,
        end,
        scrub: true,
        onUpdate: (self: { progress: number }) => {
          setProgress(self.progress);
        },
      });

      cleanup = () => {
        trigger.kill();
      };
    }

    init();

    return () => {
      cleanup?.();
    };
  }, [start, end]);

  return { containerRef, progress };
}

/**
 * Hook that animates elements when they scroll into view using GSAP.
 * Attach the returned ref to a container — direct children get staggered reveal.
 */
export function useGSAPReveal(
  stagger: number = 0.1,
  fromY: number = 40
): React.RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;

    async function init() {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const children = el.children;
      if (!children.length) return;

      gsap.set(children, { opacity: 0, y: fromY });

      const tween = gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      cleanup = () => {
        tween.kill();
        ScrollTrigger.getAll().forEach((t: { trigger: Element | null | undefined; kill: () => void }) => {
          if (t.trigger === el) t.kill();
        });
      };
    }

    init();

    return () => {
      cleanup?.();
    };
  }, [stagger, fromY]);

  return ref;
}
```

---

### Task 9: Create Mouse Tracking Hook for 3D Interaction
**Files:**
- Create: `lib/useMousePosition.ts`

- [ ] **Step 1: Create a hook that returns normalized mouse position (-1 to 1) for parallax/rotation effects**

```typescript
// lib/useMousePosition.ts
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
```

---

### Task 10: Create Hero 3D Scene
**Files:**
- Create: `components/3d/HeroScene.tsx`

- [ ] **Step 1: Create the hero 3D scene — dark environment with window system, subtle lighting, mouse-driven rotation, and scroll-driven camera movement**

```tsx
// components/3d/HeroScene.tsx
"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { WindowSystem } from "./WindowSystem";

interface HeroSceneProps {
  /** Scroll progress 0-1 from GSAP ScrollTrigger */
  scrollProgress?: number;
  /** Normalized mouse position [-1, 1] */
  mouse?: { x: number; y: number };
}

export function HeroScene({ scrollProgress = 0, mouse = { x: 0, y: 0 } }: HeroSceneProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { camera } = useThree();

  useFrame(() => {
    // Scroll-driven camera: starts at z=8, moves to z=4 as user scrolls
    const targetZ = 8 - scrollProgress * 4;
    const targetY = 0.5 - scrollProgress * 0.8;
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.position.y += (targetY - camera.position.y) * 0.08;

    // Mouse-driven subtle camera offset
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.04;
  });

  return (
    <>
      {/* Lighting — dark architectural studio */}
      <ambientLight intensity={0.15} color="#B8B8B8" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        color="#F5F5F2"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#B58A62" />
      <pointLight position={[0, -2, 3]} intensity={0.2} color="#B58A62" distance={10} />

      {/* Subtle environment reflections */}
      <Environment preset="city" environmentIntensity={0.3} />

      {/* Ground plane — barely visible, for depth */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0B0B0B" roughness={0.95} metalness={0.1} />
      </mesh>

      {/* Main window system */}
      <WindowSystem
        mouseOffset={[mouse.x, mouse.y]}
        explode={scrollProgress * 0.6}
        scale={0.8}
      />

      {/* Secondary smaller profile — offset to the right, adds depth */}
      <group position={[3.5, -0.5, -3]} rotation={[0, -0.4, 0]} scale={0.4}>
        <mesh>
          <boxGeometry args={[2.4, 3.2, 0.1]} />
          <meshStandardMaterial color="#2C2C2C" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[2.0, 2.8, 0.02]} />
          <meshPhysicalMaterial
            color="#6699BB"
            transparent
            opacity={0.2}
            roughness={0.05}
          />
        </mesh>
      </group>

      {/* Floating aluminium profile piece — left side background */}
      <group position={[-4, 1.5, -4]} rotation={[0.2, 0.5, 0.1]} scale={0.3}>
        <mesh>
          <boxGeometry args={[0.15, 4, 0.6]} />
          <meshStandardMaterial color="#8A8A8A" metalness={0.85} roughness={0.35} />
        </mesh>
      </group>
    </>
  );
}
```

---

### Task 11: Create Material Section 3D Scene
**Files:**
- Create: `components/3d/MaterialScene.tsx`

- [ ] **Step 1: Create the material/engineering 3D scene — scroll-driven exploded view of aluminium profile with stage lighting**

```tsx
// components/3d/MaterialScene.tsx
"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { AluminiumProfile } from "./AluminiumProfile";

interface MaterialSceneProps {
  /** Scroll progress 0-1 — drives exploded view */
  scrollProgress?: number;
}

export function MaterialScene({ scrollProgress = 0 }: MaterialSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;

    // Slow auto-rotate when not scrolling
    groupRef.current.rotation.y += 0.002;

    // Scroll-driven camera zoom
    const targetZ = 5 - scrollProgress * 1.5;
    camera.position.z += (targetZ - camera.position.z) * 0.06;
  });

  // Map scroll to explode factor: 0-0.4 = assembled, 0.4-0.8 = exploding, 0.8-1 = full explode
  const explodeFactor = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.6));

  return (
    <>
      {/* Dark studio lighting */}
      <ambientLight intensity={0.1} color="#B8B8B8" />
      <spotLight
        position={[4, 6, 4]}
        intensity={1.2}
        color="#F5F5F2"
        angle={0.5}
        penumbra={0.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[-3, 3, -2]}
        intensity={0.4}
        color="#B58A62"
        angle={0.6}
        penumbra={1}
      />
      <pointLight position={[0, -3, 2]} intensity={0.15} color="#B58A62" distance={8} />

      <Environment preset="city" environmentIntensity={0.2} />

      <group ref={groupRef}>
        <AluminiumProfile
          explode={explodeFactor}
          rotationSpeed={0}
          scale={1.2}
        />
      </group>

      {/* Ground reflection plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0B0B0B" roughness={0.92} metalness={0.15} />
      </mesh>
    </>
  );
}
```

---

### Task 12: Create "From Profile to Architecture" 3D Sequence
**Files:**
- Create: `components/3d/ProfileToArchitectureScene.tsx`

- [ ] **Step 1: Create the scroll-driven manufacturing sequence — 7 stages from raw profile to installed architecture**

```tsx
// components/3d/ProfileToArchitectureScene.tsx
"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

interface ProfileToArchitectureSceneProps {
  /** Scroll progress 0-1 driving the entire sequence */
  scrollProgress?: number;
}

/**
 * Scroll-driven 3D sequence: Raw Profile -> Cutting -> Machining -> Assembly -> Glass -> Finished Window -> Installed
 * Each stage occupies ~1/7 of the scroll progress.
 */
export function ProfileToArchitectureScene({ scrollProgress = 0 }: ProfileToArchitectureSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const materials = useMemo(() => ({
    rawAluminium: new THREE.MeshStandardMaterial({
      color: "#A0A0A0",
      metalness: 0.6,
      roughness: 0.5,
    }),
    cutAluminium: new THREE.MeshStandardMaterial({
      color: "#8A8A8A",
      metalness: 0.85,
      roughness: 0.35,
    }),
    darkFrame: new THREE.MeshStandardMaterial({
      color: "#2C2C2C",
      metalness: 0.9,
      roughness: 0.2,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: "#6699BB",
      metalness: 0.0,
      roughness: 0.05,
      transparent: true,
      opacity: 0.3,
    }),
    wall: new THREE.MeshStandardMaterial({
      color: "#1A1A1A",
      roughness: 0.95,
    }),
    accent: new THREE.MeshStandardMaterial({
      color: "#B58A62",
      metalness: 0.7,
      roughness: 0.3,
    }),
  }), []);

  // Determine which stage we're in (0-6)
  const stage = Math.min(6, Math.floor(scrollProgress * 7));
  const stageProgress = (scrollProgress * 7) - stage; // 0-1 within current stage

  useFrame(() => {
    if (!groupRef.current) return;

    // Camera orbits slightly based on scroll
    const angle = scrollProgress * Math.PI * 0.4 - 0.2;
    const radius = 6 - scrollProgress * 1.5;
    camera.position.x += (Math.sin(angle) * radius - camera.position.x) * 0.05;
    camera.position.z += (Math.cos(angle) * radius - camera.position.z) * 0.05;
    camera.position.y += (2 - scrollProgress * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.12} color="#B8B8B8" />
      <spotLight position={[5, 8, 5]} intensity={1.0} color="#F5F5F2" angle={0.5} penumbra={0.8} castShadow />
      <spotLight position={[-3, 4, -3]} intensity={0.3} color="#B58A62" angle={0.6} penumbra={1} />
      <Environment preset="city" environmentIntensity={0.15} />

      <group ref={groupRef}>
        {/* Stage 0: Raw aluminium profile (long extrusion) */}
        <group visible={stage <= 1}>
          <mesh
            material={materials.rawAluminium}
            position={[0, 0, 0]}
            scale={[
              1,
              1,
              stage === 0 ? 1 + stageProgress * 0.5 : 1.5 - stageProgress * 0.5,
            ]}
          >
            <boxGeometry args={[0.15, 2.5, 4]} />
          </mesh>
          {/* Second profile rail */}
          <mesh material={materials.rawAluminium} position={[0.5, 0, 0]}>
            <boxGeometry args={[0.15, 2.5, 4]} />
          </mesh>
        </group>

        {/* Stage 1-2: Cutting / Machining — profiles get shorter, corners appear */}
        <group visible={stage >= 1 && stage <= 3}>
          {/* Four cut profile pieces forming frame shape */}
          {/* Top */}
          <mesh
            material={materials.cutAluminium}
            position={[0, 1.2, 0]}
            scale={stage >= 2 ? [1, 1, 1] : [1, 1, stageProgress]}
          >
            <boxGeometry args={[2.4, 0.15, 0.6]} />
          </mesh>
          {/* Bottom */}
          <mesh
            material={materials.cutAluminium}
            position={[0, -1.2, 0]}
            scale={stage >= 2 ? [1, 1, 1] : [1, 1, stageProgress]}
          >
            <boxGeometry args={[2.4, 0.15, 0.6]} />
          </mesh>
          {/* Left */}
          <mesh
            material={materials.cutAluminium}
            position={[-1.12, 0, 0]}
            scale={stage >= 2 ? [1, 1, 1] : [1, stageProgress, 1]}
          >
            <boxGeometry args={[0.15, 2.55, 0.6]} />
          </mesh>
          {/* Right */}
          <mesh
            material={materials.cutAluminium}
            position={[1.12, 0, 0]}
            scale={stage >= 2 ? [1, 1, 1] : [1, stageProgress, 1]}
          >
            <boxGeometry args={[0.15, 2.55, 0.6]} />
          </mesh>
        </group>

        {/* Stage 3-4: Assembly + Glass insertion */}
        <group visible={stage >= 3 && stage <= 5}>
          {/* Assembled dark frame */}
          <group>
            <mesh material={materials.darkFrame} position={[0, 1.2, 0]}>
              <boxGeometry args={[2.6, 0.14, 0.5]} />
            </mesh>
            <mesh material={materials.darkFrame} position={[0, -1.2, 0]}>
              <boxGeometry args={[2.6, 0.14, 0.5]} />
            </mesh>
            <mesh material={materials.darkFrame} position={[-1.23, 0, 0]}>
              <boxGeometry args={[0.14, 2.54, 0.5]} />
            </mesh>
            <mesh material={materials.darkFrame} position={[1.23, 0, 0]}>
              <boxGeometry args={[0.14, 2.54, 0.5]} />
            </mesh>
          </group>
          {/* Glass — slides in during stage 4 */}
          <mesh
            material={materials.glass}
            position={[
              0,
              stage === 3 ? 3 - stageProgress * 3 : 0,
              0,
            ]}
            scale={stage >= 4 ? [1, 1, 1] : [1, Math.max(0.01, stageProgress), 1]}
          >
            <boxGeometry args={[2.2, 2.2, 0.04]} />
          </mesh>
          {/* Handle appears in stage 4 */}
          {stage >= 4 && (
            <group position={[1.0, 0, 0.28]}>
              <mesh material={materials.accent}>
                <boxGeometry args={[0.06, 0.18, 0.04]} />
              </mesh>
              <mesh material={materials.accent} position={[0, 0.12, 0.02]}>
                <boxGeometry args={[0.04, 0.12, 0.04]} />
              </mesh>
            </group>
          )}
        </group>

        {/* Stage 5-6: Finished window + Installed in wall */}
        <group visible={stage >= 5}>
          {/* Wall */}
          {stage >= 6 && (
            <mesh material={materials.wall} position={[0, 0, -0.3]}>
              <boxGeometry args={[5, 4, 0.3]} />
            </mesh>
          )}
          {/* Complete window in wall opening */}
          <group position={[0, 0, stage >= 6 ? 0 : 0]}>
            {/* Frame */}
            <mesh material={materials.darkFrame} position={[0, 1.2, 0]}>
              <boxGeometry args={[2.6, 0.14, 0.5]} />
            </mesh>
            <mesh material={materials.darkFrame} position={[0, -1.2, 0]}>
              <boxGeometry args={[2.6, 0.14, 0.5]} />
            </mesh>
            <mesh material={materials.darkFrame} position={[-1.23, 0, 0]}>
              <boxGeometry args={[0.14, 2.54, 0.5]} />
            </mesh>
            <mesh material={materials.darkFrame} position={[1.23, 0, 0]}>
              <boxGeometry args={[0.14, 2.54, 0.5]} />
            </mesh>
            {/* Glass */}
            <mesh material={materials.glass}>
              <boxGeometry args={[2.2, 2.2, 0.04]} />
            </mesh>
            {/* Handle */}
            <group position={[1.0, 0, 0.28]}>
              <mesh material={materials.accent}>
                <boxGeometry args={[0.06, 0.18, 0.04]} />
              </mesh>
              <mesh material={materials.accent} position={[0, 0.12, 0.02]}>
                <boxGeometry args={[0.04, 0.12, 0.04]} />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.95} />
      </mesh>
    </>
  );
}
```

---

### Task 13: Create Hero Section with 3D Integration
**Files:**
- Create: `components/sections/HeroSection.tsx`

- [ ] **Step 1: Create the hero section component that integrates the 3D scene with headline, CTA, and scroll indicator**

```tsx
// components/sections/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useMousePosition } from "@/lib/useMousePosition";
import { useGSAPScroll } from "@/lib/useGSAPScroll";
import { Scene } from "@/components/3d/Scene";
import { getCompany } from "@/lib/data";

const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false }
);

export function HeroSection() {
  const { t } = useLanguage();
  const company = getCompany();
  const mouse = useMousePosition();
  const { containerRef, progress } = useGSAPScroll("top top", "bottom top");
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  // Close portfolio dropdown on outside click
  useEffect(() => {
    if (!portfolioOpen) return;
    const handler = () => setPortfolioOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [portfolioOpen]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Scene
          className="h-full w-full"
          fov={45}
          cameraPosition={[0, 0.5, 8]}
          fallbackContent={
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-[#111] to-[#0B0B0B]" />
          }
        >
          <HeroScene scrollProgress={progress} mouse={mouse} />
        </Scene>
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

      {/* Content */}
      <div className="container-x relative z-10 flex min-h-screen flex-col items-center justify-center py-20 text-center">
        <div className="mb-4">
          <Image
            src="/logo/ARTSER_logo.png"
            alt={company.name}
            width={280}
            height={100}
            className="mx-auto h-auto w-auto max-h-20"
            priority
          />
        </div>

        <div className="mt-2 flex flex-col items-center">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase font-bold mb-4 text-foreground/70">
            {t("hero.slogan")}
          </p>
          <div className="w-8 h-[2px] bg-[#B58A62]" />
        </div>

        <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight max-w-4xl">
          {t("hero.headline")}
        </h1>

        <p className="mt-6 max-w-2xl text-base md:text-lg text-foreground/70">
          {t("hero.subheadline")}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPortfolioOpen((o) => !o)}
              className="btn-accent inline-flex items-center gap-2"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              {t("hero.downloadPortfolio")}
            </button>
            {portfolioOpen && (
              <div className="absolute start-0 top-full mt-2 z-20 min-w-[220px] rounded-lg border border-border bg-surface p-2 shadow-xl">
                <a
                  href="/portfolio/ART_SER_Portfolio_EN .pdf"
                  download="ART_SER_Portfolio_EN.pdf"
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition hover:bg-accent/10 hover:text-accent"
                  onClick={() => setPortfolioOpen(false)}
                >
                  Portfolio — English
                </a>
                <a
                  href="/portfolio/ART_SER_Portafoglio_IT.pdf"
                  download="ART_SER_Portafoglio_IT.pdf"
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition hover:bg-accent/10 hover:text-accent"
                  onClick={() => setPortfolioOpen(false)}
                >
                  Portafoglio — Italiano
                </a>
              </div>
            )}
          </div>
          <Link href="/portfolio" className="btn-outline">
            {t("hero.ctaSecondary")}
          </Link>
        </div>

        <button
          onClick={() => document.getElementById("content-start")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-16 hidden sm:flex flex-col items-center gap-2 text-foreground/50 transition hover:text-accent"
        >
          <span className="text-xs tracking-widest uppercase font-bold">
            {t("hero.scrollIndicator")}
          </span>
          <div className="animate-bounce">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
}
```

---

### Task 14: Create Material Section with 3D Integration
**Files:**
- Create: `components/sections/MaterialSection.tsx`

- [ ] **Step 1: Create the material/engineering section with scroll-driven 3D exploded profile and step labels**

```tsx
// components/sections/MaterialSection.tsx
"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useGSAPScroll } from "@/lib/useGSAPScroll";
import { Scene } from "@/components/3d/Scene";

const MaterialScene = dynamic(
  () => import("@/components/3d/MaterialScene").then((m) => ({ default: m.MaterialScene })),
  { ssr: false }
);

const STEPS = [
  { key: "material.step1", descKey: "material.step1Desc", num: "01" },
  { key: "material.step2", descKey: "material.step2Desc", num: "02" },
  { key: "material.step3", descKey: "material.step3Desc", num: "03" },
  { key: "material.step4", descKey: "material.step4Desc", num: "04" },
  { key: "material.step5", descKey: "material.step5Desc", num: "05" },
] as const;

export function MaterialSection() {
  const { t } = useLanguage();
  const { containerRef, progress } = useGSAPScroll("top 80%", "bottom 20%");

  // Determine which step is active based on scroll progress
  const activeStep = Math.min(4, Math.floor(progress * 5));

  return (
    <section ref={containerRef} className="relative py-24 md:py-32" id="material-section">
      <div className="container-x">
        {/* Section label */}
        <p className="text-xs tracking-[0.3em] uppercase text-accent font-bold mb-3">
          {t("material.sectionLabel")}
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t("material.title")}
        </h2>
        <p className="text-base text-muted max-w-2xl mb-12">
          {t("material.subtitle")}
        </p>

        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Left: 3D scene */}
          <div className="relative aspect-square max-h-[500px]">
            <Scene
              className="h-full w-full rounded-xl overflow-hidden"
              fov={40}
              cameraPosition={[0, 0, 5]}
              fallbackContent={
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                      <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                      </svg>
                    </div>
                    <p className="text-sm text-muted">{t("material.title")}</p>
                  </div>
                </div>
              }
            >
              <MaterialScene scrollProgress={progress} />
            </Scene>

            {/* Technical labels — positioned around the 3D scene */}
            <div
              className="absolute top-[15%] start-[5%] text-xs tracking-wider uppercase text-accent/70 transition-opacity duration-500"
              style={{ opacity: progress > 0.3 ? 1 : 0 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-[1px] bg-accent/40" />
                {t("material.labelProfile")}
              </div>
            </div>
            <div
              className="absolute top-[40%] end-[5%] text-xs tracking-wider uppercase text-accent/70 transition-opacity duration-500"
              style={{ opacity: progress > 0.45 ? 1 : 0 }}
            >
              <div className="flex items-center gap-2">
                {t("material.labelGlass")}
                <div className="w-6 h-[1px] bg-accent/40" />
              </div>
            </div>
            <div
              className="absolute bottom-[35%] start-[5%] text-xs tracking-wider uppercase text-accent/70 transition-opacity duration-500"
              style={{ opacity: progress > 0.55 ? 1 : 0 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-[1px] bg-accent/40" />
                {t("material.labelThermalBreak")}
              </div>
            </div>
            <div
              className="absolute bottom-[20%] end-[5%] text-xs tracking-wider uppercase text-accent/70 transition-opacity duration-500"
              style={{ opacity: progress > 0.65 ? 1 : 0 }}
            >
              <div className="flex items-center gap-2">
                {t("material.labelGasket")}
                <div className="w-6 h-[1px] bg-accent/40" />
              </div>
            </div>
          </div>

          {/* Right: Step progression */}
          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <div
                key={step.key}
                className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-500 ${
                  i === activeStep
                    ? "bg-accent/10 border border-accent/20"
                    : i < activeStep
                      ? "opacity-60"
                      : "opacity-30"
                }`}
              >
                <span
                  className={`text-2xl font-bold tabular-nums transition-colors duration-500 ${
                    i === activeStep ? "text-accent" : "text-muted"
                  }`}
                >
                  {step.num}
                </span>
                <div>
                  <h3
                    className={`text-sm font-bold tracking-wider uppercase transition-colors duration-500 ${
                      i === activeStep ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {t(step.key)}
                  </h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed">
                    {t(step.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 15: Create "From Profile to Architecture" Section
**Files:**
- Create: `components/sections/ProfileToArchitectureSection.tsx`

- [ ] **Step 1: Create the signature scroll-driven 3D manufacturing sequence section**

```tsx
// components/sections/ProfileToArchitectureSection.tsx
"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useGSAPScroll } from "@/lib/useGSAPScroll";
import { Scene } from "@/components/3d/Scene";

const ProfileToArchitectureScene = dynamic(
  () =>
    import("@/components/3d/ProfileToArchitectureScene").then((m) => ({
      default: m.ProfileToArchitectureScene,
    })),
  { ssr: false }
);

const STAGES = [
  { labelKey: "process.profileStage1", num: "01" },
  { labelKey: "process.profileStage2", num: "02" },
  { labelKey: "process.profileStage3", num: "03" },
  { labelKey: "process.profileStage4", num: "04" },
  { labelKey: "process.profileStage5", num: "05" },
  { labelKey: "process.profileStage6", num: "06" },
  { labelKey: "process.profileStage7", num: "07" },
] as const;

export function ProfileToArchitectureSection() {
  const { t } = useLanguage();
  const { containerRef, progress } = useGSAPScroll("top top", "bottom bottom");

  const activeStage = Math.min(6, Math.floor(progress * 7));

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: "400vh" }} /* Tall section to give scroll room for the sequence */
    >
      {/* Sticky container — stays in viewport as user scrolls */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* 3D scene — full viewport background */}
        <div className="absolute inset-0">
          <Scene
            className="h-full w-full"
            fov={40}
            cameraPosition={[0, 2, 6]}
            fallbackContent={
              <div className="flex items-center justify-center h-full bg-gradient-to-b from-[#0B0B0B] to-[#111]">
                <div className="text-center px-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {t("process.profileTitle")}
                  </h2>
                  <p className="text-muted max-w-lg mx-auto">{t("process.profileSubtitle")}</p>
                </div>
              </div>
            }
          >
            <ProfileToArchitectureScene scrollProgress={progress} />
          </Scene>
        </div>

        {/* Overlay content */}
        <div className="relative z-10 container-x w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left: Title + current stage */}
            <div className="max-w-md">
              <p className="text-xs tracking-[0.3em] uppercase text-accent font-bold mb-3">
                {t("process.profileLabel")}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("process.profileTitle")}
              </h2>
              <p className="text-base text-foreground/60">
                {t("process.profileSubtitle")}
              </p>
            </div>

            {/* Right: Stage indicators */}
            <div className="flex flex-col gap-2">
              {STAGES.map((stage, i) => (
                <div
                  key={stage.num}
                  className={`flex items-center gap-3 px-3 py-1.5 rounded transition-all duration-500 ${
                    i === activeStage
                      ? "bg-accent/15 text-accent"
                      : i < activeStage
                        ? "text-foreground/40"
                        : "text-foreground/20"
                  }`}
                >
                  <span className="text-xs font-bold tabular-nums w-5">{stage.num}</span>
                  <div
                    className={`w-6 h-[2px] transition-all duration-500 ${
                      i === activeStage ? "bg-accent" : "bg-foreground/10"
                    }`}
                  />
                  <span className="text-xs tracking-wider uppercase font-medium">
                    {t(stage.labelKey)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar at bottom */}
          <div className="absolute bottom-8 left-0 right-0 px-6">
            <div className="h-[2px] w-full bg-foreground/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300 rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 16: Add Translation Keys for Profile-to-Architecture Section
**Files:**
- Modify: `translations/en.json`
- Modify: `translations/it.json`
- Modify: `translations/ar.json`
- Modify: `translations/ur.json`

- [ ] **Step 1: Add the Profile-to-Architecture translation keys to en.json**

Add these keys (before the final closing `}`):

```json
  "process.profileLabel": "SIGNATURE EXPERIENCE",
  "process.profileTitle": "From Profile to Architecture",
  "process.profileSubtitle": "Watch the transformation — from raw aluminium extrusion to installed architectural element.",
  "process.profileStage1": "Raw Profile",
  "process.profileStage2": "Cutting",
  "process.profileStage3": "Machining",
  "process.profileStage4": "Assembly",
  "process.profileStage5": "Glass Integration",
  "process.profileStage6": "Finished System",
  "process.profileStage7": "Installed"
```

- [ ] **Step 2: Add the Profile-to-Architecture translation keys to it.json**

```json
  "process.profileLabel": "ESPERIENZA ESCLUSIVA",
  "process.profileTitle": "Dal Profilo all'Architettura",
  "process.profileSubtitle": "Osserva la trasformazione — dall'estruso grezzo in alluminio all'elemento architettonico installato.",
  "process.profileStage1": "Profilo Grezzo",
  "process.profileStage2": "Taglio",
  "process.profileStage3": "Lavorazione",
  "process.profileStage4": "Assemblaggio",
  "process.profileStage5": "Integrazione Vetro",
  "process.profileStage6": "Sistema Finito",
  "process.profileStage7": "Installato"
```

- [ ] **Step 3: Add the Profile-to-Architecture translation keys to ar.json**

```json
  "process.profileLabel": "تجربة مميزة",
  "process.profileTitle": "من البروفيل إلى العمارة",
  "process.profileSubtitle": "شاهد التحول — من قضيب الألمنيوم الخام إلى العنصر المعماري المُثبّت.",
  "process.profileStage1": "بروفيل خام",
  "process.profileStage2": "قص",
  "process.profileStage3": "تشغيل آلي",
  "process.profileStage4": "تجميع",
  "process.profileStage5": "دمج الزجاج",
  "process.profileStage6": "نظام مكتمل",
  "process.profileStage7": "مُثبّت"
```

- [ ] **Step 4: Add the Profile-to-Architecture translation keys to ur.json**

```json
  "process.profileLabel": "خصوصی تجربہ",
  "process.profileTitle": "پروفائل سے فن تعمیر تک",
  "process.profileSubtitle": "تبدیلی دیکھیں — خام ایلومینیم پروفائل سے نصب شدہ تعمیراتی عنصر تک۔",
  "process.profileStage1": "خام پروفائل",
  "process.profileStage2": "کٹنگ",
  "process.profileStage3": "مشینی کام",
  "process.profileStage4": "اسمبلی",
  "process.profileStage5": "شیشے کا انضمام",
  "process.profileStage6": "مکمل نظام",
  "process.profileStage7": "نصب شدہ"
```

---

### Task 17: Remove Old Construction3DBackground
**Files:**
- Delete: `components/Construction3DBackground.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Remove the Construction3DBackground import and usage from layout.tsx**

In `app/layout.tsx`, remove the import line:

```typescript
import { Construction3DBackground } from "@/components/Construction3DBackground";
```

And remove the component usage inside `<body>`:

```tsx
<Construction3DBackground />
```

The resulting layout.tsx should look like:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { DoorIntro } from "@/components/DoorIntro";

export const metadata: Metadata = {
  title: "ARTSER — Engineering, Manufacturing & Construction",
  description:
    "ARTSER is an integrated industrial and construction group delivering manufacturing, infrastructure, and government-grade projects.",
  icons: { icon: "/logo/ARTSER_logo.png" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-theme="crane" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration='manual';window.scrollTo(0,0);` }} />
      </head>
      <body suppressHydrationWarning>
        <DoorIntro />
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col overflow-x-hidden">
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <div className="flex flex-1 flex-col min-w-0">
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </div>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Delete the old Construction3DBackground component file**

```bash
rm "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser/components/Construction3DBackground.tsx"
```

---

### Task 18: Update Homepage to Use New Section Components
**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace the hero section in page.tsx with the new HeroSection component, add the MaterialSection and ProfileToArchitectureSection**

The hero `<section>` block (approximately lines 97-193 in the current file) should be replaced with the `<HeroSection />` component. The existing founder/about section should be replaced with `<MaterialSection />` followed by `<ProfileToArchitectureSection />` (the existing services/projects/clients/suppliers/products sections remain unchanged for now).

Add the imports at the top of the file:

```tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { MaterialSection } from "@/components/sections/MaterialSection";
import { ProfileToArchitectureSection } from "@/components/sections/ProfileToArchitectureSection";
```

Replace the hero section and founder section with:

```tsx
      <HeroSection />

      <div id="content-start" />

      <MaterialSection />

      <ProfileToArchitectureSection />
```

Keep all remaining sections (Services flip cards, Featured projects, Clients, Suppliers, Products showcase) as they are.

---

### Task 19: Create 3D Directory Index Export
**Files:**
- Create: `components/3d/index.ts`

- [ ] **Step 1: Create barrel export for all 3D components**

```typescript
// components/3d/index.ts
export { Scene } from "./Scene";
export { WebGLFallback } from "./WebGLFallback";
export { AluminiumProfile } from "./AluminiumProfile";
export { WindowSystem } from "./WindowSystem";
export { HeroScene } from "./HeroScene";
export { MaterialScene } from "./MaterialScene";
export { ProfileToArchitectureScene } from "./ProfileToArchitectureScene";
```

---

### Task 20: Create Sections Directory Index Export
**Files:**
- Create: `components/sections/index.ts`

- [ ] **Step 1: Create barrel export for section components**

```typescript
// components/sections/index.ts
export { HeroSection } from "./HeroSection";
export { MaterialSection } from "./MaterialSection";
export { ProfileToArchitectureSection } from "./ProfileToArchitectureSection";
```

---

### Task 21: Add R3F Type Declarations
**Files:**
- Modify: `tsconfig.json` (if needed)
- Create: `types/r3f.d.ts`

- [ ] **Step 1: Create R3F JSX type augmentation to avoid TypeScript errors with R3F intrinsic elements**

```typescript
// types/r3f.d.ts
import { ThreeElements } from "@react-three/fiber";

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}
```

- [ ] **Step 2: Verify the types directory is included in tsconfig.json**

Check that `tsconfig.json` includes the `types` directory. If it uses `include: ["**/*.ts", "**/*.tsx"]` or similar glob, this should already be covered. If not, add `"types/**/*.d.ts"` to the include array.

---

### Task 22: Remove Unused 3D CSS Styles
**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Remove the `.construction-3d-bg` CSS class from globals.css**

Search for `.construction-3d-bg` in `app/globals.css` and remove its rule block. This class was used by the old `Construction3DBackground` component.

---

### Task 23: Verify Build and Fix TypeScript Errors
**Files:**
- No new files

- [ ] **Step 1: Run the TypeScript type checker**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
npx tsc --noEmit
```

Fix any TypeScript errors that arise. Common issues to watch for:
- R3F intrinsic element types (should be solved by Task 21)
- GSAP module import types
- Missing translation keys referenced in components
- React 19 type compatibility with R3F

- [ ] **Step 2: Run the Next.js build**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
npm run build
```

Fix any build errors. The most likely issues:
- Dynamic imports need correct paths
- Server/client component boundary issues (all 3D components must be `"use client"`)
- Ensure `getCompany()` and other data loaders work in client components (they may need to be called at the page level and passed as props)

- [ ] **Step 3: Run dev server and verify in browser**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
npm run dev
```

Manually verify:
- Homepage loads without console errors
- Hero 3D scene renders (dark scene with window system)
- Mouse movement causes subtle camera shift in hero
- Scrolling past hero causes window to explode slightly
- Material section shows profile with scroll-driven exploded view
- Profile-to-Architecture section sticky scroll works
- Mobile viewport shows fallback instead of 3D
- `prefers-reduced-motion` shows static fallback

---

### Task 24: Commit Phase 3 Changes
**Files:**
- No new files

- [ ] **Step 1: Stage all new and modified files**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
git add \
  package.json package-lock.json \
  lib/webgl.ts lib/useGSAPScroll.ts lib/useMousePosition.ts \
  components/3d/WebGLFallback.tsx components/3d/Scene.tsx components/3d/materials.ts \
  components/3d/AluminiumProfile.tsx components/3d/WindowSystem.tsx \
  components/3d/HeroScene.tsx components/3d/MaterialScene.tsx \
  components/3d/ProfileToArchitectureScene.tsx components/3d/index.ts \
  components/sections/HeroSection.tsx components/sections/MaterialSection.tsx \
  components/sections/ProfileToArchitectureSection.tsx components/sections/index.ts \
  types/r3f.d.ts \
  app/layout.tsx app/page.tsx app/globals.css \
  translations/en.json translations/it.json translations/ar.json translations/ur.json
```

- [ ] **Step 2: Commit**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
git commit -m "feat: Phase 3 — 3D & animation integration with R3F, GSAP ScrollTrigger

- Install @react-three/fiber, @react-three/drei, gsap
- Add WebGL detection, fallback, and reduced-motion support
- Create shared Scene wrapper with error boundary and Suspense
- Add procedural AluminiumProfile and WindowSystem 3D components
- Create HeroScene with mouse interaction and scroll-driven camera
- Create MaterialScene with scroll-driven exploded view
- Create ProfileToArchitectureScene scroll-driven manufacturing sequence
- Add HeroSection, MaterialSection, ProfileToArchitectureSection components
- Integrate GSAP ScrollTrigger for scroll-progress-driven 3D animation
- Remove old Construction3DBackground
- Add translation keys for profile-to-architecture in all 4 languages"
```

---

## File Summary

### New files (16):
- `lib/webgl.ts` — WebGL detection + device tier + reduced motion
- `lib/useGSAPScroll.ts` — GSAP ScrollTrigger hooks for scroll progress
- `lib/useMousePosition.ts` — Normalized mouse position hook
- `components/3d/Scene.tsx` — Shared R3F Canvas wrapper with fallback
- `components/3d/WebGLFallback.tsx` — Static fallback for non-WebGL
- `components/3d/materials.ts` — Shared material factories
- `components/3d/AluminiumProfile.tsx` — Explodable profile geometry
- `components/3d/WindowSystem.tsx` — Window assembly geometry
- `components/3d/HeroScene.tsx` — Hero 3D scene
- `components/3d/MaterialScene.tsx` — Material section 3D scene
- `components/3d/ProfileToArchitectureScene.tsx` — Manufacturing sequence
- `components/3d/index.ts` — Barrel export
- `components/sections/HeroSection.tsx` — Hero with 3D integration
- `components/sections/MaterialSection.tsx` — Material with 3D integration
- `components/sections/ProfileToArchitectureSection.tsx` — Signature scroll experience
- `components/sections/index.ts` — Barrel export
- `types/r3f.d.ts` — R3F TypeScript declarations

### Modified files (6):
- `package.json` — New dependencies
- `app/layout.tsx` — Remove Construction3DBackground
- `app/page.tsx` — Use new section components
- `app/globals.css` — Remove old 3D CSS
- `translations/en.json` — New keys
- `translations/it.json` — New keys
- `translations/ar.json` — New keys
- `translations/ur.json` — New keys

### Deleted files (1):
- `components/Construction3DBackground.tsx`
