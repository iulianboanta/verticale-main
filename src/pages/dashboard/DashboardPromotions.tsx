import { Megaphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardPromotions = () => (
  <div className="space-y-6">
    <h1 className="text-xl font-bold text-foreground">Promotii active</h1>
    <Card className="border-border/50">
      <CardContent className="py-16 text-center">
        <Megaphone className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-1">Nicio promotie activa</h3>
        <p className="text-sm text-muted-foreground mb-4">Contacteaza-ne pentru a afla despre optiunile de promovare disponibile.</p>
        <Button variant="outline">Contacteaza-ne</Button>
      </CardContent>
    </Card>
  </div>
);

export default DashboardPromotions;
