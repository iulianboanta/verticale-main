import { CheckCircle } from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";

const planNames: Record<string, string> = {
  intro: "Intro",
  profesional: "Profesional",
};

const stepsPayment = [
  {
    title: "Plată",
    desc: "Efectuează transferul conform proformei primite pe email",
  },
  {
    title: "Confirmare",
    desc: "Echipa noastră confirmă plata și activează listingul",
  },
  {
    title: "Aprobare conținut",
    desc: "Informațiile sunt verificate și listingul devine vizibil",
  },
  {
    title: "Vizibilitate maximă",
    desc: "Compania ta apare prioritar în rezultate cu badge Recomandat",
  },
];

const ConfirmarePlata = () => {
  const [searchParams] = useSearchParams();
  const planKey = searchParams.get("plan") || "intro";
  const companyName = searchParams.get("company") || "Compania ta";
  const total = searchParams.get("total") || "0";
  const orderNumber = `GB-${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="solid" />
      <main className="flex-1 pt-16 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[560px] bg-card border border-border rounded-2xl p-8 sm:p-12 shadow-sm">
          {/* Success icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-scale-in">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-medium text-foreground text-center mb-1">
            Comanda ta a fost înregistrată!
          </h1>
          <p className="text-muted-foreground text-center text-sm mb-6">
            Îți mulțumim că ai ales GhidBeauty.ro
          </p>

          <div className="border-t border-border mb-5" />

          {/* Order recap */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">{companyName}</span>
              <Badge variant="secondary" className="text-[10px]">{planNames[planKey] || planKey}</Badge>
            </div>
            <span className="text-sm font-bold text-foreground">{parseFloat(total).toFixed(2)} lei</span>
          </div>
          <p className="text-xs text-muted-foreground mb-5">Nr. comandă: #{orderNumber}</p>

          <div className="border-t border-border mb-5" />

          {/* Payment instructions */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <h4 className="text-[13px] font-medium text-amber-800 mb-3">Cum finalizezi plata</h4>
            <ol className="space-y-2 text-xs text-amber-700 list-decimal list-inside">
              <li>Verifică emailul — ai primit o proformă cu datele de plată</li>
              <li>Efectuează transferul bancar conform instrucțiunilor din proformă</li>
              <li>Listingul va fi activat în maxim 24 ore lucrătoare după confirmarea plății</li>
            </ol>
            <p className="text-[11px] text-amber-600 mt-3">
              Dacă nu ai primit emailul, verifică folderul Spam sau contactează-ne
            </p>
          </div>

          {/* Steps */}
          <h3 className="text-sm font-semibold text-foreground mb-4">Pașii următori</h3>
          <div className="space-y-4 mb-8">
            {stepsPayment.map((s, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-foreground">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button variant="ghost" asChild className="flex-1">
              <Link to="/">Înapoi la homepage</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link to="/adauga-companie?step=plans">Adaugă alt listing</Link>
            </Button>
          </div>

          <p className="text-[11px] text-muted-foreground/70 text-center">
            Întrebări despre plată? Contactează-ne la contact@ghidbeauty.ro
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConfirmarePlata;
