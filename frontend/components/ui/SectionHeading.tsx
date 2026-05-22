"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <p className="pro-kicker">{eyebrow}</p>}
      <h2 className="pro-title mt-3 text-3xl md:text-4xl lg:text-[2.65rem]">{title}</h2>
      {description && (
        <p className="pro-subtitle mt-4 text-base md:text-lg">{description}</p>
      )}
    </motion.div>
  );
}
