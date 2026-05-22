"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Plus, LogOut } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/cn";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/upload", label: "New analysis", icon: Plus },
];

export function DashboardSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  return (
    <aside className="pro-sidebar w-full lg:w-64 lg:shrink-0 lg:min-h-[calc(100vh-4rem)]">
      <Logo />
      <nav className="mt-10 flex flex-1 flex-col gap-1">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn("pro-sidebar-link", active && "active")}
            >
              <l.icon className="h-5 w-5" strokeWidth={1.75} />
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-border pt-6">
        <div className="rounded-xl bg-surface-muted p-3">
          <p className="truncate text-xs font-semibold text-ink">{email}</p>
          <p className="text-[11px] text-ink-faint">Free plan</p>
        </div>
        <button
          onClick={logout}
          className="pro-sidebar-link mt-3 w-full text-danger hover:!text-danger"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
