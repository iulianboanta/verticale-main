import { useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Search, Eye, Edit, BarChart3, Trash2, Building2, ArrowUpCircle, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { mockListings } from "@/data/dashboardMockData";

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

const DashboardListings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("toate");

  const filtered = mockListings.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "toate" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Toate listingurile</h1>
        <Link to="/adauga-companie?step=plans">
          <Button size="sm">
            <PlusCircle className="w-4 h-4 mr-1.5" /> Adauga listing
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Cauta dupa nume..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="toate">Toate</SelectItem>
            <SelectItem value="activ">Activ</SelectItem>
            <SelectItem value="expirat">Expirat</SelectItem>
            <SelectItem value="in_asteptare">In asteptare</SelectItem>
            <SelectItem value="respins">Respins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="py-16 text-center">
            <Building2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">Nu ai niciun listing inca</h3>
            <p className="text-sm text-muted-foreground mb-4">Adauga primul tau listing pentru a fi vizibil in director.</p>
            <Link to="/adauga-companie?step=plans">
              <Button><PlusCircle className="w-4 h-4 mr-1.5" /> Adauga primul listing</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <TooltipProvider>
          <Card className="border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Companie</th>
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Plan</th>
                    <th colSpan={2} className="p-3 hidden md:table-cell"></th>
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Status</th>
                    <th className="text-right p-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">Data expirare</th>
                    <th className="text-right p-3 text-xs font-medium text-muted-foreground">Actiuni</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => (
                    <tr key={l.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img src={l.thumbnail} alt="" className="w-10 h-10 rounded-lg bg-muted object-cover" />
                          <div>
                            <p className="font-medium text-foreground">{l.name}</p>
                            <p className="text-xs text-muted-foreground">{l.category} &middot; {l.city}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <Badge variant="secondary" className="text-[10px]">{l.plan}</Badge>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        {(l.plan === "Gratuit" || l.plan === "Intro") && (
                          <Link to="/adauga-companie?step=plans">
                            <Button variant="outline" size="sm" className="h-7 text-[11px] px-2">
                              <ArrowUpCircle className="w-3 h-3 mr-1" /> Upgrade
                            </Button>
                          </Link>
                        )}
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        {(l.plan === "Intro" || l.plan === "Profesional") && (
                          <Link to="/adauga-companie?step=plans">
                            <Button variant="outline" size="sm" className="h-7 text-[11px] px-2">
                              <RefreshCw className="w-3 h-3 mr-1" /> Prelungește
                            </Button>
                          </Link>
                        )}
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[l.status]}`}>
                          {statusLabels[l.status]}
                        </span>
                      </td>
                      <td className="p-3 text-right text-muted-foreground hidden sm:table-cell">{l.plan === "Gratuit" ? "Nelimitat" : l.expiryDate}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-3.5 h-3.5" /></Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Editeaza</p></TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7 hidden sm:flex"><BarChart3 className="w-3.5 h-3.5" /></Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Statistici</p></TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7 hidden sm:flex"><Eye className="w-3.5 h-3.5" /></Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Vizualizeaza</p></TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Sterge</p></TooltipContent>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TooltipProvider>
      )}
    </div>
  );
};

export default DashboardListings;
