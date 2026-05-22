"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export type ProTone = "indigo" | "violet" | "teal" | "emerald" | "amber" | "rose";

const toneBar: Record<ProTone, string> = {
  indigo: "bg-gradient-to-r from-[#8b7cf8] to-[#a99bf9]",
  violet: "bg-gradient-to-r from-[#b794f6] to-[#d4b5fc]",
  teal: "bg-gradient-to-r from-[#5ec4bc] to-[#8ed9d2]",
  emerald: "bg-gradient-to-r from-[#6bc9a8] to-[#94dbbf]",
  amber: "bg-gradient-to-r from-[#f0b872] to-[#f5c98a]",
  rose: "bg-gradient-to-r from-[#e879a9] to-[#f4a4c4]",
};

const toneIcon: Record<ProTone, string> = {
  indigo: "pro-icon-indigo",
  violet: "pro-icon-violet",
  teal: "pro-icon-teal",
  emerald: "pro-icon-emerald",
  amber: "pro-icon-amber",
  rose: "pro-icon-rose",
};

export function ProCard({
  icon: Icon,
  title,
  description,
  tone = "indigo",
  badge,
  children,
  className,
  hover = true,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: ProTone;
  badge?: string;
  children?: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.article
      whileHover={hover ? { y: -5 } : undefined}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className={cn("pro-card", !hover && "pro-card-static", className)}
    >
      <div className={cn("pro-card-bar", toneBar[tone])} aria-hidden />
      <div className="pro-card-body">
        <div className="flex items-start justify-between gap-3">
          <div className={cn("pro-icon", toneIcon[tone])}>
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
          {badge && (
            <span className="rounded-full bg-primary-soft/80 px-2.5 py-1 font-mono text-[10px] font-semibold text-primary">
              {badge}
            </span>
          )}
        </div>
        <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">{title}</h3>
        <p className="mt-2 min-h-[4.25rem] flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">
          {description}
        </p>
        {children}
      </div>
    </motion.article>
  );
}
