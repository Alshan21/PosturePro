"use client";

import { Dumbbell, Footprints, Timer } from "lucide-react";

const exercises = [
  { label: "Squats", icon: Dumbbell },
  { label: "Lunges", icon: Footprints },
  { label: "Planks", icon: Timer },
];

export function ExerciseStrip() {
  return (
    <div className="border-y border-[#b794f6]/10 bg-white/50 py-4 backdrop-blur-md">
      <div className="pro-container flex flex-wrap items-center justify-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
          Supports
        </span>
        {exercises.map((ex) => (
          <span
            key={ex.label}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-ink-secondary shadow-soft"
          >
            <ex.icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
            {ex.label}
          </span>
        ))}
      </div>
    </div>
  );
}
