import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatCard from "@/components/manage/StatCard";
import { Download, List, Users, ShoppingCart, Wallet, Eye } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { manageListings, manageOrders, manageUsers, monthlyListings, revenueByMonth, listingCategoriesTree, counties } from "@/data/manageMockData";

const totalRevenue = revenueByMonth.reduce((s, r) => s + r.revenue, 0);
const avgViews = Math.round(manageListings.reduce((s, l) => s + l.views, 0) / manageListings.length);

export const PlatformStats = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between flex-wrap gap-2">
      <h1 className="text-2xl font-semibold">Statistici platformă</h1>
      <div className="flex gap-2 items-center">
        <Label className="text-xs">Perioadă:</Label>
        <Input type="date" className="w-[150px]" />
        <span className="text-xs">→</span>
        <Input type="date" className="w-[150px]" />
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatCard label="Total listinguri" value={manageListings.length} icon={List} tone="violet" />
      <StatCard label="Total utilizatori" value={manageUsers.length} icon={Users} tone="blue" />
      <StatCard label="Total comenzi" value={manageOrders.length} icon={ShoppingCart} tone="amber" />
      <StatCard label="Venituri perioadă" value={`${totalRevenue} lei`} icon={Wallet} tone="green" />
      <StatCard label="Vizualizări medii" value={avgViews} icon={Eye} tone="violet" />
    </div>

    <div className="grid lg:grid-cols-2 gap-4">
      <Card className="p-5">
        <h3 className="font-semibold text-sm mb-2">Creștere listinguri</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={monthlyListings}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip />
            <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-5">
        <h3 className="font-semibold text-sm mb-2">Venituri / lună</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={revenueByMonth}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip />
            <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-5">
        <h3 className="font-semibold text-sm mb-2">Top 10 categorii</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={listingCategoriesTree.slice(0, 5)} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={140} />
            <Tooltip />
            <Bar dataKey="listingsCount" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-5">
        <h3 className="font-semibold text-sm mb-2">Top 10 județe</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={[...counties].sort((a, b) => b.listingsCount - a.listingsCount).slice(0, 10)} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={100} />
            <Tooltip />
            <Bar dataKey="listingsCount" fill="hsl(30 85% 55%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  </div>
);

const downloadCsv = (filename: string, headers: string[], rows: (string | number)[][]) => {
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

export const ListingsReport = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Raport listings</h1>
      <Button onClick={() => downloadCsv("listings-report.csv",
        ["ID","Nume","Oraș","Categorie","Plan","Status","Vizualizări","Creat","Expiră"],
        manageListings.map((l) => [l.id, l.name, l.city, l.category, l.plan, l.status, l.views, l.createdAt, l.expiresAt]))}>
        <Download size={14} /> Export CSV
      </Button>
    </div>
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader><TableRow><TableHead>Nume</TableHead><TableHead>Oraș</TableHead><TableHead>Categorie</TableHead><TableHead>Plan</TableHead><TableHead>Status</TableHead><TableHead>Vizualizări</TableHead></TableRow></TableHeader>
          <TableBody>
            {manageListings.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="font-medium">{l.name}</TableCell><TableCell>{l.city}</TableCell><TableCell>{l.category}</TableCell>
                <TableCell>{l.plan}</TableCell><TableCell>{l.status}</TableCell><TableCell>{l.views}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  </div>
);

export const RevenueReport = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Raport venituri</h1>
      <Button onClick={() => downloadCsv("revenue-report.csv",
        ["Lună","Comenzi noi","Reînnoiri","Total","Venit","TVA","Total cu TVA"],
        revenueByMonth.map((r) => [r.month, r.newOrders, r.renewals, r.total, r.revenue, r.vat, r.totalWithVat]))}>
        <Download size={14} /> Export CSV
      </Button>
    </div>
    <Card>
      <Table>
        <TableHeader><TableRow><TableHead>Lună</TableHead><TableHead>Comenzi noi</TableHead><TableHead>Reînnoiri</TableHead><TableHead>Total comenzi</TableHead><TableHead>Venit (fără TVA)</TableHead><TableHead>TVA</TableHead><TableHead>Total</TableHead></TableRow></TableHeader>
        <TableBody>
          {revenueByMonth.map((r) => (
            <TableRow key={r.month}>
              <TableCell className="font-medium">{r.month}</TableCell><TableCell>{r.newOrders}</TableCell><TableCell>{r.renewals}</TableCell>
              <TableCell>{r.total}</TableCell><TableCell>{r.revenue} lei</TableCell><TableCell>{r.vat} lei</TableCell><TableCell>{r.totalWithVat} lei</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  </div>
);
