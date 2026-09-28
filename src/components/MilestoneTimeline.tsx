import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IconType } from "react-icons";

export interface Milestone {
  icon: IconType;
  /** Short date/period shown as a badge, e.g. "2022" or "July 2025" */
  label: string;
  description: string;
}

interface MilestoneTimelineProps {
  milestones: Milestone[];
  /** Label for the marker above the first milestone */
  startLabel?: string;
  /** Label for the marker below the last milestone */
  endLabel?: string;
}

// Every row (start marker, milestone, end marker) centers its dot/icon in a
// column of this width, so the spine — drawn at exactly half that width —
// passes through every node's center regardless of the node's own size.
const NODE_COL = "w-10 sm:w-12";
const SPINE_LEFT = "left-5 sm:left-6";

const TimelineNode: React.FC<{ icon: IconType }> = ({ icon: Icon }) => (
  <motion.div
    initial={{ scale: 0.4, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    className={`relative z-10 flex ${NODE_COL} h-10 sm:h-12 items-center justify-center rounded-full border-4 border-gray-50 bg-gradient-to-br from-primary to-secondary text-white shadow-md`}
  >
    {/* one-shot ripple, played once as the node arrives on screen */}
    <motion.span
      initial={{ scale: 0.8, opacity: 0.5 }}
      whileInView={{ scale: 2, opacity: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      className="absolute inset-0 rounded-full bg-primary"
    />
    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
  </motion.div>
);

const TimelineItem: React.FC<{ milestone: Milestone; index: number }> = ({
  milestone,
  index,
}) => (
  <motion.li
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.5, delay: Math.min(index, 3) * 0.05, ease: "easeOut" }}
    className="flex items-start gap-4 sm:gap-5"
  >
    <div className={`flex-shrink-0 ${NODE_COL} flex items-center justify-center`}>
      <TimelineNode icon={milestone.icon} />
    </div>
    <div className="min-w-0 flex-1 pt-1.5 sm:pt-2.5">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg sm:p-5">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary">
          {milestone.label}
        </span>
        <p className="mt-2 text-sm font-medium text-gray-800 sm:text-base">
          {milestone.description}
        </p>
      </div>
    </div>
  </motion.li>
);

const EndpointMarker: React.FC<{ label: string; pulse?: boolean }> = ({
  label,
  pulse,
}) => (
  <div className="flex items-center gap-4 sm:gap-5">
    <div className={`flex-shrink-0 ${NODE_COL} flex items-center justify-center`}>
      <span className="relative flex h-3 w-3">
        {pulse && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
        )}
        <span
          className={`relative inline-flex h-3 w-3 rounded-full ${
            pulse ? "bg-primary" : "bg-gray-400"
          }`}
        />
      </span>
    </div>
    <span
      className={`text-sm ${
        pulse ? "font-semibold text-primary" : "font-medium text-gray-500"
      }`}
    >
      {label}
    </span>
  </div>
);

const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({
  milestones,
  startLabel = "2021",
  endLabel = "Now",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Standard framer-motion scroll-progress mapping: 0 when the section's top
  // reaches the bottom of the viewport, 1 when its bottom reaches the top —
  // i.e. progress tracks how far the user has scrolled *through* the whole
  // section, which is what drives the line filling top to bottom.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative mx-auto max-w-2xl sm:max-w-3xl">
      {/* base track */}
      <div
        className={`absolute ${SPINE_LEFT} top-0 bottom-0 w-0.5 rounded-full bg-gray-200`}
      />
      {/* scroll-filled progress, grows downward as the section scrolls by */}
      <motion.div
        style={{ scaleY: lineScale }}
        className={`absolute ${SPINE_LEFT} top-0 bottom-0 w-0.5 origin-top rounded-full bg-gradient-to-b from-primary to-secondary`}
      />
      {/* glowing marker tracking the current scroll position */}
      <motion.div
        style={{ top: dotTop, opacity: dotOpacity }}
        className={`absolute ${SPINE_LEFT} z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_3px_rgba(59,130,246,0.55)]`}
      />

      <div className="relative pb-8 sm:pb-10">
        <EndpointMarker label={startLabel} />
      </div>

      <ol className="relative space-y-8 pb-8 sm:space-y-10 sm:pb-10">
        {milestones.map((milestone, index) => (
          <TimelineItem
            key={`${milestone.label}-${index}`}
            milestone={milestone}
            index={index}
          />
        ))}
      </ol>

      <div className="relative">
        <EndpointMarker label={endLabel} pulse />
      </div>
    </div>
  );
};

export default MilestoneTimeline;
