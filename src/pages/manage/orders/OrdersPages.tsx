import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Check, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import StatusPill from "@/components/manage/StatusPill";
import { manageOrders, ManageOrder, OrderStatus, Plan } from "@/data/manageMockData";

const statusLabel: Record<OrderStatus, string> = { paid: "Achitat", pending: "În așteptare", cancelled: "Anulat" };
const statusVariant: Record<OrderStatus, "success" | "warning" | "danger"> = { paid: "success", pending: "warning", cancelled: "danger" };

const pad = (n: number) => String(n).padStart(2, "0");
const toIso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const DaysRemainingCell = ({ order }: { order: ManageOrder }) => {
  if (!order.validatedAt || !order.expiresAt) {
    return <span className="text-muted-foreground">—</span>;
  }
  const days = Math.ceil((new Date(order.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (days <= 0) {
    return (
      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-destructive/10 text-destructive">
        Expirat
      </span>
    );
  }
  const cls = days > 30
    ? "bg-emerald-500/10 text-emerald-700"
    : "bg-amber-500/10 text-amber-700";
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
      {days} zile
    </span>
  );
};

const OrdersTable = () => {
  const [orders, setOrders] = useState<ManageOrder[]>(manageOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [planFilter, setPlanFilter] = useState<Plan | "all">("all");
  const [validateOrder, setValidateOrder] = useState<ManageOrder | null>(null);
  const [deleteOrder, setDeleteOrder] = useState<ManageOrder | null>(null);

  const uniquePlans = useMemo(() => Array.from(new Set(orders.map((o) => o.plan))), [orders]);

  const filtered = useMemo(() => orders.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (planFilter !== "all" && o.plan !== planFilter) return false;
    if (search && !o.company.toLowerCase().includes(search.toLowerCase()) && !o.number.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [orders, search, statusFilter, planFilter]);

  const handleValidate = () => {
    if (!validateOrder) return;
    const now = new Date();
    const expires = new Date();
    expires.setDate(expires.getDate() + 365);
    setOrders((prev) => prev.map((o) =>
      o.id === validateOrder.id
        ? { ...o, status: "paid" as OrderStatus, validatedAt: toIso(now), expiresAt: toIso(expires) }
        : o
    ));
    setValidateOrder(null);
  };

  const handleDelete = () => {
    if (!deleteOrder) return;
    setOrders((prev) => prev.filter((o) => o.id !== deleteOrder.id));
    setDeleteOrder(null);
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          <Input
            placeholder="Caută după companie sau număr..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px]"
          />
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as OrderStatus | "all")}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate statusurile</SelectItem>
              <SelectItem value="paid">Achitat</SelectItem>
              <SelectItem value="pending">În așteptare</SelectItem>
              <SelectItem value="cancelled">Anulat</SelectItem>
            </SelectContent>
          </Select>
          <Select value={planFilter} onValueChange={(v) => setPlanFilter(v as Plan | "all")}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Plan" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate planurile</SelectItem>
              {uniquePlans.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Număr</TableHead>
                <TableHead>Companie</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Sumă</TableHead>
                <TableHead>Metodă</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Zile rămase</TableHead>
                <TableHead className="text-right">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.number}</TableCell>
                  <TableCell>
                    <div className="text-sm">{o.company}</div>
                    <div className="text-xs text-muted-foreground">{o.ownerEmail}</div>
                  </TableCell>
                  <TableCell><StatusPill variant="muted">{o.plan}</StatusPill></TableCell>
                  <TableCell className="text-sm">{o.amount} lei <span className="text-xs text-muted-foreground">+ {o.vat} TVA</span></TableCell>
                  <TableCell className="text-sm">{o.method}</TableCell>
                  <TableCell><StatusPill variant={statusVariant[o.status]}>{statusLabel[o.status]}</StatusPill></TableCell>
                  <TableCell className="text-xs">{o.createdAt}</TableCell>
                  <TableCell><DaysRemainingCell order={o} /></TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button asChild size="icon" variant="ghost" title="Vizualizează">
                        <Link to={`/manage/orders/${o.id}`}><Eye size={14} /></Link>
                      </Button>
                      {o.status === "pending" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-emerald-700"
                          title="Validează plată"
                          onClick={() => setValidateOrder(o)}
                        >
                          <Check size={14} />
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        title="Șterge"
                        onClick={() => setDeleteOrder(o)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-sm text-muted-foreground">Nu există comenzi.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={!!validateOrder} onOpenChange={(o) => !o && setValidateOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmă validarea plății</DialogTitle>
            <DialogDescription>
              {validateOrder && (
                <>Marchezi comanda <strong>{validateOrder.number}</strong> ({validateOrder.company}) ca achitată. Data validării: azi. Abonamentul va expira în 365 zile.</>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setValidateOrder(null)}>Anulează</Button>
            <Button onClick={handleValidate}>Confirmă</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteOrder} onOpenChange={(o) => !o && setDeleteOrder(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Șterge comanda?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteOrder && (
                <>Comanda <strong>{deleteOrder.number}</strong> pentru {deleteOrder.company} va fi ștearsă definitiv. Acțiunea nu poate fi anulată.</>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anulează</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Șterge</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-4">
    <h1 className="text-2xl font-semibold">{title}</h1>
    {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
  </div>
);

export const AllOrders = () => (
  <div>
    <PageHeader title="Comenzi" />
    <OrdersTable />
  </div>
);
