"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type CardVariant = "solid" | "glass" | "elevated" | "outline" | "gradient" | "dark";

const variants: Record<CardVariant, string> = {
  solid: "pro-panel",
  glass: "pro-panel-glass",
  elevated: "pro-panel shadow-elevated",
  outline: "rounded-2xl border border-dashed border-border bg-surface-muted/50",
  gradient: "rounded-2xl border border-border bg-gradient-to-br from-indigo-50/80 via-violet-50/50 to-teal-50/40",
  dark: "rounded-2xl border border-midnight-border bg-midnight text-white",
};

export function Card({
  children,
  className,
  variant = "solid",
  hover = false,
  ...motionProps
}: {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
  hover?: boolean;
} & HTMLMotionProps<"div">) {
  return (
    <motion.div
      whileHover={hover ? { y: -3 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn(variants[variant], hover && "transition-shadow hover:shadow-card-hover", className)}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
