import { Shield, Smartphone, Monitor, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const DashboardSecurity = () => (
  <div className="space-y-6 max-w-2xl">
    <h1 className="text-xl font-bold text-foreground">Securitate</h1>

    {/* 2FA */}
    <Card className="border-border/50">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Autentificare in doi pasi (2FA)</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Adauga un nivel suplimentar de securitate contului tau</p>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>

    {/* Change password */}
    <Card className="border-border/50">
      <CardContent className="p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Schimba parola</h2>
        <div><Label className="text-xs">Parola curenta</Label><Input type="password" className="mt-1" placeholder="••••••••" /></div>
        <div><Label className="text-xs">Parola noua</Label><Input type="password" className="mt-1" placeholder="••••••••" /></div>
        <div><Label className="text-xs">Confirma parola noua</Label><Input type="password" className="mt-1" placeholder="••••••••" /></div>
        <Button size="sm" onClick={() => toast.success("Parola a fost schimbata!")}>Schimba parola</Button>
      </CardContent>
    </Card>

    {/* Active sessions */}
    <Card className="border-border/50">
      <CardContent className="p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Sesiuni active</h2>
        <div className="space-y-3">
          {[
            { device: "Chrome pe Windows", icon: Monitor, location: "Bucuresti, Romania", time: "Acum (sesiunea curenta)", current: true },
            { device: "Safari pe iPhone", icon: Smartphone, location: "Bucuresti, Romania", time: "Acum 2 ore", current: false },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Icon className="w-5 h-5 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{s.device}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {s.time} &middot; {s.location}
                  </p>
                </div>
                {s.current ? (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Curenta</span>
                ) : (
                  <Button variant="outline" size="sm" className="text-xs h-7 text-destructive">Deconecteaza</Button>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>

    {/* Danger zone */}
    <Card className="border-destructive/30">
      <CardContent className="p-5">
        <h2 className="text-sm font-semibold text-destructive mb-2">Zona periculoasa</h2>
        <p className="text-xs text-muted-foreground mb-3">Stergerea contului este permanenta si nu poate fi anulata.</p>
        <Button variant="destructive" size="sm">Sterge contul</Button>
      </CardContent>
    </Card>
  </div>
);

export default DashboardSecurity;
