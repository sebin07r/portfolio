/**
 * Decorative site background: a connected network of electric neurons.
 *
 * Hand-authored SVG - an irregular graph of nodes joined by synapse lines, with
 * a few charges travelling along selected connections. Purely decorative:
 * `aria-hidden`, non-interactive, and held at very low contrast so it can never
 * compete with text. The travelling charges are CSS animations, so the global
 * `prefers-reduced-motion` rule in globals.css stops them outright.
 */

/** Node positions in the 1440x900 design space. */
const NODES: [number, number][] = [
  [80, 120], [240, 60], [380, 180], [150, 300], [320, 380],
  [60, 460], [500, 80], [620, 240], [470, 330], [700, 120],
  [840, 200], [760, 400], [600, 480], [430, 520], [250, 560],
  [100, 680], [300, 760], [500, 660], [680, 620], [860, 520],
  [980, 340], [1120, 180], [1000, 120], [1250, 300], [1150, 460],
  [1300, 560], [1050, 660], [880, 780], [1220, 760], [700, 840],
];

/** Connections between nodes, as 1-based indices into NODES. */
const EDGES: [number, number][] = [
  [1, 2], [2, 3], [1, 4], [3, 5], [4, 5], [4, 6], [2, 7], [7, 8],
  [3, 9], [5, 9], [8, 9], [7, 10], [10, 11], [8, 12], [12, 13], [9, 13],
  [13, 14], [5, 14], [14, 15], [6, 15], [15, 16], [16, 17], [17, 18], [14, 18],
  [18, 19], [13, 19], [19, 20], [12, 20], [20, 21], [11, 21], [21, 22], [22, 23],
  [10, 23], [22, 24], [21, 25], [24, 25], [25, 26], [25, 27], [20, 27], [27, 28],
  [19, 28], [28, 30], [18, 30], [26, 29], [27, 29], [11, 22], [24, 26], [30, 17],
];

/** Edges that carry a visible charge, with a stagger so they never fire in sync. */
const CHARGED: { edge: number; delay: string }[] = [
  { edge: 6, delay: '0s' },
  { edge: 13, delay: '1.4s' },
  { edge: 22, delay: '2.9s' },
  { edge: 30, delay: '4.1s' },
  { edge: 36, delay: '5.6s' },
  { edge: 43, delay: '7.2s' },
];

/** Larger cell bodies that breathe gently. */
const SOMA = new Set([2, 5, 9, 13, 19, 22, 25, 28]);

function line(edge: [number, number]) {
  const [a, b] = edge;
  const [x1, y1] = NODES[a - 1];
  const [x2, y2] = NODES[b - 1];
  return { x1, y1, x2, y2 };
}

export default function NeuronBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Soft radial glows */}
      <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-accent-500/10 blur-[120px]" />
      <div className="absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-violetish-500/10 blur-[130px]" />
      <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-accent-600/[0.07] blur-[120px]" />

      {/* Neuron network */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          {/* Fades the network out toward the bottom so text areas stay clean */}
          <linearGradient id="neuron-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="55%" stopColor="white" stopOpacity="0.45" />
            <stop offset="100%" stopColor="white" stopOpacity="0.15" />
          </linearGradient>
          <mask id="neuron-mask">
            <rect width="1440" height="900" fill="url(#neuron-fade)" />
          </mask>
          <radialGradient id="soma-glow">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g mask="url(#neuron-mask)">
          {/* Resting synapse connections */}
          <g stroke="#22d3ee" strokeOpacity="0.13" strokeWidth="1">
            {EDGES.map((edge, index) => {
              const { x1, y1, x2, y2 } = line(edge);
              return <line key={`e${index}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </g>

          {/* Charges travelling along a handful of connections */}
          <g stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round">
            {CHARGED.map(({ edge, delay }) => {
              const { x1, y1, x2, y2 } = line(EDGES[edge]);
              return (
                <line
                  key={`c${edge}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  strokeDasharray="18 302"
                  className="animate-synapse"
                  style={{ animationDelay: delay }}
                />
              );
            })}
          </g>

          {/* Soma glow behind the larger nodes */}
          <g>
            {NODES.map(([cx, cy], index) =>
              SOMA.has(index + 1) ? (
                <circle key={`g${index}`} cx={cx} cy={cy} r="26" fill="url(#soma-glow)" />
              ) : null,
            )}
          </g>

          {/* Nodes */}
          <g fill="#22d3ee">
            {NODES.map(([cx, cy], index) => {
              const isSoma = SOMA.has(index + 1);
              return (
                <circle
                  key={`n${index}`}
                  cx={cx}
                  cy={cy}
                  r={isSoma ? 4 : 2.2}
                  fillOpacity={isSoma ? 0.55 : 0.3}
                  className={isSoma ? 'animate-pulse-dot' : undefined}
                  style={isSoma ? { animationDelay: `${(index % 5) * 0.7}s` } : undefined}
                />
              );
            })}
          </g>

          {/* A few violet accents so the network is not monochrome */}
          <g fill="#818cf8" fillOpacity="0.35">
            <circle cx={NODES[10][0]} cy={NODES[10][1]} r="3" />
            <circle cx={NODES[16][0]} cy={NODES[16][1]} r="3" />
            <circle cx={NODES[23][0]} cy={NODES[23][1]} r="3" />
          </g>
        </g>
      </svg>

      {/* Vignette to keep the page edges calm */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,6,23,0.55)_100%)]" />
    </div>
  );
}
