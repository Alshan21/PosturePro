"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface ProgressIndicatorProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "glow" | "gradient";
  className?: string;
  showLabel?: boolean;
}

const sizes = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-3",
};

const variants = {
  default: "bg-ink/10",
  glow: "bg-ink/10",
  gradient: "bg-ink/10",
};

const fillVariants = {
  default: "bg-accent-blue",
  glow: "bg-accent-blue shadow-glow-blue",
  gradient: "bg-gradient-to-r from-accent-blue via-accent-purple to-accent-emerald",
};

export function ProgressIndicator({
  value,
  max = 100,
  size = "md",
  variant = "default",
  className,
  showLabel = false,
}: ProgressIndicatorProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-ink-muted">Progress</span>
          <span className="font-semibold text-ink">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn("relative overflow-hidden rounded-full", sizes[size], variants[variant])}>
        <motion.div
          className={cn("h-full rounded-full", fillVariants[variant])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: "default" | "glow" | "gradient";
  className?: string;
  showLabel?: boolean;
}

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = "default",
  className,
  showLabel = true,
}: CircularProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const gradientColors = {
    default: "#4f8cff",
    glow: "#4f8cff",
    gradient: "url(#gradient)",
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {variant === "gradient" && (
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f8cff" />
              <stop offset="50%" stopColor="#9b6dff" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
        )}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(14, 18, 24, 0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={gradientColors[variant]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
            filter: variant === "glow" ? "drop-shadow(0 0 8px rgba(79, 140, 255, 0.4))" : undefined,
          }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl font-bold text-ink">
            {Math.round(percentage)}
          </span>
        </div>
      )}
    </div>
  );
}
