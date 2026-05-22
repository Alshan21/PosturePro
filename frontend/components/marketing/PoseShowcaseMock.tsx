"use client";

import { motion } from "framer-motion";
import { Activity, CheckCircle2, XCircle, Scan } from "lucide-react";
import { cn } from "@/lib/cn";
import { useMounted } from "@/lib/useMounted";

const Box = (p: React.HTMLAttributes<HTMLDivElement>) => <div {...p} />;

const joints = [
  { x: "50%", y: "14%", ok: true },
  { x: "42%", y: "30%", ok: true },
  { x: "58%", y: "30%", ok: true },
  { x: "38%", y: "44%", ok: false },
  { x: "62%", y: "44%", ok: true },
  { x: "36%", y: "60%", ok: true },
  { x: "64%", y: "60%", ok: true },
  { x: "44%", y: "80%", ok: true },
  { x: "56%", y: "80%", ok: false },
];

const bones: [string, string, string, string, string][] = [
  ["50%", "14%", "42%", "30%", "#34d399"],
  ["50%", "14%", "58%", "30%", "#34d399"],
  ["42%", "30%", "38%", "44%", "#ef4444"],
  ["58%", "30%", "62%", "44%", "#34d399"],
  ["38%", "44%", "36%", "60%", "#34d399"],
  ["62%", "44%", "64%", "60%", "#34d399"],
  ["36%", "60%", "44%", "80%", "#34d399"],
  ["64%", "60%", "56%", "80%", "#ef4444"],
];

export function PoseShowcaseMock() {
  const mounted = useMounted();

  return (
    <Box className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <motion.div
        className="absolute -inset-[1px] rounded-[1.75rem] bg-gradient-to-br from-[#b794f6]/40 via-[#e879a9]/30 to-[#f5b88a]/35 opacity-90 blur-sm"
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <Box className="product-frame-light relative overflow-hidden rounded-[1.75rem]">
        <Box className="flex items-center gap-3 border-b border-border bg-surface-muted/80 px-4 py-3">
          <Box className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </Box>
          <span className="flex-1 text-center text-[11px] font-medium text-ink-faint">
            squat_session.mp4 — Analysis
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-accent-emerald/25 bg-success-muted px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-success">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            Live
          </span>
        </Box>

        <Box className="relative aspect-[4/3] overflow-hidden bg-[#0f1419]">
          <Box
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(rgba(91,141,239,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(91,141,239,0.1) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <Box
            className="scan-line pointer-events-none absolute left-0 right-0 z-20 h-px bg-gradient-to-r from-transparent via-accent-blue to-transparent"
            aria-hidden
          />

          <svg
            viewBox="0 0 200 320"
            className="absolute left-1/2 top-1/2 h-[72%] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          >
            <circle cx="100" cy="40" r="18" />
            <path d="M100 58 L100 140 M70 90 L130 90 M100 140 L75 220 M100 140 L125 220" />
          </svg>

          <svg className="absolute inset-0 h-full w-full" aria-hidden>
            {bones.map(([x1, y1, x2, y2, color], i) => (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 6px ${color})` }}
              />
            ))}
          </svg>

          {joints.map((j, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
                j.ok
                  ? "bg-accent-emerald shadow-[0_0_12px_rgba(52,211,153,0.8)] ring-2 ring-accent-emerald/40"
                  : "bg-danger shadow-[0_0_12px_rgba(239,68,68,0.8)] ring-2 ring-danger/40"
              )}
              style={{ left: j.x, top: j.y }}
              initial={false}
              animate={mounted ? { scale: [0, 1.2, 1] } : undefined}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
            />
          ))}

          <Box className="absolute left-3 top-3 flex items-center gap-2 rounded-lg border border-white/10 bg-black/50 px-2.5 py-1.5 backdrop-blur-md">
            <Scan className="h-3.5 w-3.5 text-accent-blue" />
            <span className="text-[10px] font-semibold text-white/90">Tracking</span>
          </Box>

          <motion.div
            className="absolute right-3 top-3 rounded-lg border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-md"
            initial={false}
            animate={mounted ? { opacity: 1 } : undefined}
          >
            <p className="text-[9px] font-bold uppercase tracking-wider text-white/50">Score</p>
            <p className="font-display text-2xl font-bold text-white">87</p>
          </motion.div>

          <Box className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-md border border-accent-emerald/30 bg-accent-emerald/15 px-2 py-1 text-[10px] font-semibold text-accent-emerald">
              <CheckCircle2 className="h-3 w-3" /> Depth OK
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-danger/30 bg-danger/15 px-2 py-1 text-[10px] font-semibold text-danger">
              <XCircle className="h-3 w-3" /> Knee drift
            </span>
          </Box>
        </Box>
      </Box>

      <motion.div
        className="absolute -right-2 top-1/4 hidden rounded-2xl border border-border bg-surface/95 p-4 shadow-card backdrop-blur-md sm:block"
        initial={false}
        animate={mounted ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.6 }}
      >
        <Activity className="mb-2 h-5 w-5 text-accent-blue" />
        <p className="font-display text-lg font-bold text-ink">MediaPipe</p>
        <p className="text-[10px] text-ink-faint">Pose landmarks</p>
      </motion.div>
    </Box>
  );
}
