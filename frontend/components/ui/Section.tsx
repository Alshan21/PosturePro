import { cn } from "@/lib/cn";

export function Section({
  children,
  className,
  id,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "muted" | "tint";
}) {
  const bg = {
    default: "bg-canvas",
    muted: "bg-surface-muted/50",
    tint: "bg-section-tint/60",
  };

  return (
    <section id={id} className={cn("pro-section", bg[variant], className)}>
      <div className="pro-container">{children}</div>
    </section>
  );
}
