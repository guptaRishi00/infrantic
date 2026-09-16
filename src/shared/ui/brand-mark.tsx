/** Four joined lobes with a cut-out centre. Colour follows `currentColor`. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M1.5 6.5a5 5 0 0 1 8.9-3.1L12 5.2l1.6-1.8a5 5 0 1 1 7 7L18.8 12l1.8 1.6a5 5 0 1 1-7 7L12 18.8l-1.6 1.8a5 5 0 1 1-7-7L5.2 12 3.4 10.4A5 5 0 0 1 1.5 6.5ZM12 9.2 9.2 12l2.8 2.8 2.8-2.8L12 9.2Z"
      />
    </svg>
  );
}
