import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, FileDown, Check, X } from "lucide-react";
import StatusPill from "@/components/manage/StatusPill";
import { manageOrders, OrderStatus } from "@/data/manageMockData";

const statusLabel: Record<OrderStatus, string> = { paid: "Achitat", pending: "În așteptare", cancelled: "Anulat" };
const statusVariant: Record<OrderStatus, "success" | "warning" | "danger"> = { paid: "success", pending: "warning", cancelled: "danger" };

const OrdersTable = ({ initialStatus }: { initialStatus?: OrderStatus }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">(initialStatus ?? "all");

  const filtered = useMemo(() => manageOrders.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (search && !o.company.toLowerCase().includes(search.toLowerCase()) && !o.number.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [search, statusFilter]);

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          <Input placeholder="Caută după companie sau număr..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 min-w-[200px]" />
          {!initialStatus && (
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate</SelectItem>
                <SelectItem value="paid">Achitat</SelectItem>
                <SelectItem value="pending">În așteptare</SelectItem>
                <SelectItem value="cancelled">Anulat</SelectItem>
              </SelectContent>
            </Select>
          )}
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
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button asChild size="icon" variant="ghost" title="Vizualizează"><Link to={`/manage/orders/${o.id}`}><Eye size={14} /></Link></Button>
                      {o.status === "pending" && (
                        <Button size="icon" variant="ghost" className="text-emerald-700" title="Confirmă plată"><Check size={14} /></Button>
                      )}
                      <Button size="icon" variant="ghost" title="Descarcă proformă"><FileDown size={14} /></Button>
                      {o.status !== "cancelled" && (
                        <Button size="icon" variant="ghost" className="text-red-700" title="Anulează"><X size={14} /></Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && <TableRow><TableCell colSpan={8} className="text-center py-8 text-sm text-muted-foreground">Nu există comenzi.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-4"><h1 className="text-2xl font-semibold">{title}</h1>{subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}</div>
);

export const AllOrders = () => (<div><PageHeader title="Toate comenzile" /><OrdersTable /></div>);
export const UnpaidProforma = () => (<div><PageHeader title="Proforma neachitate" /><OrdersTable initialStatus="pending" /></div>);
export const ConfirmedPayments = () => (<div><PageHeader title="Plăți confirmate" /><OrdersTable initialStatus="paid" /></div>);
export const ConfirmPaymentLanding = () => (
  <div>
    <PageHeader title="Confirmă plată manuală" subtitle="Selectează o comandă neachitată pentru a confirma plata." />
    <OrdersTable initialStatus="pending" />
  </div>
);
