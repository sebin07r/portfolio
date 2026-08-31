/**
 * Original friendly-developer avatar used for the assistant.
 *
 * Hand-drawn SVG (no stock art, no photo of a real person): a small waving
 * face in the site's dark-blue palette with a cyan accent. Purely decorative -
 * the accessible name lives on the button that wraps it.
 */
export default function Avatar({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      {/* Face */}
      <circle cx="22" cy="22" r="14" fill="#0b2447" stroke="#22d3ee" strokeWidth="2" />
      {/* Hair */}
      <path
        d="M9 19c1.5-7 6.5-11 13-11s11.5 4 13 11c-3.5-2.5-7-4-13-4S12.5 16.5 9 19Z"
        fill="#22d3ee"
        fillOpacity="0.85"
      />
      {/* Eyes */}
      <circle cx="17" cy="23" r="1.9" fill="#e2e8f0" />
      <circle cx="27" cy="23" r="1.9" fill="#e2e8f0" />
      {/* Smile */}
      <path
        d="M17 28.5c1.4 1.9 3.1 2.8 5 2.8s3.6-.9 5-2.8"
        stroke="#e2e8f0"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Waving hand */}
      <g>
        <path
          d="M36 27.5c1.6-2.6 3.2-4.8 4.4-6.1.9-1 2.3-.3 1.9 1-.5 1.6-1.4 3.2-1.9 4.2 1.1-1.5 2.6-3.3 3.5-4.2.9-.9 2.2-.1 1.7 1.1-.9 2.2-2.4 4.7-3.6 6.5-1.3 2-3 3.4-5.3 3.4-2.4 0-4.2-1.4-4.9-3.2-.4-1 .3-1.9 1.3-2 1-.1 2 .3 2.9-.7Z"
          fill="#22d3ee"
        />
      </g>
      {/* Small circuit node, tying the avatar to the site theme */}
      <circle cx="22" cy="38" r="2" fill="#818cf8" />
      <path d="M22 36v-2" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
