"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

const accents = {
  blue: "from-accent-blue to-accent-blue/40",
  purple: "from-accent-purple to-accent-purple/40",
  emerald: "from-accent-emerald to-accent-emerald/40",
  coral: "from-accent-coral to-accent-coral/40",
  amber: "from-accent-amber to-accent-amber/40",
  teal: "from-[#0d9488] to-[#0d9488]/40",
} as const;

const iconTints = {
  blue: "bg-accent-blue/10 text-accent-blue",
  purple: "bg-accent-purple/10 text-accent-purple",
  emerald: "bg-accent-emerald/10 text-accent-emerald",
  coral: "bg-accent-coral/10 text-accent-coral",
  amber: "bg-accent-amber/10 text-accent-amber",
  teal: "bg-[#0d9488]/10 text-[#0d9488]",
} as const;

export type CardAccent = keyof typeof accents;

export function EqualCard({
  icon: Icon,
  title,
  description,
  accent = "blue",
  badge,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: CardAccent;
  badge?: string;
  className?: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className={cn("card-equal group flex h-full min-h-[220px] flex-col", className)}
    >
      <div className={cn("card-equal-accent bg-gradient-to-r", accents[accent])} aria-hidden />
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105",
              iconTints[accent]
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
          {badge && (
            <span className="rounded-full bg-ink/[0.04] px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-ink-faint">
              {badge}
            </span>
          )}
        </div>
        <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">
          {title}
        </h3>
        <p className="mt-2 min-h-[4.5rem] flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">
          {description}
        </p>
      </div>
    </motion.article>
  );
}
