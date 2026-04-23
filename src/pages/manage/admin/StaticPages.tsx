import { useMemo, useState } from "react";
import { ExternalLink, RotateCcw, Save, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PAGE_LABELS,
  PageKey,
  defaultContent,
  useStaticPagesAdmin,
  StaticPagesContent,
  DespreGhidBeautyContent,
  DespreCompanieContent,
  SimpleHeroPageContent,
  Benefit,
  Stat,
} from "@/lib/staticPagesContent";

// --- helpers ----------------------------------------------------------------

const isModified = (current: unknown, def: unknown) =>
  JSON.stringify(current) !== JSON.stringify(def);

const ModifiedBadge = ({ modified }: { modified: boolean }) =>
  modified ? (
    <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary border-primary/20">
      ● modificat
    </Badge>
  ) : null;

interface SectionShellProps {
  value: string;
  title: string;
  modified: boolean;
  onReset: () => void;
  children: React.ReactNode;
}

const SectionShell = ({
  value,
  title,
  modified,
  onReset,
  children,
}: SectionShellProps) => (
  <AccordionItem value={value} className="border rounded-lg bg-card data-[state=open]:shadow-sm">
    <div className="flex items-center justify-between pr-3">
      <AccordionTrigger className="flex-1 px-4 hover:no-underline">
        <span className="flex items-center text-left text-sm font-medium">
          {title}
          <ModifiedBadge modified={modified} />
        </span>
      </AccordionTrigger>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
        onClick={(e) => {
          e.stopPropagation();
          onReset();
        }}
        title="Resetează la default"
      >
        <RotateCcw size={14} />
      </Button>
    </div>
    <AccordionContent className="px-4 pb-4 pt-1 space-y-4">{children}</AccordionContent>
  </AccordionItem>
);

const FieldText = ({
  label,
  value,
  onChange,
  id,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  id: string;
}) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="text-xs">
      {label}
    </Label>
    <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

const FieldArea = ({
  label,
  value,
  onChange,
  id,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  id: string;
  rows?: number;
}) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="text-xs">
      {label}
    </Label>
    <Textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} rows={rows} />
  </div>
);

// --- SEO card (shared) ------------------------------------------------------

const SeoCard = ({
  pageKey,
  draft,
  setDraft,
  defaults,
}: {
  pageKey: PageKey;
  draft: StaticPagesContent[PageKey];
  setDraft: (next: StaticPagesContent[PageKey]) => void;
  defaults: StaticPagesContent[PageKey];
}) => {
  const seoModified = isModified(draft.seo, defaults.seo);
  const metaLen = draft.seo.metaDescription.length;
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base flex items-center">
              SEO
              <ModifiedBadge modified={seoModified} />
            </CardTitle>
            <CardDescription className="text-xs">
              Titlul paginii (tag <code>&lt;title&gt;</code>) și meta descrierea pentru Google.
            </CardDescription>
          </div>
          <Badge variant="outline" className="font-mono text-[10px]">
            {draft.seo.slug}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <FieldText
          id={`${pageKey}-seo-title`}
          label="Titlu pagină"
          value={draft.seo.title}
          onChange={(v) =>
            setDraft({ ...draft, seo: { ...draft.seo, title: v } } as StaticPagesContent[PageKey])
          }
        />
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor={`${pageKey}-seo-meta`} className="text-xs">
              Meta descriere
            </Label>
            <span
              className={`text-[11px] ${
                metaLen > 160 ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              {metaLen}/160
            </span>
          </div>
          <Textarea
            id={`${pageKey}-seo-meta`}
            value={draft.seo.metaDescription}
            onChange={(e) =>
              setDraft({
                ...draft,
                seo: { ...draft.seo, metaDescription: e.target.value },
              } as StaticPagesContent[PageKey])
            }
            rows={2}
            maxLength={220}
          />
        </div>
      </CardContent>
    </Card>
  );
};

// --- Benefit list editor ----------------------------------------------------

const BenefitsEditor = ({
  value,
  onChange,
  prefix,
}: {
  value: Benefit[];
  onChange: (next: Benefit[]) => void;
  prefix: string;
}) => (
  <div className="space-y-3">
    {value.map((b, i) => (
      <div key={i} className="rounded-md border bg-background p-3 space-y-2">
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
          Beneficiu {i + 1}
        </div>
        <FieldText
          id={`${prefix}-bt-${i}`}
          label="Titlu"
          value={b.title}
          onChange={(v) => {
            const next = [...value];
            next[i] = { ...next[i], title: v };
            onChange(next);
          }}
        />
        <FieldArea
          id={`${prefix}-bx-${i}`}
          label="Text"
          value={b.text}
          rows={2}
          onChange={(v) => {
            const next = [...value];
            next[i] = { ...next[i], text: v };
            onChange(next);
          }}
        />
      </div>
    ))}
  </div>
);

// ============================================================================
// Editor: Despre GhidBeauty
// ============================================================================

const EditorDespreGhidBeauty = ({
  draft,
  setDraft,
}: {
  draft: DespreGhidBeautyContent;
  setDraft: (next: DespreGhidBeautyContent) => void;
}) => {
  const def = defaultContent["despre-ghidbeauty"];
  const [openItems, setOpenItems] = useState<string[]>([]);
  const allKeys = ["hero", "stats", "about", "for-clients", "for-pros", "mission", "final-cta"];
  const allOpen = openItems.length === allKeys.length;

  return (
    <div className="space-y-4">
      <SeoCard
        pageKey="despre-ghidbeauty"
        draft={draft}
        defaults={def}
        setDraft={(next) => setDraft(next as DespreGhidBeautyContent)}
      />

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Secțiuni pagină</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs"
          onClick={() => setOpenItems(allOpen ? [] : allKeys)}
        >
          <ChevronsUpDown size={14} className="mr-1.5" />
          {allOpen ? "Închide tot" : "Deschide tot"}
        </Button>
      </div>

      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="space-y-2">
        <SectionShell
          value="hero"
          title="Hero (banner principal)"
          modified={isModified(draft.hero, def.hero)}
          onReset={() => setDraft({ ...draft, hero: def.hero })}
        >
          <FieldText id="dg-hero-eyebrow" label="Eyebrow" value={draft.hero.eyebrow}
            onChange={(v) => setDraft({ ...draft, hero: { ...draft.hero, eyebrow: v } })} />
          <FieldText id="dg-hero-title" label="Titlu H1" value={draft.hero.title}
            onChange={(v) => setDraft({ ...draft, hero: { ...draft.hero, title: v } })} />
          <FieldArea id="dg-hero-sub" label="Subtitlu" value={draft.hero.subtitle}
            onChange={(v) => setDraft({ ...draft, hero: { ...draft.hero, subtitle: v } })} />
          <div className="grid grid-cols-2 gap-3">
            <FieldText id="dg-hero-cta1" label="Buton 1 (Caută)" value={draft.hero.ctaSearch}
              onChange={(v) => setDraft({ ...draft, hero: { ...draft.hero, ctaSearch: v } })} />
            <FieldText id="dg-hero-cta2" label="Buton 2 (Înscrie)" value={draft.hero.ctaRegister}
              onChange={(v) => setDraft({ ...draft, hero: { ...draft.hero, ctaRegister: v } })} />
          </div>
        </SectionShell>

        <SectionShell
          value="stats"
          title="Stats bar (4 elemente)"
          modified={isModified(draft.stats, def.stats)}
          onReset={() => setDraft({ ...draft, stats: def.stats })}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {draft.stats.map((s, i) => (
              <div key={i} className="rounded-md border bg-background p-3 space-y-2">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Stat {i + 1}
                </div>
                <FieldText id={`dg-st-v-${i}`} label="Valoare" value={s.value}
                  onChange={(v) => {
                    const next = [...draft.stats];
                    next[i] = { ...next[i], value: v };
                    setDraft({ ...draft, stats: next as Stat[] });
                  }} />
                <FieldText id={`dg-st-l-${i}`} label="Etichetă" value={s.label}
                  onChange={(v) => {
                    const next = [...draft.stats];
                    next[i] = { ...next[i], label: v };
                    setDraft({ ...draft, stats: next as Stat[] });
                  }} />
              </div>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          value="about"
          title="Ce este GhidBeauty"
          modified={isModified(draft.about, def.about)}
          onReset={() => setDraft({ ...draft, about: def.about })}
        >
          <FieldText id="dg-ab-t" label="Titlu" value={draft.about.title}
            onChange={(v) => setDraft({ ...draft, about: { ...draft.about, title: v } })} />
          <FieldArea id="dg-ab-p1" label="Paragraf 1" value={draft.about.paragraph1} rows={4}
            onChange={(v) => setDraft({ ...draft, about: { ...draft.about, paragraph1: v } })} />
          <FieldArea id="dg-ab-p2" label="Paragraf 2" value={draft.about.paragraph2} rows={4}
            onChange={(v) => setDraft({ ...draft, about: { ...draft.about, paragraph2: v } })} />
        </SectionShell>

        <SectionShell
          value="for-clients"
          title="Pentru clienți (4 beneficii)"
          modified={isModified(draft.forClients, def.forClients)}
          onReset={() => setDraft({ ...draft, forClients: def.forClients })}
        >
          <FieldText id="dg-fc-eb" label="Eyebrow" value={draft.forClients.eyebrow}
            onChange={(v) => setDraft({ ...draft, forClients: { ...draft.forClients, eyebrow: v } })} />
          <FieldText id="dg-fc-t" label="Titlu" value={draft.forClients.title}
            onChange={(v) => setDraft({ ...draft, forClients: { ...draft.forClients, title: v } })} />
          <FieldArea id="dg-fc-p" label="Paragraf" value={draft.forClients.paragraph} rows={3}
            onChange={(v) => setDraft({ ...draft, forClients: { ...draft.forClients, paragraph: v } })} />
          <BenefitsEditor
            prefix="dg-fc"
            value={draft.forClients.benefits}
            onChange={(b) => setDraft({ ...draft, forClients: { ...draft.forClients, benefits: b } })}
          />
        </SectionShell>

        <SectionShell
          value="for-pros"
          title="Pentru profesioniști (4 beneficii)"
          modified={isModified(draft.forPros, def.forPros)}
          onReset={() => setDraft({ ...draft, forPros: def.forPros })}
        >
          <FieldText id="dg-fp-eb" label="Eyebrow" value={draft.forPros.eyebrow}
            onChange={(v) => setDraft({ ...draft, forPros: { ...draft.forPros, eyebrow: v } })} />
          <FieldText id="dg-fp-t" label="Titlu" value={draft.forPros.title}
            onChange={(v) => setDraft({ ...draft, forPros: { ...draft.forPros, title: v } })} />
          <FieldArea id="dg-fp-p" label="Paragraf" value={draft.forPros.paragraph} rows={3}
            onChange={(v) => setDraft({ ...draft, forPros: { ...draft.forPros, paragraph: v } })} />
          <BenefitsEditor
            prefix="dg-fp"
            value={draft.forPros.benefits}
            onChange={(b) => setDraft({ ...draft, forPros: { ...draft.forPros, benefits: b } })}
          />
          <FieldText id="dg-fp-cta" label="Text buton CTA" value={draft.forPros.cta}
            onChange={(v) => setDraft({ ...draft, forPros: { ...draft.forPros, cta: v } })} />
        </SectionShell>

        <SectionShell
          value="mission"
          title="Misiune"
          modified={isModified(draft.mission, def.mission)}
          onReset={() => setDraft({ ...draft, mission: def.mission })}
        >
          <FieldText id="dg-m-t" label="Titlu" value={draft.mission.title}
            onChange={(v) => setDraft({ ...draft, mission: { ...draft.mission, title: v } })} />
          <FieldArea id="dg-m-p1" label="Paragraf 1" value={draft.mission.paragraph1} rows={4}
            onChange={(v) => setDraft({ ...draft, mission: { ...draft.mission, paragraph1: v } })} />
          <FieldArea id="dg-m-p2" label="Paragraf 2" value={draft.mission.paragraph2} rows={4}
            onChange={(v) => setDraft({ ...draft, mission: { ...draft.mission, paragraph2: v } })} />
        </SectionShell>

        <SectionShell
          value="final-cta"
          title="CTA final"
          modified={isModified(draft.finalCta, def.finalCta)}
          onReset={() => setDraft({ ...draft, finalCta: def.finalCta })}
        >
          <FieldText id="dg-fcta-t" label="Titlu" value={draft.finalCta.title}
            onChange={(v) => setDraft({ ...draft, finalCta: { ...draft.finalCta, title: v } })} />
          <FieldArea id="dg-fcta-s" label="Subtitlu" value={draft.finalCta.subtitle} rows={2}
            onChange={(v) => setDraft({ ...draft, finalCta: { ...draft.finalCta, subtitle: v } })} />
          <div className="grid grid-cols-2 gap-3">
            <FieldText id="dg-fcta-c1" label="Buton 1" value={draft.finalCta.ctaExplore}
              onChange={(v) => setDraft({ ...draft, finalCta: { ...draft.finalCta, ctaExplore: v } })} />
            <FieldText id="dg-fcta-c2" label="Buton 2" value={draft.finalCta.ctaRegister}
              onChange={(v) => setDraft({ ...draft, finalCta: { ...draft.finalCta, ctaRegister: v } })} />
          </div>
        </SectionShell>
      </Accordion>
    </div>
  );
};

// ============================================================================
// Editor: Despre Companie
// ============================================================================

const EditorDespreCompanie = ({
  draft,
  setDraft,
}: {
  draft: DespreCompanieContent;
  setDraft: (next: DespreCompanieContent) => void;
}) => {
  const def = defaultContent["despre-companie"];
  const [openItems, setOpenItems] = useState<string[]>([]);
  const allKeys = ["hero", "pn", "rl", "desc", "retea", "expert", "cta"];
  const allOpen = openItems.length === allKeys.length;

  return (
    <div className="space-y-4">
      <SeoCard
        pageKey="despre-companie"
        draft={draft}
        defaults={def}
        setDraft={(next) => setDraft(next as DespreCompanieContent)}
      />

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Secțiuni pagină</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs"
          onClick={() => setOpenItems(allOpen ? [] : allKeys)}
        >
          <ChevronsUpDown size={14} className="mr-1.5" />
          {allOpen ? "Închide tot" : "Deschide tot"}
        </Button>
      </div>

      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="space-y-2">
        <SectionShell
          value="hero"
          title="Hero"
          modified={isModified(draft.hero, def.hero)}
          onReset={() => setDraft({ ...draft, hero: def.hero })}
        >
          <FieldText id="dc-h-t" label="Titlu H1" value={draft.hero.title}
            onChange={(v) => setDraft({ ...draft, hero: { ...draft.hero, title: v } })} />
          <FieldArea id="dc-h-s" label="Subtitlu" value={draft.hero.subtitle}
            onChange={(v) => setDraft({ ...draft, hero: { ...draft.hero, subtitle: v } })} />
        </SectionShell>

        <SectionShell
          value="pn"
          title="Card: Pagini Naționale"
          modified={isModified(draft.paginiNationale, def.paginiNationale)}
          onReset={() => setDraft({ ...draft, paginiNationale: def.paginiNationale })}
        >
          <FieldText id="dc-pn-t" label="Titlu" value={draft.paginiNationale.title}
            onChange={(v) => setDraft({ ...draft, paginiNationale: { ...draft.paginiNationale, title: v } })} />
          <FieldText id="dc-pn-d" label="Descriere" value={draft.paginiNationale.description}
            onChange={(v) => setDraft({ ...draft, paginiNationale: { ...draft.paginiNationale, description: v } })} />
        </SectionShell>

        <SectionShell
          value="rl"
          title="Card: roLOCAL"
          modified={isModified(draft.roLocal, def.roLocal)}
          onReset={() => setDraft({ ...draft, roLocal: def.roLocal })}
        >
          <FieldText id="dc-rl-t" label="Titlu" value={draft.roLocal.title}
            onChange={(v) => setDraft({ ...draft, roLocal: { ...draft.roLocal, title: v } })} />
          <FieldText id="dc-rl-d" label="Descriere" value={draft.roLocal.description}
            onChange={(v) => setDraft({ ...draft, roLocal: { ...draft.roLocal, description: v } })} />
        </SectionShell>

        <SectionShell
          value="desc"
          title="Descriere produse"
          modified={isModified(draft.description, def.description)}
          onReset={() => setDraft({ ...draft, description: def.description })}
        >
          <FieldArea id="dc-d-1" label="Text Pagini Naționale" value={draft.description.paginiText} rows={3}
            onChange={(v) => setDraft({ ...draft, description: { ...draft.description, paginiText: v } })} />
          <FieldArea id="dc-d-2" label="Text roLOCAL" value={draft.description.rolocalText} rows={3}
            onChange={(v) => setDraft({ ...draft, description: { ...draft.description, rolocalText: v } })} />
        </SectionShell>

        <SectionShell
          value="retea"
          title="Rețea de site-uri"
          modified={isModified(draft.retea, def.retea)}
          onReset={() => setDraft({ ...draft, retea: def.retea })}
        >
          <FieldText id="dc-r-t" label="Titlu" value={draft.retea.title}
            onChange={(v) => setDraft({ ...draft, retea: { ...draft.retea, title: v } })} />
          <FieldArea id="dc-r-p" label="Paragraf" value={draft.retea.paragraph} rows={3}
            onChange={(v) => setDraft({ ...draft, retea: { ...draft.retea, paragraph: v } })} />
        </SectionShell>

        <SectionShell
          value="expert"
          title="Platforma Expert Mediu"
          modified={isModified(draft.expertMediu, def.expertMediu)}
          onReset={() => setDraft({ ...draft, expertMediu: def.expertMediu })}
        >
          <FieldText id="dc-e-t" label="Titlu" value={draft.expertMediu.title}
            onChange={(v) => setDraft({ ...draft, expertMediu: { ...draft.expertMediu, title: v } })} />
          <FieldArea id="dc-e-p" label="Paragraf" value={draft.expertMediu.paragraph} rows={4}
            onChange={(v) => setDraft({ ...draft, expertMediu: { ...draft.expertMediu, paragraph: v } })} />
        </SectionShell>

        <SectionShell
          value="cta"
          title="Buton CTA"
          modified={isModified(draft.cta, def.cta)}
          onReset={() => setDraft({ ...draft, cta: def.cta })}
        >
          <FieldText id="dc-cta" label="Text buton" value={draft.cta}
            onChange={(v) => setDraft({ ...draft, cta: v })} />
        </SectionShell>
      </Accordion>
    </div>
  );
};

// ============================================================================
// Editor: Termeni / Politica (simple hero pages)
// ============================================================================

const EditorSimpleHero = ({
  pageKey,
  draft,
  setDraft,
}: {
  pageKey: "termeni" | "politica";
  draft: SimpleHeroPageContent;
  setDraft: (next: SimpleHeroPageContent) => void;
}) => {
  const def = defaultContent[pageKey];
  const [openItems, setOpenItems] = useState<string[]>(["hero"]);

  return (
    <div className="space-y-4">
      <SeoCard
        pageKey={pageKey}
        draft={draft}
        defaults={def}
        setDraft={(next) => setDraft(next as SimpleHeroPageContent)}
      />

      <div className="rounded-md border border-dashed bg-muted/40 p-3 text-xs text-muted-foreground">
        Pagina conține un text legal lung structurat în articole. Aici poți edita
        <strong className="text-foreground"> antetul (hero)</strong> și
        <strong className="text-foreground"> SEO-ul</strong>. Conținutul articolelor
        rămâne gestionat în cod pentru a păstra structura legală.
      </div>

      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="space-y-2">
        <SectionShell
          value="hero"
          title="Hero (antet)"
          modified={isModified(draft.hero, def.hero)}
          onReset={() => setDraft({ ...draft, hero: def.hero })}
        >
          <FieldText id={`${pageKey}-h-t`} label="Titlu H1" value={draft.hero.title}
            onChange={(v) => setDraft({ ...draft, hero: { ...draft.hero, title: v } })} />
          <FieldArea id={`${pageKey}-h-s`} label="Subtitlu" value={draft.hero.subtitle}
            onChange={(v) => setDraft({ ...draft, hero: { ...draft.hero, subtitle: v } })} />
          <FieldText id={`${pageKey}-h-u`} label="Ultima actualizare" value={draft.hero.lastUpdated}
            onChange={(v) => setDraft({ ...draft, hero: { ...draft.hero, lastUpdated: v } })} />
        </SectionShell>
      </Accordion>
    </div>
  );
};

// ============================================================================
// Main page
// ============================================================================

const StaticPages = () => {
  const { draft, updatePage, savePage, resetPage } = useStaticPagesAdmin();
  const keys = useMemo(() => Object.keys(PAGE_LABELS) as PageKey[], []);

  const handleSave = (key: PageKey) => {
    savePage(key);
    toast.success(`„${PAGE_LABELS[key]}" a fost salvată.`);
  };

  const handleResetAll = (key: PageKey) => {
    resetPage(key);
    toast.success(`„${PAGE_LABELS[key]}" a fost resetată la valorile implicite.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Pagini Statice</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Editează conținutul paginilor statice ale site-ului. Fiecare secțiune este
          un câmp separat — designul rămâne intact.
        </p>
      </div>

      <Tabs defaultValue={keys[0]} className="flex flex-col md:flex-row gap-6">
        <TabsList className="md:flex-col md:h-auto md:w-56 md:items-stretch md:justify-start md:bg-card md:border md:p-2 md:shrink-0 flex-wrap">
          {keys.map((k) => (
            <TabsTrigger
              key={k}
              value={k}
              className="md:justify-start md:w-full md:data-[state=active]:bg-primary/5 md:data-[state=active]:text-primary"
            >
              {PAGE_LABELS[k]}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex-1 min-w-0">
          {keys.map((k) => (
            <TabsContent key={k} value={k} className="mt-0 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{PAGE_LABELS[k]}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Slug: <code className="font-mono">{draft[k].seo.slug}</code>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={draft[k].seo.slug} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} className="mr-1.5" />
                      Previzualizează
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleResetAll(k)}>
                    <RotateCcw size={14} className="mr-1.5" />
                    Resetează tot
                  </Button>
                  <Button size="sm" onClick={() => handleSave(k)}>
                    <Save size={14} className="mr-1.5" />
                    Salvează modificările
                  </Button>
                </div>
              </div>

              {k === "despre-ghidbeauty" && (
                <EditorDespreGhidBeauty
                  draft={draft[k] as DespreGhidBeautyContent}
                  setDraft={(next) => updatePage(k, next)}
                />
              )}
              {k === "despre-companie" && (
                <EditorDespreCompanie
                  draft={draft[k] as DespreCompanieContent}
                  setDraft={(next) => updatePage(k, next)}
                />
              )}
              {(k === "termeni" || k === "politica") && (
                <EditorSimpleHero
                  pageKey={k}
                  draft={draft[k] as SimpleHeroPageContent}
                  setDraft={(next) => updatePage(k, next)}
                />
              )}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default StaticPages;
