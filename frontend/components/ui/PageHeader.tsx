"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function PageHeader({
  kicker,
  title,
  description,
  className,
  action,
}: {
  kicker?: string;
  title: string;
  description?: string;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <motion.header
      variants={fadeUp}
      initial={false}
      animate="visible"
      className={cn("mb-10 md:mb-12", className)}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          {kicker && <p className="pro-kicker">{kicker}</p>}
          <h1 className="pro-title mt-2 text-3xl md:text-4xl lg:text-5xl">{title}</h1>
          {description && (
            <p className="pro-subtitle mt-4 text-base md:text-lg">{description}</p>
          )}
        </div>
        {action}
      </div>
    </motion.header>
  );
}
