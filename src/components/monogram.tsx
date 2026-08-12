/**
 * The mark: an H carrying a diacritic. It is the one piece of drawn identity on
 * the site, and it points at the work rather than decorating it.
 */
export function Monogram({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      strokeLinecap="square"
    >
      <path
        d="M6 8v12M18 8v12M6 14h12"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <circle cx="18" cy="3.6" r="2" className="fill-accent" />
    </svg>
  );
}
