import { cn } from "@/lib/utils";

type Variant = "success" | "warning" | "danger" | "info" | "muted";

const variantClasses: Record<Variant, string> = {
  success: "bg-emerald-100 text-emerald-700 border-emerald-200",
  warning: "bg-amber-100 text-amber-700 border-amber-200",
  danger: "bg-red-100 text-red-700 border-red-200",
  info: "bg-blue-100 text-blue-700 border-blue-200",
  muted: "bg-muted text-muted-foreground border-border",
};

const StatusPill = ({ children, variant = "muted" }: { children: React.ReactNode; variant?: Variant }) => (
  <span
    className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap",
      variantClasses[variant],
    )}
  >
    {children}
  </span>
);

export default StatusPill;
