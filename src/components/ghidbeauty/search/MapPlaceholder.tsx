import { MapPin, Plus, Minus, Crosshair } from "lucide-react";
import type { SearchListing } from "@/data/searchMockData";

interface PinProps {
  listing: SearchListing;
  index: number;
  isActive: boolean;
  onClick: () => void;
  style: React.CSSProperties;
}

const planPinColors: Record<string, { bg: string; tail: string; text: string }> = {
  profesional: { bg: "bg-[#9678B6]", tail: "border-t-[#9678B6]", text: "text-white" },
  intro: { bg: "bg-[#C4A8E0]", tail: "border-t-[#C4A8E0]", text: "text-white" },
  gratuit: { bg: "bg-[#E5E5E5]", tail: "border-t-[#E5E5E5]", text: "text-gray-700" },
};

const MapPinBubble = ({ listing, index, isActive, onClick, style }: PinProps) => {
  const colors = planPinColors[listing.plan] ?? planPinColors.gratuit;
  return (
    <button
      onClick={onClick}
      className={`absolute z-10 flex items-center gap-1 px-2 py-1 rounded-full ${colors.text} text-[10px] font-semibold whitespace-nowrap transition-all cursor-pointer
        ${colors.bg}
        ${isActive ? "scale-110 ring-2 ring-white shadow-lg z-20" : "hover:scale-105"}
      `}
      style={{ ...style, transform: `translate(-50%, -100%) ${isActive ? "scale(1.1)" : ""}` }}
    >
      <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[9px]">
        {index + 1}
      </span>
      <span className="max-w-[100px] truncate">{listing.name}</span>
      <span
        className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-transparent ${colors.tail}`}
      />
    </button>
  );
};

const pinPositions = [
  { top: "25%", left: "35%" },
  { top: "40%", left: "55%" },
  { top: "15%", left: "65%" },
  { top: "55%", left: "30%" },
  { top: "35%", left: "75%" },
  { top: "60%", left: "50%" },
  { top: "20%", left: "45%" },
  { top: "45%", left: "25%" },
  { top: "70%", left: "60%" },
  { top: "30%", left: "85%" },
  { top: "50%", left: "70%" },
  { top: "65%", left: "40%" },
  { top: "22%", left: "20%" },
  { top: "75%", left: "75%" },
  { top: "38%", left: "42%" },
];

interface Props {
  listings: SearchListing[];
  activeId: string | null;
  onPinClick: (id: string) => void;
}

const MapPlaceholder = ({ listings, activeId, onPinClick }: Props) => {
  return (
    <div className="relative w-full h-full bg-[#e8e4d8] overflow-hidden select-none">
      {/* Fake road grid */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#c4c0b4" strokeWidth="2" />
        <line x1="0" y1="40%" x2="100%" y2="42%" stroke="#c4c0b4" strokeWidth="3" />
        <line x1="0" y1="60%" x2="100%" y2="58%" stroke="#c4c0b4" strokeWidth="2" />
        <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#c4c0b4" strokeWidth="1.5" />
        <line x1="20%" y1="0" x2="22%" y2="100%" stroke="#c4c0b4" strokeWidth="2" />
        <line x1="45%" y1="0" x2="45%" y2="100%" stroke="#c4c0b4" strokeWidth="3" />
        <line x1="70%" y1="0" x2="68%" y2="100%" stroke="#c4c0b4" strokeWidth="2" />
        <line x1="90%" y1="0" x2="90%" y2="100%" stroke="#c4c0b4" strokeWidth="1.5" />
        <line x1="10%" y1="10%" x2="80%" y2="90%" stroke="#c4c0b4" strokeWidth="1" />
        <rect x="30%" y="50%" width="15%" height="12%" rx="6" fill="#c8d8b8" opacity="0.5" />
        <rect x="60%" y="20%" width="10%" height="8%" rx="4" fill="#c8d8b8" opacity="0.4" />
      </svg>

      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
          <MapPin size={32} />
          <span className="text-xs font-medium">Google Maps · se încarcă</span>
        </div>
      </div>

      {/* Map pins */}
      {listings.slice(0, pinPositions.length).map((listing, i) => (
        <MapPinBubble
          key={listing.id}
          listing={listing}
          index={i}
          isActive={activeId === listing.id}
          onClick={() => onPinClick(listing.id)}
          style={pinPositions[i]}
        />
      ))}

      {/* Map controls — top right */}
      <div className="absolute top-3 right-3 flex flex-col gap-1">
        <button className="w-8 h-8 bg-card border border-border rounded flex items-center justify-center hover:bg-muted transition-colors">
          <Plus size={14} className="text-foreground" />
        </button>
        <button className="w-8 h-8 bg-card border border-border rounded flex items-center justify-center hover:bg-muted transition-colors">
          <Minus size={14} className="text-foreground" />
        </button>
        <button className="w-8 h-8 bg-card border border-border rounded flex items-center justify-center hover:bg-muted transition-colors mt-1">
          <Crosshair size={14} className="text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default MapPlaceholder;