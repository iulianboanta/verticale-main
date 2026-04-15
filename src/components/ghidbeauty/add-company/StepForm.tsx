import { useState, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Upload, Plus, X, ArrowLeft, Info, MapPin, Bold, Italic, Underline, Link, List, ListOrdered } from "lucide-react";
import { toast } from "sonner";
import ProgressIndicator from "./ProgressIndicator";
import type { Plan } from "./StepPlans";

const planLabels: Record<Plan, string> = {
  gratuit: "Gratuit",
  intro: "Intro",
  profesional: "Profesional",
};

const descMaxChars: Record<Plan, number> = {
  gratuit: 1000,
  intro: 2000,
  profesional: 2000,
};

const counties = [
  "Alba","Arad","Argeș","Bacău","Bihor","Bistrița-Năsăud","Botoșani","Brașov","Brăila",
  "București","Buzău","Caraș-Severin","Călărași","Cluj","Constanța","Covasna","Dâmbovița",
  "Dolj","Galați","Giurgiu","Gorj","Harghita","Hunedoara","Ialomița","Iași","Ilfov",
  "Maramureș","Mehedinți","Mureș","Neamț","Olt","Prahova","Satu Mare","Sălaj","Sibiu",
  "Suceava","Teleorman","Timiș","Tulcea","Vaslui","Vâlcea","Vrancea",
];

const days = ["Luni","Marți","Miercuri","Joi","Vineri","Sâmbătă","Duminică"];

const facilities = [
  "Parcare disponibilă","Plată card","WiFi gratuit","Rezervări online",
  "Aer condiționat","Acces persoane cu dizabilități",
];

const timeOptions = Array.from({ length: 28 }, (_, i) => {
  const h = Math.floor(i / 2) + 7;
  const m = i % 2 === 0 ? "00" : "30";
  return `${String(h).padStart(2, "0")}:${m}`;
});

interface SectionProps {
  title: string;
  number: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Section = ({ title, number, children, defaultOpen = true }: SectionProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border border-border rounded-xl">
      <CollapsibleTrigger className="w-full flex items-center justify-between p-5 hover:bg-muted/50 transition-colors rounded-xl">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
            {number}
          </span>
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-5 pb-5 space-y-4">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const StepForm = ({
  plan,
  onBack,
  onSuccess,
}: {
  plan: Plan;
  onBack: () => void;
  onSuccess: () => void;
}) => {
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState(
    days.map((d) => ({ day: d, open: d !== "Duminică", start: "09:00", end: "18:00" }))
  );
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [otherFacility, setOtherFacility] = useState("");
  const [hasOther, setHasOther] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [kwInput, setKwInput] = useState("");
  const [serveOtherCounties, setServeOtherCounties] = useState(false);
  const [national, setNational] = useState(false);
  const [selectedCounties, setSelectedCounties] = useState<string[]>([]);
  const [countySearch, setCountySearch] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [contractAccepted, setContractAccepted] = useState(false);
  const [galleryFiles, setGalleryFiles] = useState<string[]>([]);
  const maxGallery = plan === "profesional" ? 10 : plan === "intro" ? 1 : 0;
  const editorRef = useRef<HTMLDivElement>(null);

  const filteredCounties = counties.filter(
    (c) => !selectedCounties.includes(c) && c.toLowerCase().includes(countySearch.toLowerCase())
  );

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  }, []);

  const handleEditorInput = () => {
    if (editorRef.current) {
      setDescription(editorRef.current.innerText);
    }
  };

  const isPaid = plan !== "gratuit";
  const isPro = plan === "profesional";

  const handleKeywordKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && kwInput.trim()) {
      e.preventDefault();
      setKeywords((prev) => [...prev, kwInput.trim()]);
      setKwInput("");
    }
  };

  const copySchedule = () => {
    const first = schedule.find((s) => s.open);
    if (first) {
      setSchedule((prev) =>
        prev.map((s) => (s.open ? { ...s, start: first.start, end: first.end } : s))
      );
    }
  };

  const handleSubmit = () => {
    if (!termsAccepted || !contractAccepted) {
      toast.error("Trebuie să accepți termenii și contractul pentru a continua.");
      return;
    }
    onSuccess();
  };

  return (
    <div className="w-full max-w-[860px] mx-auto px-4 sm:px-8 pt-12 pb-32">
      <ProgressIndicator currentStep={3} />

      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Completează profilul companiei tale
        </h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-sm text-muted-foreground">Plan selectat:</span>
          <Badge variant={isPro ? "default" : "secondary"}>{planLabels[plan]}</Badge>
        </div>
      </div>

      <div className="space-y-5">
        {/* SECTION 1 — Identity */}
        <Section title="Identitate companie" number={1}>
          <div>
            <Label>Denumire comercială *</Label>
            <Input placeholder="Ex: Beauty Salon Elena" className="mt-1" />
          </div>
          <div>
            <Label>Slogan</Label>
            <Input placeholder="Scurt mesaj descriptiv, max 120 caractere" maxLength={120} className="mt-1" />
            <p className="text-xs text-muted-foreground mt-1">Max 120 caractere</p>
          </div>
          <div>
            <Label>Logo</Label>
            <div className="mt-1 border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
              <Upload className="w-6 h-6 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground mt-2">PNG sau SVG, fundal transparent recomandat, max 2MB</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Categorie principală *</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Selectează" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="salon">Salon coafură</SelectItem>
                  <SelectItem value="cosmetica">Cosmetică</SelectItem>
                  <SelectItem value="manichiura">Manichiură / Pedichiură</SelectItem>
                  <SelectItem value="spa">SPA & Wellness</SelectItem>
                  <SelectItem value="barbershop">Barbershop</SelectItem>
                  <SelectItem value="dermatologie">Dermatologie estetică</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Subcategorie</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Selectează categoria întâi" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sub1">Subcategorie 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {isPro && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Categorie suplimentară 1 (opțional)</Label>
                  <Select>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Selectează" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salon">Salon coafură</SelectItem>
                      <SelectItem value="cosmetica">Cosmetică</SelectItem>
                      <SelectItem value="manichiura">Manichiură / Pedichiură</SelectItem>
                      <SelectItem value="spa">SPA & Wellness</SelectItem>
                      <SelectItem value="barbershop">Barbershop</SelectItem>
                      <SelectItem value="dermatologie">Dermatologie estetică</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Subcategorie (opțional)</Label>
                  <Select>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Selectează categoria întâi" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sub1">Subcategorie 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Categorie suplimentară 2 (opțional)</Label>
                  <Select>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Selectează" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salon">Salon coafură</SelectItem>
                      <SelectItem value="cosmetica">Cosmetică</SelectItem>
                      <SelectItem value="manichiura">Manichiură / Pedichiură</SelectItem>
                      <SelectItem value="spa">SPA & Wellness</SelectItem>
                      <SelectItem value="barbershop">Barbershop</SelectItem>
                      <SelectItem value="dermatologie">Dermatologie estetică</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Subcategorie (opțional)</Label>
                  <Select>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Selectează categoria întâi" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sub1">Subcategorie 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
          <div>
            <Label>Cuvinte cheie</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {keywords.map((kw, i) => (
                <Badge key={i} variant="secondary" className="gap-1">
                  {kw}
                  <button onClick={() => setKeywords((p) => p.filter((_, j) => j !== i))}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Adaugă cuvinte cheie, apasă Enter"
              value={kwInput}
              onChange={(e) => setKwInput(e.target.value)}
              onKeyDown={handleKeywordKey}
              className="mt-2"
            />
          </div>
        </Section>

        {/* SECTION 2 — Contact */}
        <Section title="Date de contact" number={2}>
          <div>
            <Label>Telefon principal *</Label>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground border border-border rounded-md px-2 h-10 flex items-center">🇷🇴 +40</span>
              <Input placeholder="712 345 678" className="flex-1" />
            </div>
          </div>
          <div>
            <Label>WhatsApp</Label>
            <Input placeholder="Lasă gol dacă este același cu telefonul principal" className="mt-1" />
          </div>
          <div>
            <Label>Email de contact *</Label>
            <Input type="email" placeholder="contact@exemplu.ro" className="mt-1" />
            <p className="text-xs text-muted-foreground mt-1">Nu va fi afișat public, utilizat doar pentru formularul de contact</p>
          </div>
          <div>
            <Label>Website</Label>
            <Input type="url" placeholder="https://www.exemplu.ro" className="mt-1" />
          </div>
          {isPaid && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Facebook</Label>
                <Input type="url" placeholder="https://facebook.com/pagina" className="mt-1" />
              </div>
              <div>
                <Label>Instagram</Label>
                <Input type="url" placeholder="https://instagram.com/pagina" className="mt-1" />
              </div>
            </div>
          )}
        </Section>

        {/* SECTION 3 — Address */}
        <Section title="Adresă și locație" number={3}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Județ *</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Selectează" /></SelectTrigger>
                <SelectContent>
                  {counties.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Localitate *</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Selectează județul întâi" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="loc1">Localitate 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-[1fr_100px_120px] gap-4">
            <div>
              <Label>Adresă stradă *</Label>
              <Input placeholder="Str. Exemplu" className="mt-1" />
            </div>
            <div>
              <Label>Număr *</Label>
              <Input placeholder="12A" className="mt-1" />
            </div>
            <div>
              <Label>Cod poștal</Label>
              <Input placeholder="010101" className="mt-1" />
            </div>
          </div>

          {/* Google Maps placeholder */}
          <div>
            <Label>Locație pe hartă</Label>
            <div className="mt-1 rounded-lg bg-muted border border-border flex flex-col items-center justify-center h-[200px]">
              <MapPin className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mt-2">Google Maps</span>
            </div>
            <Button variant="outline" className="mt-2 gap-2" type="button">
              <MapPin className="w-4 h-4" />
              Poziționare manuală
            </Button>
          </div>

          {/* Zone deservite */}
          <div className={!isPro ? "opacity-50 pointer-events-none relative" : ""}>
            {!isPro && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <Badge variant="secondary" className="gap-1 text-xs">
                  <Info className="w-3 h-3" /> Disponibil în planul Profesional
                </Badge>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Checkbox
                checked={serveOtherCounties}
                onCheckedChange={(v) => setServeOtherCounties(!!v)}
              />
              <Label className="font-normal">Deservesc și alte județe</Label>
            </div>
            {serveOtherCounties && (
              <div className="ml-6 mt-3 space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={national}
                    onCheckedChange={(v) => {
                      setNational(!!v);
                      if (v) setSelectedCounties([...counties]);
                      else setSelectedCounties([]);
                    }}
                  />
                  <Label className="font-normal text-sm">Deservesc la nivel național</Label>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedCounties.map((c) => (
                      <Badge key={c} variant="secondary" className="gap-1">
                        {c}
                        <button onClick={() => {
                          setSelectedCounties((p) => p.filter((x) => x !== c));
                          setNational(false);
                        }}>
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="Caută și adaugă județe..."
                      value={countySearch}
                      onChange={(e) => setCountySearch(e.target.value)}
                    />
                    {countySearch && filteredCounties.length > 0 && (
                      <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-md max-h-48 overflow-y-auto">
                        {filteredCounties.map((c) => (
                          <button
                            key={c}
                            type="button"
                            className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                            onClick={() => {
                              setSelectedCounties((p) => [...p, c]);
                              setCountySearch("");
                            }}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Section>

        {/* SECTION 4 — Description */}
        <Section title="Descriere" number={4}>
          <div>
            <Label>Descriere *</Label>
            <div className="mt-1 border border-input rounded-md overflow-hidden">
              <div className="flex items-center gap-1 px-2 py-1.5 border-b border-input bg-muted/30">
                <button type="button" onClick={() => execCommand('bold')} className="p-1.5 rounded hover:bg-accent" title="Bold">
                  <Bold className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => execCommand('italic')} className="p-1.5 rounded hover:bg-accent" title="Italic">
                  <Italic className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => execCommand('underline')} className="p-1.5 rounded hover:bg-accent" title="Underline">
                  <Underline className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-border mx-1" />
                <button type="button" onClick={() => {
                  const url = prompt('Introdu URL-ul:');
                  if (url) execCommand('createLink', url);
                }} className="p-1.5 rounded hover:bg-accent" title="Link">
                  <Link className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-border mx-1" />
                <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-1.5 rounded hover:bg-accent" title="Listă">
                  <List className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-1.5 rounded hover:bg-accent" title="Listă numerotată">
                  <ListOrdered className="w-4 h-4" />
                </button>
              </div>
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorInput}
                className="min-h-[150px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                data-placeholder="Descrieți afacerea dvs..."
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-right">
              {description.length} / {descMaxChars[plan]} caractere
            </p>
          </div>
        </Section>

        {/* SECTION 5 — Schedule */}
        <Section title="Program de funcționare" number={5} defaultOpen={false}>
          <div className="space-y-2">
            {schedule.map((s, i) => (
              <div key={s.day} className="flex items-center gap-3 flex-wrap">
                <span className="w-20 text-sm font-medium">{s.day}</span>
                <Switch
                  checked={s.open}
                  onCheckedChange={(v) =>
                    setSchedule((prev) => prev.map((x, j) => (j === i ? { ...x, open: v } : x)))
                  }
                />
                {s.open ? (
                  <>
                    <Select
                      value={s.start}
                      onValueChange={(v) =>
                        setSchedule((prev) => prev.map((x, j) => (j === i ? { ...x, start: v } : x)))
                      }
                    >
                      <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <span className="text-muted-foreground">–</span>
                    <Select
                      value={s.end}
                      onValueChange={(v) =>
                        setSchedule((prev) => prev.map((x, j) => (j === i ? { ...x, end: v } : x)))
                      }
                    >
                      <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">Închis</span>
                )}
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={copySchedule}>
            Copiază pentru toate zilele
          </Button>
          <p className="text-xs text-muted-foreground">
            Completarea programului permite apariția în filtrul „Deschis acum"
          </p>
        </Section>

        {/* SECTION 6 — Facilities */}
        <Section title="Facilități" number={6} defaultOpen={false}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {facilities.map((f) => (
              <label key={f} className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox
                  checked={selectedFacilities.includes(f)}
                  onCheckedChange={(checked) =>
                    setSelectedFacilities((prev) =>
                      checked ? [...prev, f] : prev.filter((x) => x !== f)
                    )
                  }
                />
                {f}
              </label>
            ))}
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox checked={hasOther} onCheckedChange={(v) => setHasOther(!!v)} />
              Alte facilități
            </label>
          </div>
          {hasOther && (
            <Input
              placeholder="Specificați..."
              value={otherFacility}
              onChange={(e) => setOtherFacility(e.target.value)}
              className="mt-2"
            />
          )}
        </Section>

        {/* SECTION 7 — Services */}
        <Section title="Servicii oferite" number={7} defaultOpen={false}>
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
            <Info className="w-4 h-4" />
            Selectează mai întâi o categorie pentru a vedea serviciile disponibile
          </div>
        </Section>

        {/* SECTION 8 — Gallery (paid only) */}
        {isPaid && (
          <Section title="Imagini galerie" number={8} defaultOpen={false}>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {Array.from({ length: maxGallery }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {galleryFiles[i] ? (
                    <span className="text-xs text-muted-foreground">img</span>
                  ) : (
                    <Plus className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Max 5MB per imagine, JPG/PNG/WebP</p>
          </Section>
        )}

        {/* SECTION 9 — Legal */}
        <Section title="Informații legale" number={isPaid ? 9 : 8}>
          <div>
            <Label>Denumire legală (conform act constitutiv) *</Label>
            <Input placeholder="SC Exemplu SRL" className="mt-1" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>CUI / CIF *</Label>
              <Input placeholder="RO12345678" className="mt-1" />
            </div>
            <div>
              <Label>Nr. Registrul Comerțului *</Label>
              <Input placeholder="J12/456/2018" className="mt-1" />
            </div>
          </div>
        </Section>

        {/* Terms */}
        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-2 text-sm cursor-pointer">
            <Checkbox
              checked={termsAccepted}
              onCheckedChange={(v) => setTermsAccepted(!!v)}
              className="mt-0.5"
            />
            <span>
              Am citit și sunt de acord cu{" "}
              <a href="#" className="text-primary hover:underline">Termenii și condițiile</a> *
            </span>
          </label>
          <label className="flex items-start gap-2 text-sm cursor-pointer">
            <Checkbox
              checked={contractAccepted}
              onCheckedChange={(v) => setContractAccepted(!!v)}
              className="mt-0.5"
            />
            <span>
              Am citit și sunt de acord cu{" "}
              <a href="#" className="text-primary hover:underline">Contractul de publicitate</a> *
            </span>
          </label>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 sm:px-8 py-3 z-40">
        <div className="max-w-[860px] mx-auto flex items-center justify-between">
          <span className="text-sm text-muted-foreground hidden sm:block">Pasul 3 din 3</span>
          <Badge variant="secondary" className="hidden sm:inline-flex">{planLabels[plan]}</Badge>
          <div className="flex gap-3 ml-auto">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Înapoi
            </Button>
            <Button onClick={handleSubmit}>Trimite spre aprobare</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepForm;
