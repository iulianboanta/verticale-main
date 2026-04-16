import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";
import {
  FileText, Scale, Clock, CreditCard, Receipt, Users, ShieldAlert,
  PenLine, PauseCircle, ArrowRightLeft, XCircle, Lock, CloudLightning,
  Landmark, Gavel, ScrollText, Handshake, ChevronDown, Building2
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const sections = [
  { id: "preambul", label: "Preambul", icon: Building2 },
  { id: "definitii", label: "Definiții și interpretare", icon: ScrollText },
  { id: "obiect", label: "Obiectul contractului", icon: FileText },
  { id: "durata", label: "Durata și intrarea în vigoare", icon: Clock },
  { id: "pret", label: "Prețul contractului", icon: CreditCard },
  { id: "facturare", label: "Modalități de facturare", icon: Receipt },
  { id: "drepturi", label: "Drepturile și obligațiile părților", icon: Users },
  { id: "raspundere", label: "Răspundere contractuală", icon: ShieldAlert },
  { id: "modificare", label: "Modificarea contractului", icon: PenLine },
  { id: "suspendare", label: "Suspendarea serviciilor", icon: PauseCircle },
  { id: "cesiune", label: "Cesiunea contractului", icon: ArrowRightLeft },
  { id: "incetare", label: "Încetarea contractului", icon: XCircle },
  { id: "confidentialitate", label: "Confidențialitate & GDPR", icon: Lock },
  { id: "forta-majora", label: "Forța majoră", icon: CloudLightning },
  { id: "salvgardare", label: "Clauza de salvgardare", icon: Landmark },
  { id: "litigii", label: "Litigii", icon: Gavel },
  { id: "dispozitii", label: "Dispoziții finale", icon: Scale },
  { id: "declaratia", label: "Declarația părților", icon: Handshake },
];

const TermeniConditii = () => {
  const [activeSection, setActiveSection] = useState("preambul");
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
    id, number, title, icon: Icon,
  }: {
    id: string; number: number; title: string; icon: React.ElementType;
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

  const SubArticle = ({ code, children }: { code: string; children: React.ReactNode }) => (
    <div className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
      <span className="font-medium text-foreground shrink-0 w-10 text-right">{code}</span>
      <div className="flex-1">{children}</div>
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
            <Scale className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Termeni și condiții
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Contract cadru privind prestarea de servicii de publicitate pe platforma GhidBeauty.ro
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

            {/* Preambul */}
            <section>
              <SectionHeader id="preambul" number={0} title="Preambul" icon={Building2} />
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-sm text-foreground leading-relaxed">
                <p>Prezentul contract se încheie între: <strong>Directories Management Systems SRL</strong> cu sediul în București, Bd. Iuliu Maniu 18-20, Sector 6, înregistrată la Oficiul Registrului Comerțului București sub nr J40/12445/2012, având atribuit CUI RO30832163, cont bancar RO08 INGB 0000 9999 0436 6931, ING București, reprezentată de Iulian Boantă, în calitate de Administrator, denumită în continuare <strong>BENEFICIAR</strong> și entitățile care acceptă acești termeni și condiții prin semnarea unei comenzi sau prin achitarea unei proforme.</p>
                <p className="mt-3">Acest contract cadru privind prestarea de servicii este realizat și va intra în vigoare la data semnării unei comenzi sau la data achitării proformei aferente unei comenzi. El este compus din preambul, termeni contractuali și potrivit opțiunilor părților anexe la contract.</p>
              </div>
            </section>

            {/* 1. Definiții */}
            <section>
              <SectionHeader id="definitii" number={1} title="Definiții și interpretare" icon={ScrollText} />
              <div className="bg-card border border-border rounded-xl p-5 space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <span className="font-semibold text-foreground shrink-0 w-6">a.</span>
                  <p><strong className="text-foreground">Beneficiar:</strong> orice beneficiar al produselor sau serviciilor Directories Management Systems.</p>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold text-foreground shrink-0 w-6">b.</span>
                  <p><strong className="text-foreground">Prestator:</strong> Directories Management Systems SRL, persoana juridică parte a acestui contract, care pune la dispoziția Beneficiarului Serviciile solicitate.</p>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold text-foreground shrink-0 w-6">c.</span>
                  <p><strong className="text-foreground">Serviciu:</strong> orice serviciu furnizat de Prestator în baza acestuia (publicitate în portaluri web, înregistrări domenii web, găzduire domenii web, realizare web design, promovare web, mentenanță site-uri web și alte servicii menționate în anexa/anexele la contract).</p>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold text-foreground shrink-0 w-6">d.</span>
                  <p><strong className="text-foreground">Anexa la contract:</strong> document care conține condițiile particulare aplicabile furnizării unui anumit serviciu.</p>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold text-foreground shrink-0 w-6">e.</span>
                  <p><strong className="text-foreground">Perioada minimă inițială:</strong> perioada minimă inițială de valabilitate a contractului pentru un Serviciu, respectiv 1 an de la data activării Serviciului, cu excepția cazului în care Anexele la contract sau în ofertele Prestatorului prevăd altfel.</p>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold text-foreground shrink-0 w-6">f.</span>
                  <p><strong className="text-foreground">Perioada de facturare:</strong> perioada luată în calcul la facturarea lunară/anuală a serviciilor furnizate.</p>
                </div>
              </div>
            </section>

            {/* 2. Obiect */}
            <section>
              <SectionHeader id="obiect" number={2} title="Obiectul contractului" icon={FileText} />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Publicitate și servicii în portalurile web ale Prestatorului, conform anexelor.
              </p>
            </section>

            {/* 3. Durata */}
            <section>
              <SectionHeader id="durata" number={3} title="Durata și intrarea în vigoare a contractului" icon={Clock} />
              <div className="space-y-3">
                <SubArticle code="3.1">Pentru fiecare Serviciu, contractul este încheiat pe o Perioadă minimă inițială indicată în Comandă/Anexe. În cazul în care nu este specificată nicio perioadă, aceasta se va considera implicit 1 an.</SubArticle>
                <SubArticle code="3.2">Contractul se va prelungi automat pe noi perioade succesive egale, cu excepția cazului în care oricare din părți notifică intenția de a schimba perioada de valabilitate a contractului pentru serviciul respectiv, în scris cu confirmare de primire sau prin semnarea unei noi Anexe/Comenzi cu minim 30 de zile înainte de expirarea valabilității.</SubArticle>
                <SubArticle code="3.3">Prezentul contract se încheie pentru serviciile menționate în Anexe.</SubArticle>
                <SubArticle code="3.4">Contractul intră în vigoare la data semnării lui de către părți sau, în cazul în care aceasta nu există, la data plății proformei aferente serviciilor.</SubArticle>
              </div>
            </section>

            {/* 4. Pret */}
            <section>
              <SectionHeader id="pret" number={4} title="Prețul contractului. Contestații" icon={CreditCard} />
              <div className="space-y-3">
                <SubArticle code="4.1">Valoarea totală a contractului este dată de suma valorilor anexelor sale. Sumele datorate se vor achita în lei în conturile Prestatorului, în modalitățile și structura conform Anexelor din acest contract.</SubArticle>
                <SubArticle code="4.2">Tarifele pentru serviciile prestate pot fi în RON sau EUR, conform celor menționate în Anexe; facturarea de către Prestator și plata de către Beneficiar a serviciilor se vor face în lei la cursul BNR din ziua emiterii facturii proforme sau a facturii fiscale.</SubArticle>
                <SubArticle code="4.3">TVA-ul va fi plătit de către client, conform reglementărilor în vigoare la data efectuării plății.</SubArticle>
                <SubArticle code="4.4">Plata prestației se va efectua prin una dintre modalitățile următoare: Bilet la ordin, Cambie, Filă CEC, Depunere de numerar în contul Prestatorului cu precizarea expresă a numărului contractului, Ordin de plată etc.</SubArticle>
                <SubArticle code="4.5">În cazul în care termenul/termenele de plată nu sunt completate, acestea se consideră implicite: prima plată în termen de 7 (șapte) zile de la data semnării contractului, iar următoarele rate din 30 în 30 de zile de la data semnării contractului.</SubArticle>
                <SubArticle code="4.6">Dacă perioada contractată se micșorează la cererea Beneficiarului, reducerea acordată la semnarea contractului se pierde, Beneficiarul urmând să plătească prețul întreg al serviciilor și/sau produselor contractate pe perioada prestată fără reducere.</SubArticle>
                <SubArticle code="4.7">În cazul în care data scadentă a plății sau a ratei este depășită cu mai mult de 30 de zile calendaristice, reducerea acordată la semnarea contractului își pierde valabilitatea, urmând ca Beneficiarul să plătească prețul serviciilor la valoarea prețului întreg fără reducere.</SubArticle>
                <SubArticle code="4.8">Data plății va fi considerată data la care suma de plată a intrat în contul Prestatorului.</SubArticle>
                <SubArticle code="4.9">
                  <p>Pentru sumele neplătite în termenul prevăzut, Beneficiarul va plăti penalități de 0,5% pentru fiecare zi de întârziere, acestea devenind exigibile în termen de 1 zi de la data pentru care au fost calculate.</p>
                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 mt-2">
                    <p className="text-xs"><strong className="text-foreground">Atenție:</strong> Cuantumul penalităților de întârziere la plată poate depăși valoarea debitului principal.</p>
                  </div>
                </SubArticle>
                <SubArticle code="4.10">Când neplata serviciilor depășește 30 de zile calendaristice de la data scadentă, Prestatorul poate deconecta Beneficiarul de la serviciile contractate, fără notificare.</SubArticle>
                <SubArticle code="4.11">Reconectarea serviciului se va face după ce Beneficiarul face dovada plății sumelor datorate.</SubArticle>
                <SubArticle code="4.12">Prestatorul va avea dreptul să modifice prețul abonamentelor lunare dacă intervin motive întemeiate cum ar fi: fluctuații ale cursului de schimb al monedei naționale față de EURO și USD, creșterea inflației, apariția unor modificări fiscale. Orice modificare va fi comunicată Beneficiarului cu cel puțin 30 de zile înainte. Beneficiarul are dreptul ca, în maxim 30 de zile de la anunțarea tarifelor majorate, să denunțe unilateral contractul sub condiția achitării la zi a tuturor sumelor datorate.</SubArticle>
                <SubArticle code="4.13">Dacă Beneficiarul a beneficiat de o reducere în cadrul unei promoții condiționate de încheierea contractului pe o perioadă minimă determinată, iar contractul încetează din inițiativa sau culpa Beneficiarului înainte de sfârșitul perioadei, Beneficiarul va plăti diferența de care a beneficiat, calculată pentru toată perioada în care contractul a fost în vigoare, în termen de 7 zile de la data încetării.</SubArticle>
                <SubArticle code="4.14">Beneficiarul nu va putea invoca justificarea neplății la termen a abonamentului pentru un anumit serviciu pe o eventuală nefuncționare a unui alt serviciu.</SubArticle>
                <SubArticle code="4.15">Orice contestație a Beneficiarului legată de plata serviciilor trebuie adresată în scris în maxim 30 de zile de la data când plata a devenit scadentă. Contestația trebuie să cuprindă suma contestată și serviciile contestate.</SubArticle>
                <SubArticle code="4.16">Obligația clientului de a plăti suma în discuție este suspendată pe perioada soluționării contestației. Dacă contestația va fi respinsă, Beneficiarul are obligația de a plăti suma respectivă în termen de 14 zile de la informare.</SubArticle>
                <SubArticle code="4.17">În cazul în care Beneficiarul nu va contesta serviciile prestatorului în termenul stabilit, aceasta va reprezenta o acceptare a îndeplinirii obligațiilor prestatorului.</SubArticle>
                <SubArticle code="4.18">Contestarea facturii pentru o parte din suma indicată nu scutește Beneficiarul de plata în termen a sumei necontestate.</SubArticle>
              </div>
            </section>

            {/* 5. Facturare */}
            <section>
              <SectionHeader id="facturare" number={5} title="Modalități de facturare" icon={Receipt} />
              <div className="space-y-3">
                <SubArticle code="5.1">Facturile reprezentând valoarea abonamentului lunar vor fi plătite de Beneficiar cel mai târziu în ziua de 30 a lunii în care a fost emisă factura.</SubArticle>
                <SubArticle code="5.2">Factura fiscală va fi emisă în prima zi a serviciului și va fi trimisă Beneficiarului.</SubArticle>
                <SubArticle code="5.3">Beneficiarul se obligă ca, în cazul în care nu primește factura în termen de 15 zile de la data efectuării plății, să comunice în scris despre aceasta Prestatorului.</SubArticle>
                <SubArticle code="5.4">În cazul furnizării mai multor servicii, Furnizorul va emite o singură factură, în care va evidenția distinct valoarea abonamentului pentru fiecare serviciu.</SubArticle>
                <SubArticle code="5.5">Prestatorul va trimite factura prin fax și prin e-mail la adresa trecută în contract, conform legislației române.</SubArticle>
                <SubArticle code="5.6">La cererea Beneficiarului, Prestatorul poate trimite factura fiscală prin curier rapid cu plata la destinatar.</SubArticle>
                <SubArticle code="5.7">În cazul neachitării la termen a oricărei plăți, Prestatorul are dreptul să factureze, să ceară și să primească plata integrală a prețului contractului, chiar dacă termenul nu este împlinit pentru toate sumele de plată.</SubArticle>
              </div>
            </section>

            {/* 6. Drepturi si obligatii */}
            <section>
              <SectionHeader id="drepturi" number={6} title="Drepturile și obligațiile părților" icon={Users} />
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Obligațiile Prestatorului</h3>
                <div className="space-y-3">
                  <SubArticle code="6.1">Prestatorul depune toate eforturile rezonabile pentru a asigura calitatea optimă a serviciilor furnizate și răspunde pentru furnizarea serviciilor contractate de Beneficiar conform contractului.</SubArticle>
                  <SubArticle code="6.2">Prestatorul este obligat să păstreze active anunțurile conținut, bannerele și produse sponsorizate în forma și pentru perioada stabilite în prezentul contract.</SubArticle>
                  <SubArticle code="6.3">Prestatorul asigură, la cererea Beneficiarului, instruire și informații necesare pentru organizarea și exploatarea serviciilor oferite.</SubArticle>
                  <SubArticle code="6.4">Prestatorul nu răspunde pentru niciun prejudiciu indirect sau viitor suferit de Beneficiar incluzând, dar fără a se limita la prejudicii rezultate din folosirea necorespunzătoare a serviciilor, pierderi de profit sau beneficii nerealizate.</SubArticle>
                </div>
                <h3 className="text-sm font-semibold text-foreground mt-4">Obligațiile Beneficiarului</h3>
                <div className="space-y-3">
                  <SubArticle code="6.5">Beneficiarul este obligat să plătească valoarea serviciilor contractate conform condițiilor specificate în contract și anexele acestuia.</SubArticle>
                  <SubArticle code="6.6">Beneficiarul este obligat să respecte toate obligațiile care îi revin potrivit prezentului contract și să le îndeplinească cu bună credință.</SubArticle>
                  <SubArticle code="6.7">Beneficiarul nu poate să revendice drepturile de autor asupra graficii online realizate de către Prestator.</SubArticle>
                  <SubArticle code="6.8">Beneficiarul își asumă integral responsabilitatea pentru materialele și datele pe care le solicită să fie afișate pe site-urile Prestatorului.</SubArticle>
                </div>
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mt-2">
                  <SubArticle code="6.9"><strong className="text-foreground">Prestatorul își rezervă dreptul</strong> de a aduce orice modificări structurale, funcționale sau de design în orice moment asupra serviciilor sau pachetelor sale publicitare, pentru a adapta produsul mai bine la piață, pentru a îmbunătăți experiența de utilizare, pentru a adapta produsul la tehnologii web actuale, sau pentru a spori numărul de lead-uri ale clienților.</SubArticle>
                </div>
              </div>
            </section>

            {/* 7. Raspundere */}
            <section>
              <SectionHeader id="raspundere" number={7} title="Răspundere contractuală" icon={ShieldAlert} />
              <div className="space-y-3">
                <SubArticle code="7.1">Obligațiile prestatorului de a furniza servicii se limitează la cele prevăzute în contract, excepții făcând situațiile în care există dispoziție și cerințe speciale prevăzute de lege.</SubArticle>
                <SubArticle code="7.2">Prestatorul nu va răspunde pentru nicio daună, pierdere de profit, beneficii nerealizate, ratarea unor ocazii de afaceri sau alte pierderi suferite de Beneficiar rezultate direct sau indirect din folosirea necorespunzătoare a serviciilor, nefuncționarea serviciului din motive tehnice și/sau din acțiunea unor terți.</SubArticle>
                <SubArticle code="7.3">În caz de neplată la termenele convenite a obligațiilor asumate, Beneficiarul va fi de drept în întârziere la împlinirea termenului, fără a fi necesară notificarea din partea prestatorului.</SubArticle>
                <SubArticle code="7.4">În cazul în care contractul se reziliază conform Articolelor 11.5, Prestatorul va rambursa Clientului sumele în lei încasate în avans, mai puțin valoarea serviciilor prestate până la acea dată și mai puțin o sumă egală cu 25% din valoarea serviciilor neprestate în vederea acoperirii cheltuielilor fixe.</SubArticle>
                <SubArticle code="7.5">În cazul în care contractul încetează la cererea Beneficiarului, Prestatorul va rambursa sumele încasate în avans, din care se reține un procent de 25% din valoarea contractului reprezentând cheltuieli efectuate cu încheierea contractului.</SubArticle>
              </div>
            </section>

            {/* 8. Modificare */}
            <section>
              <SectionHeader id="modificare" number={8} title="Modificarea contractului" icon={PenLine} />
              <div className="space-y-3">
                <SubArticle code="8.1">Prestatorul își rezervă dreptul de a modifica unilateral termenii și condițiile Contractului, fără notificare prealabilă.</SubArticle>
                <SubArticle code="8.2">Beneficiarul are dreptul de a denunța unilateral contractul în termen de 30 de zile calendaristice, în cazul în care a fost notificat și modificările îl afectează în mod negativ și dacă nu acceptă modificările propuse, fără a fi obligat la plata vreunei despăgubiri.</SubArticle>
                <SubArticle code="8.3">Modificarea anexelor acestui contract se va face prin act adițional semnat de ambele părți.</SubArticle>
              </div>
            </section>

            {/* 9. Suspendare */}
            <section>
              <SectionHeader id="suspendare" number={9} title="Suspendarea serviciilor" icon={PauseCircle} />
              <div className="space-y-3">
                <SubArticle code="9.1">Suspendarea serviciului se poate realiza de către Prestator, care are dreptul să suspende furnizarea unuia dintre servicii sau a tuturor serviciilor contractate în cazul în care Beneficiarul întârzie plata serviciilor mai mult de 30 de zile de la data scadentă.</SubArticle>
                <SubArticle code="9.2">Suspendarea serviciului/serviciilor se va realiza în conformitate cu condițiile cuprinse în anexele acestui contract.</SubArticle>
                <SubArticle code="9.3">Reconectarea furnizării serviciului se va face în maxim 48 de ore de la achitarea de către Beneficiar a sumelor datorate, inclusiv a penalităților. Beneficiarul este obligat să facă dovada plății în cel mai scurt timp.</SubArticle>
                <SubArticle code="9.4">La reluarea contractului, prestatorul își rezervă dreptul să ceară plata unui avans care reprezintă valoarea serviciilor pe minim 3 (trei) luni.</SubArticle>
                <SubArticle code="9.5">În cazul suspendării, niciuna din părți nu este răspunzătoare față de cealaltă parte pentru niciun fel de daune indirecte sau daune de orice natură.</SubArticle>
              </div>
            </section>

            {/* 10. Cesiune */}
            <section>
              <SectionHeader id="cesiune" number={10} title="Cesiunea contractului" icon={ArrowRightLeft} />
              <div className="space-y-3">
                <SubArticle code="10.1">Drepturile și obligațiile Prestatorului născute din sau în legătură cu prezentul contract pot fi cesionate, prevederile acestuia urmând a fi aplicabile în integralitatea sa oricărui terț care achizitionează în tot sau în parte rețeaua prestatorului.</SubArticle>
                <SubArticle code="10.2">Beneficiarul poate cesiona prezentul contract unui terț numai cu acordul scris al Prestatorului.</SubArticle>
                <SubArticle code="10.3">Beneficiarul este obligat să nu redistribuie sau să revândă serviciile/produsele ce fac obiectul prezentului contract, fără acordul scris al Prestatorului. Produsele sunt în folosul personal al entității juridice care le achiziționează.</SubArticle>
              </div>
            </section>

            {/* 11. Incetare */}
            <section>
              <SectionHeader id="incetare" number={11} title="Încetarea contractului" icon={XCircle} />
              <div className="space-y-3">
                <SubArticle code="11.1">Contractul încetează la termen.</SubArticle>
                <SubArticle code="11.2">
                  <p>Prestatorul poate rezilia unilateral contractul în deplin drept, fără intervenția instanței de judecată, de la data constatării, fără notificare și fără drept de compensație sau despăgubiri în următoarele condiții:</p>
                  <ul className="mt-2 space-y-1.5 ml-4">
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Beneficiarul nu-și respectă obligația de plată</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Deschiderea procedurilor de insolvență sau lichidare</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Pierderea credibilității Beneficiarului în cazul întârzierilor repetate la plată</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Beneficiarul folosește serviciile contractate în mod abuziv</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Beneficiarul nu-și respectă obligațiile contractuale</li>
                  </ul>
                </SubArticle>
                <SubArticle code="11.3">
                  <p>Beneficiarul poate rezilia unilateral contractul:</p>
                  <ul className="mt-2 space-y-1.5 ml-4">
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Când Prestatorul nu-și îndeplinește obligațiile contractuale</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />După împlinirea perioadei minime inițiale, printr-o notificare scrisă, rezilierea devenind efectivă după 30 de zile de la primirea scrisorii</li>
                  </ul>
                </SubArticle>
                <SubArticle code="11.4">
                  <p>Contractul încetează de drept în următoarele situații:</p>
                  <ul className="mt-2 space-y-1.5 ml-4">
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Beneficiarul nu este de acord cu modificările de prețuri, termeni și condiții</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Beneficiarul sau Prestatorul își încetează activitatea, devine insolvabil sau este declarat falimentul</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />În caz de forță majoră</li>
                  </ul>
                </SubArticle>
                <SubArticle code="11.5">Prezentul contract se poate rezilia prin convenția părților.</SubArticle>
                <SubArticle code="11.6">În cazul încetării Contractului din culpa Beneficiarului înainte de împlinirea perioadei minime inițiale, Beneficiarul va fi obligat la plata tarifului de încetare a furnizării serviciului conform anexei/anexelor acestui contract.</SubArticle>
                <SubArticle code="11.7">Exceptând cazurile în care nu prevede altfel în Contract, niciuna din părți nu este răspunzătoare față de cealaltă parte ca o consecință a rezilierii pentru niciun fel de daune indirecte sau daune de orice natură.</SubArticle>
              </div>
            </section>

            {/* 12. Confidentialitate & GDPR */}
            <section>
              <SectionHeader id="confidentialitate" number={12} title="Confidențialitatea. Prelucrare date. GDPR" icon={Lock} />
              <div className="space-y-3">
                <SubArticle code="12.1">Pe toată durata prezentului contract nicio parte nu poate dezvălui vreuna din clauzele acestui contract fără consimțământul prealabil al celeilalte părți.</SubArticle>
                <SubArticle code="12.2">Beneficiarul este de acord ca datele și informațiile din anunțurile conținut (text și grafică) precum și datele sale de identificare să fie stocate, prelucrate și făcute publice. Este de acord să primească informații cu caracter comercial, prin orice mijloace de comunicare.</SubArticle>

                <div className="bg-card border border-border rounded-xl p-5 mt-2 space-y-3">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    Ce este GDPR
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Regulamentul general privind protecția datelor (GDPR) — intrat în vigoare la data de 25.05.2018 — este noua lege privind protecția datelor din Uniunea Europeană, elaborat pentru a oferi persoanelor un control mai bun asupra informațiilor cu caracter personal și care generează anumite obligații pentru organizațiile care colectează, manipulează, utilizează sau analizează aceste date.</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">Datele de contract (companie, adresă, contact) sunt informații publice disponibile fără prelucrare și nu intră sub incidența GDPR, fiind relația între două companii.</p>
                </div>

                <SubArticle code="12.4">
                  <p className="mb-2"><strong className="text-foreground">În ce scop gestionăm și utilizăm datele cu caracter personal?</strong></p>
                  <p>DMS utilizează datele cu caracter personal în două modalități:</p>
                  <ul className="mt-2 space-y-1.5 ml-4">
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /><strong className="text-foreground">Date contractuale personale</strong> — date de cont securizate, utilizate pentru logare și accesarea serviciilor: nume, email și telefon, folosite pentru comunicări de afaceri (facturi, proforme, date contractuale)</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /><strong className="text-foreground">Date de publicare</strong> — date cu caracter public care vor fi publicate prin natura serviciului prestat/achiziționat (publicitate), pe propria răspundere, cu scopul de a atinge cât mai multă audiență</li>
                  </ul>
                  <p className="mt-2">Colectarea și procesarea datelor cu caracter personal se realizează de către DMS. Datele sunt stocate pe serverul nostru, iar accesul la acestea este securizat.</p>
                </SubArticle>

                <SubArticle code="12.5">
                  <p className="mb-2"><strong className="text-foreground">Drepturile privind informațiile cu caracter personal (conform GDPR):</strong></p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {[
                      { letter: "a", title: "Dreptul de acces", desc: "De a obține o confirmare a faptului că datele personale sunt sau nu prelucrate, scopul prelucrării și perioada" },
                      { letter: "b", title: "Dreptul la rectificare", desc: "De a cere rectificarea datelor inexacte care vă privesc" },
                      { letter: "c", title: "Dreptul la ștergere", desc: "De a solicita ștergerea datelor personale care vă privesc" },
                      { letter: "d", title: "Dreptul la restricționare", desc: "De a obține restricționarea prelucrării datelor cu caracter personal" },
                      { letter: "e", title: "Dreptul la portabilitate", desc: "De a primi datele cu caracter personal și de a le transmite altui operator" },
                      { letter: "f", title: "Dreptul la opoziție", desc: "De a vă opune oricând, în mod gratuit, prelucrării inclusiv creării de profiluri" },
                      { letter: "g", title: "Dreptul la plângere", desc: "De a vă adresa cu o plângere Autorității de Supraveghere (ANSPDCP)" },
                    ].map((right) => (
                      <div key={right.letter} className="bg-muted/50 border border-border rounded-lg p-3">
                        <p className="text-xs font-semibold text-foreground mb-1">{right.letter}. {right.title}</p>
                        <p className="text-xs text-muted-foreground">{right.desc}</p>
                      </div>
                    ))}
                  </div>
                </SubArticle>

                <SubArticle code="12.6">Prestatorul are dreptul să dezvăluie informațiile către: companiile asociate, autorități, agenții de urmărire a creditelor, terțe persoane împuternicite de Prestator, parteneri contractuali, terți cesionari ai creanțelor Prestatorului și altor persoane în condițiile legii.</SubArticle>
                <SubArticle code="12.7">Beneficiarul se obligă să comunice Prestatorului orice modificare privind datele sale de identificare/contact în cel mult 10 zile de la data operării modificării. Modificările nenotificate nu vor fi opozabile Prestatorului.</SubArticle>
              </div>
            </section>

            {/* 13. Forta majora */}
            <section>
              <SectionHeader id="forta-majora" number={13} title="Clauza de forță majoră" icon={CloudLightning} />
              <div className="space-y-3">
                <SubArticle code="13.1">Părțile pot fi exonerate de răspundere în cazul în care prevederile contractului nu pot fi respectate ca urmare a unui eveniment de forță majoră.</SubArticle>
                <SubArticle code="13.2">Prin eveniment de forță majoră se înțelege orice eveniment în afara controlului părților afectate, imprevizibil și inevitabil, apărut după intrarea în vigoare a prezentului Contract și care împiedică părțile să-și execute obligațiile contractuale.</SubArticle>
                <SubArticle code="13.3">Partea care invocă forța majoră va notifica cealaltă parte în scris în termen de 5 (cinci) zile lucrătoare de la apariția evenimentului respectiv și o dovedește cu acte emise de instituțiile abilitate în cel mult 15 zile de la apariție.</SubArticle>
                <SubArticle code="13.4">La încetarea cazului de forță majoră, partea care a fost împiedicată să-și îndeplinească obligațiile își va relua executarea obligațiilor. Forța majoră include, dar nu se limitează la: cutremur, inundații, atacuri informatice severe etc.</SubArticle>
                <SubArticle code="13.5">Dacă în termen de 60 de zile de la producere, evenimentul respectiv nu încetează, creditorul obligației scadente are dreptul de a cere încetarea Contractului.</SubArticle>
                <SubArticle code="13.6">Forța majoră atestată de Camera de Comerț și Industrie a României sau alte instituții abilitate, este o împrejurare de fapt imprevizibilă și de neînlăturat care împiedică în mod obiectiv și fără nicio culpă a părții, executarea obligației contractuale.</SubArticle>
              </div>
            </section>

            {/* 14. Salvgardare */}
            <section>
              <SectionHeader id="salvgardare" number={14} title="Clauza de salvgardare" icon={Landmark} />
              <SubArticle code="14.1">În cazul în care orice dispoziție a acestui Contract este declarată nulă sau inaplicabilă de către o instanță, un tribunal arbitral sau de orice altă autoritate competentă, celelalte dispoziții contractuale rămân în vigoare. Dispoziția nulă sau inaplicabilă va fi eliminată din Contract, iar Părțile vor depune toate diligențele astfel încât aceasta să fie înlocuită cu o dispoziție validă și aplicabilă.</SubArticle>
            </section>

            {/* 15. Litigii */}
            <section>
              <SectionHeader id="litigii" number={15} title="Litigii" icon={Gavel} />
              <div className="space-y-3">
                <SubArticle code="15.1">Legea care guvernează raporturile juridice născute între părți în temeiul prezentului contract este legea română.</SubArticle>
                <SubArticle code="15.2">Litigiile care decurg din sau în legătură cu prezentul contract vor fi soluționate pe cale amiabilă, în caz contrar părțile convin ca acestea să fie soluționate de instanțele judecătorești de la sediul Prestatorului.</SubArticle>
              </div>
            </section>

            {/* 16. Dispozitii finale */}
            <section>
              <SectionHeader id="dispozitii" number={16} title="Dispoziții finale" icon={Scale} />
              <div className="space-y-3">
                <SubArticle code="16.1">Prezentul contract este guvernat de legislația Română în vigoare la data semnării sale de către părți. În cazul în care unele din clauzele prezentului acord au devenit nule sau au fost modificate de prevederi legislative viitoare, celelalte clauze ale contractului vor continua să-și producă efectele.</SubArticle>
                <SubArticle code="16.2">Prezentul contract, împreună cu anexele sale care fac parte integrantă din cuprinsul său, reprezintă voința părților și înlătură orice altă înțelegere verbală dintre acestea, anterioară sau ulterioară încheierii lui.</SubArticle>
                <SubArticle code="16.3">În drept, prezentul contract se completează cu dispozițiile Codului Civil, Codului Comercial precum și cu actele normative existente în vigoare la data încheierii acestuia.</SubArticle>
              </div>
            </section>

            {/* 17. Declaratia */}
            <section>
              <SectionHeader id="declaratia" number={17} title="Declarația părților" icon={Handshake} />
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-sm text-foreground leading-relaxed space-y-3">
                <SubArticle code="17.1">Prestatorul și beneficiarul declară expres că au citit integral Contractul împreună cu toate Anexele și formularele corespunzătoare serviciilor solicitate, că acestea au făcut obiectul negocierii și că sunt de acord cu clauzele astfel stabilite, pe care nu le consideră abuzive sau contravenind Legii nr.193/2000 cu modificările de rigoare.</SubArticle>
                <p className="text-muted-foreground">Prezentul contract este încheiat la data acceptării de către Beneficiar/Client, părțile manifestându-și voința în producerea de efecte juridice și confirmă că au luat la cunoștință.</p>
              </div>
            </section>

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermeniConditii;
