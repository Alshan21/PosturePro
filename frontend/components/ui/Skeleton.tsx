"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "rounded",
  width,
  height,
}: SkeletonProps) {
  const variants = {
    text: "h-4 w-full rounded-md",
    circular: "rounded-full",
    rectangular: "rounded-none",
    rounded: "rounded-xl",
  };

  return (
    <motion.div
      className={cn(
        "bg-ink/5 animate-shimmer",
        variants[variant],
        className
      )}
      style={{ width, height }}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="space-y-4 p-6">
      <Skeleton variant="circular" width={48} height={48} />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="40%" />
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? "70%" : "100%"}
        />
      ))}
    </div>
  );
}
