import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { manageListings } from "@/data/manageMockData";

const EditListing = () => {
  const { id } = useParams();
  const listing = manageListings.find((l) => l.id === id) ?? manageListings[0];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm"><Link to="/manage/listings"><ArrowLeft size={14} /> Înapoi</Link></Button>
      </div>
      <h1 className="text-2xl font-semibold">Editează listing — {listing.name}</h1>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-5 space-y-4">
            <h2 className="font-semibold">Informații generale</h2>
            <div><Label>Denumire companie</Label><Input defaultValue={listing.name} className="mt-1" /></div>
            <div><Label>Descriere</Label><Textarea defaultValue="Descriere salon..." rows={4} className="mt-1" /></div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Telefon</Label><Input defaultValue="+40 712 345 678" className="mt-1" /></div>
              <div><Label>Email</Label><Input defaultValue={listing.ownerEmail} className="mt-1" /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Oraș</Label><Input defaultValue={listing.city} className="mt-1" /></div>
              <div><Label>Adresă</Label><Input defaultValue="Str. Exemplu nr. 12" className="mt-1" /></div>
            </div>
          </Card>

          <Card className="p-5 space-y-4">
            <h2 className="font-semibold">Categorii & Servicii</h2>
            <div><Label>Categorie principală</Label>
              <Select defaultValue={listing.category}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={listing.category}>{listing.category}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Servicii oferite</Label><Textarea placeholder="Tuns, vopsit, manichiură..." rows={3} className="mt-1" /></div>
            <div><Label>Facilități</Label><Textarea placeholder="Wi-Fi, parcare..." rows={2} className="mt-1" /></div>
          </Card>

          <Card className="p-5 space-y-2">
            <h2 className="font-semibold">Galerie foto</h2>
            <div className="grid grid-cols-3 gap-2">
              {[1,2,3].map((i) => <div key={i} className="aspect-square bg-muted rounded" />)}
            </div>
            <Button variant="outline" size="sm" className="mt-2">Încarcă imagini</Button>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-5 space-y-4 border-primary/30">
            <h2 className="font-semibold text-primary">Panou Admin</h2>
            <div><Label>Status</Label>
              <Select defaultValue={listing.status}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activ</SelectItem>
                  <SelectItem value="pending">În așteptare</SelectItem>
                  <SelectItem value="expired">Suspendat</SelectItem>
                  <SelectItem value="rejected">Respins</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Plan override</Label>
              <Select defaultValue={listing.plan}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gratuit">Gratuit</SelectItem>
                  <SelectItem value="Intro">Intro</SelectItem>
                  <SelectItem value="Profesional">Profesional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Dată expirare plan</Label><Input type="date" defaultValue={listing.expiresAt} className="mt-1" /></div>
            <div><Label>Note interne (admin)</Label><Textarea placeholder="Vizibile doar pentru admin..." rows={3} className="mt-1" /></div>
            <div className="flex items-center justify-between"><Label>Verified badge</Label><Switch defaultChecked={listing.verified} /></div>
            <div className="flex items-center justify-between"><Label>Featured (Recomandat)</Label><Switch defaultChecked={listing.featured} /></div>
          </Card>

          <div className="flex gap-2">
            <Button className="flex-1">Salvează modificări</Button>
            <Button variant="outline" asChild><Link to="/manage/listings">Anulează</Link></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditListing;
