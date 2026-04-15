import { useState } from "react";
import { Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockUser } from "@/data/dashboardMockData";
import { toast } from "sonner";

const DashboardProfile = () => {
  const [firstName, setFirstName] = useState(mockUser.firstName);
  const [lastName, setLastName] = useState(mockUser.lastName);
  const [email] = useState(mockUser.email);
  const [phone, setPhone] = useState(mockUser.phone);

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-xl font-bold text-foreground">Profilul meu</h1>

      {/* Personal */}
      <Card className="border-border/50">
        <CardContent className="p-5 space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Date personale</h2>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
              {mockUser.avatarInitials}
            </div>
            <Button variant="outline" size="sm">
              <Upload className="w-3.5 h-3.5 mr-1.5" /> Schimba avatar
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Prenume</Label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Nume</Label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1" />
            </div>
          </div>

          <div>
            <Label className="text-xs">Email</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input value={email} disabled className="flex-1" />
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Verificat</span>
            </div>
          </div>

          <div>
            <Label className="text-xs">Telefon</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1" />
          </div>

          <Button size="sm" onClick={() => toast.success("Profil actualizat!")}>Salveaza modificarile</Button>
        </CardContent>
      </Card>

      {/* Password */}
      <Card className="border-border/50">
        <CardContent className="p-5 space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Schimba parola</h2>
          <div><Label className="text-xs">Parola curenta</Label><Input type="password" className="mt-1" placeholder="••••••••" /></div>
          <div><Label className="text-xs">Parola noua</Label><Input type="password" className="mt-1" placeholder="••••••••" /></div>
          <div><Label className="text-xs">Confirma parola noua</Label><Input type="password" className="mt-1" placeholder="••••••••" /></div>
          <Button size="sm" variant="outline" onClick={() => toast.success("Parola schimbata!")}>Schimba parola</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardProfile;
