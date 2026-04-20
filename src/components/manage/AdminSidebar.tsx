import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  List,
  Clock,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  ShoppingCart,
  FileText,
  CreditCard,
  CheckSquare,
  Users,
  Star,
  StarHalf,
  Newspaper,
  Folder,
  Tag,
  Layers,
  Sparkles,
  MapPin,
  Image as ImageIcon,
  Settings,
  BarChart3,
  TrendingUp,
  Wallet,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sections: { title: string; items: { to: string; label: string; icon: any; end?: boolean }[] }[] = [
  {
    title: "GENERAL",
    items: [{ to: "/manage", label: "Dashboard", icon: LayoutDashboard, end: true }],
  },
  {
    title: "LISTINGS",
    items: [
      { to: "/manage/listings", label: "Toate listingurile", icon: List, end: true },
      { to: "/manage/listings/pending", label: "În așteptare aprobare", icon: Clock },
      { to: "/manage/listings/active", label: "Listinguri active", icon: CheckCircle2 },
      { to: "/manage/listings/expired", label: "Listinguri expirate", icon: AlertOctagon },
      { to: "/manage/listings/rejected", label: "Listinguri respinse", icon: XCircle },
    ],
  },
  {
    title: "COMENZI & PLĂȚI",
    items: [
      { to: "/manage/orders", label: "Toate comenzile", icon: ShoppingCart, end: true },
      { to: "/manage/orders/unpaid", label: "Proforma neachitate", icon: FileText },
      { to: "/manage/orders/confirmed", label: "Plăți confirmate", icon: CreditCard },
      { to: "/manage/orders/confirm", label: "Confirmă plată manuală", icon: CheckSquare },
    ],
  },
  {
    title: "UTILIZATORI",
    items: [
      { to: "/manage/users", label: "Toți utilizatorii", icon: Users, end: true },
    ],
  },
  {
    title: "RECENZII",
    items: [
      { to: "/manage/reviews/pending", label: "Recenzii în așteptare", icon: StarHalf },
      { to: "/manage/reviews", label: "Toate recenziile", icon: Star, end: true },
    ],
  },
  {
    title: "CONȚINUT SITE",
    items: [
      { to: "/manage/articles", label: "Articole", icon: Newspaper, end: true },
      { to: "/manage/articles/categories", label: "Categorii articole", icon: Folder },
    ],
  },
  {
    title: "ADMINISTRARE",
    items: [
      { to: "/manage/admin/categories", label: "Categorii listing", icon: Tag },
      { to: "/manage/admin/subcategories", label: "Subcategorii", icon: Layers },
      { to: "/manage/admin/services", label: "Servicii & Facilități", icon: Sparkles },
      { to: "/manage/admin/counties", label: "Zone & Județe", icon: MapPin },
      { to: "/manage/admin/banners", label: "Bannere publicitare", icon: ImageIcon },
      { to: "/manage/admin/settings", label: "Setări platformă", icon: Settings },
    ],
  },
  {
    title: "RAPOARTE",
    items: [
      { to: "/manage/reports/stats", label: "Statistici platformă", icon: BarChart3 },
      { to: "/manage/reports/listings", label: "Raport listings", icon: TrendingUp },
      { to: "/manage/reports/revenue", label: "Raport venituri", icon: Wallet },
    ],
  },
];

const AdminSidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
  return (
    <aside className="w-[220px] shrink-0 bg-card border-r h-full overflow-y-auto">
      <div className="p-4 border-b">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          asChild
        >
          <a href="/" target="_blank" rel="noopener noreferrer">
            <ExternalLink size={16} />
            Vezi site
          </a>
        </Button>
      </div>
      <nav className="py-4">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            <div className="px-4 mb-1 text-[11px] font-semibold tracking-wider text-muted-foreground/70">
              {section.title}
            </div>
            <ul>
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 text-sm border-l-2 transition-colors ${
                          isActive
                            ? "border-primary text-primary bg-primary/5 font-medium"
                            : "border-transparent text-foreground/80 hover:bg-muted/50"
                        }`
                      }
                    >
                      <Icon size={16} />
                      <span className="truncate">{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
