import { useState } from "react";
import { PlusCircle, Copy, Edit, Trash2, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mockOffers, mockUser } from "@/data/dashboardMockData";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  activa: "bg-green-100 text-green-700",
  expirata: "bg-red-100 text-red-700",
  programata: "bg-amber-100 text-amber-700",
};

const DashboardOffers = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  if (mockUser.plan !== "Profesional") {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-bold text-foreground">Oferte & Cupoane</h1>
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="py-12 text-center">
            <Tag className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-1">Functie disponibila pentru planul Profesional</h3>
            <p className="text-sm text-muted-foreground mb-4">Fa upgrade la planul Profesional pentru a crea oferte si cupoane.</p>
            <Button>Upgrade la Profesional</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Oferte & Cupoane</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><PlusCircle className="w-4 h-4 mr-1.5" /> Adauga oferta</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adauga oferta noua</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div><Label className="text-xs">Titlu oferta *</Label><Input className="mt-1" placeholder="ex: 20% reducere" /></div>
              <div><Label className="text-xs">Descriere</Label><Textarea className="mt-1" placeholder="Detalii despre oferta..." rows={3} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-xs">Cod cupon *</Label><Input className="mt-1" placeholder="WELCOME20" /></div>
                <div className="flex items-end"><Button variant="outline" size="sm" className="w-full" onClick={() => toast.success("Cod generat!")}>Auto-genereaza</Button></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-xs">Valabil de la *</Label><Input type="date" className="mt-1" /></div>
                <div><Label className="text-xs">Valabil pana la *</Label><Input type="date" className="mt-1" /></div>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs">Activ</Label>
                <Switch defaultChecked />
              </div>
              <Button className="w-full" onClick={() => { setDialogOpen(false); toast.success("Oferta adaugata!"); }}>Salveaza oferta</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {mockOffers.map((o) => (
          <Card key={o.id} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-foreground">{o.title}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[o.status]}`}>
                      {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{o.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      Cod: <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-foreground">{o.code}</code>
                      <button onClick={() => { navigator.clipboard.writeText(o.code); toast.success("Cod copiat!"); }}>
                        <Copy className="w-3 h-3 hover:text-primary" />
                      </button>
                    </span>
                    <span>{o.validFrom} — {o.validUntil}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardOffers;
