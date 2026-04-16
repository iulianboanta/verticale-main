import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";

const steps = [
  {
    title: "Revizuire",
    desc: "Echipa noastră va verifica informațiile furnizate în maxim 24–48 ore lucrătoare",
  },
  {
    title: "Aprobare",
    desc: "Vei primi un email de confirmare când listingul este aprobat și activ",
  },
  {
    title: "Vizibilitate",
    desc: "Compania ta va apărea în rezultatele de căutare și pe pagina categoriei tale",
  },
  {
    title: "Upgrade oricând",
    desc: "Poți oricând să îți îmbunătățești vizibilitatea trecând la un plan plătit",
  },
];

const ConfirmareFree = () => (
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
          Listing trimis spre aprobare!
        </h1>
        <p className="text-muted-foreground text-center text-sm mb-6">
          Mulțumim că ai ales GhidBeauty.ro
        </p>

        <div className="border-t border-border mb-6" />

        {/* Steps */}
        <h3 className="text-sm font-semibold text-foreground mb-4">Pașii următori</h3>
        <div className="space-y-4 mb-8">
          {steps.map((s, i) => (
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
          Ai întrebări? Contactează-ne la contact@ghidbeauty.ro
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default ConfirmareFree;
