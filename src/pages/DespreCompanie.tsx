import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";
import { Building2, Globe, BookOpen, Leaf, Network, ArrowRight } from "lucide-react";

import paginiNationale from "@/assets/despre/pagini-nationale.jpg";
import roLocal from "@/assets/despre/rolocal.jpg";
import colaj from "@/assets/despre/colaj-pn-rolocal.jpg";
import targhetare from "@/assets/despre/targhetare.jpg";
import expert from "@/assets/despre/expert.jpg";

const DespreCompanie = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="solid" />
      <div className="pt-16" />

      {/* Hero */}
      <section className="bg-card border-b border-border">
        <div className="container py-14 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Despre Companie
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Descoperiți povestea din spatele Directories Management Systems — operatorul
            platformei GhidBeauty.ro și al unei rețele de ghiduri de afaceri cu tradiție.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1">
        <div className="container py-12 max-w-4xl space-y-16">

          {/* Block 1 — Pagini Nationale & roLOCAL */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
              <img src={paginiNationale} alt="Pagini Nationale" className="w-full h-48 object-cover" />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">Pagini Naționale</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ghid Național B2B
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
              <img src={roLocal} alt="roLOCAL" className="w-full h-48 object-cover" />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">roLOCAL</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ghid Local B2C București
                </p>
              </div>
            </div>
          </section>

          {/* Block 2 — Description */}
          <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <img src={colaj} alt="Pagini Nationale și roLOCAL" className="w-full rounded-xl mb-6 object-cover max-h-80" />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Pagini Naționale</strong> este cel mai longeviv
                ghid de afaceri B2B din România cu 28 de ani de apariție continuă.
              </p>
              <p>
                <strong className="text-foreground">roLOCAL</strong> este un produs nou, local,
                B2C, cu apariție în București.
              </p>
            </div>
          </section>

          {/* Block 3 — Rețea de site-uri */}
          <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Network className="w-4.5 h-4.5 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground">Rețea de site-uri specializate</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Operăm o rețea de site-uri specializate pe diferite segmente de activitate.
              Targhetare B2B locală și națională.
            </p>
            <img src={targhetare} alt="Targhetare B2B" className="w-full rounded-xl object-cover max-h-80" />
          </section>

          {/* Block 4 — Expert Mediu */}
          <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Leaf className="w-4.5 h-4.5 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground">Platforma Expert Mediu</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Aici găsești platforma cu care îți îndeplinești toate obligațiile legale privind
              deșeurile. Vei găsi aici toate calculele, evidențele și rapoartele solicitate de
              autorități (Agenția de mediu, Garda de mediu, Fondul de mediu). Ai asistență și
              consultanță.
            </p>
            <img src={expert} alt="Expert Mediu" className="w-full rounded-xl object-cover max-h-80" />
          </section>

          {/* CTA */}
          <section className="text-center py-6">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Contactează-ne
              <ArrowRight className="w-4 h-4" />
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DespreCompanie;
