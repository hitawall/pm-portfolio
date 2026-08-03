interface Props {
  className?: string;
}

/* Minimal geometric wordmark glyph: a shuttlecock reduced to its cork base
   (dot) and a five-line feather fan, standing in for the "." after the
   logotype. No literal illustration — same weight as a period, cone-shaped. */
export function ShuttlecockMark({ className }: Props) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M8 12.5 L3 2" />
      <path d="M8 12.5 L5.6 1.3" />
      <path d="M8 12.5 L8 1" />
      <path d="M8 12.5 L10.4 1.3" />
      <path d="M8 12.5 L13 2" />
      <circle cx="8" cy="13.3" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
