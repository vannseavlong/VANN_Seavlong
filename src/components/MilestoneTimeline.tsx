import React, { useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { IconType } from "react-icons";
import {
  FaWalking,
  FaBicycle,
  FaMotorcycle,
  FaCarSide,
  FaPlane,
  FaRocket,
} from "react-icons/fa";

export type TravelMode = "walk" | "bike" | "motor" | "car" | "plane" | "rocket";

export interface Milestone {
  icon: IconType;
  label: string;
  description: string;
  /** How the timeline "travels" from the previous point to this one */
  indicator: TravelMode;
}

interface MilestoneTimelineProps {
  milestones: Milestone[];
  /** Label shown to the left of the line */
  startLabel?: string;
  /** Label shown to the right of the line */
  endLabel?: string;
  /** vh of scroll distance reserved per milestone while the section is pinned */
  scrollLengthPerMilestone?: number;
}

const TRAVEL_ICONS: Record<TravelMode, IconType> = {
  walk: FaWalking,
  bike: FaBicycle,
  motor: FaMotorcycle,
  car: FaCarSide,
  plane: FaPlane,
  rocket: FaRocket,
};

const TravelIndicator: React.FC<{ mode: TravelMode }> = ({ mode }) => {
  const Icon = TRAVEL_ICONS[mode];

  return (
    <span className="relative inline-flex items-center justify-center">
      {mode === "motor" && (
        <span className="absolute right-full mr-0.5 flex items-center gap-0.5">
          <span className="smoke-puff smoke-puff-1" />
          <span className="smoke-puff smoke-puff-2" />
          <span className="smoke-puff smoke-puff-3" />
        </span>
      )}
      {(mode === "car" || mode === "bike" || mode === "plane" || mode === "rocket") && (
        <span className="absolute right-full mr-0.5 flex flex-col items-end leading-none">
          <span className="speed-dash speed-dash-1">&mdash;</span>
          <span className="speed-dash speed-dash-2">&mdash;</span>
          <span className="speed-dash speed-dash-3">&mdash;</span>
        </span>
      )}
      <Icon
        className={`w-5 h-5 sm:w-6 sm:h-6 text-primary relative z-10 ${
          mode === "walk" ? "walk-step" : ""
        }`}
      />
    </span>
  );
};

const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({
  milestones,
  startLabel = "2021",
  endLabel = "Now",
  scrollLengthPerMilestone = 45,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // exact "passed" index — drives dot/line fill color, flips right when the line reaches it
  const [passedIndex, setPassedIndex] = useState(-1);
  // milestone whose icon+label is on screen right now — mutually exclusive with the traveler
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [segmentMode, setSegmentMode] = useState<TravelMode>(
    milestones[0]?.indicator ?? "walk"
  );
  const [showIndicator, setShowIndicator] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const travelerLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // 0 = start node, last = end node, evenly spaced milestones in between
  const nodePositions = useMemo(() => {
    const n = milestones.length;
    return [0, ...milestones.map((_, i) => (i + 1) / (n + 1)), 1];
  }, [milestones]);

  const arrivalEpsilon = useMemo(() => {
    const gaps = nodePositions.slice(1).map((p, i) => p - nodePositions[i]);
    return Math.min(...gaps) * 0.2;
  }, [nodePositions]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // exact "passed" index — no early snap, stays in lockstep with the blue fill line
    let passed = -1;
    for (let i = 0; i < milestones.length; i++) {
      if (latest >= nodePositions[i + 1]) passed = i;
    }
    setPassedIndex(passed);

    for (let i = 0; i < nodePositions.length - 1; i++) {
      if (latest >= nodePositions[i] && latest <= nodePositions[i + 1]) {
        const mode =
          i < milestones.length
            ? milestones[i].indicator
            : milestones[milestones.length - 1]?.indicator ?? "walk";
        setSegmentMode(mode);
        break;
      }
    }

    // nearest node (by index into nodePositions) decides both whether we've "arrived"
    // and, if so, which milestone that is — computed together so the indicator hiding
    // and the milestone icon appearing can never disagree/desync.
    let nearestK = 0;
    let nearestDist = Infinity;
    nodePositions.forEach((p, k) => {
      const d = Math.abs(latest - p);
      if (d < nearestDist) {
        nearestDist = d;
        nearestK = k;
      }
    });

    const arrived = nearestDist <= arrivalEpsilon;
    setShowIndicator(!arrived);

    if (arrived) {
      // node k (1..n) maps to milestone k-1; node 0 (start) and node n+1 (end) aren't milestones
      const milestoneIdx = nearestK - 1;
      setCurrentIndex(milestoneIdx >= 0 && milestoneIdx < milestones.length ? milestoneIdx : -1);
    } else {
      setCurrentIndex(-1);
    }
  });

  const sectionHeight = `${(milestones.length + 1) * scrollLengthPerMilestone}vh`;

  return (
    <div ref={containerRef} style={{ height: sectionHeight }} className="relative">
      <style jsx global>{`
        @keyframes walkStep {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-2px) rotate(-6deg);
          }
          75% {
            transform: translateY(-2px) rotate(6deg);
          }
        }
        .walk-step {
          animation: walkStep 0.6s ease-in-out infinite;
          transform-origin: bottom center;
        }

        @keyframes smokePuff {
          0% {
            opacity: 0.5;
            transform: translate(0, 0) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(-10px, -8px) scale(1.4);
          }
        }
        .smoke-puff {
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: #9ca3af;
          animation: smokePuff 0.9s ease-out infinite;
        }
        .smoke-puff-1 {
          animation-delay: 0s;
        }
        .smoke-puff-2 {
          animation-delay: 0.3s;
        }
        .smoke-puff-3 {
          animation-delay: 0.6s;
        }

        @keyframes speedDash {
          0% {
            opacity: 0;
            transform: translateX(4px);
          }
          40% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(-8px);
          }
        }
        .speed-dash {
          font-size: 10px;
          color: #93c5fd;
          animation: speedDash 0.7s ease-in-out infinite;
        }
        .speed-dash-1 {
          animation-delay: 0s;
        }
        .speed-dash-2 {
          animation-delay: 0.15s;
        }
        .speed-dash-3 {
          animation-delay: 0.3s;
        }
      `}</style>

      <div className="sticky top-1/2 -translate-y-1/2 flex items-center justify-center">
        {/* No independent max-width/padding here — this fills the page's own `.container`
            (max-w-7xl) so the line lines up with the project cards above it. Just enough
            inner padding so the "2021"/"Now" labels, which sit outside the 0%/100% points,
            don't get clipped at the container edge. */}
        <div className="w-full px-10 sm:px-14">
          <div className="relative h-24 sm:h-32">
            {/* base track */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full" />
            {/* filled progress */}
            <motion.div
              style={{ width: lineWidth }}
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full"
            />

            {/* start point */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-400"
              style={{ left: "0%" }}
            />
            <span
              className="absolute top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500 whitespace-nowrap"
              style={{ left: "0%", transform: "translate(calc(-100% - 10px), -50%)" }}
            >
              {startLabel}
            </span>

            {/* end point */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-400"
              style={{ left: "100%" }}
            />
            <span
              className="absolute top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500 whitespace-nowrap"
              style={{ left: "100%", transform: "translate(10px, -50%)" }}
            >
              {endLabel}
            </span>

            {/* milestone nodes */}
            {milestones.map((milestone, index) => {
              const left = `${nodePositions[index + 1] * 100}%`;
              // dot/line stay filled once passed; icon+label only show for the milestone
              // currently "arrived at" — mutually exclusive with the traveler indicator.
              const isReached = passedIndex >= index;
              const isCurrent = currentIndex === index;
              const Icon = milestone.icon;

              return (
                <div
                  key={`${milestone.label}-${index}`}
                  className="absolute top-1/2 -translate-x-1/2"
                  style={{ left }}
                >
                  {/* point marker, always on the line */}
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: isReached ? "#3B82F6" : "#D1D5DB" }}
                  />

                  {/* icon: sits exactly above the point. Centering lives on this plain wrapper
                      (not the motion.div below) because framer-motion writes its own inline
                      `transform` for the scale animation, which would otherwise silently
                      replace the Tailwind translate-x-1/2 and knock the icon off-center. */}
                  <div className="absolute -translate-x-1/2 bottom-1.5 z-10">
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isCurrent ? 1 : 0,
                        scale: isCurrent ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.2 }}
                      style={{ pointerEvents: isCurrent ? "auto" : "none" }}
                      className="w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-accent text-white flex items-center justify-center shadow-md"
                    >
                      <Icon className="w-3 h-3 sm:w-4.5 sm:h-4.5" />
                    </motion.div>
                  </div>

                  {/* label + description: sits exactly below the point */}
                  <motion.div
                    initial={false}
                    animate={{ opacity: isCurrent ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ pointerEvents: isCurrent ? "auto" : "none" }}
                    className="absolute -translate-x-1/2 top-1.5 w-14 sm:w-32 text-center"
                  >
                    <span className="block text-[9px] sm:text-sm font-semibold text-gray-900 leading-tight">
                      {milestone.label}
                    </span>
                    <span className="block text-[7px] sm:text-xs text-gray-500 leading-tight mt-0.5">
                      {milestone.description}
                    </span>
                  </motion.div>
                </div>
              );
            })}

            {/* traveler indicator: visible only while between points */}
            <motion.div
              style={{ left: travelerLeft }}
              animate={{ opacity: showIndicator ? 1 : 0 }}
              transition={{ duration: 0.15 }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
            >
              <TravelIndicator mode={segmentMode} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneTimeline;
