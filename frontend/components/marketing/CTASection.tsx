"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/motion";

export function CTASection() {
  return (
    <Section className="!py-12 md:!py-16">
      <motion.div
        className="pro-cta"
        initial={false}
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div
          className="pro-cta-glow -right-16 -top-16 h-64 w-64 bg-[#b794f6]/45"
          aria-hidden
        />
        <div
          className="pro-cta-glow bottom-0 left-1/4 h-48 w-48 bg-[#e879a9]/35"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4b5fc]">
            Ready when you are
          </p>
          <h2 className="pro-title mt-4 text-3xl text-white md:text-4xl lg:text-5xl">
            Your next rep could be your best rep
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-300 md:text-lg">
            Join Posture Pro and turn every workout into actionable biomechanics.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button
                variant="premium"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
                className="!bg-white !text-ink hover:!bg-slate-100"
              >
                Create free account
              </Button>
            </Link>
            <Link href="/upload">
              <Button
                variant="outline"
                size="lg"
                className="!border-white/25 !bg-white/10 !text-white hover:!bg-white/20"
              >
                Upload a video
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
