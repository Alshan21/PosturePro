"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { apiUrl } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(apiUrl("/api/login"), { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.detail
          ? String(err.response.data.detail)
          : "Login failed";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to access your analyses">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-2xl border border-danger/20 bg-danger-muted px-5 py-4 text-sm font-medium text-danger"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            variant="elevated"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            variant="elevated"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-border" />
            <span className="text-ink-muted">Remember me</span>
          </label>
          <Link href="#" className="font-semibold text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" variant="premium" size="xl" className="w-full" loading={loading}>
          Sign in
        </Button>
      </form>
      <p className="mt-8 text-center text-sm text-ink-muted">
        No account?{" "}
        <Link href="/register" className="font-semibold text-primary hover:text-violet-600 transition-colors">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}
