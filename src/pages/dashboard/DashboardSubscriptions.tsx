import { Download, ArrowUpRight, RotateCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockInvoices, mockUser, mockListings } from "@/data/dashboardMockData";

const DashboardSubscriptions = () => {
  const daysRemaining = 122;
  const totalDays = 365;
  const progress = Math.round((daysRemaining / totalDays) * 100);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Abonamente & Facturi</h1>

      {/* Current plan */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground">Planul curent</p>
              <h2 className="text-lg font-bold text-foreground">{mockUser.plan}</h2>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">199 <span className="text-sm font-normal text-muted-foreground">RON/luna</span></p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Activat: 15 ian 2026</span>
              <span>Expira: 15 aug 2026</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">{daysRemaining} zile ramase</p>
          </div>
          <div className="flex gap-2 mt-4">
            <Button size="sm">Reinnoieste</Button>
            <Button variant="outline" size="sm">Schimba planul</Button>
          </div>
        </CardContent>
      </Card>

      {/* Active listings with plans */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Listinguri active</h3>
        <Card className="border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Companie</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Plan curent</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">Data expirare</th>
                  <th colSpan={2} className="text-right p-3 text-xs font-medium text-muted-foreground">Actiuni</th>
                </tr>
              </thead>
              <tbody>
                {mockListings.map((l) => (
                  <tr key={l.id} className="border-b border-border/50 last:border-0">
                    <td className="p-3">
                      <p className="font-medium text-foreground">{l.name}</p>
                      <p className="text-xs text-muted-foreground">{l.category}</p>
                    </td>
                    <td className="p-3">
                      <Badge variant="secondary" className="text-[10px]">{l.plan}</Badge>
                    </td>
                    <td className="p-3 text-muted-foreground hidden sm:table-cell">
                      {l.plan === "Gratuit" ? "Nelimitat" : l.expiryDate}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {(l.plan === "Intro" || l.plan === "Profesional") && (
                          <Button variant="outline" size="sm" className="text-xs h-7">
                            <RotateCw className="w-3 h-3 mr-1" /> Prelungeste
                          </Button>
                        )}
                        {(l.plan === "Gratuit" || l.plan === "Intro") && (
                          <Button size="sm" className="text-xs h-7">
                            <ArrowUpRight className="w-3 h-3 mr-1" /> Upgradeaza
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Invoices */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Facturi</h3>
        <Card className="border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Nr. factura</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">Data</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Plan</th>
                  <th className="text-right p-3 text-xs font-medium text-muted-foreground">Total</th>
                  <th className="text-center p-3 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-3 text-xs font-medium text-muted-foreground">PDF</th>
                </tr>
              </thead>
              <tbody>
                {mockInvoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-border/50 last:border-0">
                    <td className="p-3 font-mono text-xs text-foreground">{inv.id}</td>
                    <td className="p-3 text-muted-foreground hidden sm:table-cell">{inv.date}</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{inv.plan}</td>
                    <td className="p-3 text-right font-medium text-foreground">{inv.total} RON</td>
                    <td className="p-3 text-center">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        inv.status === "platit" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {inv.status === "platit" ? "Platit" : "In asteptare"}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Download className="w-3.5 h-3.5" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSubscriptions;
