"use client";

import { Suspense, useEffect, useState, Component, type ReactNode, type ErrorInfo } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { detectWebGL, prefersReducedMotion, type GPUTier } from "@/lib/webgl";
import { WebGLFallback } from "./WebGLFallback";

/* Error Boundary */

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

/* Loading Spinner */

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

/* Scene Props */

interface SceneProps {
  children: ReactNode;
  className?: string;
  fallbackImage?: string;
  fallbackContent?: ReactNode;
  fov?: number;
  cameraPosition?: [number, number, number];
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
