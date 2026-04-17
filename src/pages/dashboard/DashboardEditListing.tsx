import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import StepForm from "@/components/ghidbeauty/add-company/StepForm";
import type { Plan } from "@/components/ghidbeauty/add-company/StepPlans";
import { mockListings } from "@/data/dashboardMockData";

const planMap: Record<string, Plan> = {
  Gratuit: "gratuit",
  Intro: "intro",
  Profesional: "profesional",
};

const DashboardEditListing = () => {
  const { id } = useParams<{ id: string }>();
  const listing = mockListings.find((l) => l.id === id);

  if (!listing) {
    return (
      <Card className="border-border/50">
        <CardContent className="py-16 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">Listing inexistent</h3>
          <p className="text-sm text-muted-foreground mb-4">Nu am găsit listing-ul pe care încerci să îl editezi.</p>
          <Link to="/dashboard/listinguri">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Înapoi la listinguri
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const plan = planMap[listing.plan] ?? "gratuit";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/dashboard/listinguri" className="hover:text-foreground transition-colors">Listinguri</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">Editează</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">Editează listing — {listing.name}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{listing.category} · {listing.city}</p>
        </div>
        <Badge variant="secondary">Plan {listing.plan}</Badge>
      </div>

      <StepForm mode="edit" plan={plan} />
    </div>
  );
};

export default DashboardEditListing;
