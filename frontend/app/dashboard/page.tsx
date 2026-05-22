"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Activity, ArrowUpRight, ChevronRight, TrendingUp, Zap } from "lucide-react";
import { apiUrl } from "@/lib/api";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProCard } from "@/components/ui/ProCard";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { FullPageLoader } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";

interface Analysis {
  _id: string;
  exercise_type: string;
  score: number;
  status: string;
  feedback?: string;
}

export default function Dashboard() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const storedEmail = localStorage.getItem("email");
      if (!token) {
        router.push("/login");
        return;
      }
      setEmail(storedEmail ?? "");

      try {
        const res = await axios.get(apiUrl("/api/analyses"), {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnalyses((res.data.data as Analysis[]).reverse());
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
    fetchData();
  }, [router]);

  const avg =
    analyses.length > 0
      ? Math.round(analyses.reduce((a, c) => a + c.score, 0) / analyses.length)
      : 0;
  const best = analyses.length > 0 ? Math.max(...analyses.map((a) => a.score)) : 0;

  if (loading) return <FullPageLoader />;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
      <DashboardSidebar email={email} />

      <div className="flex-1 pro-page p-6 md:p-10 lg:overflow-y-auto">
        <PageHeader
          kicker="Dashboard"
          title="Training intelligence"
          description="Your biomechanical history, scores, and recent analyses."
          action={
            <Link href="/upload">
              <span className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8b7cf8] via-[#e879a9] to-[#f5b88a] px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-opacity hover:opacity-90">
                New analysis <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          }
        />

        {analyses.length > 0 && (
          <motion.div
            className="pro-card-grid mb-12 !grid-cols-1 sm:!grid-cols-3"
            variants={staggerContainer}
            initial={false}
            animate="visible"
          >
            <motion.div variants={fadeUp} custom={0}>
              <ProCard
                icon={Activity}
                title="Total sessions"
                description={`${analyses.length} completed analyses in your account.`}
                tone="indigo"
                hover={false}
              />
            </motion.div>
            <motion.div variants={fadeUp} custom={1}>
              <ProCard
                icon={TrendingUp}
                title="Average score"
                description={`Your mean posture score across all sessions is ${avg} out of 100.`}
                tone="emerald"
                hover={false}
              />
            </motion.div>
            <motion.div variants={fadeUp} custom={2}>
              <ProCard
                icon={Zap}
                title="Best score"
                description={`Your highest single-session score so far is ${best} out of 100.`}
                tone="violet"
                hover={false}
              />
            </motion.div>
          </motion.div>
        )}

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-ink">Recent activity</h2>
          </div>

          {analyses.length === 0 ? (
            <div className="pro-panel flex flex-col items-center p-12 text-center">
              <EmptyState
                icon={Activity}
                title="No sessions yet"
                description="Upload your first workout video to unlock AI posture analysis."
                action={{
                  label: "Start first analysis",
                  onClick: () => router.push("/upload"),
                }}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {analyses.map((a) => (
                <Link key={a._id} href={`/result/${a._id}`} className="group block">
                  <article className="pro-panel flex items-center justify-between gap-4 p-5 transition-all hover:shadow-card-hover md:p-6">
                    <div className="min-w-0 flex-1">
                      <Badge variant={a.status === "Correct" ? "success" : "danger"}>
                        {a.status}
                      </Badge>
                      <h3 className="mt-2 font-display text-lg font-bold capitalize text-ink">
                        {a.exercise_type}
                      </h3>
                      <p className="mt-1 line-clamp-1 text-sm text-ink-muted">
                        {a.feedback ?? "Analysis complete"}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <div className="text-right">
                        <span className="font-display text-3xl font-bold text-ink">{a.score}</span>
                        <span className="text-sm text-ink-faint">/100</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
