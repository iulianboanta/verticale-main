import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";
import { Shield, Database, Eye, Cookie, Clock, UserCheck, Globe, Lock, Baby, ExternalLink, FileText, Scale, AlertTriangle, Star, Building2, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const sections = [
  { id: "operator", label: "Operatorul de date", icon: Building2 },
  { id: "utilizatori", label: "Categorii utilizatori", icon: UserCheck },
  { id: "date-colectate", label: "Date colectate", icon: Database },
  { id: "recenzii", label: "Recenzii și evaluări", icon: Star },
  { id: "scopuri", label: "Scopurile prelucrării", icon: Eye },
  { id: "publicare", label: "Publicarea datelor", icon: FileText },
  { id: "responsabilitate", label: "Responsabilitatea firmelor", icon: AlertTriangle },
  { id: "divulgare", label: "Divulgarea datelor", icon: Globe },
  { id: "transferuri", label: "Transferuri internaționale", icon: Globe },
  { id: "stocare", label: "Durata stocării", icon: Clock },
  { id: "drepturi", label: "Drepturile utilizatorilor", icon: Scale },
  { id: "cookies", label: "Cookies", icon: Cookie },
  { id: "profilare", label: "Profilare și decizii automate", icon: Shield },
  { id: "securitate", label: "Securitatea datelor", icon: Lock },
  { id: "minori", label: "Datele minorilor", icon: Baby },
  { id: "linkuri", label: "Linkuri externe", icon: ExternalLink },
  { id: "modificari", label: "Modificări", icon: FileText },
];

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("operator");
  const [tocOpen, setTocOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveSection(top.target.id);
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTocOpen(false);
  };

  const SidebarNav = ({ className = "" }: { className?: string }) => (
    <nav className={className}>
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <FileText className="w-4 h-4 text-primary" />
        Cuprins
      </h3>
      <ul className="space-y-0.5">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <li key={s.id}>
              <button
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2.5 ${
                  activeSection === s.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="leading-snug">{s.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  const SectionHeader = ({
    id,
    number,
    title,
    icon: Icon,
  }: {
    id: string;
    number: number;
    title: string;
    icon: React.ElementType;
  }) => (
    <div
      id={id}
      ref={(el) => { sectionRefs.current[id] = el; }}
      className="scroll-mt-24 flex items-center gap-3 mb-4"
    >
      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-4.5 h-4.5 text-primary" />
      </div>
      <h2 className="text-lg font-bold text-foreground">
        {number}. {title}
      </h2>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="solid" />
      <div className="pt-16" />

      {/* Hero */}
      <section className="bg-card border-b border-border">
        <div className="container py-10 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Politica de confidențialitate și cookies
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Această politică descrie modul în care GhidBeauty.ro colectează, utilizează și protejează datele cu caracter personal, în conformitate cu GDPR.
          </p>
          <p className="text-xs text-muted-foreground mt-3">Ultima actualizare: 03.04.2026</p>
        </div>
      </section>

      {/* Mobile TOC */}
      <div className="lg:hidden container pt-6">
        <Collapsible open={tocOpen} onOpenChange={setTocOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between bg-card border border-border rounded-xl p-4">
            <span className="text-sm font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" /> Cuprins
            </span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${tocOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="border border-t-0 border-border rounded-b-xl p-4 bg-card">
              <SidebarNav />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <main className="flex-1 container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <SidebarNav />
            </div>
          </aside>

          {/* Content */}
          <article className="prose-sm max-w-none space-y-10">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-sm text-foreground leading-relaxed">
              <strong>Prin accesarea și utilizarea Platformei GhidBeauty.ro, persoanele vizate confirmă că au luat cunoștință de conținutul prezentei politici.</strong>
            </div>

            {/* 1. Operator */}
            <section>
              <SectionHeader id="operator" number={1} title="Operatorul de date" icon={Building2} />
              <div className="bg-card border border-border rounded-xl p-5 space-y-2 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Operator:</strong> DIRECTORIES MANAGEMENT SYSTEMS SRL</p>
                <p><strong className="text-foreground">Adresă:</strong> Iuliu Maniu 18-20, Sector 6, București</p>
                <p><strong className="text-foreground">Email:</strong> <a href="mailto:contact@ghidbeauty.ro" className="text-primary hover:underline">contact@ghidbeauty.ro</a></p>
                <p><strong className="text-foreground">Telefon:</strong> <a href="tel:0314044440" className="text-primary hover:underline">031.404.44.40</a></p>
              </div>
            </section>

            {/* 2. Categorii */}
            <section>
              <SectionHeader id="utilizatori" number={2} title="Categoriile de utilizatori" icon={UserCheck} />
              <p className="text-sm text-muted-foreground mb-3">Prezenta politică se aplică următoarelor categorii de persoane vizate:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /> Vizitatori ai Platformei în căutare de informații din industria beauty</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /> Persoane care utilizează formularele de contact ale site-ului sau companiilor</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /> Reprezentanți ai entităților juridice care publică informații în cadrul Platformei</li>
              </ul>
            </section>

            {/* 3. Date colectate */}
            <section>
              <SectionHeader id="date-colectate" number={3} title="Tipuri de date colectate" icon={Database} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Date furnizate de utilizatori</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Nume, prenume</li>
                    <li>• Email</li>
                    <li>• Telefon</li>
                    <li>• Conținutul mesajelor</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Date furnizate de firme</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Denumire companie</li>
                    <li>• Date de contact</li>
                    <li>• Adresă sediu / puncte de lucru</li>
                    <li>• Descrieri, servicii, imagini, logo</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Date colectate automat</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• IP, locație aproximativă</li>
                    <li>• Browser, dispozitiv</li>
                    <li>• Comportament pe site</li>
                    <li>• Cookies și identificatori</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Recenzii */}
            <section>
              <SectionHeader id="recenzii" number={4} title="Recenzii, evaluări și verificare" icon={Star} />
              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>Platforma permite utilizatorilor să publice recenzii, evaluări și alte forme de conținut. În acest context, Operatorul poate prelucra date precum: nume sau pseudonim (afișat public), adresă de e-mail (nepublică), conținutul recenziei, data publicării, precum și date tehnice (ex: adresă IP).</p>
                <p>Platforma poate indica, acolo unde este posibil, dacă o recenzie este <strong className="text-foreground">„verificată"</strong> (asociată unei interacțiuni reale) sau <strong className="text-foreground">„neverificată"</strong> (fără posibilitatea validării independente).</p>
                <p>Prin publicarea unei recenzii, utilizatorul declară că:</p>
                <ul className="space-y-1 ml-4">
                  <li>– recenzia reflectă o experiență reală și personală;</li>
                  <li>– conținutul este legal, veridic și nu aduce atingere drepturilor terților;</li>
                  <li>– nu urmărește manipularea reputației unei entități.</li>
                </ul>
                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 mt-3">
                  <p className="text-xs"><strong className="text-foreground">Este strict interzisă</strong> publicarea de: recenzii false sau înșelătoare, conținut defăimător sau ilegal, recenzii în schimbul unor beneficii nedeclarate.</p>
                </div>
                <p><strong className="text-foreground">Recenziile reprezintă exclusiv opiniile utilizatorilor și nu angajează răspunderea Operatorului.</strong></p>
              </div>
            </section>

            {/* 5. Scopuri */}
            <section>
              <SectionHeader id="scopuri" number={5} title="Scopurile prelucrării și temeiul legal" icon={Eye} />
              <div className="text-sm text-muted-foreground space-y-3">
                <p>Datele sunt utilizate pentru:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["Administrarea platformei", "Publicarea și afișarea firmelor", "Facilitarea contactului", "Procesarea solicitărilor", "Îmbunătățirea serviciilor", "Analiză trafic și performanță", "Prevenirea abuzurilor", "Respectarea obligațiilor legale"].map((s) => (
                    <div key={s} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-xs">{s}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3">Prelucrăm datele în baza: <strong className="text-foreground">consimțământului</strong>, <strong className="text-foreground">executării unui contract</strong>, <strong className="text-foreground">interesului legitim</strong> și <strong className="text-foreground">obligațiilor legale</strong>.</p>
              </div>
            </section>

            {/* 6. Publicare */}
            <section>
              <SectionHeader id="publicare" number={6} title="Publicarea datelor firmelor" icon={FileText} />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Prin transmiterea datelor către platformă, firmele: își exprimă acordul pentru publicarea acestora, confirmă că dețin drepturile asupra conținutului transmis și sunt responsabile pentru legalitatea, corectitudinea și actualitatea informațiilor.
              </p>
            </section>

            {/* 7. Responsabilitate */}
            <section>
              <SectionHeader id="responsabilitate" number={7} title="Responsabilitatea firmelor listate" icon={AlertTriangle} />
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p><strong className="text-foreground">IMPORTANT:</strong> GhidBeauty.ro are rol de platformă de listare.</p>
                <p>Toate informațiile despre firme (descrieri, servicii, prețuri, imagini, date de contact) sunt furnizate direct de către acestea. Firmele sunt singurele responsabile pentru corectitudinea informațiilor și legalitatea activităților desfășurate.</p>
                <p>Operatorul site-ului nu garantează veridicitatea, actualitatea sau legalitatea acestora și nu răspunde pentru eventuale prejudicii rezultate din utilizarea acestora.</p>
                <p className="font-medium text-foreground">Utilizatorii sunt încurajați să verifice direct informațiile cu firmele.</p>
              </div>
            </section>

            {/* 8. Divulgare */}
            <section>
              <SectionHeader id="divulgare" number={8} title="Divulgarea datelor" icon={Globe} />
              <p className="text-sm text-muted-foreground mb-3">Datele pot fi partajate cu:</p>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /> Furnizori IT (hosting, mentenanță)</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /> Furnizori de analytics (ex: Google Analytics)</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /> Furnizori de servicii marketing</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /> Autorități publice</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">Toți partenerii respectă cerințele GDPR.</p>
            </section>

            {/* 9. Transferuri */}
            <section>
              <SectionHeader id="transferuri" number={9} title="Transferuri internaționale" icon={Globe} />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Datele pot fi transferate în afara SEE (ex: SUA prin servicii de analytics), doar cu garanții adecvate: clauze contractuale standard (SCC) și mecanisme aprobate de Comisia Europeană.
              </p>
            </section>

            {/* 10. Stocare */}
            <section>
              <SectionHeader id="stocare" number={10} title="Durata stocării" icon={Clock} />
              <p className="text-sm text-muted-foreground mb-3">Datele sunt păstrate:</p>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /> Cât timp contul sau listarea este activă</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /> Pe durata relației contractuale</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /> Conform obligațiilor legale</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /> Până la retragerea consimțământului</li>
              </ul>
            </section>

            {/* 11. Drepturi */}
            <section>
              <SectionHeader id="drepturi" number={11} title="Drepturile utilizatorilor" icon={Scale} />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["Acces la date", "Rectificare", "Ștergere", "Restricționare", "Portabilitate", "Opoziție", "Retragere consimțământ", "Plângeri la ANSPDCP"].map((d) => (
                  <div key={d} className="bg-card border border-border rounded-lg p-3 text-center">
                    <p className="text-xs font-medium text-foreground">{d}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Plângeri: ANSPDCP — <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.dataprotection.ro</a>
              </p>
            </section>

            {/* 12. Cookies */}
            <section>
              <SectionHeader id="cookies" number={12} title="Cookies" icon={Cookie} />
              <div className="text-sm text-muted-foreground space-y-3">
                <p>Site-ul utilizează cookies pentru:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-card border border-border rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-foreground mb-1">Esențiale</h4>
                    <p className="text-xs text-muted-foreground">Funcționarea corectă a site-ului</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-foreground mb-1">Analiză trafic</h4>
                    <p className="text-xs text-muted-foreground">Google Analytics (statistici)</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-foreground mb-1">Preferințe</h4>
                    <p className="text-xs text-muted-foreground">Salvarea preferințelor utilizator</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-foreground mb-1">Marketing</h4>
                    <p className="text-xs text-muted-foreground">Dacă este cazul</p>
                  </div>
                </div>
                <p>Utilizatorii pot: accepta sau refuza cookies, seta preferințe și șterge cookies din browser.</p>
              </div>
            </section>

            {/* 13. Profilare */}
            <section>
              <SectionHeader id="profilare" number={13} title="Profilare și decizii automate" icon={Shield} />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nu realizăm profilare automată care produce efecte juridice asupra utilizatorilor. Datele de analiză sunt utilizate doar pentru statistici și îmbunătățirea serviciilor.
              </p>
            </section>

            {/* 14. Securitate */}
            <section>
              <SectionHeader id="securitate" number={14} title="Securitatea datelor" icon={Lock} />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Criptare SSL", icon: Lock },
                  { label: "Acces limitat", icon: Shield },
                  { label: "Monitorizare", icon: Eye },
                  { label: "Backup-uri", icon: Database },
                ].map((m) => (
                  <div key={m.label} className="bg-card border border-border rounded-lg p-3 text-center space-y-1">
                    <m.icon className="w-5 h-5 text-primary mx-auto" />
                    <p className="text-xs font-medium text-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 15. Minori */}
            <section>
              <SectionHeader id="minori" number={15} title="Datele minorilor" icon={Baby} />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Site-ul nu este destinat minorilor sub 16 ani. Nu colectăm intenționat date de la persoane sub această vârstă.
              </p>
            </section>

            {/* 16. Linkuri */}
            <section>
              <SectionHeader id="linkuri" number={16} title="Linkuri externe" icon={ExternalLink} />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nu suntem responsabili pentru conținutul sau politicile altor site-uri către care pointează listingurile companiilor listate pe GhidBeauty.ro.
              </p>
            </section>

            {/* 17. Modificări */}
            <section>
              <SectionHeader id="modificari" number={17} title="Modificări" icon={FileText} />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Putem actualiza această politică. Versiunea actuală este disponibilă permanent pe site.
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
