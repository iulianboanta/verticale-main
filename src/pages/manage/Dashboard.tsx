import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/manage/StatCard";
import { List, Clock, AlertOctagon, Users, Eye, FileText, Star, Newspaper, ShoppingCart, UserPlus } from "lucide-react";
import { manageListings, manageOrders, manageUsers, manageReviews, monthlyListings, planDistribution, recentActivity } from "@/data/manageMockData";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, CartesianGrid } from "recharts";

const Dashboard = () => {
  const pendingListings = manageListings.filter((l) => l.status === "pending").length;
  const activeListings = manageListings.filter((l) => l.status === "active").length;
  const unpaidOrders = manageOrders.filter((o) => o.status === "pending").length;
  const pendingReviews = manageReviews.filter((r) => r.status === "pending").length;
  const totalViews = manageListings.reduce((sum, l) => sum + l.views, 0);

  const iconForActivity = (type: string) => {
    switch (type) {
      case "listing": return Newspaper;
      case "payment": return ShoppingCart;
      case "review": return Star;
      case "user": return UserPlus;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Privire de ansamblu asupra platformei</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard label="Listinguri active" value={activeListings} icon={List} tone="violet" />
        <StatCard label="În așteptare aprobare" value={pendingListings} icon={Clock} tone="amber" />
        <StatCard label="Comenzi neachitate" value={unpaidOrders} icon={AlertOctagon} tone="red" />
        <StatCard label="Utilizatori înregistrați" value={manageUsers.length} icon={Users} tone="blue" />
        <StatCard label="Vizualizări luna aceasta" value={totalViews.toLocaleString()} icon={Eye} tone="green" />
      </div>

      {/* Pending actions */}
      <Card className="p-5 border-amber-200 bg-amber-50">
        <h2 className="text-sm font-semibold text-amber-800 mb-3">Acțiuni în așteptare</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="flex items-center justify-between bg-card rounded-md p-3 border">
            <div>
              <div className="text-2xl font-semibold">{pendingListings}</div>
              <div className="text-xs text-muted-foreground">listinguri în așteptare aprobare</div>
            </div>
            <Button asChild size="sm" variant="outline"><Link to="/manage/listings/pending">Vezi toate</Link></Button>
          </div>
          <div className="flex items-center justify-between bg-card rounded-md p-3 border">
            <div>
              <div className="text-2xl font-semibold">{unpaidOrders}</div>
              <div className="text-xs text-muted-foreground">plăți neconfirmate</div>
            </div>
            <Button asChild size="sm" variant="outline"><Link to="/manage/orders/unpaid">Vezi toate</Link></Button>
          </div>
          <div className="flex items-center justify-between bg-card rounded-md p-3 border">
            <div>
              <div className="text-2xl font-semibold">{pendingReviews}</div>
              <div className="text-xs text-muted-foreground">recenzii de moderat</div>
            </div>
            <Button asChild size="sm" variant="outline"><Link to="/manage/reviews/pending">Vezi toate</Link></Button>
          </div>
        </div>
      </Card>

      {/* Activity + Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-1">
          <h2 className="text-sm font-semibold mb-3">Activitate recentă</h2>
          <ul className="space-y-3">
            {recentActivity.map((a) => {
              const Icon = iconForActivity(a.type);
              return (
                <li key={a.id} className="flex items-start gap-2 text-sm">
                  <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate">{a.text}</div>
                    <div className="text-xs text-muted-foreground">{a.time}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="p-5 lg:col-span-1">
          <h2 className="text-sm font-semibold mb-3">Listinguri noi / lună</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyListings}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 lg:col-span-1">
          <h2 className="text-sm font-semibold mb-3">Distribuție planuri</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={planDistribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                {planDistribution.map((p, i) => <Cell key={i} fill={p.color} />)}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
