"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "glow" | "danger" | "premium" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-white shadow-card hover:bg-ink-secondary border border-transparent",
  secondary:
    "bg-white/90 text-ink border border-border hover:border-primary/25 hover:bg-primary-soft/50",
  ghost: "bg-transparent text-ink-secondary hover:text-ink hover:bg-primary-soft/60",
  glow:
    "text-white border-0 bg-gradient-to-r from-[#8b7cf8] via-[#e879a9] to-[#f5b88a] shadow-glow hover:opacity-95",
  danger: "bg-danger text-white hover:opacity-90",
  premium:
    "text-white border-0 bg-gradient-to-r from-[#8b7cf8] via-[#d96ba8] to-[#f0b872] shadow-glow hover:opacity-95 hover:shadow-card-hover",
  outline:
    "bg-white/60 text-ink border border-border hover:border-primary/30 hover:bg-primary-soft/40",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5 rounded-xl",
  md: "h-11 px-5 text-sm gap-2 rounded-xl",
  lg: "h-12 px-7 text-base gap-2 rounded-2xl",
  xl: "h-14 px-8 text-base gap-2.5 rounded-2xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, icon, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        initial={false}
        whileHover={{ y: disabled || loading ? 0 : -2 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all focus-ring disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
