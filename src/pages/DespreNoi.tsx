import { Link } from "react-router-dom";
import { Search, Star, Shield, Users, TrendingUp, Heart, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";
import { useStaticPageContent } from "@/lib/staticPagesContent";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useVertical } from "@/lib/vertical";
import { funerareDespreContent } from "@/lib/funerareContent";

import heroImg from "@/assets/despre-noi/hero-beauty.jpg";
import clientiImg from "@/assets/despre-noi/clienti.jpg";
import profesionistiImg from "@/assets/despre-noi/profesionisti.jpg";
import reteaImg from "@/assets/despre-noi/retea.jpg";
import heroFunerareImg from "@/assets/despre-noi/hero-funerare.jpg";
import clientiFunerareImg from "@/assets/despre-noi/familii-funerare.jpg";
import profesionistiFunerareImg from "@/assets/despre-noi/profesionisti-funerare.jpg";
import reteaFunerareImg from "@/assets/despre-noi/retea-funerare.jpg";

// Icons stay in code (admin only edits text). Order matches default benefits arrays.
const clientIcons = [Search, Star, MapPin, Shield];
const proIcons = [TrendingUp, Users, Heart, CheckCircle];

const DespreNoi = () => {
  const stored = useStaticPageContent("despre-ghidbeauty");
  const { vertical } = useVertical();
  const isFunerare = vertical.key === "funerare";
  const c = isFunerare ? funerareDespreContent : stored;
  const images = isFunerare
    ? { hero: heroFunerareImg, clienti: clientiFunerareImg, profesionisti: profesionistiFunerareImg, retea: reteaFunerareImg }
    : { hero: heroImg, clienti: clientiImg, profesionisti: profesionistiImg, retea: reteaImg };
  usePageMeta({ title: c.seo.title, metaDescription: c.seo.metaDescription });

  return (
    <>
      <Navbar variant="solid" />

      {/* Hero */}
      <section className="relative min-h-[520px] flex items-center overflow-hidden">
        <img src={images.hero} alt="Salon beauty modern" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-transparent" />
        <div className="container relative z-10 py-32 md:py-40">
          <div className="max-w-xl text-white space-y-5">
            <span className="inline-block rounded-full bg-primary/80 px-4 py-1 text-xs font-semibold uppercase tracking-wider">
              {c.hero.eyebrow}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {c.hero.title}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              {c.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/cautare">
                <Button size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground">
                  <Search className="mr-2 h-4 w-4" /> {c.hero.ctaSearch}
                </Button>
              </Link>
              <Link to="/adauga-companie">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  {c.hero.ctaRegister}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-primary text-primary-foreground">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 py-10 text-center">
          {c.stats.map((s, i) => (
            <div key={i}>
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
            <h2 className="text-3xl font-bold text-foreground">{c.about.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{c.about.paragraph1}</p>
            <p className="text-muted-foreground leading-relaxed">{c.about.paragraph2}</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl border border-border/40">
            <img src={images.retea} alt="Rețea GhidBeauty" className="w-full h-auto object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Cui i se adreseaza — Clienti */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-xl border border-border/40">
              <img src={images.clienti} alt="Clienți fericiți" className="w-full h-auto object-cover" loading="lazy" />
            </div>
            <div className="order-1 md:order-2 space-y-5">
              <span className="inline-block rounded-full bg-accent/20 text-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                {c.forClients.eyebrow}
              </span>
              <h2 className="text-3xl font-bold text-foreground">{c.forClients.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{c.forClients.paragraph}</p>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {c.forClients.benefits.map((b, i) => {
                  const Icon = clientIcons[i] ?? Search;
                  return (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">{b.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{b.text}</p>
                      </div>
                    </div>
                  );
                })}
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
                {c.forPros.eyebrow}
              </span>
              <h2 className="text-3xl font-bold text-foreground">{c.forPros.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{c.forPros.paragraph}</p>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {c.forPros.benefits.map((b, i) => {
                  const Icon = proIcons[i] ?? TrendingUp;
                  return (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="mt-0.5 rounded-lg bg-accent/10 p-2 text-accent shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">{b.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{b.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link to="/adauga-companie">
                <Button className="mt-4 group">
                  {c.forPros.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-border/40">
              <img src={images.profesionisti} alt="Profesionist beauty" className="w-full h-auto object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Rol & Misiune */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container max-w-3xl text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">{c.mission.title}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{c.mission.paragraph1}</p>
          <p className="text-muted-foreground leading-relaxed">{c.mission.paragraph2}</p>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center space-y-5">
          <h2 className="text-3xl font-bold">{c.finalCta.title}</h2>
          <p className="text-lg opacity-80 max-w-xl mx-auto">{c.finalCta.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/cautare">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/20">
                {c.finalCta.ctaExplore}
              </Button>
            </Link>
            <Link to="/adauga-companie">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                {c.finalCta.ctaRegister}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default DespreNoi;
