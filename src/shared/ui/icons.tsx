// Small line icons shared across sections. All decorative.
type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path {...stroke} d="m3.5 8.3 2.8 2.7 6.2-6.3" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path {...stroke} d="M3.5 8h9M8.5 4l4 4-4 4" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="m8 1.5 1.9 4.1 4.5.5-3.4 3 1 4.4L8 11.2l-4 2.3 1-4.4-3.4-3 4.5-.5L8 1.5Z"
      />
    </svg>
  );
}
