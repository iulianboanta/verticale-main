import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Pencil, Check, X, Trash2, Search } from "lucide-react";
import StatusPill from "@/components/manage/StatusPill";
import { cn } from "@/lib/utils";
import { manageListings, ManageListing, ListingStatus, Plan } from "@/data/manageMockData";

type StatusTab = ListingStatus | "all";
const statusTabs: { value: StatusTab; label: string }[] = [
  { value: "all", label: "Toate" },
  { value: "active", label: "Active" },
  { value: "pending", label: "În așteptare" },
  { value: "expired", label: "Expirate" },
  { value: "rejected", label: "Respinse" },
];

const statusLabel: Record<ListingStatus, string> = {
  active: "Activ",
  pending: "În așteptare",
  expired: "Expirat",
  rejected: "Respins",
};
const statusVariant: Record<ListingStatus, "success" | "warning" | "muted" | "danger"> = {
  active: "success",
  pending: "warning",
  expired: "muted",
  rejected: "danger",
};

const ListingsTable = ({
  initialStatus,
  hideStatusFilter,
  defaultTab,
}: {
  initialStatus?: ListingStatus;
  hideStatusFilter?: boolean;
  defaultTab?: StatusTab;
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusTab>(defaultTab ?? initialStatus ?? "all");
  const [planFilter, setPlanFilter] = useState<Plan | "all">("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [viewItem, setViewItem] = useState<ManageListing | null>(null);
  const [rejectItem, setRejectItem] = useState<ManageListing | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const filtered = useMemo(() => {
    return manageListings.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (planFilter !== "all" && l.plan !== planFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!l.name.toLowerCase().includes(q) && !l.city.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [search, statusFilter, planFilter]);

  const allSelected = filtered.length > 0 && filtered.every((l) => selected.includes(l.id));
  const toggleAll = () => setSelected(allSelected ? [] : filtered.map((l) => l.id));
  const toggleOne = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const statusCounts = useMemo(() => {
    const counts: Record<StatusTab, number> = { all: manageListings.length, active: 0, pending: 0, expired: 0, rejected: 0 };
    manageListings.forEach((l) => { counts[l.status] += 1; });
    return counts;
  }, []);

  return (
    <div className="space-y-4">
      {!hideStatusFilter && (
        <div className="flex flex-wrap gap-1 border-b">
          {statusTabs.map((tab) => {
            const isActive = statusFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setStatusFilter(tab.value)}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                  isActive
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {tab.label}
                <span className={cn("ml-1.5 text-xs", isActive ? "text-primary/80" : "text-muted-foreground/70")}>
                  ({statusCounts[tab.value]})
                </span>
              </button>
            );
          })}
        </div>
      )}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Caută după nume sau oraș..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={planFilter} onValueChange={(v) => setPlanFilter(v as any)}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Plan" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate planurile</SelectItem>
              <SelectItem value="Gratuit">Gratuit</SelectItem>
              <SelectItem value="Intro">Intro</SelectItem>
              <SelectItem value="Profesional">Profesional</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {selected.length > 0 && (
        <Card className="p-3 bg-primary/5 border-primary/20 flex items-center gap-2">
          <span className="text-sm">{selected.length} selectate</span>
          <div className="ml-auto flex gap-2">
            <Button size="sm" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
              <Check size={14} /> Aprobă
            </Button>
            <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
              <X size={14} /> Respinge
            </Button>
            <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
              <Trash2 size={14} /> Șterge
            </Button>
          </div>
        </Card>
      )}

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"><Checkbox checked={allSelected} onCheckedChange={toggleAll} /></TableHead>
                <TableHead>Companie</TableHead>
                <TableHead>Categorie</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Creat</TableHead>
                <TableHead>Expiră</TableHead>
                <TableHead className="text-right">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((l) => (
                <TableRow key={l.id}>
                  <TableCell><Checkbox checked={selected.includes(l.id)} onCheckedChange={() => toggleOne(l.id)} /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-muted shrink-0" />
                      <div className="min-w-0">
                        <div className="font-medium truncate">{l.name}</div>
                        <div className="text-xs text-muted-foreground">{l.city}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{l.category}</TableCell>
                  <TableCell><StatusPill variant={l.plan === "Profesional" ? "info" : l.plan === "Intro" ? "warning" : "muted"}>{l.plan}</StatusPill></TableCell>
                  <TableCell><StatusPill variant={statusVariant[l.status]}>{statusLabel[l.status]}</StatusPill></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{l.ownerEmail}</TableCell>
                  <TableCell className="text-xs">{l.createdAt}</TableCell>
                  <TableCell className="text-xs">{l.expiresAt}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => setViewItem(l)} title="Vizualizează"><Eye size={14} /></Button>
                      <Button asChild size="icon" variant="ghost" title="Editează">
                        <Link to={`/manage/listings/${l.id}/edit`}><Pencil size={14} /></Link>
                      </Button>
                      {l.status === "pending" && (
                        <>
                          <Button size="icon" variant="ghost" className="text-emerald-700" title="Aprobă"><Check size={14} /></Button>
                          <Button size="icon" variant="ghost" className="text-red-700" title="Respinge" onClick={() => setRejectItem(l)}><X size={14} /></Button>
                        </>
                      )}
                      <Button size="icon" variant="ghost" className="text-red-700" title="Șterge"><Trash2 size={14} /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={9} className="text-center text-sm text-muted-foreground py-8">Nu există listinguri.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* View drawer */}
      <Sheet open={!!viewItem} onOpenChange={(o) => !o && setViewItem(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          {viewItem && (
            <>
              <SheetHeader>
                <SheetTitle>{viewItem.name}</SheetTitle>
                <SheetDescription>{viewItem.city} — {viewItem.category}</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-3 text-sm">
                <div><span className="text-muted-foreground">Plan:</span> {viewItem.plan}</div>
                <div><span className="text-muted-foreground">Status:</span> {statusLabel[viewItem.status]}</div>
                <div><span className="text-muted-foreground">Owner:</span> {viewItem.ownerEmail}</div>
                <div><span className="text-muted-foreground">Creat:</span> {viewItem.createdAt}</div>
                <div><span className="text-muted-foreground">Expiră:</span> {viewItem.expiresAt}</div>
                <div><span className="text-muted-foreground">Vizualizări:</span> {viewItem.views}</div>
                <div className="pt-3 flex gap-2">
                  <Button asChild size="sm"><Link to={`/manage/listings/${viewItem.id}/edit`}>Editează</Link></Button>
                  {viewItem.status === "pending" && (
                    <>
                      <Button size="sm" variant="outline" className="text-emerald-700 border-emerald-300">Aprobă</Button>
                      <Button size="sm" variant="outline" className="text-red-700 border-red-300" onClick={() => setRejectItem(viewItem)}>Respinge</Button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Reject dialog */}
      <Dialog open={!!rejectItem} onOpenChange={(o) => !o && setRejectItem(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Respinge listingul</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Motivul va fi trimis pe email către owner.</p>
          <Textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Motiv respingere..." rows={4} />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setRejectItem(null)}>Anulează</Button>
            <Button variant="destructive" onClick={() => { setRejectItem(null); setRejectReason(""); }}>Respinge</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListingsTable;
