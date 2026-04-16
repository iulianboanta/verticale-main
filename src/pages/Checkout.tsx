import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Clock, CreditCard, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";
import ProgressIndicator from "@/components/ghidbeauty/add-company/ProgressIndicator";

const planData: Record<string, { name: string; price: number; color: string }> = {
  intro: { name: "Intro", price: 99, color: "bg-blue-100 text-blue-700" },
  profesional: { name: "Profesional", price: 499, color: "bg-primary/10 text-primary" },
};

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planKey = searchParams.get("plan") || "intro";
  const companyName = searchParams.get("company") || "Compania ta";
  const category = searchParams.get("category") || "Categorie";
  const city = searchParams.get("city") || "Oraș";

  const plan = planData[planKey] || planData.intro;
  const tva = Math.round(plan.price * 0.19 * 100) / 100;
  const total = plan.price + tva;

  const today = new Date();
  const expiryDate = new Date(today);
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  const formatDate = (d: Date) =>
    d.toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });

  const [termsChecked, setTermsChecked] = useState(false);
  const [contractChecked, setContractChecked] = useState(false);
  const canSubmit = termsChecked && contractChecked;

  const handleSubmit = () => {
    navigate(`/adauga-companie/confirmare-plata?plan=${planKey}&company=${encodeURIComponent(companyName)}&total=${total}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="solid" />
      <main className="flex-1 pt-16">
        <div className="container max-w-[900px] py-10 px-4">
          <ProgressIndicator currentStep={3} totalSteps={3} />

          <h2 className="text-xl font-semibold text-foreground text-center mt-6 mb-8">
            Finalizează înscrierea
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left — Order summary */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Sumar comandă</h3>

                {/* Company info */}
                <div className="mb-4">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Compania ta</span>
                  <p className="text-[15px] font-medium text-foreground mt-0.5">{companyName}</p>
                  <p className="text-xs text-muted-foreground">
                    {category} · {city}
                    <Badge className={`ml-2 text-[10px] ${plan.color}`} variant="secondary">{plan.name}</Badge>
                  </p>
                </div>

                <div className="border-t border-border my-4" />

                {/* Plan details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="font-medium text-foreground">
                      {plan.name}
                      <Badge className={`ml-2 text-[10px] ${plan.color}`} variant="secondary">{plan.name}</Badge>
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Durata</span>
                    <span className="text-foreground">1 an de la data activării</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Data activare</span>
                    <span className="text-foreground">La confirmarea plății</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Data expirare estimată</span>
                    <span className="text-foreground">{formatDate(expiryDate)}</span>
                  </div>
                </div>

                <div className="border-t border-border my-4" />

                {/* Price breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Plan {plan.name}</span>
                    <span className="text-foreground">{plan.price} lei</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">TVA 19%</span>
                    <span className="text-foreground">{tva.toFixed(2)} lei</span>
                  </div>
                  <div className="border-t border-border my-2" />
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-foreground">Total de plată</span>
                    <span className="text-lg font-bold text-foreground">{total.toFixed(2)} lei</span>
                  </div>
                </div>

                {/* Expiry note */}
                <div className="mt-5 bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 items-start">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700">
                    La expirarea planului, listingul trece automat la planul Gratuit. Poți reînnoi oricând.
                  </p>
                </div>
              </div>
            </div>

            {/* Right — Payment */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Metodă de plată</h3>

                {/* Card — disabled */}
                <div className="relative border border-border rounded-lg p-4 mb-3 opacity-50 cursor-not-allowed">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-[13px] font-medium text-foreground">Card bancar</p>
                      <p className="text-[11px] text-muted-foreground">Plată securizată online</p>
                    </div>
                  </div>
                  <Badge className="absolute top-2 right-2 text-[10px] bg-amber-100 text-amber-700 border-amber-200">
                    Temporar indisponibil
                  </Badge>
                </div>

                {/* Transfer — selected */}
                <div className="border-2 border-primary rounded-lg p-4 bg-primary/5 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <Landmark className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-[13px] font-medium text-foreground">Transfer bancar / Ordin de plată</p>
                      <p className="text-[11px] text-muted-foreground">Vei primi o proformă pe email cu datele de plată</p>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="space-y-3 mb-6">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <Checkbox
                      checked={termsChecked}
                      onCheckedChange={(v) => setTermsChecked(v === true)}
                      className="mt-0.5"
                    />
                    <span className="text-xs text-muted-foreground">
                      Am citit și sunt de acord cu{" "}
                      <a href="/termeni" className="text-primary underline" target="_blank" rel="noopener">
                        Termenii și condițiile
                      </a>
                    </span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <Checkbox
                      checked={contractChecked}
                      onCheckedChange={(v) => setContractChecked(v === true)}
                      className="mt-0.5"
                    />
                    <span className="text-xs text-muted-foreground">
                      Am citit și sunt de acord cu{" "}
                      <a href="/contract-publicitate" className="text-primary underline" target="_blank" rel="noopener">
                        Contractul de publicitate
                      </a>
                    </span>
                  </label>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  disabled={!canSubmit}
                  onClick={handleSubmit}
                >
                  Finalizează comanda
                </Button>

                <p className="text-[11px] text-muted-foreground/70 text-center mt-3">
                  Prin finalizarea comenzii vei primi pe email o proformă cu instrucțiuni de plată
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
