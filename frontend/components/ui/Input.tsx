"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type InputVariant = "default" | "glass" | "elevated";

const variants: Record<InputVariant, string> = {
  default: "pro-input",
  glass: "pro-input pro-glass",
  elevated: "pro-input shadow-soft",
};

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { variant?: InputVariant }
>(({ className, variant = "default", ...props }, ref) => (
  <input ref={ref} className={cn(variants[variant], className)} {...props} />
));
Input.displayName = "Input";

export const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={cn("mb-2 block text-sm font-medium text-ink-secondary", className)}>
    {children}
  </label>
);
