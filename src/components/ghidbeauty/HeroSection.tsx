import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32">
      {/* Background image – full color, subtle dark overlay for readability */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={800}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="container relative z-10 flex flex-col items-center text-center">
        <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem] drop-shadow-lg">
          Găsește profesioniștii din{" "}
          <span className="text-primary-glow">beauty</span> lângă tine
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg drop-shadow">
          Saloane, spa-uri, studiouri de unghii, cosmetică, tatuaje și mai mult
          — toate într-un singur loc.
        </p>

        {/* Search bar */}
        <div className="mt-8 w-full max-w-2xl">
          <div className="flex flex-col gap-3 rounded-2xl bg-card p-2 shadow-lg sm:flex-row sm:items-center sm:rounded-full">
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 sm:rounded-full">
              <Search size={18} className="shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ce cauți? (ex: salon, manichiură)"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 sm:rounded-full">
              <MapPin size={18} className="shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="Unde? (oraș sau județ)"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <Button className="rounded-xl sm:rounded-full px-6">
              <Search size={18} />
              <span className="sm:hidden md:inline ml-1">Caută</span>
            </Button>
          </div>
        </div>

        <p className="mt-4 text-xs text-white/70">
          Peste <span className="font-semibold text-primary-glow">2.500</span> de
          afaceri listate &bull; Acoperire națională
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
