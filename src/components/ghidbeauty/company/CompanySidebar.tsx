import { useState } from "react";
import { Phone, MessageCircle, Globe, Send, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import ListingCard from "@/components/ghidbeauty/ListingCard";

interface Props {
  company: any;
}

const CompanySidebar = ({ company }: Props) => (
  <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
    {/* Map */}
    <div className="rounded-lg overflow-hidden border">
      <div className="h-[160px] bg-secondary flex items-center justify-center text-muted-foreground text-sm">
        Google Maps Placeholder
      </div>
      <div className="p-3 text-sm">
        <div className="flex items-center gap-1.5 text-foreground">
          <MapPin size={14} className="text-primary shrink-0" />
          {company.address}
        </div>
        <a href="#" className="text-primary text-xs hover:underline mt-1 inline-block">
          Indicații rutiere →
        </a>
      </div>
    </div>

    {/* Contact card */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Contact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full gap-2">
          <Phone size={16} />
          Sună {company.phone}
        </Button>
        <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white">
          <MessageCircle size={16} />
          WhatsApp
        </Button>
        <Button variant="outline" className="w-full gap-2">
          <Globe size={16} />
          Website
        </Button>

        <Separator />

        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <Input placeholder="Numele tău" />
          <Input placeholder="Email" type="email" />
          <Textarea placeholder="Mesajul tău..." className="min-h-[80px]" />
          <Button className="w-full gap-2 bg-foreground text-background hover:bg-foreground/90">
            <Send size={14} />
            Trimite mesaj
          </Button>
        </form>

        <p className="text-[10px] text-muted-foreground text-center">
          Email-ul companiei nu este afișat public
        </p>
      </CardContent>
    </Card>

    {/* Informații legale */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Informații legale</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Denumire</span>
            <span className="font-medium text-foreground">{company.legal.companyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">CUI</span>
            <span className="font-medium text-foreground">{company.legal.cui}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Nr. Reg. Com.</span>
            <span className="font-medium text-foreground">{company.legal.regCom}</span>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Statistici */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Statistici</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground">Vizualizări luna aceasta</p>
          <p className="text-2xl font-bold text-primary">
            {company.views.toLocaleString("ro-RO")}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Membru din</p>
          <p className="text-sm font-medium text-foreground">
            {new Date(company.memberSince).toLocaleDateString("ro-RO", {
              year: "numeric",
              month: "long",
            })}
          </p>
        </div>
      </CardContent>
    </Card>

    {/* Ad banner */}
    <div className="flex h-[600px] w-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 text-xs text-muted-foreground">
      160×600 · Banner publicitar
    </div>

    {/* Saloane similare */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Saloane similare</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {company.similarListings.map((listing: any) => (
          <ListingCard key={listing.id} listing={listing} compact />
        ))}
      </CardContent>
    </Card>
  </div>
);

export default CompanySidebar;
