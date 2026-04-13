import { useState } from "react";
import {
  Star,
  Check,
  X,
  MapPin,
  FileText,
  Download,
  Copy,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Props {
  company: any;
}

const SectionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-lg">{title}</CardTitle>
      <Separator />
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const CompanyBody = ({ company }: Props) => {
  const [descExpanded, setDescExpanded] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const today = new Date().toLocaleDateString("ro-RO", { weekday: "long" });

  const totalRatings = Object.values(
    company.ratingDistribution as Record<number, number>
  ).reduce((a: number, b: number) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Despre salon */}
      <SectionCard title="Despre salon">
        <p
          className={`text-sm text-muted-foreground leading-relaxed ${
            !descExpanded ? "line-clamp-3" : ""
          }`}
        >
          {company.description}
        </p>
        <button
          onClick={() => setDescExpanded(!descExpanded)}
          className="text-primary text-sm hover:underline mt-2 flex items-center gap-1"
        >
          {descExpanded ? "Arată mai puțin" : "Citește mai mult"}
          <ChevronDown
            size={14}
            className={descExpanded ? "rotate-180 transition-transform" : "transition-transform"}
          />
        </button>
      </SectionCard>

      {/* Servicii oferite */}
      <SectionCard title="Servicii oferite">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {company.services.map((s: string) => (
            <div
              key={s}
              className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2 text-sm"
            >
              <Check size={14} className="text-primary shrink-0" />
              {s}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Facilități */}
      <SectionCard title="Facilități">
        <div className="grid grid-cols-2 gap-2">
          {company.facilities.map((f: any) => (
            <div key={f.name} className="flex items-center gap-2 text-sm">
              {f.available ? (
                <Check size={14} className="text-green-600 shrink-0" />
              ) : (
                <X size={14} className="text-muted-foreground/40 shrink-0" />
              )}
              <span
                className={f.available ? "text-foreground" : "text-muted-foreground line-through"}
              >
                {f.name}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Program de funcționare */}
      <div id="program-section">
      <SectionCard title="Program de funcționare">
        <div className="space-y-1.5">
          {company.schedule.map((s: any) => {
            const isToday = s.day.toLowerCase() === today.toLowerCase();
            return (
              <div
                key={s.day}
                className={`flex justify-between rounded-md px-3 py-1.5 text-sm ${
                  isToday ? "bg-primary-light font-semibold" : ""
                }`}
              >
                <span className="text-muted-foreground">{s.day}</span>
                <span className="font-medium text-foreground">{s.hours}</span>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Promoții active */}
      <SectionCard title="Promoții active">
        <div className="space-y-3">
          {company.promotions.map((p: any) => (
            <div
              key={p.code}
              className="flex items-center justify-between rounded-lg bg-primary-light p-4"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.description}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="shrink-0 gap-1.5 font-mono text-xs"
                onClick={() => handleCopy(p.code)}
              >
                <Copy size={12} />
                {copiedCode === p.code ? "Copiat!" : p.code}
              </Button>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Locații suplimentare */}
      <SectionCard title="Locații suplimentare">
        <div className="space-y-3">
          {company.locations.map((l: any) => (
            <div key={l.name} className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light">
                <MapPin size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{l.name}</p>
                <p className="text-xs text-muted-foreground">{l.address}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Documente & oferte */}
      <SectionCard title="Documente & oferte">
        <div className="space-y-2">
          {company.documents.map((d: any) => (
            <div
              key={d.name}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-destructive shrink-0" />
                <div>
                  <p className="text-sm text-foreground">{d.name}</p>
                  <p className="text-[10px] text-muted-foreground">{d.size}</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="gap-1 text-xs">
                <Download size={12} />
                Descarcă
              </Button>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Recenzii clienți */}
      <SectionCard title="Recenzii clienți">
        {/* Summary */}
        <div className="flex items-start gap-4 mb-6">
          <div className="text-center">
            <span className="text-4xl font-bold text-foreground">{company.rating}</span>
            <div className="flex gap-0.5 mt-1 justify-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i <= Math.round(company.rating)
                      ? "fill-accent text-accent"
                      : "text-muted-foreground/30"
                  }
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{company.reviewCount} recenzii</p>
          </div>
          <div className="flex-1 space-y-1">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = (company.ratingDistribution as any)[star] || 0;
              const pct = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-4 text-right text-muted-foreground">{star}★</span>
                  <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-6 text-muted-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <Separator className="mb-4" />

        {/* Individual reviews */}
        <div className="space-y-4">
          {company.reviews.map((r: any) => (
            <div key={r.id} className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary text-sm font-semibold">
                  {r.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{r.author}</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i <= r.rating
                              ? "fill-accent text-accent"
                              : "text-muted-foreground/30"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-muted-foreground">{r.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{r.text}</p>
                </div>
              </div>

              {r.reply && (
                <div className="ml-12 rounded-lg bg-secondary/50 p-3">
                  <Badge className="bg-primary/10 text-primary text-[10px] mb-1">
                    Răspuns {r.reply.author}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{r.reply.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <Button variant="outline" className="w-full">
          Intră în cont și scrie o recenzie
        </Button>
      </SectionCard>
    </div>
  );
};

export default CompanyBody;
