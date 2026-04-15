import { useState } from "react";
import { Eye, Phone, MessageSquare, Globe, ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockChartData } from "@/data/dashboardMockData";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const DashboardStats = () => {
  const [period, setPeriod] = useState("luna");

  const totalViews = mockChartData.reduce((a, d) => a + d.views, 0);
  const totalPhone = mockChartData.reduce((a, d) => a + d.phone, 0);
  const totalWhatsapp = mockChartData.reduce((a, d) => a + d.whatsapp, 0);
  const totalForms = mockChartData.reduce((a, d) => a + d.forms, 0);
  const totalWebsite = mockChartData.reduce((a, d) => a + d.website, 0);
  const totalLeads = totalPhone + totalWhatsapp + totalForms + totalWebsite;
  const conversionRate = ((totalLeads / totalViews) * 100).toFixed(1);

  const stats = [
    { label: "Total afisari", value: totalViews.toLocaleString(), icon: Eye, change: 12.5, color: "text-primary" },
    { label: "Clickuri telefon", value: totalPhone.toString(), icon: Phone, change: 8.3, color: "text-green-600" },
    { label: "Clickuri WhatsApp", value: totalWhatsapp.toString(), icon: MessageSquare, change: -3.2, color: "text-green-600" },
    { label: "Formulare trimise", value: totalForms.toString(), icon: MessageSquare, change: 15.0, color: "text-amber-600" },
    { label: "Clickuri website", value: totalWebsite.toString(), icon: Globe, change: 5.7, color: "text-blue-600" },
    { label: "Rata conversie", value: `${conversionRate}%`, icon: TrendingUp, change: 2.1, color: "text-primary" },
  ];

  const topDays = [...mockChartData]
    .sort((a, b) => (b.phone + b.whatsapp + b.forms + b.website) - (a.phone + a.whatsapp + a.forms + a.website))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Statistici & Analytics</h1>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="luna">Ultima luna</SelectItem>
            <SelectItem value="3luni">Ultimele 3 luni</SelectItem>
            <SelectItem value="6luni">Ultimele 6 luni</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          const isUp = s.change >= 0;
          return (
            <Card key={s.label} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${s.color}`} />
                  <span className={`text-[10px] font-semibold flex items-center gap-0.5 ${isUp ? "text-green-600" : "text-red-500"}`}>
                    {isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {Math.abs(s.change)}%
                  </span>
                </div>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Views chart */}
      <Card className="border-border/50">
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Afisari in timp</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(270 15% 90%)" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(270 5% 45%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(270 5% 45%)" />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(270 15% 90%)", fontSize: 12 }} />
                <Line type="monotone" dataKey="views" stroke="hsl(270 28% 59%)" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Leads chart */}
      <Card className="border-border/50">
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Lead-uri in timp</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(270 15% 90%)" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(270 5% 45%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(270 5% 45%)" />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(270 15% 90%)", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="phone" name="Telefon" fill="hsl(270 28% 59%)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="whatsapp" name="WhatsApp" fill="hsl(142 71% 45%)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="forms" name="Formulare" fill="hsl(38 92% 50%)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="website" name="Website" fill="hsl(217 91% 60%)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top days */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Top zile</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left pb-2 text-xs font-medium text-muted-foreground">Data</th>
                <th className="text-right pb-2 text-xs font-medium text-muted-foreground">Afisari</th>
                <th className="text-right pb-2 text-xs font-medium text-muted-foreground">Lead-uri</th>
              </tr>
            </thead>
            <tbody>
              {topDays.map((d) => (
                <tr key={d.date} className="border-b border-border/50 last:border-0">
                  <td className="py-2 text-foreground">{d.date}</td>
                  <td className="py-2 text-right text-muted-foreground">{d.views}</td>
                  <td className="py-2 text-right font-medium text-foreground">{d.phone + d.whatsapp + d.forms + d.website}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
