"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileVideo,
  XCircle,
  Sparkles,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiUrl } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { ExerciseSelector, type ExerciseId } from "@/components/upload/ExerciseSelector";
import { cn } from "@/lib/cn";

type Phase = "idle" | "ready" | "uploading" | "error";

export default function VideoUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [exercise, setExercise] = useState<ExerciseId>("squats");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted[0]) {
      setFile(accepted[0]);
      setPhase("ready");
      setError("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [".mp4", ".mov", ".avi"] },
    maxFiles: 1,
    disabled: phase === "uploading",
  });

  const handleUpload = async () => {
    if (!file) return;
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    setPhase("uploading");
    setError("");
    setProgress(12);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("exercise_type", exercise);

    const tick = setInterval(() => {
      setProgress((p) => Math.min(p + 8, 88));
    }, 400);

    try {
      const res = await axios.post(apiUrl("/api/upload"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      clearInterval(tick);
      setProgress(100);
      const data = res.data.data;
      setTimeout(() => router.push(`/result/${data._id}`), 400);
    } catch (err: unknown) {
      clearInterval(tick);
      const detail =
        axios.isAxiosError(err) && err.response?.data?.detail
          ? String(err.response.data.detail)
          : "Upload failed. Please try again.";
      setError(detail);
      setPhase("error");
      setProgress(0);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
      <div className="lg:col-span-2">
        <p className="pro-kicker mb-4">Exercise</p>
        <ExerciseSelector value={exercise} onChange={setExercise} />
      </div>

      <div className="lg:col-span-3">
        <div className="pro-panel p-6 sm:p-8">
          <div
            {...getRootProps()}
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-10 text-center transition-all sm:p-12",
              isDragActive
                ? "border-primary bg-primary-soft/50 scale-[1.01]"
                : "border-border bg-surface-muted/40 hover:border-primary/30 hover:bg-surface-muted/70",
              phase === "uploading" && "pointer-events-none opacity-70"
            )}
          >
            <input {...getInputProps()} />

            <AnimatePresence mode="wait">
              {file ? (
                <motion.div
                  key="file"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-glow">
                    <FileVideo className="h-8 w-8" />
                  </div>
                  <p className="mt-5 font-display text-lg font-bold text-ink">{file.name}</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB · Ready
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface",
                      isDragActive && "border-primary text-primary"
                    )}
                  >
                    <UploadCloud className="h-8 w-8 text-ink-faint" />
                  </motion.div>
                  <p className="mt-5 font-display text-lg font-bold text-ink">
                    Drop your workout video
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">MP4, MOV, or AVI</p>
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-faint">
                    <Zap className="h-3 w-3 text-primary" />
                    AI-powered analysis
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {phase === "uploading" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 space-y-3"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium text-ink-secondary">
                    <Sparkles className="h-4 w-4 animate-pulse text-primary" />
                    Analyzing…
                  </span>
                  <span className="font-mono text-xs text-ink-muted">{progress}%</span>
                </div>
                <ProgressIndicator value={progress} max={100} variant="gradient" showLabel={false} />
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-3 rounded-xl border border-danger/20 bg-danger-muted px-4 py-3 text-sm font-medium text-danger"
            >
              <XCircle className="h-5 w-5 shrink-0" />
              {error}
            </motion.div>
          )}

          <Button
            onClick={handleUpload}
            disabled={!file || phase === "uploading"}
            loading={phase === "uploading"}
            variant="premium"
            size="lg"
            className="mt-6 w-full"
            icon={phase !== "uploading" ? <CheckCircle2 className="h-5 w-5" /> : undefined}
          >
            {phase === "uploading" ? "Processing…" : "Run posture analysis"}
          </Button>
        </div>
      </div>
    </div>
  );
}
