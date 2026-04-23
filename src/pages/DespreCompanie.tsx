import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";
import { Building2, Globe, BookOpen, Leaf, Network, ArrowRight } from "lucide-react";
import { useStaticPageContent } from "@/lib/staticPagesContent";
import { usePageMeta } from "@/hooks/use-page-meta";

import paginiNationale from "@/assets/despre/pagini-nationale.jpg";
import roLocal from "@/assets/despre/rolocal.jpg";
import colaj from "@/assets/despre/colaj-pn-rolocal.jpg";
import targhetare from "@/assets/despre/targhetare.jpg";
import expert from "@/assets/despre/expert.jpg";

const ContainedShowcaseImage = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <div className="rounded-xl border border-border/60 bg-background p-4 md:p-6 overflow-hidden">
    <img
      src={src}
      alt={alt}
      className={`w-full h-auto object-contain mx-auto ${className}`}
    />
  </div>
);

const DespreCompanie = () => {
  const c = useStaticPageContent("despre-companie");
  usePageMeta({ title: c.seo.title, metaDescription: c.seo.metaDescription });

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
            {c.hero.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {c.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1">
        <div className="container py-12 max-w-4xl space-y-16">
          {/* Block 1 — Pagini Nationale & roLOCAL */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
              <img
                src={paginiNationale}
                alt={c.paginiNationale.title}
                className="w-full h-56 object-cover object-center"
              />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">{c.paginiNationale.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {c.paginiNationale.description}
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
              <img
                src={roLocal}
                alt={c.roLocal.title}
                className="w-full h-56 object-cover object-top"
              />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">{c.roLocal.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {c.roLocal.description}
                </p>
              </div>
            </div>
          </section>

          {/* Block 2 — Description */}
          <section className="rounded-2xl border border-border bg-card p-8 shadow-sm space-y-6">
            <ContainedShowcaseImage
              src={colaj}
              alt="Pagini Nationale și roLOCAL"
              className="max-h-[420px]"
            />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{c.description.paginiText}</p>
              <p>{c.description.rolocalText}</p>
            </div>
          </section>

          {/* Block 3 — Rețea de site-uri */}
          <section className="rounded-2xl border border-border bg-card p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Network className="w-4.5 h-4.5 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground">{c.retea.title}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {c.retea.paragraph}
            </p>
            <ContainedShowcaseImage
              src={targhetare}
              alt="Targhetare B2B"
              className="max-h-[540px]"
            />
          </section>

          {/* Block 4 — Expert Mediu */}
          <section className="rounded-2xl border border-border bg-card p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Leaf className="w-4.5 h-4.5 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground">{c.expertMediu.title}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {c.expertMediu.paragraph}
            </p>
            <ContainedShowcaseImage
              src={expert}
              alt="Expert Mediu"
              className="max-h-[360px]"
            />
          </section>

          {/* CTA */}
          <section className="text-center py-6">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              {c.cta}
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
