import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";
import { HelpCircle, User, Building2, CreditCard, Star, Shield, Phone, FileText, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const categories = [
  { id: "cont", label: "Cont & Autentificare", icon: User },
  { id: "listare", label: "Listare companie", icon: Building2 },
  { id: "plati", label: "Plăți & Abonamente", icon: CreditCard },
  { id: "recenzii", label: "Recenzii", icon: Star },
  { id: "confidentialitate", label: "Confidențialitate", icon: Shield },
  { id: "contact", label: "Contact & Suport", icon: Phone },
];

const faqData: Record<string, { q: string; a: string }[]> = {
  cont: [
    { q: "Cum îmi creez un cont pe GhidBeauty.ro?", a: "Apasă butonul «Autentificare» din meniul principal și completează formularul de înregistrare cu adresa ta de email și o parolă. Vei primi un email de confirmare pentru activarea contului." },
    { q: "Am uitat parola. Ce pot face?", a: "Pe pagina de autentificare, apasă pe «Am uitat parola». Vei primi un email cu un link de resetare. Verifică și folderul Spam dacă nu găsești mesajul." },
    { q: "Pot să-mi șterg contul?", a: "Da, poți solicita ștergerea contului contactându-ne la contact@ghidbeauty.ro. Datele tale vor fi eliminate conform politicii noastre de confidențialitate." },
    { q: "Ce date sunt necesare pentru crearea contului?", a: "Ai nevoie de o adresă de email validă și o parolă. Pentru listarea unei companii, vor fi necesare informații suplimentare despre afacerea ta." },
  ],
  listare: [
    { q: "Cum îmi listez compania pe GhidBeauty.ro?", a: "Accesează pagina «Adaugă companie» din meniul principal, completează formularul cu detaliile afacerii tale și alege un plan de abonament. Listarea va fi activată după verificare." },
    { q: "Cât durează verificarea listării?", a: "Procesul de verificare durează de obicei 1-2 zile lucrătoare. Vei fi notificat prin email când listarea ta este activă." },
    { q: "Pot edita informațiile companiei după publicare?", a: "Da, te poți autentifica în contul tău și modifica oricând detaliile companiei: descriere, servicii, imagini, program de lucru etc." },
    { q: "Câte locații pot adăuga pentru o singură companie?", a: "Poți adăuga mai multe puncte de lucru pentru aceeași companie. Fiecare locație va avea propria pagină cu hartă și detalii de contact." },
  ],
  plati: [
    { q: "Ce planuri de abonament sunt disponibile?", a: "Oferim planuri gratuite și premium. Planul gratuit include listarea de bază, iar planurile premium oferă vizibilitate sporită, poziționare prioritară și funcții avansate." },
    { q: "Ce metode de plată acceptați?", a: "Acceptăm plăți prin card bancar (Visa, Mastercard), transfer bancar și facturare pentru companii." },
    { q: "Pot anula abonamentul oricând?", a: "Da, poți anula abonamentul în orice moment din setările contului. Vei beneficia de funcțiile premium până la expirarea perioadei plătite." },
  ],
  recenzii: [
    { q: "Cum pot lăsa o recenzie?", a: "Accesează pagina companiei dorite și apasă butonul «Scrie o recenzie». Completează evaluarea (stele) și adaugă un comentariu despre experiența ta." },
    { q: "Pot șterge sau modifica o recenzie?", a: "Da, poți edita sau șterge recenziile tale din contul tău. Accesează secțiunea «Recenziile mele» pentru a gestiona conținutul publicat." },
    { q: "Ce se întâmplă cu recenziile false?", a: "Avem un sistem de moderare care verifică autenticitatea recenziilor. Recenziile false, spam sau care încalcă regulamentul sunt eliminate, iar conturile respective pot fi suspendate." },
    { q: "Compania poate răspunde la recenzia mea?", a: "Da, reprezentanții companiilor pot răspunde public la recenzii. Acest lucru facilitează comunicarea directă între clienți și furnizori." },
  ],
  confidentialitate: [
    { q: "Ce date personale colectați?", a: "Colectăm doar datele necesare funcționării platformei: email, nume, telefon (opțional) și date tehnice (IP, cookies). Detalii complete în Politica de confidențialitate." },
    { q: "Cum îmi pot exercita drepturile GDPR?", a: "Poți solicita accesul, rectificarea, ștergerea sau portabilitatea datelor tale trimițând un email la contact@ghidbeauty.ro. Vom răspunde în maximum 30 de zile." },
    { q: "Folosiți cookies?", a: "Da, folosim cookies esențiale pentru funcționarea site-ului și cookies analitice (cu consimțământul tău) pentru îmbunătățirea experienței. Poți gestiona preferințele din banner-ul de cookies." },
  ],
  contact: [
    { q: "Cum pot contacta echipa GhidBeauty.ro?", a: "Ne poți contacta prin formularul de pe pagina Contact, prin email la contact@ghidbeauty.ro sau telefonic la 031.404.44.40, de luni până vineri, între 9:00 și 18:00." },
    { q: "Care este timpul mediu de răspuns?", a: "Răspundem la toate solicitările în maximum 24 de ore lucrătoare. Pentru urgențe, te rugăm să ne contactezi telefonic." },
    { q: "Pot raporta o companie sau o recenzie?", a: "Da, pe fiecare pagină de companie și recenzie există un buton de raportare. Echipa noastră va analiza raportul și va lua măsurile necesare." },
  ],
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("cont");
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
          setActiveCategory(top.target.id);
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
        Categorii
      </h3>
      <ul className="space-y-0.5">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <li key={c.id}>
              <button
                onClick={() => scrollTo(c.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2.5 ${
                  activeCategory === c.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="leading-snug">{c.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="solid" />
      <div className="pt-16" />

      {/* Hero */}
      <section className="bg-card border-b border-border">
        <div className="container py-10 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
            <HelpCircle className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Întrebări frecvente
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Găsește răspunsuri rapide la cele mai comune întrebări despre GhidBeauty.ro, listarea companiilor, plăți și confidențialitate.
          </p>
        </div>
      </section>

      {/* Mobile TOC */}
      <div className="lg:hidden container pt-6">
        <Collapsible open={tocOpen} onOpenChange={setTocOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between bg-card border border-border rounded-xl p-4">
            <span className="text-sm font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" /> Categorii
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
          <div className="space-y-10">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const items = faqData[cat.id] || [];
              return (
                <section
                  key={cat.id}
                  id={cat.id}
                  ref={(el) => { sectionRefs.current[cat.id] = el; }}
                  className="scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <h2 className="text-lg font-bold text-foreground">{cat.label}</h2>
                  </div>
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <Accordion type="single" collapsible>
                      {items.map((item, i) => (
                        <AccordionItem key={i} value={`${cat.id}-${i}`} className="border-border last:border-b-0">
                          <AccordionTrigger className="px-5 text-sm text-foreground hover:no-underline hover:bg-muted/50">
                            {item.q}
                          </AccordionTrigger>
                          <AccordionContent className="px-5 text-sm text-muted-foreground leading-relaxed">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
