import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";
import { HelpCircle, User, Building2, CreditCard, Star, Shield, Phone, FileText, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const categories = [
  { id: "cont", label: "Cont & Autentificare", icon: User },
  { id: "listare", label: "Listare companie", icon: Building2 },
  { id: "plati", label: "Plati & Abonamente", icon: CreditCard },
  { id: "recenzii", label: "Recenzii", icon: Star },
  { id: "confidentialitate", label: "Confidentialitate", icon: Shield },
  { id: "contact", label: "Contact & Suport", icon: Phone },
];

const faqData: Record<string, { q: string; a: string }[]> = {
  cont: [
    { q: "Cum imi creez un cont pe GhidBeauty.ro?", a: "Apasa butonul Autentificare din meniul principal si completeaza formularul de inregistrare cu adresa ta de email si o parola. Vei primi un email de confirmare pentru activarea contului." },
    { q: "Am uitat parola. Ce pot face?", a: "Pe pagina de autentificare, apasa pe Am uitat parola. Vei primi un email cu un link de resetare. Verifica si folderul Spam daca nu gasesti mesajul." },
    { q: "Pot sa-mi sterg contul?", a: "Da, poti solicita stergerea contului contactandu-ne la contact@ghidbeauty.ro. Datele tale vor fi eliminate conform politicii noastre de confidentialitate." },
    { q: "Ce date sunt necesare pentru crearea contului?", a: "Ai nevoie de o adresa de email valida si o parola. Pentru listarea unei companii, vor fi necesare informatii suplimentare despre afacerea ta." },
  ],
  listare: [
    { q: "Cum imi listez compania pe GhidBeauty.ro?", a: "Acceseaza pagina Adauga companie din meniul principal, completeaza formularul cu detaliile afacerii tale si alege un plan de abonament. Listarea va fi activata dupa verificare." },
    { q: "Cat dureaza verificarea listarii?", a: "Procesul de verificare dureaza de obicei 1-2 zile lucratoare. Vei fi notificat prin email cand listarea ta este activa." },
    { q: "Pot edita informatiile companiei dupa publicare?", a: "Da, te poti autentifica in contul tau si modifica oricand detaliile companiei: descriere, servicii, imagini, program de lucru etc." },
    { q: "Cate locatii pot adauga pentru o singura companie?", a: "Poti adauga mai multe puncte de lucru pentru aceeasi companie. Fiecare locatie va avea propria pagina cu harta si detalii de contact." },
  ],
  plati: [
    { q: "Ce planuri de abonament sunt disponibile?", a: "Oferim planuri gratuite si premium. Planul gratuit include listarea de baza, iar planurile premium ofera vizibilitate sporita, pozitionare prioritara si functii avansate." },
    { q: "Ce metode de plata acceptati?", a: "Acceptam plati prin card bancar (Visa, Mastercard), transfer bancar si facturare pentru companii." },
    { q: "Pot anula abonamentul oricand?", a: "Da, poti anula abonamentul in orice moment din setarile contului. Vei beneficia de functiile premium pana la expirarea perioadei platite." },
  ],
  recenzii: [
    { q: "Cum pot lasa o recenzie?", a: "Acceseaza pagina companiei dorite si apasa butonul Scrie o recenzie. Completeaza evaluarea (stele) si adauga un comentariu despre experienta ta." },
    { q: "Pot sterge sau modifica o recenzie?", a: "Da, poti edita sau sterge recenziile tale din contul tau. Acceseaza sectiunea Recenziile mele pentru a gestiona continutul publicat." },
    { q: "Ce se intampla cu recenziile false?", a: "Avem un sistem de moderare care verifica autenticitatea recenziilor. Recenziile false, spam sau care incalca regulamentul sunt eliminate, iar conturile respective pot fi suspendate." },
    { q: "Compania poate raspunde la recenzia mea?", a: "Da, reprezentantii companiilor pot raspunde public la recenzii. Acest lucru faciliteaza comunicarea directa intre clienti si furnizori." },
  ],
  confidentialitate: [
    { q: "Ce date personale colectati?", a: "Colectam doar datele necesare functionarii platformei: email, nume, telefon (optional) si date tehnice (IP, cookies). Detalii complete in Politica de confidentialitate." },
    { q: "Cum imi pot exercita drepturile GDPR?", a: "Poti solicita accesul, rectificarea, stergerea sau portabilitatea datelor tale trimitand un email la contact@ghidbeauty.ro. Vom raspunde in maximum 30 de zile." },
    { q: "Folositi cookies?", a: "Da, folosim cookies esentiale pentru functionarea site-ului si cookies analitice (cu consimtamantul tau) pentru imbunatatirea experientei. Poti gestiona preferintele din banner-ul de cookies." },
  ],
  contact: [
    { q: "Cum pot contacta echipa GhidBeauty.ro?", a: "Ne poti contacta prin formularul de pe pagina Contact, prin email la contact@ghidbeauty.ro sau telefonic la 031.404.44.40, de luni pana vineri, intre 9:00 si 18:00." },
    { q: "Care este timpul mediu de raspuns?", a: "Raspundem la toate solicitarile in maximum 24 de ore lucratoare. Pentru urgente, te rugam sa ne contactezi telefonic." },
    { q: "Pot raporta o companie sau o recenzie?", a: "Da, pe fiecare pagina de companie si recenzie exista un buton de raportare. Echipa noastra va analiza raportul si va lua masurile necesare." },
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

      <section className="bg-card border-b border-border">
        <div className="container py-10 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
            <HelpCircle className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Intrebari frecvente
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Gaseste raspunsuri rapide la cele mai comune intrebari despre GhidBeauty.ro, listarea companiilor, plati si confidentialitate.
          </p>
        </div>
      </section>

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
          <aside className="hidden lg:block">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <SidebarNav />
            </div>
          </aside>

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
