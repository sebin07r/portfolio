/**
 * Decorative site background.
 *
 * An original, hand-authored circuit-board SVG pattern (thin traces + small
 * nodes) layered under soft radial glows. Everything here is purely decorative:
 * it is `aria-hidden`, non-interactive, kept at very low contrast so it can
 * never compete with text, and it does not animate.
 */
export default function CircuitBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Soft radial glows */}
      <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-accent-500/10 blur-[120px]" />
      <div className="absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-violetish-500/10 blur-[130px]" />
      <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-accent-600/[0.07] blur-[120px]" />

      {/* Circuit traces */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.5]" width="100%" height="100%">
        <defs>
          <pattern id="circuit-grid" width="180" height="180" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="#22d3ee" strokeOpacity="0.14" strokeWidth="1">
              {/* Horizontal / vertical runs with right-angle turns, like real traces */}
              <path d="M0 40 H60 L80 60 H180" />
              <path d="M0 120 H30 L50 100 H110 L130 120 H180" />
              <path d="M40 0 V25 L60 45 V180" />
              <path d="M140 0 V70 L120 90 V180" />
              <path d="M90 180 V150 L110 130 H180" />
            </g>
            <g fill="#22d3ee" fillOpacity="0.2">
              <circle cx="60" cy="45" r="2.5" />
              <circle cx="130" cy="120" r="2.5" />
              <circle cx="110" cy="130" r="2" />
              <circle cx="50" cy="100" r="2" />
            </g>
            <g fill="none" stroke="#818cf8" strokeOpacity="0.1" strokeWidth="1">
              <path d="M180 20 H150 L130 40 V80" />
              <path d="M0 160 H70 L90 140" />
            </g>
          </pattern>

          {/* Fades the pattern out toward the bottom so text areas stay clean */}
          <linearGradient id="circuit-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.85" />
            <stop offset="55%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0.15" />
          </linearGradient>
          <mask id="circuit-mask">
            <rect width="100%" height="100%" fill="url(#circuit-fade)" />
          </mask>
        </defs>

        <rect width="100%" height="100%" fill="url(#circuit-grid)" mask="url(#circuit-mask)" />
      </svg>

      {/* Vignette to keep the page edges calm */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,6,23,0.55)_100%)]" />
    </div>
  );
}
