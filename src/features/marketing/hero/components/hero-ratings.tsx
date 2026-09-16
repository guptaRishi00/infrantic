import type { Rating } from "../hero.types";

export function HeroRatings({ ratings }: { ratings: readonly Rating[] }) {
  return (
    <ul className="flex items-center gap-5 text-sm text-zinc-600">
      {ratings.map((rating) => (
        <li key={rating.source} className="flex items-center gap-1.5">
          {rating.source === "google" ? <GoogleIcon /> : <TrustpilotStar />}
          <span>
            <span className="font-medium text-zinc-800 tabular-nums">
              {rating.score.toFixed(1)}
            </span>{" "}
            {rating.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="size-4">
      <path
        fill="#FFC107"
        d="M43.6 20.1H42V20H24v8h11.3A12 12 0 1 1 32 15l5.7-5.7A20 20 0 1 0 44 24c0-1.3-.1-2.7-.4-3.9Z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8A12 12 0 0 1 32 15l5.7-5.7A20 20 0 0 0 6.3 14.7Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.5 5A20 20 0 0 0 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.1H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.7-.4-3.9Z"
      />
    </svg>
  );
}

function TrustpilotStar() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <path
        fill="#00B67A"
        d="m12 2.5 2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.4l-6.1 3.5 1.5-6.8-5.2-4.6 6.9-.7L12 2.5Z"
      />
    </svg>
  );
}
