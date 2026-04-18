import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Building2, PlusCircle, Star, MessageSquare, BarChart3,
  Tag, Megaphone, User, Shield, CreditCard, Bell, Heart, Search,
  LogOut, ChevronDown, Menu, X
} from "lucide-react";

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { mockUser } from "@/data/dashboardMockData";
import logo from "@/assets/ghidbeauty-logo.png";

const navSections = [
  {
    title: "GENERAL",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "LISTINGURILE MELE",
    items: [
      { label: "Toate listingurile", href: "/dashboard/listinguri", icon: Building2 },
      { label: "Adauga listing nou", href: "/adauga-companie?step=plans", icon: PlusCircle },
      { label: "Recenzii primite", href: "/dashboard/recenzii", icon: Star },
      { label: "Mesaje primite", href: "/dashboard/mesaje", icon: MessageSquare },
      { label: "Statistici & Analytics", href: "/dashboard/statistici", icon: BarChart3 },
    ],
  },
  {
    title: "PROMOVARE",
    items: [
      { label: "Oferte & Cupoane", href: "/dashboard/oferte", icon: Tag },
      { label: "Promotii active", href: "/dashboard/promotii", icon: Megaphone },
    ],
  },
  {
    title: "CONT",
    items: [
      { label: "Profilul meu", href: "/dashboard/profil", icon: User },
      { label: "Securitate", href: "/dashboard/securitate", icon: Shield },
      { label: "Abonamente & Facturi", href: "/dashboard/abonamente", icon: CreditCard },
      { label: "Notificari", href: "/dashboard/notificari", icon: Bell },
    ],
  },
  {
    title: "SALVATE",
    items: [
      { label: "Favorite", href: "/dashboard/favorite", icon: Heart },
      { label: "Cautari salvate", href: "/dashboard/cautari-salvate", icon: Search },
    ],
  },
];

const mobileNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Listinguri", href: "/dashboard/listinguri", icon: Building2 },
  { label: "Mesaje", href: "/dashboard/mesaje", icon: MessageSquare },
  { label: "Statistici", href: "/dashboard/statistici", icon: BarChart3 },
  { label: "Cont", href: "/dashboard/profil", icon: User },
];


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* User info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
            {mockUser.avatarInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {mockUser.firstName} {mockUser.lastName}
            </p>
            <p className="text-xs text-muted-foreground truncate">{mockUser.email}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        {navSections.map((section) => (
          <div key={section.title}>
            <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-wider px-3 mb-1">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                        active
                          ? "bg-primary/10 text-primary font-medium border-l-[3px] border-primary -ml-px"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-border">
        <button
          onClick={() => navigate("/autentificare")}
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Deconectare</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-card border-b border-border flex items-center px-4">
        <div className="flex items-center gap-3 w-60 shrink-0">
          <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link to="/">
            <img src={logo} alt="GhidBeauty.ro" className="h-9" />
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
          <h1 className="text-sm font-semibold text-foreground hidden sm:block">Panoul meu</h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            {mockUser.unreadNotifications > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {mockUser.unreadNotifications}
              </span>
            )}
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                  {mockUser.avatarInitials}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate("/dashboard/profil")}>
                <User className="w-4 h-4 mr-2" /> Profil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard/securitate")}>
                <Shield className="w-4 h-4 mr-2" /> Setari
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/autentificare")} className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" /> Deconectare
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed top-14 left-0 bottom-0 w-60 bg-card border-r border-border z-40">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed top-14 left-0 bottom-0 w-72 bg-card border-r border-border z-50 lg:hidden animate-in slide-in-from-left">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main content */}
      <main className="lg:ml-60 pt-14 pb-20 lg:pb-0 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
          <DashboardBreadcrumb />
          {children}
        </div>
      </main>

      {/* Mobile bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 flex items-center justify-around h-16 px-1">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center gap-0.5 py-1.5 px-2 rounded-lg transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardLayout;
