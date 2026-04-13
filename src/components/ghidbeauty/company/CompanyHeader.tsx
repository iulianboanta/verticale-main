import { useState, useEffect, useCallback, useRef } from "react";
import {
  Star,
  Eye,
  Phone,
  Globe,
  Clock,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
  MessageCircle,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Props {
  company: any;
}

const CompanyHeader = ({ company }: Props) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const touchStartX = useRef(0);

  const today = new Date().toLocaleDateString("ro-RO", { weekday: "long" });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);
  const todaySchedule = company.schedule.find(
    (s: any) => s.day.toLowerCase() === today.toLowerCase()
  );
  const isOpen = todaySchedule && todaySchedule.hours !== "Închis";

  const totalRatings = Object.values(company.ratingDistribution as Record<number, number>).reduce(
    (a: number, b: number) => a + b,
    0
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % company.images.length);
  }, [company.images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + company.images.length) % company.images.length);
  }, [company.images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, goNext, goPrev]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* LEFT — Photo gallery */}
      <div>
        <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden aspect-[16/10]">
          <div className="col-span-2 row-span-2 relative cursor-pointer" onClick={() => openLightbox(0)}>
            <img
              src={company.images[0]}
              alt={company.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative cursor-pointer" onClick={() => openLightbox(1)}>
            <img
              src={company.images[1]}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative cursor-pointer" onClick={() => openLightbox(2)}>
            <img
              src={company.images[2]}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                +{company.images.length - 3} foto
              </span>
            </div>
          </div>
        </div>
        <button onClick={() => openLightbox(0)} className="mt-2 text-sm text-primary hover:underline">
          Vezi toate fotografiile ({company.images.length})
        </button>
      </div>

      {/* RIGHT — Company info */}
      <div className="flex flex-col gap-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-primary text-primary-foreground">
            <Star size={12} className="mr-1" />
            Recomandat
          </Badge>
          {company.verified && (
            <Badge className="bg-green-100 text-green-700">Verificat</Badge>
          )}
        </div>

        {/* Logo + Name + Category */}
        <div className="flex items-center gap-3">
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            className="w-14 h-14 rounded-full object-cover border-2 border-border shrink-0"
          />
          <div>
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">{company.name}</h1>
            <p className="text-sm text-muted-foreground">
              {company.category} · {company.city}, {company.county}
            </p>
          </div>
        </div>

        {/* Rating block */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-foreground">{company.rating}</span>
            <div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i <= Math.round(company.rating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground/30"
                    }
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{company.reviewCount} recenzii</span>
            </div>
          </div>

          {/* Distribution bars */}
          <div className="flex-1 space-y-1">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = (company.ratingDistribution as any)[star] || 0;
              const pct = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-4 text-right text-muted-foreground">{star}★</span>
                  <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-6 text-muted-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Meta list */}
        <div className="space-y-2 text-sm">
          {/* Opening hours — today only + scroll link */}
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-muted-foreground shrink-0" />
            <span className="text-foreground">{todayCapitalized}: {todaySchedule?.hours || "—"}</span>
            {isOpen && (
              <Badge variant="outline" className="border-green-500 text-green-600 text-[10px] px-1.5 py-0">
                Deschis acum
              </Badge>
            )}
            <button
              onClick={() => document.getElementById("program-section")?.scrollIntoView({ behavior: "smooth" })}
              className="text-primary hover:underline ml-auto text-xs"
            >
              Vezi programul complet
            </button>
          </div>

          {/* Phone — click to reveal */}
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-muted-foreground shrink-0" />
            {phoneVisible ? (
              <a href={`tel:${company.phone}`} className="text-primary hover:underline">
                {company.phone}
              </a>
            ) : (
              <button
                onClick={() => setPhoneVisible(true)}
                className="text-primary hover:underline"
              >
                Afișează telefonul
              </button>
            )}
          </div>

          {/* WhatsApp */}
          {company.whatsapp && (
            <div className="flex items-center gap-2">
              <MessageCircle size={16} className="text-muted-foreground shrink-0" />
              <a href={company.whatsapp} target="_blank" rel="noopener" className="text-primary hover:underline">
                Trimite mesaj WhatsApp
              </a>
            </div>
          )}

          {/* Website */}
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-muted-foreground shrink-0" />
            <a href={company.website} target="_blank" rel="noopener" className="text-primary hover:underline flex items-center gap-1">
              {company.website.replace(/^https?:\/\//, "")}
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a href={company.facebook} target="_blank" rel="noopener" className="text-muted-foreground hover:text-primary text-xs underline">
              Facebook
            </a>
            <a href={company.instagram} target="_blank" rel="noopener" className="text-muted-foreground hover:text-primary text-xs underline">
              Instagram
            </a>
          </div>
        </div>

        {/* Service tags */}
        <div className="flex flex-wrap gap-1.5">
          {company.services.slice(0, 8).map((s: string) => (
            <Badge key={s} variant="outline" className="text-xs font-normal cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              {s}
            </Badge>
          ))}
          {company.services.length > 8 && (
            <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
              +{company.services.length - 8}
            </Badge>
          )}
        </div>

        {/* Views */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Eye size={14} />
          <span>{company.views.toLocaleString("ro-RO")} vizualizări luna aceasta</span>
        </div>

      </div>

      {/* Lightbox modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-none w-screen h-screen p-0 border-none bg-black/95 [&>button]:hidden">
          {/* Close button — wrapped in div to avoid [&>button]:hidden */}
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={() => setLightboxOpen(false)}
              className="text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-colors"
            >
              <X size={28} />
            </button>
          </div>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-50 text-white/70 text-sm font-medium">
            {lightboxIndex + 1} / {company.images.length}
          </div>

          {/* Image with swipe support */}
          <div
            className="flex items-center justify-center w-full h-full"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) {
                if (diff > 0) { goNext(); } else { goPrev(); }
              }
            }}
          >
            <img
              src={company.images[lightboxIndex]}
              alt={`${company.name} - foto ${lightboxIndex + 1}`}
              className="max-w-[90vw] max-h-[70vh] object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 max-w-[90vw] overflow-x-auto px-2 py-2 rounded-lg bg-black/50">
            {company.images.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-all ${
                  i === lightboxIndex ? "border-white opacity-100" : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Navigation arrows — wrapped in divs */}
          {company.images.length > 1 && (
            <>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-50">
                <button
                  onClick={goPrev}
                  className="text-white/60 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-3 transition-colors"
                >
                  <ChevronLeft size={32} />
                </button>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50">
                <button
                  onClick={goNext}
                  className="text-white/60 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-3 transition-colors"
                >
                  <ChevronRight size={32} />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyHeader;
