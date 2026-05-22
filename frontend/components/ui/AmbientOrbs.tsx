"use client";

import { motion } from "framer-motion";
import { glowPulse } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function AmbientOrbs({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <motion.div
        variants={glowPulse}
        animate="animate"
        className="orb orb-blue -left-32 top-0 h-96 w-96"
      />
      <motion.div
        variants={glowPulse}
        animate="animate"
        transition={{ delay: 1 }}
        className="orb orb-purple -right-24 top-1/4 h-80 w-80"
      />
      <motion.div
        variants={glowPulse}
        animate="animate"
        transition={{ delay: 2 }}
        className="orb orb-emerald bottom-0 left-1/3 h-72 w-72"
      />
    </motion.div>
  );
}
