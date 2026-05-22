"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  featured = false,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  featured?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn(
        "card-premium group flex h-full flex-col",
        featured && "card-premium-featured",
        className
      )}
    >
      <div
        className={cn(
          "icon-chip",
          featured && "icon-chip-lg"
        )}
      >
        <Icon className={featured ? "h-6 w-6" : "h-5 w-5"} strokeWidth={1.75} />
      </div>
      <h3 className={cn("mt-5 font-display font-semibold tracking-tight text-ink", featured ? "text-xl sm:text-2xl" : "text-lg")}>
        {title}
      </h3>
      <p className={cn("mt-2 flex-1 leading-relaxed text-ink-muted", featured ? "text-base" : "text-sm")}>
        {description}
      </p>
      {children}
    </motion.article>
  );
}
