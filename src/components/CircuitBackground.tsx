import { motion } from "framer-motion";

// Brand palette
const WIRE = "#3B82F6"; // blue-500  – static traces
const PKT  = "#1E40AF"; // blue-800  – moving packets (darker for visibility on light bg)

// pathLength normalises every path to 1000 units — consistent timing regardless of pixel length
const PL = 1000;
const PK = 90; // packet length in normalised units

const Wire = ({ d }: { d: string }) => (
  <path d={d} fill="none" stroke={WIRE} strokeWidth={1.6}
    strokeLinecap="square" strokeLinejoin="miter" opacity={0.28} />
);

const Pkt = ({ d, dur, delay = 0, gap = 2 }: {
  d: string; dur: number; delay?: number; gap?: number;
}) => (
  <motion.path
    d={d} fill="none" stroke={PKT} strokeWidth={2.6}
    strokeLinecap="round"
    pathLength={PL}
    strokeDasharray={`${PK} ${PL * 14}`}
    animate={{ strokeDashoffset: [0, -(PL + PK)] }}
    transition={{ duration: dur, delay, repeat: Infinity, repeatDelay: gap, ease: "linear" }}
    opacity={0.88}
  />
);

const Node = ({ cx, cy, r = 4.5 }: { cx: number; cy: number; r?: number }) => (
  <motion.circle cx={cx} cy={cy} r={r} fill={WIRE}
    animate={{ opacity: [0.35, 0.65, 0.35] }}
    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
  />
);

const Term = ({ cx, cy, r = 4 }: { cx: number; cy: number; r?: number }) => (
  <circle cx={cx} cy={cy} r={r} fill="none" stroke={WIRE} strokeWidth={1.6} opacity={0.40} />
);

// ─── Corner definitions (all in a 300×300 viewBox) ───────────────────────────
// 4 forward traces + 2 return traces per corner for bidirectional traffic.
// Paths extend slightly off-edge (x=-5 / x=305 / y=-5 / y=305) to enter from off-screen.

interface CornerDef {
  wires:  string[];                        // forward paths only (drawn as static wire)
  fwd:    string[];                        // forward packet paths  [a, b, c, d]
  ret:    string[];                        // return  packet paths  [ar, br]
  nodes:  [number, number, number][];      // [cx, cy, r]
  terms:  [number, number, number][];
}

const DEF: Record<"tl" | "tr" | "bl" | "br", CornerDef> = {

  // ── TOP-LEFT  (corner at 0,0 — packets leave going RIGHT / DOWN) ──
  tl: {
    wires: [
      "M-5,55  H105 V28 H245 V8",
      "M105,55 V95 H185 V68 H310 V50",
      "M-5,105 H65 V78 H168",
      "M65,105 V148 H122 V124 H228",
    ],
    fwd: [
      "M-5,55  H105 V28 H245 V8",
      "M105,55 V95 H185 V68 H310 V50",
      "M-5,105 H65 V78 H168",
      "M65,105 V148 H122 V124 H228",
    ],
    ret: [
      "M245,8  V28 H105 V55 H-5",             // return: ← and ↓ toward corner
      "M310,50 H185 V68 H185 V95 H105 V55 H-5",
    ],
    nodes: [[105,55,5],[65,105,5],[122,124,4],[185,68,4]],
    terms: [[245,8,4.5],[168,78,4],[228,124,4],[310,50,4.5]],
  },

  // ── TOP-RIGHT  (corner at 300,0 — packets leave going LEFT / DOWN) ──
  tr: {
    wires: [
      "M305,55  H195 V28 H55 V8",
      "M195,55  V95 H115 V68 H-10 V50",
      "M305,105 H235 V78 H132",
      "M235,105 V148 H178 V124 H72",
    ],
    fwd: [
      "M305,55  H195 V28 H55 V8",
      "M195,55  V95 H115 V68 H-10 V50",
      "M305,105 H235 V78 H132",
      "M235,105 V148 H178 V124 H72",
    ],
    ret: [
      "M55,8   V28 H195 V55 H305",
      "M-10,50 H115 V68 H115 V95 H195 V55 H305",
    ],
    nodes: [[195,55,5],[235,105,5],[178,124,4],[115,68,4]],
    terms: [[55,8,4.5],[132,78,4],[72,124,4]],
  },

  // ── BOTTOM-LEFT  (corner at 0,300 — packets leave going RIGHT / UP) ──
  bl: {
    wires: [
      "M-5,245  H105 V272 H245 V292",
      "M105,245 V205 H185 V232 H310 V250",
      "M-5,195  H65 V222 H168",
      "M65,195  V152 H122 V176 H228",
    ],
    fwd: [
      "M-5,245  H105 V272 H245 V292",
      "M105,245 V205 H185 V232 H310 V250",
      "M-5,195  H65 V222 H168",
      "M65,195  V152 H122 V176 H228",
    ],
    ret: [
      "M245,292 V272 H105 V245 H-5",
      "M310,250 H185 V232 H185 V205 H105 V245 H-5",
    ],
    nodes: [[105,245,5],[65,195,5],[122,176,4],[185,232,4]],
    terms: [[245,292,4.5],[168,222,4],[228,176,4],[310,250,4.5]],
  },

  // ── BOTTOM-RIGHT  (corner at 300,300 — packets leave going LEFT / UP) ──
  br: {
    wires: [
      "M305,245  H195 V272 H55 V292",
      "M195,245  V205 H115 V232 H-10 V250",
      "M305,195  H235 V222 H132",
      "M235,195  V152 H178 V176 H72",
    ],
    fwd: [
      "M305,245  H195 V272 H55 V292",
      "M195,245  V205 H115 V232 H-10 V250",
      "M305,195  H235 V222 H132",
      "M235,195  V152 H178 V176 H72",
    ],
    ret: [
      "M55,292   V272 H195 V245 H305",
      "M-10,250  H115 V232 H115 V205 H195 V245 H305",
    ],
    nodes: [[195,245,5],[235,195,5],[178,176,4],[115,232,4]],
    terms: [[55,292,4.5],[132,222,4],[72,176,4]],
  },
};

// Tailwind classes applied to every corner SVG
const CLS = "absolute w-40 h-40 sm:w-52 sm:h-52 lg:w-72 lg:h-72";

function Corner({
  corner, pos, delays,
}: {
  corner: keyof typeof DEF;
  pos: string;
  delays: [number, number, number, number, number, number]; // [a,b,c,d, ret1,ret2]
}) {
  const { wires, fwd, ret, nodes, terms } = DEF[corner];
  const [da, db, dc, dd, dr1, dr2] = delays;

  return (
    <svg className={`${CLS} ${pos}`} viewBox="0 0 300 300" fill="none" aria-hidden="true">
      {/* Static wires */}
      {wires.map((d, i) => <Wire key={i} d={d} />)}

      {/* Junction nodes (pulsing filled dots) */}
      {nodes.map(([cx, cy, r]) => <Node key={`n${cx}-${cy}`} cx={cx} cy={cy} r={r} />)}

      {/* Terminal rings (open circles at endpoints) */}
      {terms.map(([cx, cy, r]) => <Term key={`t${cx}-${cy}`} cx={cx} cy={cy} r={r} />)}

      {/* Forward packets — leave the corner */}
      <Pkt d={fwd[0]} dur={1.8} delay={da}  gap={2.5} />
      <Pkt d={fwd[1]} dur={2.2} delay={db}  gap={2.2} />
      <Pkt d={fwd[2]} dur={1.5} delay={dc}  gap={3.0} />
      <Pkt d={fwd[3]} dur={1.7} delay={dd}  gap={2.8} />

      {/* Return packets — travel back toward the corner */}
      <Pkt d={ret[0]} dur={1.9} delay={dr1} gap={3.5} />
      <Pkt d={ret[1]} dur={2.5} delay={dr2} gap={3.2} />
    </svg>
  );
}

// ─── Full-width traversal lines — travel edge-to-edge across the whole section ───
// Rectilinear (H/V only) circuit-style traces, matching the corner aesthetic.
// The track itself stays hidden — only the moving light packet is visible,
// so it reads as a signal jumping between points rather than a drawn line.
const TRAVERSE: { d: string; top: string; dur: number; delay: number; gap: number }[] = [
  {
    d: "M-20,40 H180 V90 H420 V20 H680 V70 H900 V40 H1020",
    top: "18%",
    dur: 5.5,
    delay: 0.3,
    gap: 1.8,
  },
  {
    // mirrored path (start/end swapped) so its packet crosses right-to-left
    d: "M1020,90 H840 V30 H600 V100 H340 V50 H120 V90 H-20",
    top: "48%",
    dur: 6.5,
    delay: 2.0,
    gap: 2.2,
  },
  {
    d: "M-20,70 H260 V20 H520 V90 H760 V40 H1020",
    top: "78%",
    dur: 4.8,
    delay: 1.0,
    gap: 1.5,
  },
];

function TraverseLine({ d, top, dur, delay, gap }: (typeof TRAVERSE)[number]) {
  return (
    // Below `lg` the hero's text/image stack into a single full-width column,
    // so there is no horizontal band that avoids the text — only show these
    // once the 2-column layout (text left, image right) is active, and keep
    // the line confined to the right half where the image lives.
    <svg
      className="hidden lg:block absolute left-1/2 w-1/2 h-32"
      style={{ top }}
      viewBox="0 0 1000 120"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <Pkt d={d} dur={dur} delay={delay} gap={gap} />
    </svg>
  );
}

export default function CircuitBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      <Corner corner="tl" pos="top-0 left-0"     delays={[0.0, 0.7, 1.4, 0.3, 2.2, 3.1]} />
      <Corner corner="tr" pos="top-0 right-0"    delays={[0.4, 1.1, 1.9, 0.8, 2.7, 3.6]} />
      <Corner corner="bl" pos="bottom-0 left-0"  delays={[1.0, 1.8, 0.5, 1.3, 3.4, 1.0]} />
      <Corner corner="br" pos="bottom-0 right-0" delays={[1.5, 0.2, 2.3, 1.9, 4.0, 1.7]} />

      {TRAVERSE.map((t, i) => (
        <TraverseLine key={i} {...t} />
      ))}
    </div>
  );
}
