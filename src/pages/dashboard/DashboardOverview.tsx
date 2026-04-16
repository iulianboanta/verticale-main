import { Link } from "react-router-dom";
import { Eye, Phone, Building2, Star, PlusCircle, User, ArrowUpRight, BarChart3, MessageSquare, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockUser, mockStats, mockListings, mockReviews, mockMessages } from "@/data/dashboardMockData";

const statCards = [
  { label: "Total afisari luna aceasta", value: mockStats.viewsThisMonth.toLocaleString(), icon: Eye, color: "text-primary", bg: "bg-primary/10" },
  { label: "Total lead-uri luna aceasta", value: mockStats.leadsThisMonth.toString(), icon: Phone, color: "text-green-600", bg: "bg-green-100" },
  { label: "Listinguri active", value: mockStats.activeListings.toString(), icon: Building2, color: "text-blue-600", bg: "bg-blue-100" },
  { label: "Recenzii noi", value: mockStats.newReviews.toString(), icon: Star, color: "text-amber-600", bg: "bg-amber-100" },
];

const statusColors: Record<string, string> = {
  activ: "bg-green-100 text-green-700",
  expirat: "bg-red-100 text-red-700",
  in_asteptare: "bg-amber-100 text-amber-700",
  respins: "bg-muted text-muted-foreground",
};

const statusLabels: Record<string, string> = {
  activ: "Activ",
  expirat: "Expirat",
  in_asteptare: "In asteptare",
  respins: "Respins",
};

const today = new Date().toLocaleDateString("ro-RO", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

const DashboardOverview = () => (
  <div className="space-y-6">
    {/* Welcome */}
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-foreground">
        Buna ziua, {mockUser.firstName}!
      </h1>
      <p className="text-sm text-muted-foreground capitalize">{today}</p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {statCards.map((s) => {
        const Icon = s.icon;
        return (
          <Card key={s.label} className="border-border/50">
            <CardContent className="p-4">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-4.5 h-4.5 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>

    {/* Quick actions */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <Link to="/adauga-companie?step=plans">
        <Card className="border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer h-full">
          <CardContent className="p-4 flex flex-col items-center text-center gap-2">
            <PlusCircle className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium text-primary">Adauga listing nou</span>
          </CardContent>
        </Card>
      </Link>
      <Link to="/dashboard/profil">
        <Card className="border-border/50 hover:bg-muted/50 transition-colors cursor-pointer h-full">
          <CardContent className="p-4 flex flex-col items-center text-center gap-2">
            <User className="w-6 h-6 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Completeaza profilul</span>
          </CardContent>
        </Card>
      </Link>
      {mockUser.plan !== "Profesional" && (
        <Link to="/dashboard/abonamente">
          <Card className="border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer h-full">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <ArrowUpRight className="w-6 h-6 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">Upgrade plan</span>
            </CardContent>
          </Card>
        </Link>
      )}
      <Link to="/dashboard/statistici">
        <Card className="border-border/50 hover:bg-muted/50 transition-colors cursor-pointer h-full">
          <CardContent className="p-4 flex flex-col items-center text-center gap-2">
            <BarChart3 className="w-6 h-6 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Vezi statistici</span>
          </CardContent>
        </Card>
      </Link>
    </div>


    {/* My listings table */}
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-foreground">Listingurile mele</h2>
        <Link to="/dashboard/listinguri" className="text-xs text-primary hover:underline flex items-center gap-1">
          Vezi toate <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
      <Card className="border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Companie</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">Plan</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-right p-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">Data expirare</th>
                <th className="text-right p-3 text-xs font-medium text-muted-foreground">Actiuni</th>
              </tr>
            </thead>
            <tbody>
              {mockListings.slice(0, 3).map((l) => (
                <tr key={l.id} className="border-b border-border/50 last:border-0">
                  <td className="p-3">
                    <p className="font-medium text-foreground">{l.name}</p>
                    <p className="text-xs text-muted-foreground">{l.city}</p>
                  </td>
                  <td className="p-3 hidden sm:table-cell">
                    <Badge variant="secondary" className="text-[10px]">{l.plan}</Badge>
                  </td>
                  <td className="p-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[l.status]}`}>
                      {statusLabels[l.status]}
                    </span>
                  </td>
                  <td className="p-3 text-right hidden sm:table-cell text-muted-foreground">{l.plan === "Gratuit" ? "Nelimitat" : l.expiryDate}</td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="sm" className="text-xs h-7">Editare</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>

    {/* Recent reviews */}
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-foreground">Recenzii recente</h2>
        <Link to="/dashboard/recenzii" className="text-xs text-primary hover:underline flex items-center gap-1">
          Vezi toate <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-2">
        {mockReviews.slice(0, 3).map((r) => (
          <Card key={r.id} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground shrink-0">
                  {r.reviewerInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-foreground">{r.reviewerName}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < r.stars ? "text-amber-400 fill-amber-400" : "text-muted"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{r.listingName} &middot; {r.date}</p>
                  <p className="text-sm text-foreground/80">{r.text}</p>
                </div>
                {!r.replied && (
                  <Button variant="outline" size="sm" className="text-xs h-7 shrink-0">Raspunde</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

    {/* Recent messages */}
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-foreground">Mesaje recente</h2>
        <Link to="/dashboard/mesaje" className="text-xs text-primary hover:underline flex items-center gap-1">
          Vezi toate <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-2">
        {mockMessages.slice(0, 3).map((m) => (
          <Card key={m.id} className={`border-border/50 ${!m.read ? "border-l-[3px] border-l-primary" : ""}`}>
            <CardContent className="p-4 flex items-center gap-3">
              {!m.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium text-foreground">{m.senderName}</span>
                  <span className="text-xs text-muted-foreground">{m.listingName}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{m.preview}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{m.date}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

export default DashboardOverview;
