"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/ui/SocialIcons";

const hideFooterExact = ["/login", "/register", "/dashboard", "/upload"];

const links = [
  { href: "/upload", label: "Analyze" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/register", label: "Sign up" },
];

const social = [
  { href: "https://github.com", label: "GitHub", icon: GitHubIcon },
  { href: "https://linkedin.com", label: "LinkedIn", icon: LinkedInIcon },
  { href: "https://x.com", label: "X", icon: XIcon },
];

export default function Footer() {
  const pathname = usePathname();
  if (hideFooterExact.includes(pathname) || pathname.startsWith("/result/")) {
    return null;
  }

  return (
    <footer className="pro-footer">
      <div className="pro-container flex flex-col items-center gap-8 text-center">
        <Logo />

        <p className="max-w-md text-sm leading-relaxed text-ink-muted">
          AI posture analysis for squats, lunges, and planks — built for athletes who care about form.
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-secondary transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-2">
          {social.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-ink-muted transition-all hover:border-primary/30 hover:text-primary hover:shadow-soft"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="text-xs text-ink-faint" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} Posture Pro · MediaPipe &amp; OpenCV
        </p>
      </div>
    </footer>
  );
}
