"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

export function ScoreRing({
  score,
  size = 160,
  stroke = 10,
  success,
  className,
}: {
  score: number;
  size?: number;
  stroke?: number;
  success?: boolean;
  className?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const [displayScore, setDisplayScore] = useState(0);

  const spring = useSpring(0, { stiffness: 60, damping: 18 });
  const offset = useTransform(spring, (v) => circumference - (v / 100) * circumference);

  useEffect(() => {
    spring.set(score);
    const unsub = spring.on("change", (v) => setDisplayScore(Math.round(v)));
    return unsub;
  }, [score, spring]);

  return (
    <motion.div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-ink/8"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset }}
          className={success ? "text-success" : "text-danger"}
        />
      </svg>
      <motion.div
        className="absolute flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="font-display text-4xl font-bold tracking-tight text-ink">
          {displayScore}
        </span>
        <span className="text-xs font-semibold text-ink-muted">/ 100</span>
      </motion.div>
    </motion.div>
  );
}
