import { Link } from "react-router-dom";
import { Search, Play, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockSavedSearches } from "@/data/dashboardMockData";

const DashboardSavedSearches = () => {
  if (mockSavedSearches.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-bold text-foreground">Cautari salvate</h1>
        <Card className="border-border/50">
          <CardContent className="py-16 text-center">
            <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">Nu ai salvat nicio cautare</h3>
            <p className="text-sm text-muted-foreground mb-4">Salveaza cautarile din pagina de rezultate pentru acces rapid.</p>
            <Link to="/cautare"><Button>Cauta in director</Button></Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Cautari salvate</h1>
      <div className="space-y-2">
        {mockSavedSearches.map((s) => (
          <Card key={s.id} className="border-border/50">
            <CardContent className="p-4 flex items-center gap-4">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{s.query}</p>
                <p className="text-xs text-muted-foreground">{s.location} &middot; {s.filters} &middot; Salvat pe {s.date}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Link to={`/cautare?q=${encodeURIComponent(s.query)}`}>
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    <Play className="w-3 h-3 mr-1" /> Ruleaza
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardSavedSearches;
