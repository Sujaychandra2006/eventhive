export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="currentColor" opacity="0.15" />
      <path
        d="M16 5.5 26 11v10L16 26.5 6 21V11Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M16 12.2 20.2 14.6v4.8L16 21.8 11.8 19.4v-4.8Z" fill="currentColor" />
    </svg>
  );
}
