import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star, Check, X, Trash2 } from "lucide-react";
import StatusPill from "@/components/manage/StatusPill";
import { manageReviews, ReviewStatus } from "@/data/manageMockData";

const Stars = ({ n }: { n: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={12} className={i < n ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30"} />
    ))}
  </div>
);

const variant: Record<ReviewStatus, "success" | "warning" | "danger"> = { approved: "success", pending: "warning", rejected: "danger" };
const label: Record<ReviewStatus, string> = { approved: "Aprobată", pending: "În așteptare", rejected: "Respinsă" };

export const PendingReviews = () => {
  const [rejecting, setRejecting] = useState<Record<string, string>>({});
  const list = manageReviews.filter((r) => r.status === "pending");

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Recenzii în așteptare</h1>
      {list.length === 0 && <Card className="p-8 text-center text-sm text-muted-foreground">Nu există recenzii în așteptare.</Card>}
      <div className="grid gap-3">
        {list.map((r) => (
          <Card key={r.id} className="p-4">
            <div className="flex justify-between items-start gap-3">
              <div>
                <div className="font-medium">{r.company}</div>
                <div className="text-xs text-muted-foreground">{r.reviewer} • {r.createdAt}</div>
              </div>
              <Stars n={r.stars} />
            </div>
            <p className="text-sm mt-3">{r.text}</p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white"><Check size={14} /> Aprobă</Button>
              <Button size="sm" variant="outline" className="text-red-700 border-red-300"
                onClick={() => setRejecting((s) => ({ ...s, [r.id]: s[r.id] ?? "" }))}>
                <X size={14} /> Respinge
              </Button>
            </div>
            {rejecting[r.id] !== undefined && (
              <div className="mt-3 space-y-2">
                <Textarea placeholder="Motiv respingere..." value={rejecting[r.id]}
                  onChange={(e) => setRejecting((s) => ({ ...s, [r.id]: e.target.value }))} rows={2} />
                <div className="flex gap-2">
                  <Button size="sm" variant="destructive">Confirmă respingere</Button>
                  <Button size="sm" variant="ghost" onClick={() => setRejecting((s) => { const c = { ...s }; delete c[r.id]; return c; })}>Anulează</Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export const AllReviews = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-semibold">Toate recenziile</h1>
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Companie</TableHead><TableHead>Reviewer</TableHead><TableHead>Stele</TableHead>
              <TableHead>Status</TableHead><TableHead>Data</TableHead><TableHead className="text-right">Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {manageReviews.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.company}</TableCell>
                <TableCell className="text-sm">{r.reviewer}</TableCell>
                <TableCell><Stars n={r.stars} /></TableCell>
                <TableCell><StatusPill variant={variant[r.status]}>{label[r.status]}</StatusPill></TableCell>
                <TableCell className="text-xs">{r.createdAt}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button size="icon" variant="ghost" className="text-emerald-700"><Check size={14} /></Button>
                    <Button size="icon" variant="ghost" className="text-red-700"><X size={14} /></Button>
                    <Button size="icon" variant="ghost" className="text-red-700"><Trash2 size={14} /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  </div>
);
