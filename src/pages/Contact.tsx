import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Building2, Facebook, Instagram, Info } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast({ title: "Eroare", description: "Trebuie să acceptați termenii și condițiile.", variant: "destructive" });
      return;
    }
    toast({ title: "Mesaj trimis!", description: "Vă mulțumim! Vă vom contacta în cel mai scurt timp." });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="solid" />
      <div className="pt-16" />

      <main className="flex-1 container py-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">Contact</h1>
        <p className="text-muted-foreground mb-8">Suntem aici să vă ajutăm. Nu ezitați să ne contactați!</p>

        {/* Info notice */}
        <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4 mb-8">
          <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-foreground">
            Pentru contactarea companiilor de pe site, vă rugăm folosiți formularul de contact din pagina companiei respective.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — Company info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-5">
                {/* Logo placeholder */}
                <div className="w-full h-20 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Logo companie</span>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Acest website este administrat de</p>
                  <h2 className="text-lg font-bold text-foreground">DIRECTORIES MANAGEMENT SYSTEMS SRL</h2>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span className="text-sm text-muted-foreground">Iuliu Maniu 18-20, Sector 6, București</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">CUI RO30832163</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary shrink-0" />
                    <a href="tel:0314044440" className="text-sm text-primary hover:underline">031.404.44.40</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    <a href="mailto:contact@ghidbeauty.ro" className="text-sm text-primary hover:underline">contact@ghidbeauty.ro</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">Luni – Vineri: 09:00 – 18:00</span>
                  </div>
                </div>

                <Separator />

                {/* Social media */}
                <div className="flex items-center gap-3">
                  <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors" aria-label="Facebook">
                    <Facebook className="h-4 w-4 text-primary" />
                  </a>
                  <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors" aria-label="Instagram">
                    <Instagram className="h-4 w-4 text-primary" />
                  </a>
                </div>

                <Button variant="outline" asChild className="w-full">
                  <Link to="/despre-noi">Despre noi</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right — Contact form */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Trimite-ne un mesaj</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="nume">Nume</Label>
                      <Input id="nume" placeholder="Nume" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="prenume">Prenume</Label>
                      <Input id="prenume" placeholder="Prenume" required />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="telefon">Telefon</Label>
                    <Input id="telefon" type="tel" placeholder="07XX XXX XXX" required />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="tip">Tip solicitare</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selectează tipul solicitării" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="listare">Vreau să mă listez</SelectItem>
                        <SelectItem value="informatii">Cerere informații</SelectItem>
                        <SelectItem value="actualizare">Actualizare date companie</SelectItem>
                        <SelectItem value="financiar">Financiar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="mesaj">Mesaj</Label>
                    <Textarea id="mesaj" placeholder="Scrie mesajul tău aici..." rows={5} required />
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="terms-contact"
                      checked={termsAccepted}
                      onCheckedChange={(v) => setTermsAccepted(v === true)}
                    />
                    <Label htmlFor="terms-contact" className="text-xs text-muted-foreground leading-snug cursor-pointer">
                      Accept{" "}
                      <a href="/termeni-si-conditii" className="text-primary underline">termenii și condițiile</a>{" "}
                      și{" "}
                       <a href="/politica-de-confidentialitate" className="text-primary underline">politica de confidențialitate</a>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full">Trimite mesaj</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
