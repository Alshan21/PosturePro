"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/layout/Logo";
import { fadeUp } from "@/lib/motion";
import { useHydrationMotion } from "@/lib/useHydrationMotion";
import { Target, Sparkles, Zap } from "lucide-react";

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  const enter = useHydrationMotion();

  return (
    <div className="flex min-h-screen bg-canvas">
      <div className="relative hidden w-1/2 overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12 pro-page">
        <div className="pro-hero-grid pointer-events-none absolute inset-0" aria-hidden />
        <Logo />
        <motion.div {...enter} variants={fadeUp} className="relative z-10 max-w-md">
          <h2 className="pro-title text-4xl xl:text-5xl">
            Train smarter with <span className="text-gradient">computer vision</span>
          </h2>
          <p className="pro-subtitle mt-6 text-lg">
            Frame-by-frame posture overlays and AI coaching that actually sees your form.
          </p>
          <ul className="mt-10 space-y-4">
            {[
              { v: "99%", l: "Tracking accuracy", icon: Target },
              { v: "3", l: "Exercise modes", icon: Sparkles },
              { v: "<2s", l: "Processing", icon: Zap },
            ].map((s) => (
              <li key={s.l} className="flex items-center gap-4">
                <div className="pro-icon">
                  <s.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-ink">{s.v}</p>
                  <p className="text-sm text-ink-muted">{s.l}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
        <p className="relative z-10 text-xs text-ink-faint">© Posture Pro</p>
      </div>

      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mb-8 lg:hidden">
          <Logo />
        </div>
        <motion.div
          className="pro-panel mx-auto w-full max-w-md p-8 md:p-10"
          {...enter}
          variants={fadeUp}
        >
          <h1 className="pro-title text-3xl">{title}</h1>
          <p className="pro-subtitle mt-2">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
