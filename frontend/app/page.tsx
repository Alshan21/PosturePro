import { Hero } from "@/components/marketing/Hero";
import { ExerciseStrip } from "@/components/marketing/ExerciseStrip";
import { BentoFeatures } from "@/components/marketing/BentoFeatures";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { CTASection } from "@/components/marketing/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <ExerciseStrip />
      <BentoFeatures />
      <HowItWorks />
      <CTASection />
    </>
  );
}
