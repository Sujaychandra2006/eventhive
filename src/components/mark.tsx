export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M16 3.5 27.5 10v12L16 28.5 4.5 22V10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M16 11.2 21 14v5.6L16 22.4 11 19.6V14Z" fill="currentColor" />
    </svg>
  );
}
