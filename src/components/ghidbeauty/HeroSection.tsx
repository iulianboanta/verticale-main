import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AutosuggestInput, { ceSuggestions, undeSuggestions } from "@/components/ghidbeauty/search/AutosuggestInput";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [ceValue, setCeValue] = useState("");
  const [undeValue, setUndeValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (ceValue.trim()) params.set("q", ceValue.trim());
    if (undeValue.trim()) params.set("unde", undeValue.trim());
    navigate(`/cautare?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-36 md:pt-40 md:pb-48">
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
            <AutosuggestInput
              icon={<Search size={18} />}
              placeholder="Ce cauți? (ex: salon, manichiură)"
              suggestions={ceSuggestions}
              value={ceValue}
              onChange={setCeValue}
            />
            <AutosuggestInput
              icon={<MapPin size={18} />}
              placeholder="Unde? (oraș sau județ)"
              suggestions={undeSuggestions}
              value={undeValue}
              onChange={setUndeValue}
            />
            <Button className="rounded-xl sm:rounded-full px-6" onClick={handleSearch}>
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
