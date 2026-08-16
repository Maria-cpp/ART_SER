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

    const isSoftware =
      rendererLower.includes("swiftshader") ||
      rendererLower.includes("llvmpipe") ||
      rendererLower.includes("software") ||
      rendererLower.includes("microsoft basic");

    if (isSoftware) {
      return { supported: true, tier: "low" };
    }

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
