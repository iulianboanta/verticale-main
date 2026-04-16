import { Link } from "react-router-dom";
import { Search, Star, Shield, Users, TrendingUp, Heart, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";

import heroImg from "@/assets/despre-noi/hero-beauty.jpg";
import clientiImg from "@/assets/despre-noi/clienti.jpg";
import profesionistiImg from "@/assets/despre-noi/profesionisti.jpg";
import reteaImg from "@/assets/despre-noi/retea.jpg";

const stats = [
  { value: "5.000+", label: "Saloane listate" },
  { value: "42", label: "Județe acoperite" },
  { value: "50+", label: "Categorii beauty" },
  { value: "100K+", label: "Căutări lunare" },
];

const beneficiiClienti = [
  { icon: Search, title: "Găsești rapid", text: "Caută după serviciu, locație sau nume și găsește salonul perfect în câteva secunde." },
  { icon: Star, title: "Recenzii reale", text: "Citește opiniile altor clienți și alege în cunoștință de cauză." },
  { icon: MapPin, title: "Aproape de tine", text: "Filtrează după oraș sau județ și descoperă profesioniști din zona ta." },
  { icon: Shield, title: "Informații verificate", text: "Detalii de contact, program, servicii — totul actualizat și la un click distanță." },
];

const beneficiiProfesionisti = [
  { icon: TrendingUp, title: "Vizibilitate online", text: "Fii prezent acolo unde clienții tăi caută — în cel mai mare director beauty din România." },
  { icon: Users, title: "Clienți noi", text: "Atrage clienți care caută exact serviciile pe care le oferi." },
  { icon: Heart, title: "Profil complet", text: "Prezintă-ți serviciile, prețurile, portofoliul foto și recenziile într-un singur loc." },
  { icon: CheckCircle, title: "Credibilitate", text: "Un profil profesional pe GhidBeauty transmite încredere și seriozitate." },
];

const DespreNoi = () => (
  <>
    <Navbar variant="solid" />

    {/* Hero */}
    <section className="relative min-h-[520px] flex items-center overflow-hidden">
      <img src={heroImg} alt="Salon beauty modern" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-transparent" />
      <div className="container relative z-10 py-32 md:py-40">
        <div className="max-w-xl text-white space-y-5">
          <span className="inline-block rounded-full bg-primary/80 px-4 py-1 text-xs font-semibold uppercase tracking-wider">
            Despre GhidBeauty
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Directorul #1 de beauty din România
          </h1>
          <p className="text-lg text-white/80 leading-relaxed">
            GhidBeauty.ro conectează clienții cu cele mai bune saloane, studiourile și profesioniștii
            din industria frumuseții — rapid, simplu și gratuit.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/cautare">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground">
                <Search className="mr-2 h-4 w-4" /> Caută un salon
              </Button>
            </Link>
            <Link to="/adauga-companie">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                Înscrie-ți afacerea
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Stats bar */}
    <section className="bg-primary text-primary-foreground">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 py-10 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl md:text-4xl font-bold">{s.value}</p>
            <p className="mt-1 text-sm opacity-80">{s.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Ce este GhidBeauty */}
    <section className="py-20 bg-background">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-foreground">Ce este GhidBeauty?</h2>
          <p className="text-muted-foreground leading-relaxed">
            <strong>GhidBeauty.ro</strong> este cel mai cuprinzător director online dedicat industriei de beauty din România.
            Platforma reunește saloane de coafură, studiourile de manichiură, centre de estetică, barbershopuri,
            clinici de beauty și toți profesioniștii care te ajută să arăți și să te simți extraordinar.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Fie că ești client în căutarea unui serviciu de calitate sau profesionist care dorește mai multă
            vizibilitate, GhidBeauty este locul unde cererea întâlnește oferta — organizat, transparent și ușor de folosit.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-xl border border-border/40">
          <img src={reteaImg} alt="Rețea GhidBeauty" className="w-full h-auto object-cover" loading="lazy" />
        </div>
      </div>
    </section>

    {/* Cui i se adreseaza — Clienti */}
    <section className="py-20 bg-secondary/30">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-xl border border-border/40">
            <img src={clientiImg} alt="Clienți fericiți" className="w-full h-auto object-cover" loading="lazy" />
          </div>
          <div className="order-1 md:order-2 space-y-5">
            <span className="inline-block rounded-full bg-accent/20 text-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Pentru clienți
            </span>
            <h2 className="text-3xl font-bold text-foreground">
              Găsește salonul perfect pentru tine
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Nu mai pierde timpul cu căutări nesfârșite. Pe GhidBeauty poți filtra după locație,
              serviciu, preț sau recenzii și descoperi rapid saloanele potrivite nevoilor tale.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {beneficiiClienti.map((b) => (
                <div key={b.title} className="flex gap-3 items-start">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary shrink-0">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{b.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Cui i se adreseaza — Profesionisti */}
    <section className="py-20 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="inline-block rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Pentru profesioniști
            </span>
            <h2 className="text-3xl font-bold text-foreground">
              Crește-ți afacerea cu GhidBeauty
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Peste 100.000 de căutări lunare fac din GhidBeauty locul ideal pentru a-ți promova
              salonul sau studioul. Creează-ți un profil complet și lasă clienții să te descopere.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {beneficiiProfesionisti.map((b) => (
                <div key={b.title} className="flex gap-3 items-start">
                  <div className="mt-0.5 rounded-lg bg-accent/10 p-2 text-accent shrink-0">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{b.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/adauga-companie">
              <Button className="mt-4 group">
                Înscrie-ți afacerea gratuit
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl border border-border/40">
            <img src={profesionistiImg} alt="Profesionist beauty" className="w-full h-auto object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    {/* Rol & Misiune */}
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-3xl text-center space-y-6">
        <h2 className="text-3xl font-bold text-foreground">Misiunea noastră</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Credem că fiecare persoană merită acces ușor la servicii de beauty de calitate, indiferent de oraș sau buget.
          Misiunea GhidBeauty este să digitalizeze industria de frumusețe din România, oferind o platformă
          unde transparența, calitatea și accesibilitatea sunt pe primul loc.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          De la marile orașe până în localitățile mici, ne dorim ca fiecare salon, studio sau freelancer
          din beauty să aibă o prezență online profesională — iar fiecare client să găsească serviciul
          potrivit la un click distanță.
        </p>
      </div>
    </section>

    {/* CTA final */}
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container text-center space-y-5">
        <h2 className="text-3xl font-bold">Intră în comunitatea GhidBeauty</h2>
        <p className="text-lg opacity-80 max-w-xl mx-auto">
          Fie că ești client sau profesionist, GhidBeauty te ajută să faci alegeri mai bune în beauty.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link to="/cautare">
            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/20">
              Explorează saloane
            </Button>
          </Link>
          <Link to="/adauga-companie">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
              Înscrie-ți afacerea
            </Button>
          </Link>
        </div>
      </div>
    </section>

    <Footer />
  </>
);

export default DespreNoi;
