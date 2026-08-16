"use client";

interface WebGLFallbackProps {
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
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
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B0B0B] via-[#141414] to-[#0B0B0B]" />
          <div className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(181,138,98,0.3) 59px, rgba(181,138,98,0.3) 60px)",
            }}
          />
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
