import { Check, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProgressIndicator from "./ProgressIndicator";

type Plan = "gratuit" | "intro" | "profesional";

const plans: {
  id: Plan;
  name: string;
  price: string;
  period: string;
  badge?: string;
  note: string;
  cta: string;
  ctaVariant: "ghost" | "outline" | "default";
  included: string[];
  notIncluded: string[];
}[] = [
  {
    id: "gratuit",
    name: "Gratuit",
    price: "0 lei",
    period: "Permanent gratuit",
    note: "Afișează bannere publicitare terțe pe pagina ta",
    cta: "Continuă gratuit",
    ctaVariant: "ghost",
    included: [
      "Denumire + logo + adresă",
      "Telefon + WhatsApp + email",
      "Descriere 1.000 caractere",
      "Program de funcționare",
      "Facilități de bază",
      "Formular contact",
      "Recenzii clienți",
      "1 categorie",
    ],
    notIncluded: [
      "Imagini galerie",
      "Hartă în profil",
      "Cuvinte cheie SEO",
      "Badge Recomandat",
    ],
  },
  {
    id: "intro",
    name: "Intro",
    price: "99 lei",
    period: "+ TVA / an",
    note: "Fără bannere publicitare pe pagina ta",
    cta: "Alege Intro",
    ctaVariant: "outline",
    included: [
      "Tot ce include Gratuit +",
      "Slogan personalizat",
      "1 imagine galerie",
      "Hartă în profil",
      "Cuvinte cheie SEO",
      "Editor HTML descriere",
      "Servicii/produse în filtre",
      "Descriere 2.000 caractere",
    ],
    notIncluded: [
      "Badge Recomandat",
      "Prioritate în rezultate",
      "Zone deservite",
      "Promoții",
    ],
  },
  {
    id: "profesional",
    name: "Profesional",
    price: "499 lei",
    period: "+ TVA / an",
    badge: "Cel mai popular",
    note: "Fără bannere publicitare pe pagina ta",
    cta: "Alege Profesional",
    ctaVariant: "default",
    included: [
      "Tot ce include Intro +",
      "Badge Recomandat în căutare",
      "Prioritate în rezultate",
      "10 imagini galerie",
      "3 categorii listing",
      "Social media links",
      "Locații suplimentare",
      "Zone deservite (județe)",
      "Promoții și cupoane",
      "Fișiere PDF",
    ],
    notIncluded: [],
  },
];

const StepPlans = ({ onSelect }: { onSelect: (plan: Plan) => void }) => (
  <div className="w-full max-w-[960px] mx-auto px-4 sm:px-8 py-12">
    <ProgressIndicator currentStep={2} />

    <div className="text-center mb-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
        Alege planul potrivit pentru afacerea ta
      </h1>
      <p className="text-sm text-muted-foreground mt-2">
        Poți upgrada oricând la un plan de promovare superior.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`relative bg-card border rounded-xl p-6 flex flex-col ${
            plan.id === "profesional"
              ? "border-primary ring-2 ring-primary/20"
              : "border-border"
          }`}
        >
          {plan.badge && (
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3">
              {plan.badge}
            </Badge>
          )}

          <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
          <div className="mt-2">
            <span className="text-3xl font-bold text-foreground">{plan.price}</span>
            <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>
          </div>

          <div className="mt-5 flex-1 space-y-2">
            {plan.included.map((f) => (
              <div key={f} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>{f}</span>
              </div>
            ))}
            {plan.notIncluded.map((f) => (
              <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                <X className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="line-through">{f}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-muted-foreground mt-4 italic">{plan.note}</p>

          <Button
            variant={plan.ctaVariant}
            className={`w-full mt-4 ${plan.id === "profesional" ? "" : ""}`}
            onClick={() => onSelect(plan.id)}
          >
            {plan.cta}
          </Button>
        </div>
      ))}
    </div>

    {/* Expiry note */}
    <div className="mt-8 bg-accent/10 border border-accent/30 rounded-lg p-4 flex items-start gap-3">
      <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
      <p className="text-sm text-foreground">
        Planurile Intro și Profesional sunt valabile 1 an de la activare. La expirare, listingul
        trece automat la planul Gratuit.
      </p>
    </div>
  </div>
);

export default StepPlans;
export type { Plan };
