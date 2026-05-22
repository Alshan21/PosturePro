"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function ProgressBar({
  value,
  max = 100,
  color = "emerald",
  label,
  sublabel,
  className,
}: {
  value: number;
  max?: number;
  color?: "emerald" | "danger" | "blue" | "purple";
  label?: string;
  sublabel?: string;
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const fill: Record<string, string> = {
    emerald: "bg-accent-emerald",
    danger: "bg-danger",
    blue: "bg-accent-blue",
    purple: "bg-accent-purple",
  };

  return (
    <motion.div
      className={cn("space-y-2", className)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {(label || sublabel) && (
        <motion.div className="flex justify-between text-xs font-semibold">
          {label && (
            <span
              className={
                color === "danger"
                  ? "text-danger"
                  : color === "emerald"
                    ? "text-success"
                    : "text-ink-secondary"
              }
            >
              {label}
            </span>
          )}
          {sublabel && <span className="text-ink-muted">{sublabel}</span>}
        </motion.div>
      )}
      <motion.div className="h-2 overflow-hidden rounded-full bg-ink/8">
        <motion.div
          className={cn("h-full rounded-full", fill[color])}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
}
