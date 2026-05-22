"use client";

import { motion } from "framer-motion";
import { Dumbbell, PersonStanding, Timer } from "lucide-react";
import { cn } from "@/lib/cn";

const exercises = [
  {
    id: "squats",
    label: "Squats",
    description: "Depth, back angle & knee tracking",
    icon: Dumbbell,
    tone: "pro-icon-indigo",
  },
  {
    id: "lunges",
    label: "Lunges",
    description: "Forward lean & stride depth",
    icon: PersonStanding,
    tone: "pro-icon-violet",
  },
  {
    id: "planks",
    label: "Planks",
    description: "Hip alignment & body line",
    icon: Timer,
    tone: "pro-icon-teal",
  },
] as const;

export type ExerciseId = (typeof exercises)[number]["id"];

export function ExerciseSelector({
  value,
  onChange,
}: {
  value: ExerciseId;
  onChange: (id: ExerciseId) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {exercises.map((ex) => {
        const selected = value === ex.id;
        return (
          <motion.button
            key={ex.id}
            type="button"
            onClick={() => onChange(ex.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex min-h-[7.5rem] flex-col rounded-2xl border p-5 text-left transition-all",
              selected
                ? "border-primary/30 bg-primary-soft shadow-card ring-2 ring-primary/15"
                : "border-border bg-surface hover:border-border-strong hover:shadow-soft"
            )}
          >
            <div className={cn("pro-icon", ex.tone, selected && "!bg-primary !text-white")}>
              <ex.icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <p className="mt-3 font-display text-base font-bold text-ink">{ex.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">{ex.description}</p>
          </motion.button>
        );
      })}
    </div>
  );
}
