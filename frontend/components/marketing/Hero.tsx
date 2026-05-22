"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useHydrationMotion } from "@/lib/useHydrationMotion";
import { PoseShowcaseMock } from "./PoseShowcaseMock";

const stats = [
  { value: "99.2%", label: "Accuracy" },
  { value: "<2s", label: "Processing" },
  { value: "3", label: "Exercises" },
];

export function Hero() {
  const enter = useHydrationMotion();

  return (
    <section className="pro-hero">
      <div
        className="pro-hero-blob -left-24 top-10 h-72 w-72 bg-[#b794f6]/35"
        aria-hidden
      />
      <div
        className="pro-hero-blob -right-16 top-32 h-80 w-80 bg-[#f5b88a]/30"
        aria-hidden
      />
      <div className="pro-hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="pro-container relative">
        <motion.div
          className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16"
          variants={staggerContainer}
          {...enter}
        >
          <div>
            <motion.div variants={fadeUp} custom={0}>
              <span className="pro-badge">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e879a9] opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8b7cf8]" />
                </span>
                <Sparkles className="h-3.5 w-3.5 text-[#9b8afb]" />
                AI posture · Live analysis
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="pro-title mt-8 text-4xl sm:text-5xl lg:text-6xl"
            >
              Movement intelligence for{" "}
              <span className="text-gradient">every rep</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="pro-subtitle mt-6 max-w-lg text-lg">
              Upload your workout video. Our engine maps your skeleton, scores your form, and
              delivers coaching you can act on immediately.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-wrap gap-4">
              <Link href="/register">
                <Button variant="premium" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                  Start free
                </Button>
              </Link>
              <Link href="/#how-it-works">
                <Button variant="secondary" size="lg" icon={<Play className="h-4 w-4" />}>
                  How it works
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="mt-10 max-w-md">
              <div className="pro-stats-row">
                {stats.map((s) => (
                  <div key={s.label} className="pro-stats-cell">
                    <p className="font-display text-xl font-bold text-ink sm:text-2xl">{s.value}</p>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} custom={5} className="relative animate-float-soft">
            <div
              className="pointer-events-none absolute -inset-10 rounded-full bg-gradient-to-br from-[#b794f6]/25 via-[#e879a9]/15 to-[#f5b88a]/20 blur-3xl"
              aria-hidden
            />
            <PoseShowcaseMock />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
