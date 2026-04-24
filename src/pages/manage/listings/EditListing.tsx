import { useParams, Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { manageListings } from "@/data/manageMockData";
import StepForm from "@/components/ghidbeauty/add-company/StepForm";
import type { Plan } from "@/components/ghidbeauty/add-company/StepPlans";

const planMap: Record<string, Plan> = {
  Gratuit: "gratuit",
  Intro: "intro",
  Profesional: "profesional",
};

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const listing = !isNew ? manageListings.find((l) => l.id === id) ?? manageListings[0] : null;

  const initialPlan: Plan = listing ? (planMap[listing.plan] ?? "profesional") : "profesional";

  const handleSave = () => {
    toast.success(isNew ? "Listing creat cu succes." : "Modificările au fost salvate.");
    navigate("/manage/listings");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link to="/manage/listings"><ArrowLeft size={14} /> Înapoi</Link>
        </Button>
      </div>
      <h1 className="text-2xl font-semibold">
        {isNew ? "Adaugă listing nou" : `Editează listing — ${listing?.name}`}
      </h1>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
        {/* Left — full StepForm (same as front-end Step 3) */}
        <div className="min-w-0">
          <Card className="p-4 sm:p-6">
            <StepForm
              plan={initialPlan}
              mode={isNew ? "create" : "edit"}
              hideStickyFooter
              hideTermsAcceptance
            />
          </Card>
        </div>

        {/* Right — Admin sidebar (sticky) */}
        <aside className="lg:sticky lg:top-4 space-y-4">
          <Card className="p-5 space-y-4 border-primary/30">
            <h2 className="font-semibold text-primary">Panou Admin</h2>

            <div>
              <Label>Status</Label>
              <Select defaultValue={listing?.status ?? "pending"}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activ</SelectItem>
                  <SelectItem value="pending">În așteptare</SelectItem>
                  <SelectItem value="expired">Suspendat</SelectItem>
                  <SelectItem value="rejected">Respins</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Plan override</Label>
              <Select defaultValue={listing?.plan ?? "Gratuit"}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gratuit">Gratuit</SelectItem>
                  <SelectItem value="Intro">Intro</SelectItem>
                  <SelectItem value="Profesional">Profesional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Dată expirare plan</Label>
              <Input type="date" defaultValue={listing?.expiresAt} className="mt-1" />
            </div>

            <div>
              <Label>Note interne (admin)</Label>
              <Textarea placeholder="Vizibile doar pentru admin..." rows={3} className="mt-1" />
            </div>

            <div className="flex items-center justify-between">
              <Label>Verified badge</Label>
              <Switch defaultChecked={listing?.verified} />
            </div>

            <div className="flex items-center justify-between">
              <Label>Featured (Recomandat)</Label>
              <Switch defaultChecked={listing?.featured} />
            </div>
          </Card>

          <div className="flex gap-2">
            <Button className="flex-1" onClick={handleSave}>
              {isNew ? "Creează listing" : "Salvează modificări"}
            </Button>
            <Button variant="outline" asChild>
              <Link to="/manage/listings">Anulează</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EditListing;
