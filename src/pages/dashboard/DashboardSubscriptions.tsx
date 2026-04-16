import { Download, ArrowUpRight, RotateCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockInvoices, mockListings } from "@/data/dashboardMockData";

const planPrices: Record<string, number> = {
  Gratuit: 0,
  Intro: 99,
  Profesional: 199,
};

const getDaysRemaining = (expiryDate: string) => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diff = Math.max(0, Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  return diff;
};

const getDaysSinceActivation = (activationDate: string, expiryDate: string) => {
  const start = new Date(activationDate);
  const end = new Date(expiryDate);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

const DashboardSubscriptions = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Abonamente & Facturi</h1>

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
                  <th className="text-right p-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">Pret</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Activat</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">Data expirare</th>
                  
                  <th colSpan={2} className="text-right p-3 text-xs font-medium text-muted-foreground">Actiuni</th>
                </tr>
              </thead>
              <tbody>
                {mockListings.map((l) => {
                  const isGratuit = l.plan === "Gratuit";
                  const daysRemaining = isGratuit ? 0 : getDaysRemaining(l.expiryDate);
                  const totalDays = isGratuit || !l.activationDate ? 0 : getDaysSinceActivation(l.activationDate, l.expiryDate);
                  const progress = totalDays > 0 ? Math.round((daysRemaining / totalDays) * 100) : 0;

                  return (
                    <tr key={l.id} className="border-b border-border/50 last:border-0">
                      <td className="p-3">
                        <p className="font-medium text-foreground">{l.name}</p>
                        <p className="text-xs text-muted-foreground">{l.category}</p>
                      </td>
                      <td className="p-3">
                        <Badge variant="secondary" className="text-[10px]">{l.plan}</Badge>
                      </td>
                      <td className="p-3 text-right text-muted-foreground hidden sm:table-cell">
                        {isGratuit ? "Gratuit" : <><span className="font-medium text-foreground">{planPrices[l.plan]}</span> RON/luna</>}
                      </td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell">
                        {isGratuit ? "–" : l.activationDate}
                      </td>
                      <td className="p-3 text-muted-foreground hidden sm:table-cell">
                        {isGratuit ? "Nelimitat" : l.expiryDate}
                      </td>
                      <td className="p-3 text-right">
                        {(l.plan === "Gratuit" || l.plan === "Intro") && (
                          <Button size="sm" className="text-xs h-7">
                            <ArrowUpRight className="w-3 h-3 mr-1" /> Upgradeaza
                          </Button>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        {(l.plan === "Intro" || l.plan === "Profesional") && (
                          <Button variant="outline" size="sm" className="text-xs h-7">
                            <RotateCw className="w-3 h-3 mr-1" /> Prelungeste
                          </Button>
                        )}
                      </td>
                    </tr>
                    {!isGratuit && (
                      <tr className="border-b border-border/50 last:border-0">
                        <td colSpan={7} className="px-3 pb-2 pt-0">
                          <div className="flex items-center gap-2">
                            <Progress value={progress} className="h-1 flex-1" />
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{daysRemaining} zile rămase</span>
                          </div>
                        </td>
                      </tr>
                    )}
                  );
                })}
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
