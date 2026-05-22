"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Sparkles,
  XCircle,
  Activity,
  Zap,
} from "lucide-react";
import { apiUrl } from "@/lib/api";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { PageHeader } from "@/components/ui/PageHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { FullPageLoader } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";

interface AnalysisData {
  _id: string;
  exercise_type: string;
  processed_video: string;
  score: number;
  feedback: string;
  status: string;
  correct_frames?: number;
  total_frames?: number;
}

export default function ResultPage() {
  const { id } = useParams();
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchResult = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const res = await axios.get(apiUrl(`/api/analyses/${id}`), {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchResult();
  }, [id, router]);

  if (loading) return <FullPageLoader />;

  if (!data) {
    return (
      <div className="pro-page flex min-h-[60vh] items-center justify-center px-6">
        <EmptyState
          icon={XCircle}
          title="Session not found"
          description="This analysis doesn't exist or was removed."
          action={{
            label: "Back to dashboard",
            onClick: () => router.push("/dashboard"),
          }}
        />
      </div>
    );
  }

  const isCorrect = data.status === "Correct";
  const videoSrc = apiUrl(`/${data.processed_video}`);
  const correctFrames = data.correct_frames ?? 0;
  const totalFrames = data.total_frames || 1;
  const incorrectFrames = totalFrames - correctFrames;

  return (
    <div className="pro-page pb-16">
      <div className="border-b border-border bg-white/80 backdrop-blur-md">
        <div className="pro-container flex h-14 items-center justify-between">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Dashboard
          </Link>
          <Badge variant={isCorrect ? "success" : "danger"}>{data.status} form</Badge>
        </div>
      </div>

      <motion.div
        className="pro-container pt-8 md:pt-10"
        variants={staggerContainer}
        initial={false}
        animate="visible"
      >
        <PageHeader
          kicker="Analysis complete"
          title={`${data.exercise_type} session`}
          description="Processed with MediaPipe Pose · OpenCV overlays"
        />

        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div variants={fadeUp} className="space-y-6 lg:col-span-2">
            <div className="pro-media-frame">
              <video
                src={videoSrc}
                controls
                autoPlay
                muted
                playsInline
                className="aspect-video w-full object-contain"
              />
            </div>

            <div className="pro-panel flex flex-wrap items-center justify-between gap-4 p-5 md:p-6">
              <div className="flex items-center gap-4">
                <div className="pro-icon">
                  <Sparkles className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                    AI engine
                  </p>
                  <p className="text-sm font-medium text-ink">Skeleton overlay on your footage</p>
                </div>
              </div>
              <a href={videoSrc} download>
                <Button variant="secondary" size="md" icon={<Download className="h-4 w-4" />}>
                  Download
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-5">
            <div className="pro-panel flex flex-col items-center p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                Posture score
              </p>
              <ScoreRing score={data.score} success={isCorrect} className="my-6" />
              <p className="text-center text-sm text-ink-muted">
                Based on {totalFrames} analyzed frames
              </p>
            </div>

            <div className="pro-panel space-y-5 p-6">
              <h3 className="font-display text-lg font-bold text-ink">Frame breakdown</h3>
              <ProgressIndicator value={correctFrames} max={totalFrames} variant="gradient" showLabel />
              <div className="flex justify-between text-sm">
                <span className="text-ink-muted">Correct</span>
                <span className="font-semibold text-success">{correctFrames}</span>
              </div>
              <ProgressIndicator value={incorrectFrames} max={totalFrames} showLabel />
              <div className="flex justify-between text-sm">
                <span className="text-ink-muted">Incorrect</span>
                <span className="font-semibold text-danger">{incorrectFrames}</span>
              </div>
            </div>

            <div
              className={`pro-panel p-6 ${
                isCorrect ? "border-success/25 bg-success-muted/30" : "border-danger/25 bg-danger-muted/30"
              }`}
            >
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                <Zap className="h-5 w-5 text-primary" />
                AI coaching
              </h3>
              <p
                className={`mt-4 text-sm leading-relaxed font-medium ${
                  isCorrect ? "text-success" : "text-danger"
                }`}
              >
                &ldquo;{data.feedback}&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
