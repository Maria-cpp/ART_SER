// Line icons for the home "Discover our products" showcase. Stroke = currentColor.

const PATHS: Record<string, React.ReactNode> = {
  window: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
      <path d="M12 3.5v17M7.5 7l3 3" />
    </>
  ),
  door: (
    <>
      <rect x="6.5" y="3.5" width="11" height="17" rx="1" />
      <path d="M14 12v.01" />
    </>
  ),
  sliding: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="1" />
      <path d="M12 5v14M8.5 10l3 2-3 2" />
    </>
  ),
  facade: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="1" />
      <path d="M12 3.5v17M4 12h16M4 8h16M4 16h16" />
    </>
  ),
  conservatory: (
    <>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 11v9h12v-9M12 11v9" />
    </>
  ),
  smart: (
    <>
      <path d="M5 12a9 9 0 0 1 14 0" />
      <path d="M7.5 14.5a5.5 5.5 0 0 1 9 0" />
      <path d="M10 17a2.5 2.5 0 0 1 4 0" />
      <circle cx="12" cy="19.5" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  all: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <path d="M12 8v8M8 12h8" />
    </>
  )
};

export function CategoryIcon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {PATHS[name] ?? PATHS.all}
    </svg>
  );
}
