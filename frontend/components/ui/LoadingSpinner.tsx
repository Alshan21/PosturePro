"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  return (
    <motion.div
      className={cn(
        "rounded-full border-2 border-accent-blue/30 border-t-accent-blue",
        sizes[size],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function FullPageLoader() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-canvas">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <LoadingSpinner size="lg" />
        <motion.p
          className="text-sm font-medium text-ink-muted"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading…
        </motion.p>
      </motion.div>
    </div>
  );
}
