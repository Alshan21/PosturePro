"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Upload, Cpu, LineChart, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProCard } from "@/components/ui/ProCard";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/motion";

const steps = [
  {
    num: "01",
    icon: Upload,
    title: "Upload your video",
    description:
      "Record squats, lunges, or planks on any phone. Drop the file in — we handle the rest.",
    tone: "indigo" as const,
  },
  {
    num: "02",
    icon: Cpu,
    title: "AI maps your skeleton",
    description:
      "MediaPipe tracks joints every frame. OpenCV draws live overlays on your movement.",
    tone: "violet" as const,
  },
  {
    num: "03",
    icon: LineChart,
    title: "Review & improve",
    description:
      "See your score, annotated replay, and coaching tips tailored to what you did wrong.",
    tone: "teal" as const,
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" variant="default">
      <SectionHeading
        eyebrow="Workflow"
        title="Three steps to better form"
        description="No wearables. No markers. Just your camera and computer vision."
        className="mb-12 md:mb-14"
      />

      <motion.div
        className="pro-card-grid !grid-cols-1 md:!grid-cols-3"
        variants={staggerContainer}
        initial={false}
        whileInView="visible"
        viewport={{ once: true }}
      >
        {steps.map((step, i) => (
          <motion.div key={step.title} variants={fadeUp} custom={i} className="h-full">
            <ProCard
              icon={step.icon}
              title={step.title}
              description={step.description}
              tone={step.tone}
              badge={step.num}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial={false}
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 flex justify-center"
      >
        <Link href="/register">
          <Button variant="premium" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
            Try it free
          </Button>
        </Link>
      </motion.div>
    </Section>
  );
}
