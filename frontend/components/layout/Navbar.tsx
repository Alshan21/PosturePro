"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, LogOut, Sparkles, User } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useMounted } from "@/lib/useMounted";

const hideNavPaths = ["/login", "/register"];

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
];

export default function Navbar() {
  const [email, setEmail] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const mounted = useMounted();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hideNavPaths.includes(pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setEmail(null);
    router.push("/login");
  };

  return (
    <header className={cn("pro-nav", scrolled && "scrolled")}>
      <div className="pro-container">
        <nav className="pro-nav-inner">
          <Logo />

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-primary-soft/70 hover:text-[#7c6cf0]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/upload"
              className="ml-1 flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-slate-100 hover:text-ink"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Analyze
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {email ? (
              <motion.div
                key="auth"
                initial={false}
                animate={mounted ? { opacity: 1 } : undefined}
                className="flex items-center gap-2"
              >
                <Link
                  href="/dashboard"
                  className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink md:flex"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <div className="flex items-center gap-2 rounded-full border border-border bg-surface-muted/80 py-1 pl-1 pr-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#8b7cf8] to-[#e879a9]">
                    <User className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="max-w-[88px] truncate text-xs font-semibold text-ink-secondary">
                    {email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-lg p-2 text-ink-faint transition-colors hover:bg-slate-100 hover:text-danger"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="guest"
                initial={false}
                animate={mounted ? { opacity: 1 } : undefined}
                className="flex items-center gap-2"
              >
                <Link href="/login" className="hidden sm:block">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="glow" size="sm">
                    Get started
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
}
