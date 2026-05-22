import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  dark = false,
  light = false,
}: {
  className?: string;
  dark?: boolean;
  light?: boolean;
}) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#8b7cf8] via-[#e879a9] to-[#f5b88a] shadow-glow transition-transform group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="relative z-10 h-4 w-4 text-white"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <circle cx="12" cy="5" r="2" fill="currentColor" stroke="none" />
          <path d="M12 7v4M8 11l-2 6M16 11l2 6M12 11v10" />
        </svg>
      </div>
      <span
        className={cn(
          "font-display text-[1.05rem] font-bold tracking-tight",
          light ? "text-white" : dark ? "text-white" : "text-ink"
        )}
      >
        Posture
        <span
          className={cn(
            light || dark ? "text-accent-blue" : "text-gradient-aurora"
          )}
        >
          Pro
        </span>
      </span>
    </Link>
  );
}
