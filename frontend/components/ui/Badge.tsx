import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "success" | "danger" | "accent" | "muted" | "glow" | "gradient";

const styles: Record<BadgeVariant, string> = {
  default: "bg-ink/5 text-ink-secondary border-ink/10",
  success: "bg-success-muted text-success border-success/20",
  danger: "bg-danger-muted text-danger border-danger/20",
  accent:
    "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
  muted: "bg-midnight-elevated text-midnight-muted border-midnight-border",
  glow: "bg-white/10 text-white border-white/20 badge-glow backdrop-blur-md",
  gradient: "bg-gradient-to-r from-accent-blue/10 via-accent-purple/10 to-accent-emerald/10 text-accent-blue border-accent-blue/20",
};

export function Badge({
  children,
  variant = "default",
  className,
  pulse,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  pulse?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        styles[variant],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-emerald" />
        </span>
      )}
      {children}
    </span>
  );
}
