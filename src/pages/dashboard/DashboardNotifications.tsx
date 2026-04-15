import { useState } from "react";
import { Bell, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { mockNotificationSettings } from "@/data/dashboardMockData";
import { toast } from "sonner";

const DashboardNotifications = () => {
  const [settings, setSettings] = useState(mockNotificationSettings);

  const toggle = (id: string, field: "email" | "inApp") => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: !s[field] } : s))
    );
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-xl font-bold text-foreground">Setari notificari</h1>

      <Card className="border-border/50">
        <CardContent className="p-0">
          {/* Header */}
          <div className="grid grid-cols-[1fr_80px_80px] gap-2 px-5 py-3 bg-muted/50 border-b border-border">
            <span className="text-xs font-medium text-muted-foreground">Tip notificare</span>
            <span className="text-xs font-medium text-muted-foreground text-center flex items-center justify-center gap-1">
              <Mail className="w-3 h-3" /> Email
            </span>
            <span className="text-xs font-medium text-muted-foreground text-center flex items-center justify-center gap-1">
              <Bell className="w-3 h-3" /> In-app
            </span>
          </div>

          {settings.map((s) => (
            <div key={s.id} className="grid grid-cols-[1fr_80px_80px] gap-2 px-5 py-3 border-b border-border/50 last:border-0 items-center">
              <span className="text-sm text-foreground">{s.label}</span>
              <div className="flex justify-center">
                <Switch checked={s.email} onCheckedChange={() => toggle(s.id, "email")} />
              </div>
              <div className="flex justify-center">
                <Switch checked={s.inApp} onCheckedChange={() => toggle(s.id, "inApp")} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button size="sm" onClick={() => toast.success("Setarile au fost salvate!")}>Salveaza setarile</Button>
    </div>
  );
};

export default DashboardNotifications;
