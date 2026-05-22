"use client";

import { motion } from "framer-motion";
import { Brain, Scan, Shield, Sparkles, Zap, BarChart3 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProCard, type ProTone } from "@/components/ui/ProCard";
import { fadeUp, staggerContainer } from "@/lib/motion";

const features: {
  icon: typeof Scan;
  title: string;
  description: string;
  tone: ProTone;
}[] = [
  {
    icon: Scan,
    title: "Frame-perfect tracking",
    description:
      "MediaPipe landmarks on every frame with skeleton overlays that make biomechanics visible.",
    tone: "indigo",
  },
  {
    icon: Brain,
    title: "Exercise-aware AI",
    description:
      "Squats, lunges, and planks each use tuned thresholds for accurate movement analysis.",
    tone: "violet",
  },
  {
    icon: Zap,
    title: "Instant feedback",
    description:
      "Green for correct form. Red highlights the moment your technique starts to break down.",
    tone: "amber",
  },
  {
    icon: Shield,
    title: "Injury prevention",
    description:
      "Catch forward lean and knee drift early before bad habits become muscle memory.",
    tone: "emerald",
  },
  {
    icon: BarChart3,
    title: "Session analytics",
    description:
      "Track scores, spot trends, and review your full workout history in one dashboard.",
    tone: "teal",
  },
  {
    icon: Sparkles,
    title: "AI coaching",
    description:
      "Plain-language feedback focused on your most common form mistakes every session.",
    tone: "rose",
  },
];

export function BentoFeatures() {
  return (
    <Section id="features" variant="muted">
      <SectionHeading
        eyebrow="Platform"
        title="Built for serious form analysis"
        description="Six equal tools in one cohesive workflow — no clutter, no uneven layouts."
        className="mb-12 md:mb-14"
      />

      <motion.div
        className="pro-card-grid"
        variants={staggerContainer}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {features.map((f, i) => (
          <motion.div key={f.title} variants={fadeUp} custom={i} className="h-full">
            <ProCard
              icon={f.icon}
              title={f.title}
              description={f.description}
              tone={f.tone}
            />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
