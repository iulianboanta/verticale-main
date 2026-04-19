import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import StatusPill from "@/components/manage/StatusPill";
import { manageOrders } from "@/data/manageMockData";

const OrderDetail = () => {
  const { id } = useParams();
  const order = manageOrders.find((o) => o.id === id) ?? manageOrders[0];

  return (
    <div className="space-y-4">
      <Button asChild variant="ghost" size="sm"><Link to="/manage/orders"><ArrowLeft size={14} /> Înapoi la comenzi</Link></Button>
      <h1 className="text-2xl font-semibold">Comandă {order.number}</h1>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2 space-y-3">
          <h2 className="font-semibold">Sumar comandă</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><div className="text-muted-foreground text-xs">Companie</div>{order.company}</div>
            <div><div className="text-muted-foreground text-xs">Plan</div>{order.plan}</div>
            <div><div className="text-muted-foreground text-xs">Sumă</div>{order.amount} lei + {order.vat} TVA</div>
            <div><div className="text-muted-foreground text-xs">Metodă</div>{order.method}</div>
            <div><div className="text-muted-foreground text-xs">Data</div>{order.createdAt}</div>
            <div><div className="text-muted-foreground text-xs">Status</div>
              <StatusPill variant={order.status === "paid" ? "success" : order.status === "pending" ? "warning" : "danger"}>{order.status}</StatusPill>
            </div>
          </div>
        </Card>

        <Card className="p-5 space-y-3">
          <h2 className="font-semibold">Acțiuni</h2>
          {order.status === "pending" && (
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Marchează ca achitat</Button>
          )}
          {order.status !== "cancelled" && (
            <Button variant="outline" className="w-full text-red-700 border-red-300">Anulează comanda</Button>
          )}
          <div>
            <Label>Note admin</Label>
            <Textarea placeholder="Note interne..." rows={3} className="mt-1" />
          </div>
          <div>
            <Label>Dovadă plată (opțional)</Label>
            <Input type="file" className="mt-1" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetail;
