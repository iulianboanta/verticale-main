import { Star, Phone, MessageCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  company: { name: string; rating: number; reviewCount: number; phone: string; whatsapp?: string };
  visible: boolean;
}

const CompanyStickyBar = ({ company, visible }: Props) => {
  if (!visible) return null;

  const telHref = `tel:${company.phone.replace(/[^0-9+]/g, "")}`;

  return (
    <div className="fixed top-16 left-0 right-0 z-40 border-b bg-card/95 backdrop-blur-sm shadow-sm animate-in slide-in-from-top-2 duration-200">
      <div className="container flex items-center justify-between h-12">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-sm text-foreground">{company.name}</span>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-accent text-accent" />
            <span className="text-sm font-semibold">{company.rating}</span>
            <span className="text-xs text-muted-foreground">({company.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex gap-1.5">
            <a href={telHref}>
              <Phone size={14} />
              Sună
            </a>
          </Button>
          <Button asChild size="sm" aria-label="Sună" className="sm:hidden gap-1.5">
            <a href={telHref}>
              <Phone size={14} />
            </a>
          </Button>
          {company.whatsapp && (
            <>
              <Button asChild size="sm" className="hidden sm:inline-flex gap-1.5 bg-green-600 hover:bg-green-700 text-white">
                <a href={company.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
              </Button>
              <Button asChild size="sm" aria-label="WhatsApp" className="sm:hidden gap-1.5 bg-green-600 hover:bg-green-700 text-white">
                <a href={company.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={14} />
                </a>
              </Button>
            </>
          )}
          <Button size="sm" variant="ghost" className="hidden sm:inline-flex gap-1.5">
            <MessageSquare size={14} />
            Trimite mesaj
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyStickyBar;
