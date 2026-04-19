import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Tone = "violet" | "amber" | "red" | "blue" | "green";

const toneClasses: Record<Tone, string> = {
  violet: "bg-primary/10 text-primary",
  amber: "bg-amber-100 text-amber-700",
  red: "bg-red-100 text-red-700",
  blue: "bg-blue-100 text-blue-700",
  green: "bg-emerald-100 text-emerald-700",
};

const StatCard = ({
  label,
  value,
  icon: Icon,
  tone = "violet",
  hint,
}: {
  label: string;
  value: string | number;
  icon?: any;
  tone?: Tone;
  hint?: string;
}) => {
  return (
    <Card className="p-4 flex items-start justify-between">
      <div>
        <div className="text-xs text-muted-foreground mb-1">{label}</div>
        <div className="text-2xl font-semibold">{value}</div>
        {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
      </div>
      {Icon && (
        <div className={cn("h-10 w-10 rounded-md flex items-center justify-center", toneClasses[tone])}>
          <Icon size={18} />
        </div>
      )}
    </Card>
  );
};

export default StatCard;
