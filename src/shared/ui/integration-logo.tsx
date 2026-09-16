import { type ReactNode, useId } from "react";

export type IntegrationId =
  | "slack"
  | "pinwheel"
  | "meta"
  | "mailchimp"
  | "googleAds"
  | "zapier"
  | "aws"
  | "stackedBars"
  | "clickup"
  | "airtable";

// Simplified, decorative renditions of third-party marks. Each render gets a
// unique id prefix so gradients never collide when a logo appears twice.
const logos: Record<IntegrationId, (uid: string) => ReactNode> = {
  slack: () => (
    <svg aria-hidden="true" viewBox="0 0 124 124">
      <path
        fill="#E01E5A"
        d="M26.2 78.6a12.9 12.9 0 1 1-12.9-12.9h12.9v12.9Zm6.5 0a12.9 12.9 0 0 1 25.8 0v32.3a12.9 12.9 0 0 1-25.8 0V78.6Z"
      />
      <path
        fill="#36C5F0"
        d="M45.6 26.8a12.9 12.9 0 1 1 12.9-12.9v12.9H45.6Zm0 6.5a12.9 12.9 0 0 1 0 25.8H13.2a12.9 12.9 0 0 1 0-25.8h32.4Z"
      />
      <path
        fill="#2EB67D"
        d="M97.4 46.2a12.9 12.9 0 1 1 12.9 12.9H97.4V46.2Zm-6.5 0a12.9 12.9 0 0 1-25.8 0V13.9a12.9 12.9 0 0 1 25.8 0v32.3Z"
      />
      <path
        fill="#ECB22E"
        d="M78 98a12.9 12.9 0 1 1-12.9 12.9V98H78Zm0-6.5a12.9 12.9 0 0 1 0-25.8h32.3a12.9 12.9 0 0 1 0 25.8H78Z"
      />
    </svg>
  ),
  pinwheel: () => (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <g strokeWidth="3.2" strokeLinecap="round">
        <path stroke="#4285F4" d="M12 3v18" />
        <path stroke="#EA4335" d="M5.64 5.64l12.72 12.72" />
        <path stroke="#FBBC04" d="M3 12h18" />
        <path stroke="#34A853" d="M18.36 5.64 5.64 18.36" />
      </g>
    </svg>
  ),
  meta: (uid) => (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <defs>
        <linearGradient id={`${uid}-logo-meta`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#0064E1" />
          <stop offset="1" stopColor="#0082FB" />
        </linearGradient>
      </defs>
      <path
        fill="none"
        stroke={`url(#${uid}-logo-meta)`}
        strokeWidth="2.4"
        strokeLinecap="round"
        d="M3 14.3C3 10.2 5 6.8 7.6 6.8c3.6 0 5.6 10.4 9 10.4 1.9 0 3.3-1.7 3.3-4.2 0-3.7-2-6.2-4.3-6.2-3.4 0-5.6 10.4-9.1 10.4C4.4 17.2 3 16.1 3 14.3Z"
      />
    </svg>
  ),
  mailchimp: () => (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="11" fill="#FFE01B" />
      <path
        fill="#241C15"
        d="M7.4 15.6c-.3-3.8 1.6-7.5 5-8.2 2.8-.6 5 1.1 5 3.7 0 1.4-.7 2.4-1.7 2.9.7.9.6 2.6-.6 3.5-1.9 1.4-6.1 1.2-7.7-1.9Z"
      />
      <circle cx="7.6" cy="12.3" r="1.7" fill="#241C15" />
      <circle cx="13.8" cy="11" r="1" fill="#FFE01B" />
      <path
        fill="none"
        stroke="#FFE01B"
        strokeWidth="1"
        strokeLinecap="round"
        d="M11.4 15.3c1 .7 2.3.7 3.2 0"
      />
    </svg>
  ),
  googleAds: () => (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <g strokeWidth="5" strokeLinecap="round">
        <path stroke="#FBBC04" d="M12 5.5 6.8 14.6" />
        <path stroke="#4285F4" d="m12 5.5 5.6 10" />
      </g>
      <circle cx="6.3" cy="17.3" r="2.7" fill="#34A853" />
    </svg>
  ),
  zapier: () => (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <g stroke="#FF4F00" strokeWidth="3.4" strokeLinecap="round">
        <path d="M12 3v18" />
        <path d="M3 12h18" />
        <path d="m5.8 5.8 12.4 12.4" />
        <path d="M18.2 5.8 5.8 18.2" />
      </g>
      <rect x="9.9" y="9.9" width="4.2" height="4.2" rx=".6" fill="#fff" />
    </svg>
  ),
  aws: () => (
    <svg aria-hidden="true" viewBox="0 0 32 22">
      <text
        x="16"
        y="12"
        fill="#252F3E"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="11.5"
        fontWeight="700"
        textAnchor="middle"
      >
        aws
      </text>
      <g
        fill="none"
        stroke="#FF9900"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5.5 15.4c6 3.3 15 3.3 20.5-.2" />
        <path d="m23.4 14.3 2.7.8-.6 2.6" />
      </g>
    </svg>
  ),
  stackedBars: (uid) => (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <defs>
        <linearGradient id={`${uid}-logo-bars`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#60A5FA" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <g fill={`url(#${uid}-logo-bars)`}>
        <path d="M8.6 3h12.2l-2.4 4.4H6.2Z" />
        <path d="M6.9 9.8h9l-2.4 4.4h-9Z" />
        <path d="M5.2 16.6h5.2L8 21H2.8Z" />
      </g>
    </svg>
  ),
  clickup: (uid) => (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <defs>
        <linearGradient id={`${uid}-logo-cu-top`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#FF02F0" />
          <stop offset="1" stopColor="#FFC800" />
        </linearGradient>
        <linearGradient
          id={`${uid}-logo-cu-bottom`}
          x1="0"
          x2="1"
          y1="0"
          y2="0"
        >
          <stop offset="0" stopColor="#8930FD" />
          <stop offset="1" stopColor="#49CCF9" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke={`url(#${uid}-logo-cu-top)`} d="m5.5 12 6.5-6 6.5 6" />
        <path
          stroke={`url(#${uid}-logo-cu-bottom)`}
          d="M4.5 16c2.2 2.4 4.7 3.6 7.5 3.6s5.3-1.2 7.5-3.6"
        />
      </g>
    </svg>
  ),
  airtable: () => (
    <svg aria-hidden="true" viewBox="0 0 200 170">
      <path
        fill="#FFBF00"
        d="M90 12.4 24.1 39.7c-3.7 1.5-3.6 6.7.1 8.2l66.2 26.2a24.6 24.6 0 0 0 18.1 0l66.3-26.2c3.7-1.5 3.7-6.7.1-8.2l-66-27.3a24.6 24.6 0 0 0-18.8 0Z"
      />
      <path
        fill="#26B5F8"
        d="M105.3 88.5v65.6c0 3.1 3.2 5.3 6 4.1l73.9-28.6a4.4 4.4 0 0 0 2.8-4.1V59.8c0-3.1-3.2-5.3-6-4.1l-73.9 28.6a4.4 4.4 0 0 0-2.8 4.1Z"
      />
      <path
        fill="#ED3049"
        d="m88.1 91.8-21.9 10.6-2.3 1.1-46.2 22.2c-2.9 1.4-6.7-.7-6.7-4V60.1c0-1.2.6-2.2 1.4-3a5 5 0 0 1 1.1-.8c1.1-.7 2.7-.8 4-.3l70.2 27.8c3.5 1.4 3.8 6.4.4 8.1Z"
      />
    </svg>
  ),
};

export function IntegrationLogo({
  id,
  className,
}: {
  id: IntegrationId;
  className?: string;
}) {
  const uid = useId();

  return (
    <span aria-hidden="true" className={className}>
      {logos[id](uid)}
    </span>
  );
}
