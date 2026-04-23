import { useState } from "react";
import { ExternalLink, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RichTextEditor from "@/components/manage/RichTextEditor";

type PageKey = "despre-ghidbeauty" | "despre-companie" | "termeni" | "politica";

interface PageData {
  label: string;
  slug: string;
  title: string;
  metaDescription: string;
  html: string;
}

const initialPages: Record<PageKey, PageData> = {
  "despre-ghidbeauty": {
    label: "Despre GhidBeauty",
    slug: "/despre-noi",
    title: "Despre noi — GhidBeauty",
    metaDescription:
      "Află povestea GhidBeauty, platforma care conectează clienții cu cele mai bune saloane și specialiști din industria beauty.",
    html: `<h2>Cine suntem</h2>
<p>GhidBeauty este platforma online dedicată industriei beauty din România. Ne propunem să facem mai ușoară descoperirea celor mai bune saloane, specialiști și servicii de înfrumusețare din întreaga țară.</p>
<h2>Misiunea noastră</h2>
<p>Vrem să oferim clienților o experiență transparentă și de încredere, iar profesioniștilor — instrumentele potrivite pentru a-și crește vizibilitatea și a-și dezvolta afacerea.</p>
<h2>Ce ne diferențiază</h2>
<ul><li>Listinguri verificate și actualizate constant</li><li>Recenzii reale de la clienți</li><li>Filtrare avansată pe servicii, zone și prețuri</li><li>Suport dedicat pentru proprietarii de afaceri beauty</li></ul>`,
  },
  "despre-companie": {
    label: "Despre Companie",
    slug: "/cine-suntem-noi",
    title: "Despre companie — GhidBeauty",
    metaDescription:
      "Informații despre compania din spatele GhidBeauty: echipă, valori și viziunea noastră pentru industria beauty.",
    html: `<h2>Compania</h2>
<p>GhidBeauty este operat de o echipă pasionată de tehnologie și de industria beauty. Lucrăm zilnic pentru a îmbunătăți experiența utilizatorilor și a partenerilor noștri.</p>
<h2>Valorile noastre</h2>
<ul><li><strong>Transparență</strong> — informații clare și verificate</li><li><strong>Calitate</strong> — standarde înalte pentru parteneri</li><li><strong>Inovație</strong> — instrumente moderne pentru o piață în creștere</li></ul>
<h2>Date despre companie</h2>
<p>Sediu social: București, România.<br>Pentru întrebări de business, ne poți contacta prin pagina de contact.</p>`,
  },
  "termeni": {
    label: "Termeni și Condiții",
    slug: "/termeni",
    title: "Termeni și Condiții — GhidBeauty",
    metaDescription:
      "Termenii și condițiile de utilizare a platformei GhidBeauty. Citește înainte de a folosi serviciile noastre.",
    html: `<h2>1. Acceptarea termenilor</h2>
<p>Prin accesarea și utilizarea platformei GhidBeauty, sunteți de acord cu termenii și condițiile prezentate mai jos.</p>
<h2>2. Utilizarea serviciilor</h2>
<p>Utilizatorii se obligă să folosească platforma în mod responsabil și să nu publice conținut care încalcă legile aplicabile.</p>
<h2>3. Conturi de utilizator</h2>
<p>Sunteți responsabil pentru păstrarea confidențialității datelor de autentificare și pentru toate activitățile efectuate prin contul dvs.</p>
<h2>4. Drepturi de proprietate intelectuală</h2>
<p>Tot conținutul platformei (texte, logo-uri, design) este proprietatea GhidBeauty sau a partenerilor săi și este protejat de legea drepturilor de autor.</p>
<h2>5. Modificări ale termenilor</h2>
<p>Ne rezervăm dreptul de a modifica acești termeni. Versiunea actualizată va fi disponibilă pe această pagină.</p>`,
  },
  "politica": {
    label: "Politica de Confidențialitate",
    slug: "/politica-de-confidentialitate",
    title: "Politica de Confidențialitate — GhidBeauty",
    metaDescription:
      "Cum colectăm, folosim și protejăm datele tale personale pe platforma GhidBeauty.",
    html: `<h2>1. Datele pe care le colectăm</h2>
<p>Colectăm datele necesare pentru funcționarea platformei: nume, email, informații despre afacere (pentru parteneri) și date de utilizare anonimizate.</p>
<h2>2. Cum folosim datele</h2>
<ul><li>Pentru a furniza serviciile platformei</li><li>Pentru a comunica cu utilizatorii</li><li>Pentru a îmbunătăți experiența și a preveni abuzurile</li></ul>
<h2>3. Partajarea datelor</h2>
<p>Nu vindem datele utilizatorilor. Le partajăm doar cu furnizorii de servicii esențiali (hosting, plăți) și doar în măsura strict necesară.</p>
<h2>4. Drepturile dvs.</h2>
<p>Aveți dreptul de acces, rectificare, ștergere și portabilitate a datelor dvs. personale, conform GDPR. Ne puteți contacta prin pagina de contact pentru a vă exercita aceste drepturi.</p>
<h2>5. Cookies</h2>
<p>Folosim cookies pentru a îmbunătăți experiența și pentru analize. Puteți gestiona preferințele din setările browserului.</p>`,
  },
};

const StaticPages = () => {
  const [pages, setPages] = useState<Record<PageKey, PageData>>(initialPages);

  const updatePage = (key: PageKey, patch: Partial<PageData>) => {
    setPages((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  };

  const keys = Object.keys(pages) as PageKey[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Pagini Statice</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Editează conținutul paginilor statice ale site-ului.
        </p>
      </div>

      <Tabs defaultValue={keys[0]} className="flex flex-col md:flex-row gap-6">
        <TabsList
          className="md:flex-col md:h-auto md:w-56 md:items-stretch md:justify-start md:bg-card md:border md:p-2 md:shrink-0 flex-wrap"
        >
          {keys.map((k) => (
            <TabsTrigger
              key={k}
              value={k}
              className="md:justify-start md:w-full md:data-[state=active]:bg-primary/5 md:data-[state=active]:text-primary"
            >
              {pages[k].label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex-1 min-w-0">
          {keys.map((k) => {
            const page = pages[k];
            const metaLen = page.metaDescription.length;
            return (
              <TabsContent key={k} value={k} className="mt-0">
                <Card>
                  <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                    <div>
                      <CardTitle>{page.label}</CardTitle>
                      <CardDescription className="mt-1">
                        Editează titlul, meta descrierea și conținutul paginii.
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {page.slug}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${k}`}>Titlu pagină</Label>
                      <Input
                        id={`title-${k}`}
                        value={page.title}
                        onChange={(e) => updatePage(k, { title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`meta-${k}`}>Meta descriere</Label>
                        <span
                          className={`text-xs ${
                            metaLen > 160 ? "text-destructive" : "text-muted-foreground"
                          }`}
                        >
                          {metaLen}/160
                        </span>
                      </div>
                      <Textarea
                        id={`meta-${k}`}
                        value={page.metaDescription}
                        onChange={(e) => updatePage(k, { metaDescription: e.target.value })}
                        rows={2}
                        maxLength={200}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Conținut HTML</Label>
                      <RichTextEditor
                        value={page.html}
                        onChange={(html) => updatePage(k, { html })}
                        placeholder="Scrie conținutul paginii..."
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                      <Button variant="outline" asChild>
                        <a href={page.slug} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} className="mr-2" />
                          Previzualizează
                        </a>
                      </Button>
                      <Button>
                        <Save size={16} className="mr-2" />
                        Salvează modificările
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
};

export default StaticPages;
